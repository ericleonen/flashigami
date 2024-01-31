import Crease from "./Crease";
import Pair from "./Pair";

/**
 * Representation of a vertex on a paper that extends Pair. Able to perform operations with
 * connected creases and other vertexes
 */
export default class Vertex extends Pair {
    creases: Set<Crease>;

    /**
     * Accepts numbers x and y and an optional Set of Crease creases. Initializes a vertex at
     * (x, y). Initializes creases as the given Set of Crease creases if given, otherwise as an
     * empty set
     */
    constructor(x: number, y: number, creases?: Set<Crease>) {
        super(x, y);
        this.creases = creases ? creases : new Set();
    }

    /**
     * Returns the unique key of this vertex
     */
    getKey() {
        return `(${this.x}, ${this.y})`;
    }
}