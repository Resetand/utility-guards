/**
 * Check if value a string literal or string created by `String` constructor
 *
 * @example
 * isString(''); // -> true
 * isString(String('')); // -> true
 * isString(1); // -> false
 */
export default function isString(value: unknown): value is string {
    return typeof value === 'string';
}
