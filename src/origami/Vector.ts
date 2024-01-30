import Pair from "./Pair";
import Vertex from "./Vertex";

export default class Vector extends Pair {
    magnitude: number;

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

    getCopy(): Vector {
        return super.getCopy() as Vector;
    }

    asOrthogonal(): Vector {
        this.x, this.y = -this.y, this.x;

        return this;
    }

    getOrthogonal(): Vector {
        const copy = this.getCopy();
        return copy.asOrthogonal();
    }

    isParallelTo(other: Vector): boolean {
        return this.x * other.y - this.y * other.x === 0;
    }
}