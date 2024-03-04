/**
 * Check if value is a NaN.
 *
 * This method is based on Number.isNaN.
 * Is not the same as global isNaN which returns true for undefined and other non-number values
 *
 * @example
 * isNaN(NaN); // -> true
 * isNaN(42 / 'string'); // -> true
 * isNaN(1); // -> false
 * isNaN(''); // -> false
 * isNaN(null); // -> false
 * isNaN(undefined); // -> false
 */
export default function isNaN(value: unknown): value is number {
    return Number.isNaN(value);
}
