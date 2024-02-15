import Crease from "./Crease";
import OrigamiSet from "./OrigamiSet";
import Pair from "./Pair";

/**
 * Representation of a vertex on a paper that extends Pair. Able to perform operations with
 * connected creases and other vertexes
 */
export default class Vertex extends Pair {
    static hoverRadius = 10;
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

    /**
     * Accepts creases and adds all of them to this vertex
     */
    addCrease(...creases: Crease[]) {
        creases.forEach(crease => {
            this.creases.add(crease);
        });
    }

    /**
     * Accepts creases and deletes all of them from this vertex
     */
    deleteCrease(...creases: Crease[]) {
        creases.forEach(crease => {
            this.creases.delete(crease);
        });
    }

    /**
     * Returns true if Maekawa's theorem is satisfied by this vertex
     */
    checkMaekawa() {
        let mountains = 0;
        let valleys = 0;

        this.creases.forEach(crease => {
            if (crease.type === "mountain") {
                mountains++;
            } else if (crease.type === "valley") {
                valleys++;
            }
        });

        return mountains + valleys === 0
            || Math.abs(mountains - valleys) === 2;
    }

    /**
     * Returns true if Kawasaki's theorem is satisfied by this vertex
     */
    checkKawasaki() {
        const angles = this.creases
            .toList()
            .filter(crease => !!crease.type)
            .map(crease => crease.getAngle(this))
            .sort()

        if (angles.length === 0) return true;

        if (angles.length % 2 !== 0) return false;

        let angleSum = 0;
        for (let i = 0; i < angles.length - 1; i += 2) {
            angleSum = angles[i + 1]! - angles[i]!;
        }

        return angleSum === Math.PI;
    }
}