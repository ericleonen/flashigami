"use client"

import Crease from "@/origami/Crease";
import OrigamiSet from "@/origami/OrigamiSet";
import Pair from "@/origami/Pair";
import Vertex from "@/origami/Vertex";
import { useRender } from "@/utils/drawing";
import { useState } from "react";

const DISPLAY_DIMS = 500;
const RESOLUTION_DIMS = 1000;
const PADDING = 15;

const N = 16;

const topLeft = new Vertex(PADDING, PADDING);
const topRight = new Vertex(PADDING + RESOLUTION_DIMS, PADDING);
const bottomLeft = new Vertex(PADDING, PADDING + RESOLUTION_DIMS);
const bottomRight = new Vertex(PADDING + RESOLUTION_DIMS, PADDING + RESOLUTION_DIMS);

const origVertexes = new OrigamiSet<Vertex>([
    topLeft, 
    topRight, 
    bottomLeft, 
    bottomRight
]);
const origCreases = new OrigamiSet<Crease>([
    new Crease(topLeft, topRight),
    new Crease(topLeft, bottomLeft),
    new Crease(topRight, bottomRight),
    new Crease(bottomLeft, bottomRight)
]);

function isEdge(crease: Crease) {
    return (
        crease.vertex1.y === crease.vertex2.y && 
            [PADDING, PADDING + RESOLUTION_DIMS].includes(crease.vertex2.y)
        ||
        crease.vertex1.x === crease.vertex2.x && 
            [PADDING, PADDING + RESOLUTION_DIMS].includes(crease.vertex2.x)
    )
}

for (let i = 1; i < N; i++) {
    const x = PADDING + i * RESOLUTION_DIMS / N;
    const top = new Vertex(x, PADDING);
    const bottom = new Vertex(x, PADDING + RESOLUTION_DIMS);

    origVertexes.add(top);
    origVertexes.add(bottom);
    
    makeCrease(top, bottom, origVertexes, origCreases);

    const y = x;
    const left = new Vertex(PADDING, y);
    const right = new Vertex(PADDING + RESOLUTION_DIMS, y);

    origVertexes.add(left);
    origVertexes.add(right);

    makeCrease(left, right, origVertexes, origCreases);
}

function makeCrease(
    vertex1: Vertex, 
    vertex2: Vertex, 
    vertexes: OrigamiSet<Vertex>,
    creases: OrigamiSet<Crease>,
    tool: Tool = "crease",
    copy: boolean = false
): [OrigamiSet<Vertex>, OrigamiSet<Crease>] {
    if (tool === "eraser") {
        throw new Error("eraser can't make a crease");
    }

    if (copy) {
        vertexes = vertexes.getCopy();
        creases = creases.getCopy();
    }

    const newVertexes = new OrigamiSet<Vertex>();
    const newCreases: Crease[] = [];
    const removeCreases: Crease[] = [];

    const creaseType = tool === "crease" ? undefined : tool;
    const fullCrease = new Crease(vertex1, vertex2, creaseType);

    creases.forEach(crease => {
        const intersection = Crease.getIntersection(fullCrease, crease);

        if (intersection) {
            newVertexes.add(intersection);
            vertexes.add(intersection);

            const splitCreases = crease.split(intersection);

            if (splitCreases) {
                removeCreases.push(crease);
                newCreases.push(...splitCreases);
            }
        }
    });

    creases.deleteAll(removeCreases);
    creases.addAll(newCreases);

    if (newVertexes.size() <= 2) {
        creases.add(fullCrease);
    } else {
        const newVertexesList = Object.values(newVertexes.items).sort(Vertex.compare);

        for (let i = 1; i < newVertexesList.length; i++) {
            creases.add(
                new Crease(newVertexesList[i - 1], newVertexesList[i], creaseType)
            )
        }   
    }

    return [vertexes, creases];
}

function deleteCrease(
    crease: Crease,
    vertexes: OrigamiSet<Vertex>,
    creases: OrigamiSet<Crease>,
) : [OrigamiSet<Vertex>, OrigamiSet<Crease>] {
    creases = creases.getCopy();
    vertexes = vertexes.getCopy();

    creases.delete(crease);
    crease.vertex1.creases.delete(crease);
    crease.vertex2.creases.delete(crease);

    return [vertexes, creases];
}

