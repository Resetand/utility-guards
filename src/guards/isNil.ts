import type { NullOrUndefined } from '../types';

/**
 * Check if value is a null or undefined
 *
 * @example
 * isNil(null); // -> true
 * isNil(undefined); // -> true
 * isNil(0); // -> false
 * isNil(''); // -> false
 */
export default function isNil<T>(value: T | NullOrUndefined): value is NullOrUndefined {
    return value === null || value === undefined;
}
