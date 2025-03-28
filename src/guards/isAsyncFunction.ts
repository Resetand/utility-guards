import type { AnyFunction, AnyAsyncFunction } from '../_types';
import { isType } from '../utils/_type-tag';

/**
 * Check if value is an any function
 *
 * @example
 * isFunction(async () => {}); // -> true
 * isFunction(async function() {}); // -> true
 * isFunction(() => {}); // -> false
 * isFunction(function() {}); // -> false
 */
export default function isAsyncFunction(value: AnyFunction): value is AnyAsyncFunction;
export default function isAsyncFunction(value: unknown): value is AnyAsyncFunction;
export default function isAsyncFunction(value: unknown): value is AnyAsyncFunction {
    return isType(value, 'AsyncFunction');
}
