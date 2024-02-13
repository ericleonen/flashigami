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
     * Returns a copy of this set
     */
    getCopy() {
        return new OrigamiSet<T>(Object.values(this.items));
    }

    /**
     * Accepts items and adds them to this set
     */
    add(...items: T[]) {
        items.forEach(item => this.items[item.toString()] = item);
    }

    /**
     * Accepts items and deletes them from this set
     */
    delete(...items: T[]) {
        items.forEach(item => delete this.items[item.toString()]);
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
     * Accepts a callback function. Returns the first item in the set that satisfies the callback
     * condition (returns true). If no item works, returns undefined
     */
    find(callback: (value: T) => any) {
        for (const item of Object.values(this.items)) {
            if (callback(item)) return item;
        }
    }

    /**
     * Returns the size of this set
     */
    size() {
        return Object.keys(this.items).length;
    }

    /**
     * Returns a list representation of this set
     */
    toList() {
        return Object.values(this.items);
    }
}