export default class Pair {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getCopy(): Pair {
        return new Pair(this.x, this.y);
    }
}