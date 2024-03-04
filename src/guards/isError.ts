import { isType } from '../_utils';

/**
 * Check if value a JS error
 *
 * @example
 * isError(new Error('')); // -> true
 * isError(new CustomError()); // -> true
 * isError(''); // -> false
 */
export default function isError(value: unknown): value is Error {
    return isType(value, 'Error') && value instanceof Error;
}
