import { TypeTag } from '../types';
import { getTypeTag } from '../utils';

/**
 * Check if value a boolean
 *
 * @example
 * isBoolean(true); // -> true
 * isBoolean(false); // -> true
 * isBoolean(1); // -> false
 */
export default function isBoolean<T>(value: T | boolean): value is boolean {
    return getTypeTag(value) === TypeTag.BOOLEAN;
}
