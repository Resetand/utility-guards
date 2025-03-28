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
export default function isIterable<T>(value: T | Iterable<unknown>): value is Iterable<unknown> {
    const o = Object(value);
    return Symbol.iterator in o && typeof o[Symbol.iterator] === 'function';
}
