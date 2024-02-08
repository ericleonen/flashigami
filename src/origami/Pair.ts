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

    /**
     * Accepts two Pairs p1 and p2. Returns a positive number if p1 is is "greater" than p2, a
     * negative number otherwise
     */
    static compare(p1: Pair, p2: Pair) {
        if (p1 === null || p2 === null) {
            throw new Error("argument(s) are null");
        }

        if (p1.x === p2.x) {
            return p1.y - p2.y;
        } else {
            return p1.x - p2.x;
        }
    }

    /**
     * Accepts numbers x and y. Returns a pair String representation of (x, y)
     */
    static toString(x: number, y: number) {
        return `(${x}, ${y})`;
    }
}