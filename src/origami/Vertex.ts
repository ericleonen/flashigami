import Crease from "./Crease";
import Pair from "./Pair";

export default class Vertex extends Pair {
    creases: Set<Crease>;

    constructor(x: number, y: number, creases?: Set<Crease>) {
        super(x, y);

        this.creases = creases ? creases : new Set();
    }
}