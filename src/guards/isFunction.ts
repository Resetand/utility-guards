import isClass from './isClass';
import type { AnyFunction } from '../_types';

/**
 * Check if value is an any function
 *
 * @example
 * isFunction(() => {}); // -> true
 * isFunction(function() {}); // -> true
 * isFunction(async function() {}); // -> true
 * isFunction(async () => {}); // -> true
 * isFunction(new Function()); // -> true
 *
 * isFunction(class {}); // -> false (although class is a constructor function in JS, it's expected behavior)
 */
export default function isFunction(value: unknown): value is AnyFunction {
    return value instanceof Function && !isClass(value);
}
