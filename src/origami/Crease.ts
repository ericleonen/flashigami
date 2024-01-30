import Vertex from "./Vertex";

type CreaseType = "mountain" | "valley" | undefined

export default class Crease {
    vertex1: Vertex;
    vertex2: Vertex;
    type: CreaseType;

    constructor(vertex1: Vertex, vertex2: Vertex, type?: CreaseType) {
        this.vertex1 = vertex1;
        this.vertex2 = vertex2;
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
}