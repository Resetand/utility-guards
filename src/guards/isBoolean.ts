import { isType } from '../_utils';

/**
 * Check if value a boolean
 *
 * @example
 * isBoolean(true); // -> true
 * isBoolean(false); // -> true
 * isBoolean(1); // -> false
 */
export default function isBoolean<T>(value: T | boolean): value is boolean {
    return isType(value, 'Boolean');
}
