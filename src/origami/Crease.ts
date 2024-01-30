import Vector from "./Vector";
import Vertex from "./Vertex";

type CreaseType = "mountain" | "valley" | undefined

export default class Crease {
    vertex1: Vertex;
    vertex2: Vertex;
    vector: Vector
    type: CreaseType;

    constructor(vertex1: Vertex, vertex2: Vertex, type?: CreaseType) {
        this.vertex1 = vertex1;
        this.vertex2 = vertex2;
        this.vector = new Vector(vertex1, vertex2);
        this.type = type;
    }

    setType(type: CreaseType) {
        this.type = type;
    }

    getOtherVertex(vertex: Vertex) {
        if (this.vertex1 !== vertex && this.vertex2 !== vertex) {
            throw new Error("given vertex is not part of crease");
        } else if (this.vertex1 == vertex) {
            return this.vertex2;
        } else {
            return this.vertex1;
        }
    }

    split(splitVertex: Vertex) {
        if (!this.containsVertex(splitVertex)) {
            throw new Error("given vertex is not part of crease")
        } else if (this.vertex1.equals(splitVertex) || this.vertex2.equals(splitVertex)) {
            return;
        }

        this.vertex1.creases.delete(this);
        this.vertex2.creases.delete(this);

        const newCrease1 = new Crease(this.vertex1, splitVertex);
        const newCrease2 = new Crease(this.vertex2, splitVertex);

        this.vertex1.creases.add(newCrease1);
        splitVertex.creases.add(newCrease1);
        this.vertex2.creases.add(newCrease2);
        splitVertex.creases.add(newCrease2);
    }

    containsVertex(vertex: Vertex) {
        return (
            this.vertex1.getDistance(vertex) +
            this.vertex2.getDistance(vertex) 
        ) === this.vector.magnitude;
    }
}