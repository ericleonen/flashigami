/**
 * 2D point/coordinate/pair representation
 */
export default class Pair {
    x: number;
    y: number;

    /**
     * Accepts two numbers x and y. Initializes a Pair of (x, y)
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Returns a new Pair that is a copy of this one
     */
    getCopy(): Pair {
        return new Pair(this.x, this.y);
    }

    /**
     * Accepts an other Pair. Returns the Euclidean distance between this and the other Pair
     */
    getDistance(other: Pair) {
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
    }

    /**
     * Accepts an other Pair. Returns true if the two Pairs represent the same point, false
     * otherwise
     */
    equals(other: Pair): boolean {
        return this.getDistance(other) === 0;
    }
}