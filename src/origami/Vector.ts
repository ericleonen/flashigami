import Pair from "./Pair";
import Vertex from "./Vertex";

/**
 * 2D vector representation that extends Pair. Able to perform basic vector operations and
 * mutations
 */
export default class Vector extends Pair {
    magnitude: number;

    /**
     * Accepts two params (param1 and param2) that both must be either numbers or Vertexes. If
     * given numbers, initializes a vector as <param1, param2>. If given Vertexes initializes a
     * vector where param1 is the tail and param2 is the head. Throws an Error if the parameters
     * do not share the same type
     */
    constructor(param1: number | Vertex, param2: number | Vertex) {
        if (typeof param1 !== typeof param2) {
            throw new Error("parameters must be the same type")
        } else if (typeof param1 === "number") {
            super(param1, param2 as number);
        } else {
            param1 = param1 as Vertex;
            param2 = param2 as Vertex;

            super(param2.x - param1.x, param2.y - param1.y);
        }

        this.magnitude = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    /**
     * Returns a new Vector that is a copy of this one
     */
    getCopy(): Vector {
        return super.getCopy() as Vector;
    }

    /**
     * Mutates this vector into an orthogonal vector. Returns this vector
     */
    asOrthogonal(): Vector {
        this.x, this.y = -this.y, this.x;

        return this;
    }

    /**
     * Return a new Vector that is orthogonal to this one
     */
    getOrthogonal(): Vector {
        const copy = this.getCopy();
        return copy.asOrthogonal();
    }

    /**
     * Accepts an other Vector. If other is parallel to this vector, returns true, otherwise false
     */
    isParallelTo(other: Vector): boolean {
        return this.x * other.y - this.y * other.x === 0;
    }
}