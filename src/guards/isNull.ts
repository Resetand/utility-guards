import { isType } from '../_utils';

/**
 * Check if value is a null
 *
 * @example
 * isNil(null); // -> true
 * isNil(undefined); // -> false
 * isNil(''); // -> false
 */
export default function isNull(value: unknown): value is null {
    return isType(value, 'Null');
}
