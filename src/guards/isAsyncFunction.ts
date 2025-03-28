import type { AnyFunction } from '../_types';
import { isType } from '../_utils';

/**
 * Check if value is an any function
 *
 * @example
 * isFunction(async () => {}); // -> true
 * isFunction(async function() {}); // -> true
 * isFunction(() => {}); // -> false
 * isFunction(function() {}); // -> false
 */
export default function isAsyncFunction<T>(value: T | AnyFunction): value is AnyFunction {
    return isType(value, 'AsyncFunction');
}
