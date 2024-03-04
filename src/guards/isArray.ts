/**
 * Check if value is array
 *
 * @example
 * isArray([]); // -> true
 * isArray(new Array()); // -> true
 * isArray({}); // -> false
 */
export default function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}
