/**
 * Check if value a boolean
 *
 * @example
 * isBoolean(true); // -> true
 * isBoolean(false); // -> true
 * isBoolean(1); // -> false
 */
export default function isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean';
}
