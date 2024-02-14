import Pair from "./Pair";
import Vector from "./Vector";
import Vertex from "./Vertex";

/**
 * Represents the types of folds. Mountain, valley, and neutral (represented as undefined)
 */
type CreaseType = "mountain" | "valley" | undefined

/**
 * Represents a crease in an origami paper. Able to perform crease operations
 */
export default class Crease {
    vertex1: Vertex;
    vertex2: Vertex;
    vector: Vector
    type: CreaseType;
    static hoverRadius = 8;

    /**
     * Accepts two Vertexes, vertex1 and vertex2, and an optional CreaseType type. Initializes
     * a crease between the two vertexes with the given type (undefined if no type given). If
     * either vertexes are null, throws an Error
     */
    constructor(vertex1: Vertex, vertex2: Vertex, type?: CreaseType) {
        if (vertex1 === null || vertex2 === null) {
            throw new Error("a vertex is null");
        } else if (vertex1.equals(vertex2)) {
            throw new Error("vertexes are the same")
        }

        if (Pair.compare(vertex1, vertex2) > 0) {
            [vertex1, vertex2] = [vertex2, vertex1];
        }

        this.vertex1 = vertex1;
        this.vertex2 = vertex2;
        this.vector = new Vector(vertex1, vertex2);
        this.type = type;

        this.vertex1.addCrease(this);
        this.vertex2.addCrease(this);
    }

    /**
     * Accepts a CreaseType type. Changes the type to the given type
     */
    setType(type: CreaseType) {
        this.type = type;
    }

    /**
     * Accepts a Vertex vertex that is one of the vertexes of this crease. Returns the other vertex
     * of this crease. If the given vertex is not one of this crease's vertexes, throws an Error
     */
    getOtherVertex(vertex: Vertex) {
        if (this.vertex1 !== vertex && this.vertex2 !== vertex) {
            throw new Error("given vertex is not part of crease");
        } else if (this.vertex1 == vertex) {
            return this.vertex2;
        } else {
            return this.vertex1;
        }
    }

    /**
     * Accepts a Vertex splitVertex that is on the crease. Does nothing if splitVertex is one of
     * this crease's vertexes. Splits this crease into two otherwise. If splitVertex isn't on the
     * crease, throws an error
     */
    split(splitVertex: Vertex) {
        if (!this.containsVertex(splitVertex)) {
            throw new Error("given vertex is not part of crease")
        } else if (this.vertex1.equals(splitVertex) || this.vertex2.equals(splitVertex)) {
            return;
        }

        this.vertex1.deleteCrease(this);
        this.vertex2.deleteCrease(this);

        const newCrease1 = new Crease(this.vertex1, splitVertex, this.type);
        const newCrease2 = new Crease(this.vertex2, splitVertex, this.type);

        return [newCrease1, newCrease2];
    }

    /**
     * Accepts two Creases crease1 and crease2. Finds the unique intersection of the two creases
     * and returns the Vertex. If no unique intersection exists, returns undefined
     */
    static getIntersection(crease1: Crease, crease2: Crease) {
        const p = crease1.vertex1;
        const q = crease2.vertex1;
        const u = crease1.vector;
        const v = crease2.vector;

        const det = v.x * u.y - v.y * u.x;

        if (det === 0) {
            // lines are parallel
            return undefined;
        }

        const s = (u.x * (q.y - p.y) - u.y * (q.x - p.x)) / det;
        const t = u.x === 0 ?
            (q.y + v.y * s - p.y) / u.y :
            (q.x + v.x * s - p.x) / u.x

        if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
            return new Vertex(q.x + v.x * s, q.y + v.y * s);
        }
    }

    /**
     * Accepts a Vertex vertex. Returns true if the given vertex is on this crease, false otherwise
     */
    containsVertex(vertex: Vertex) {
        return (
            this.vertex1.getDistance(vertex) +
            this.vertex2.getDistance(vertex) 
        ) === this.vector.magnitude;
    }

    /**
     * Returns the unique String representation of this crease
     */
    toString() {
        return `[${this.vertex1.toString()}, ${this.vertex2.toString()}]`;
    }

    /**
     * Returns the distance from p, a Pair. If p outside of the crease, returns undefined
     */
    getDistance(p: Pair) {
        const otherVector = new Vector(p.x - this.vertex1.x, p.y - this.vertex1.y);

        if (otherVector.dot(this.vector) < 0 || otherVector.magnitude > this.vector.magnitude) {
            return undefined;
        }

        const proj = this.vector.getProjection(otherVector);

        return proj.getDifference(otherVector).magnitude;
    }

    /**
     * Accepts a Vertex vertex. Returns the creases angle relative to that vertex. Throws an Error
     * if the given vertex is not on an endpoint on this crease
     */
    getAngle(vertex: Vertex) {
        if (vertex.equals(this.vertex1)) {
            return this.vector.getAngle();
        } else if (vertex.equals(this.vertex2)) {
            return this.vector.getScaled(-1).getAngle();
        } else {
            throw new Error("given vertex not on crease");
        }
    }

    /**
     * Accepts Creases crease1 and crease2. Returns the difference in angles. If that is 0, returns
     * the difference in magnitudes. Throws an Error if any one of the creases have the 0 vector
     */
    static compare(crease1: Crease, crease2: Crease) {
        const angle1 = crease1.vector.getAngle();
        const angle2 = crease2.vector.getAngle();

        if (angle1 === undefined || angle2 === undefined) {
            throw new Error("given crease is 0");
        }

        return (angle1 === angle2) ? 
            crease1.vector.magnitude - crease2.vector.magnitude : angle1 - angle2;
    }
}