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
        if (items) items.forEach(this.add);
    }

    /**
     * Accepts an item. Adds this item to this set if it wasn't there, otherwise does nothing
     */
    add(item: T) {
        this.items[item.getKey()] = item;
    }

    /**
     * Accepts an item. Deletes this item from this set if it was there, otherwise does nothing
     */
    delete(item: T) {
        delete this.items[item.getKey()];
    }

    /**
     * Accepts an item. Returns true if this set contains the item
     */
    has(item: T) {
        return this.items.hasOwnProperty(item.getKey());
    }

    /**
     * Returns true if this set is empty, otherwise, false
     */
    isEmpty() {
        return Object.keys(this.items).length === 0;
    }
}