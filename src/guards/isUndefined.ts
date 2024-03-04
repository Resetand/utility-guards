import { isType } from '../_utils';

/**
 * Check if value is a undefined
 *
 * @example
 * isNil(undefined); // -> true
 * isNil(null); // -> false
 * isNil(''); // -> false
 */
export default function isUndefined(value: unknown): value is undefined {
    return isType(value, 'Undefined');
}
