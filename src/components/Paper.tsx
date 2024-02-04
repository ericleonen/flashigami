"use client"

import Crease from "@/origami/Crease";
import OrigamiSet from "@/origami/OrigamiSet";
import Vertex from "@/origami/Vertex";
import { useRender } from "@/utils/drawing";
import { useEffect, useState } from "react";

const DISPLAY_DIMS = 500;
const RESOLUTION_DIMS = 1000;
const PADDING = 10;

const N = 8;

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
    creases: OrigamiSet<Crease>
) {
    const newVertexes: Vertex[] = [];
    const newCreases: Crease[] = [];
    const removeCreases: Crease[] = [];
    const fullCrease = new Crease(vertex1, vertex2);

    creases.forEach(crease => {
        const intersection = Crease.getIntersection(fullCrease, crease);

        if (intersection) {
            newVertexes.push(intersection);
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

    if (newVertexes.length <= 2) {
        creases.add(fullCrease);
    } else {
        newVertexes.sort(Vertex.compare);

        for (let i = 1; i < newVertexes.length; i++) {
            creases.add(
                new Crease(newVertexes[i - 1], newVertexes[i])
            )
        }   
    }
}

type PaperProps = {
    tool: Tool
}

export default function Paper({ tool }: PaperProps) {
    const [vertexes, setVertexes] = useState<OrigamiSet<Vertex>>(origVertexes);
    const [creases, setCreases] = useState<OrigamiSet<Crease>>(origCreases);

    const canvasRef = useRender({
        vertexes,
        creases
    });

    return (
        <canvas
            ref={canvasRef}
            style={{
                height: `${DISPLAY_DIMS}px`,
                width: `${DISPLAY_DIMS}px`
            }}
            height={RESOLUTION_DIMS + 2 * PADDING}
            width={RESOLUTION_DIMS + 2 * PADDING}
        />
    )
}