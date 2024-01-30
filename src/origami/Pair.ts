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

    getDistance(other: Pair) {
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
    }

    equals(other: Pair): boolean {
        return this.getDistance(other) === 0;
    }
}