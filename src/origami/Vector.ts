import Pair from "./Pair";

export default class Vector extends Pair {
    constructor(x: number, y: number) {
        super(x, y);
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
}