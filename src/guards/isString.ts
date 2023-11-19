import { isType } from '../_utils';

/**
 * Check if value a string literal or string created by `String` constructor
 *
 * @example
 * isString(''); // -> true
 * isString(String('')); // -> true
 * isString(new String('')); // -> true
 * isString(1); // -> false
 */
export default function isString<T>(value: T | string): value is string {
    return isType(value, 'String');
}
