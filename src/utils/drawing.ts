import Crease from "@/origami/Crease";
import Vertex from "@/origami/Vertex";
import { useEffect } from "react";

type RenderData = {
    vertexes?: Set<Vertex>,
    creases?: Set<Crease>
}

export function useRender(
    data: RenderData,
    canvas: HTMLCanvasElement | null
) {
    const { vertexes, creases } = data;

    useEffect(() => {
        const context = canvas && canvas.getContext("2d");
        
        const canRender = !!(context && vertexes && creases);
        if (canRender) render(data, canvas, context);
    }, [/** add dependencies (probably strings) */]);
}

function render(
    data: RenderData, 
    canvas: HTMLCanvasElement, 
    context: CanvasRenderingContext2D
) {
    const { vertexes, creases } = data;
    context.clearRect(0, 0, canvas.width, canvas.height);

    creases!.forEach(crease => {
        drawCrease(crease, context);
    });

    vertexes!.forEach(vertex => {
        drawVertex(vertex, context);
    });
}

function drawVertex(vertex: Vertex, context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(vertex.x, vertex.y, 5, 0, Math.PI * 2);
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