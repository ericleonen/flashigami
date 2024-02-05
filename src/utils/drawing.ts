import Crease from "@/origami/Crease";
import OrigamiSet from "@/origami/OrigamiSet";
import Pair from "@/origami/Pair";
import Vertex from "@/origami/Vertex";
import { useEffect, useRef } from "react";

type RenderData = {
    vertexes: OrigamiSet<Vertex>,
    creases: OrigamiSet<Crease>
    mousePos?: Pair,
    tool: Tool
}

export function useRender(data: RenderData) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { vertexes, creases, mousePos, tool } = data;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas && canvas.getContext("2d");
        if (context) render(data, canvas, context);
    }, [vertexes.toString(), creases.toString(), mousePos, tool]);

    return canvasRef;
}

function render(
    data: RenderData, 
    canvas: HTMLCanvasElement, 
    context: CanvasRenderingContext2D
) {
    const { vertexes, creases, mousePos, tool } = data;
    context.clearRect(0, 0, canvas.width, canvas.height);

    creases.forEach(crease => {
        drawCrease(crease, context);
    });

    vertexes.forEach(vertex => {
        drawVertex(vertex, context, tool, mousePos);
    });
}

function drawVertex(
    vertex: Vertex, 
    context: CanvasRenderingContext2D,
    tool: Tool,
    mousePos?: Pair
) {
    context.beginPath();

    if (mousePos && vertex.getDistance(mousePos) <= Vertex.hoverRadius) {
        context.fillStyle = 
            tool === "mountain" ? "red" :
            tool === "valley" ? "blue" :
            "gray"
        context.arc(vertex.x, vertex.y, Vertex.hoverRadius, 0, Math.PI * 2);
    } else {
        context.fillStyle = "black";
        context.arc(vertex.x, vertex.y, 5, 0, Math.PI * 2);
    }

    context.fill();
    context.closePath();
}

function drawCrease(crease: Crease, context: CanvasRenderingContext2D) {
    const p1 = crease.vertex1;
    const p2 = crease.vertex2;
    
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();
    context.closePath();
}