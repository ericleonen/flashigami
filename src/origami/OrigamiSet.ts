import Crease from "./Crease";
import Vertex from "./Vertex";

/**
 * Representation of a set of origami things (vertexes or creases) that guarentees that there are
 * no equivalent items
 */
export default class OrigamiSet<T extends Crease | Vertex> {
    items: { [key: string]: T };

    /**
     * Accepts an optional array of Vertexes or Creases. Initializes a new OrigamiSet with the given array
     */
    constructor(items?: T[]) {
        this.items = {};
        if (items) items.forEach(item => {
            this.items[item.toString()] = item;
        });
    }

    /**
     * Accepts an item. Adds this item to this set if it wasn't there, otherwise does nothing
     */
    add(item: T) {
        this.items[item.toString()] = item;
    }

    /** 
     * Accepts a list of items. Adds each item to the set
    */
    addAll(items: T[]) {
        items.forEach(item => this.add(item));
    }

    /**
     * Accepts an item. Deletes this item from this set if it was there, otherwise does nothing
     */
    delete(item: T) {
        delete this.items[item.toString()];
    }

    /**
     * Accepts a list of items. Deletes each item from the set
     */
    deleteAll(items: T[]) {
        items.forEach(item => this.delete(item));
    }
    /**
     * Accepts an item. Returns true if this set contains the item
     */
    has(item: T) {
        return this.items.hasOwnProperty(item.toString());
    }

    /**
     * Returns true if this set is empty, otherwise, false
     */
    isEmpty() {
        return Object.keys(this.items).length === 0;
    }

    /**
     * Accepts a callback function. For each item in this set, applies the callback function
     */
    forEach(callback: (value: T) => any) {
        Object.values(this.items).forEach(callback);
    }

    /**
     * Returns the unique String representation of this set
     */
    toString() {
        if (this.isEmpty()) {
            return "{}";
        }

        let result = "{";

        Object.keys(this.items)
            .toSorted()
            .forEach(key => result += key + ", ")

        return result.substring(0, result.length - 2) + "}";
    }

    /**
     * Returns the size of this set
     */
    size() {
        return Object.keys(this.items).length;
    }
}