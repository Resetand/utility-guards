import type { AnyFunction } from '../_types';
import { TypeTag } from '../_types';
import { getTypeTag } from '../_utils';

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
export default function isFunction<T>(value: T | AnyFunction): value is AnyFunction {
    return getTypeTag(value) === TypeTag.FUNCTION && !/^class\s/.test(Function.prototype.toString.call(value));
}
