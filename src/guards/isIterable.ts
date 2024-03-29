/**
 * Check if value is iterable (arrays, strings, maps, sets, etc.)
 *
 * @example
 * isIterable([]); // -> true
 * isIterable(''); // -> true
 * isIterable(new Set()); // -> true
 * isIterable(new Map()); // -> true
 *
 * isIterable(new WeakSet()); // -> false
 * isIterable(new WeakMap()); // -> false
 * isIterable({}); // -> false
 * isIterable(null); // -> false
 */
export default function isIterable(value: unknown): value is Iterable<unknown> {
    return Symbol.iterator in Object(value);
}
