/**
 * Check if value is instance of Error.
 *
 * @example
 * isError(new Error('')); // -> true
 * isError(new CustomError()); // -> true
 * isError(''); // -> false
 */
export default function isError(value: unknown): value is Error {
    return value instanceof Error;
}
