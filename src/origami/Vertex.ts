import Crease from "./Crease";
import OrigamiSet from "./OrigamiSet";
import Pair from "./Pair";

/**
 * Representation of a vertex on a paper that extends Pair. Able to perform operations with
 * connected creases and other vertexes
 */
export default class Vertex extends Pair {
    creases: OrigamiSet<Crease>;

    /**
     * Accepts numbers x and y and an optional OrigamiSet of Crease creases. Initializes a vertex at
     * (x, y). Initializes creases as the given OrigamiSet of Crease creases if given, otherwise as 
     * an empty set
     */
    constructor(x: number, y: number, creases?: OrigamiSet<Crease>) {
        super(x, y);
        this.creases = creases ? creases : new OrigamiSet();
    }

    /**
     * Returns the unique String representation of this vertex
     */
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}