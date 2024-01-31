"use client"

import Crease from "@/origami/Crease";
import Vertex from "@/origami/Vertex";
import { useRender } from "@/utils/drawing";
import { useEffect, useRef, useState } from "react";

const DISPLAY_DIMS = 500;
const RESOLUTION_DIMS = 1000;

export default function Paper() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [vertexes, setVertexes] = useState<Set<Vertex>>();
    const [creases, setCreases] = useState<Set<Crease>>();

    useRender({
        vertexes,
        creases
    }, canvasRef.current);

    return (
        <canvas
            ref={canvasRef}
            style={{
                height: `${DISPLAY_DIMS}px`,
                width: `${DISPLAY_DIMS}px`
            }}
            height={RESOLUTION_DIMS}
            width={RESOLUTION_DIMS}
            className="border-2 border-gray-200"
        />
    )
}