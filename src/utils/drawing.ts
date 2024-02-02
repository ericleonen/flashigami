import Crease from "@/origami/Crease";
import OrigamiSet from "@/origami/OrigamiSet";
import Vertex from "@/origami/Vertex";
import { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS, useEffect, useRef } from "react";

type RenderData = {
    vertexes: OrigamiSet<Vertex>,
    creases: OrigamiSet<Crease>
}

export function useRender(
    data: RenderData
) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { vertexes, creases } = data;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas && canvas.getContext("2d");
        if (context) render(data, canvas, context);
    }, [vertexes.toString(), creases.toString()]);

    return canvasRef;
}

function render(
    data: RenderData, 
    canvas: HTMLCanvasElement, 
    context: CanvasRenderingContext2D
) {
    const { vertexes, creases } = data;
    context.clearRect(0, 0, canvas.width, canvas.height);

    creases.forEach(crease => {
        drawCrease(crease, context);
    });

    vertexes.forEach(vertex => {
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