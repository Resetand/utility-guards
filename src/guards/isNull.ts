import { isType } from '../_utils';

/**
 * Check if value is a null
 *
 * @example
 * isNil(null); // -> true
 * isNil(undefined); // -> false
 * isNil(''); // -> false
 */
export default function isNull<T>(value: T | null): value is null {
    return isType(value, 'Null');
}
