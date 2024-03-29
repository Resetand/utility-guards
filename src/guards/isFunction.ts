import isClass from './isClass';
import type { AnyFunction } from '../_types';
import { isType } from '../_utils';

/**
 * Check if value is an any function
 *
 * @example
 * isFunction(() => {}); // -> true
 * isFunction(function() {}); // -> true
 * isFunction(new Function()); // -> true
 * isFunction({}); // -> false
 *
 * isFunction(class {}); // -> false (although class is a constructor function in JS, it's expected behavior)
 */
export default function isFunction(value: unknown): value is AnyFunction {
    return isType(value, 'Function') && !isClass(value);
}
