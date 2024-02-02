"use client"

import Crease from "@/origami/Crease";
import OrigamiSet from "@/origami/OrigamiSet";
import Vertex from "@/origami/Vertex";
import { useRender } from "@/utils/drawing";
import { useEffect, useRef, useState } from "react";

const DISPLAY_DIMS = 500;
const RESOLUTION_DIMS = 1000;
const PADDING = 10;

const N = 16;

const topLeft = new Vertex(PADDING, PADDING);
const topRight = new Vertex(PADDING + RESOLUTION_DIMS, PADDING);
const bottomLeft = new Vertex(PADDING, PADDING + RESOLUTION_DIMS);
const bottomRight = new Vertex(PADDING + RESOLUTION_DIMS, PADDING + RESOLUTION_DIMS);

const origVertexes: Vertex[] = [topLeft, topRight, bottomLeft, bottomRight];
const origCreases: Crease[] = [
    new Crease(topLeft, topRight),
    new Crease(topLeft, bottomLeft),
    new Crease(topRight, bottomRight),
    new Crease(bottomLeft, bottomRight)
];

for (let i = 1; i < N; i++) {
    const x = PADDING + i * RESOLUTION_DIMS / N;
    const top = new Vertex(x, PADDING);
    const bottom = new Vertex(x, PADDING + RESOLUTION_DIMS);
    const xCrease = new Crease(top, bottom);

    origVertexes.push(top, bottom);
    origCreases.push(xCrease);

    const y = x;
    const left = new Vertex(PADDING, y);
    const right = new Vertex(PADDING + RESOLUTION_DIMS, y);
    const yCrease = new Crease(left, right);

    origVertexes.push(left, right);
    origCreases.push(yCrease);
}

export default function Paper() {
    const [vertexes, setVertexes] = useState<OrigamiSet<Vertex>>(
        new OrigamiSet<Vertex>(origVertexes)
    );
    const [creases, setCreases] = useState<OrigamiSet<Crease>>(
        new OrigamiSet<Crease>(origCreases)
    );

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