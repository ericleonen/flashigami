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
        return new Vector(this.x, this.y);
    }

    /**
     * Mutates this vector into an orthogonal vector. Returns this vector
     */
    orthogonal(): Vector {
        this.x, this.y = -this.y, this.x;

        return this;
    }

    /**
     * Return a new Vector that is orthogonal to this one
     */
    getOrthogonal(): Vector {
        const copy = this.getCopy();
        return copy.orthogonal();
    }

    /**
     * Accepts an other Vector. If other is parallel to this vector, returns true, otherwise false
     */
    isParallelTo(other: Vector): boolean {
        return this.x * other.y - this.y * other.x === 0;
    }

    /**
     * Accepts an other Vector. Returns the dot product of this and the other vector
     */
    dot(other: Vector) {
        return this.x * other.x + this.y * other.y;
    }

    /**
     * Accepts a number c. Scales this vector by a factor of c. Returns this vector
     */
    scale(c: number) {
        this.x *= c;
        this.y *= c;
        this.magnitude *= c;

        return this;
    }

    /**
     * Accepts a number c. Returns a new vector scaled by a factor of c
     */
    getScaled(c: number): Vector {
        const copy = this.getCopy();
        return copy.scale(c);
    }

    /**
     * Accepts an other Vector. Returns the projection of this other vector onto this vector
     */
    getProjection(other: Vector) {
        const comp = this.dot(other) / this.magnitude;
        return this.getScaled(comp / this.magnitude);
    }

    /**
     * Accepts an other Vector. Returns a new vector with the value of this - other
     */
    getDifference(other: Vector) {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    /**
     * Returns this vector's angle in radians from 0 to 2 * PI. Returns undefined if given the 0
     * vector
     */
    getAngle() {
        if (this.x > 0 && this.y === 0) {
            // positive x-axis
            return 0;
        } else if (this.x > 0 && this.y < 0) {
            // first quadrant
            return Math.atan(-this.y / this.x);
        } else if (this.x === 0 && this.y < 0) {
            // positive y-axis
            return Math.PI / 2;
        } else if (this.x < 0 && this.y < 0) {
            // second quadrant
            return Math.PI + Math.atan(-this.y / this.x);
        } else if (this.x < 0 && this.y === 0) {
            // negative x-axis
            return Math.PI;
        } else if (this.x < 0 && this.y > 0) {
            // third quadrant
            return Math.PI + Math.atan(-this.y / this.x);
        } else if (this.x === 0 && this.y > 0) {
            // negative y-axis
            return 3 / 2 * Math.PI;
        } else if (this.x > 0 && this.y > 0) {
            // fourth quadrant
            return 2 * Math.PI + Math.atan(-this.y / this.x);
        } else {
            // origin
            return undefined;
        }
    }

    /**
     * Returns a String representation of this vector
     */
    toString() {
        return `<${this.x}, ${this.y}>`;
    }
}