import Crease from "@/origami/Crease";
import OrigamiSet from "@/origami/OrigamiSet";
import Pair from "@/origami/Pair";
import Vertex from "@/origami/Vertex";
import { useEffect, useRef } from "react";

type RenderData = {
    vertexes: OrigamiSet<Vertex>,
    creases: OrigamiSet<Crease>
    mousePos?: Pair,
    tool: Tool,
    selectedVertex?: Vertex
}

export function useRender(data: RenderData) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { vertexes, creases, mousePos, tool, selectedVertex } = data;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas && canvas.getContext("2d");
        if (context) render(data, canvas, context);
    }, [vertexes.toString(), creases, mousePos, tool, selectedVertex]);

    return canvasRef;
}

function render(
    data: RenderData, 
    canvas: HTMLCanvasElement, 
    context: CanvasRenderingContext2D
) {
    const { vertexes, creases, mousePos, tool, selectedVertex } = data;
    context.clearRect(0, 0, canvas.width, canvas.height);

    creases.forEach(crease => {
        drawCrease(crease, context);
    });

    vertexes.forEach(vertex => {
        drawVertex(vertex, context, tool, mousePos, selectedVertex);
    });
}

function drawVertex(
    vertex: Vertex, 
    context: CanvasRenderingContext2D,
    tool: Tool,
    mousePos?: Pair,
    selectedVertex?: Vertex
) {
    context.beginPath();
    if (selectedVertex && selectedVertex.equals(vertex)) {
        context.fillStyle = 
            tool === "mountain" ? "red" :
            tool === "valley" ? "blue" :
            "gray"
        context.arc(vertex.x, vertex.y, 5, 0, Math.PI * 2);
    } else if (mousePos && vertex.getDistance(mousePos) <= Vertex.hoverRadius) {
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

    context.strokeStyle = 
        crease.type === "mountain" ? "red" :
        crease.type === "valley" ? "blue" :
        "gray"

    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();
    context.closePath();
}