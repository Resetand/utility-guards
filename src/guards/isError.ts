import { TypeTag } from '../_types';
import { getTypeTag } from '../_utils';

/**
 * Check if value a JS error
 *
 * @example
 * isError(new Error('')); // -> true
 * isError(new CustomError()); // -> true
 * isError(''); // -> false
 */
export default function isError<T>(value: T | Error): value is Error {
    return getTypeTag(value) === TypeTag.ERROR && value instanceof Error;
}