function deleteVertex(
    vertex: Vertex,
    vertexes: OrigamiSet<Vertex>,
    creases: OrigamiSet<Crease>
): [OrigamiSet<Vertex>, OrigamiSet<Crease>] {
    vertexes = vertexes.getCopy();
    creases = creases.getCopy();
    const creaseMap: { [key: string]: Crease[] } = {};
    const getCreaseKey = (crease: Crease) => {
        const v = crease.vector;

        if (v.x === 0) return Pair.toString(0, 1);

        const unit = v.getScaled((v.x < 0 ? -1 : 1) / v.magnitude);
        return Pair.toString(unit.x, unit.y);
    }

    vertex.creases.forEach(crease => {
        const key = getCreaseKey(crease);

        if (!creaseMap.hasOwnProperty(key)) {
            creaseMap[key] = [crease];
        } else {
            creaseMap[key].push(crease);
        }
    });

    const creasesList = Object.values(creaseMap)

    if (creasesList.length === 1 && creasesList[0].length === 2) {
        const [crease1, crease2] = creasesList[0];

        if (crease1.type === crease2.type) {
            const other1 = crease1.getOtherVertex(vertex);
            const other2 = crease2.getOtherVertex(vertex);

            creases.deleteAll([crease1, crease2]);
            creases.add(new Crease(other1, other2, crease1.type));

            other1.creases.delete(crease1);
            other2.creases.delete(crease2);

            vertexes.delete(vertex);
        }
    } else if (creasesList.length === 0) {
        vertexes.delete(vertex);
    }

    return [vertexes, creases];
}

type PaperProps = {
    tool: Tool
}

export default function Paper({ tool }: PaperProps) {
    const [vertexes, setVertexes] = useState<OrigamiSet<Vertex>>(origVertexes);
    const [creases, setCreases] = useState<OrigamiSet<Crease>>(origCreases);
    const [hovered, setHovered] = useState<Vertex | Crease>();
    const [selectedVertex, setSelectedVertex] = useState<Vertex>();

    const canvasRef = useRender({
        vertexes,
        creases,
        hovered,
        tool,
        selectedVertex
    });

    const handleClick = () => {
        const clicked = hovered;
        if (!clicked) return;

        if (clicked instanceof Vertex) {
            if (tool === "eraser") {
                if (origVertexes.has(clicked)) return;
                const [newVertexes, newCreases] = deleteVertex(clicked, vertexes, creases);

                setVertexes(newVertexes);
                setCreases(newCreases);
            }
            else if (!selectedVertex) {
                // select the first vertex
                setSelectedVertex(clicked);
            } else {
                // select the second vertex and make a crease
                const [newVertexes, newCreases] = makeCrease(
                    selectedVertex, 
                    clicked, 
                    vertexes, 
                    creases, 
                    tool, 
                    true
                );
                setVertexes(newVertexes);
                setCreases(newCreases);
                setSelectedVertex(undefined);
            }
        } else if (clicked instanceof Crease) {
            if (tool === "eraser") {
                const [newVertexes, newCreases] = deleteCrease(
                    clicked,
                    vertexes,
                    creases
                );

                setVertexes(newVertexes);
                setCreases(newCreases);
                setSelectedVertex(undefined);
                setHovered(undefined);
            } else {
                const [newVertexes, newCreases] = makeCrease(
                    clicked.vertex1,
                    clicked.vertex2,
                    vertexes,
                    creases,
                    tool,
                    true
                );
                setVertexes(newVertexes);
                setCreases(newCreases);
                setSelectedVertex(undefined);
                setHovered(undefined);
            }
        }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const mousePos = new Pair(
            (e.clientX - rect.left) * scaleX,
            (e.clientY - rect.top) * scaleY
        );
        let hoveredFound = false;
        for (const vertex of vertexes.toList()) {
            if (vertex.getDistance(mousePos) <= Vertex.hoverRadius) {
                setHovered(vertex);
                hoveredFound = true;
                break;
            }
        }
        if (!hoveredFound) {
            for (const crease of creases.toList()) {
                if (isEdge(crease)) continue;

                const dist = crease.getDistance(mousePos)

                if (dist && dist <= Crease.hoverRadius) {
                    setHovered(crease);
                    hoveredFound = true;
                    break;
                }
            }
        }

        if (!hoveredFound) setHovered(undefined);
    }

    return (
        <canvas
            ref={canvasRef}
            style={{
                height: `${DISPLAY_DIMS}px`,
                width: `${DISPLAY_DIMS}px`
            }}
            height={RESOLUTION_DIMS + 2 * PADDING}
            width={RESOLUTION_DIMS + 2 * PADDING}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
        />
    )
}