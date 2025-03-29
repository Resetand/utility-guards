/**
 * Check if value a number.
 *
 * @example
 * isNumber(1); // -> true
 * isNumber(1.1); // -> true
 * isNumber(Number(1)); // -> true
 * isNumber(NaN); // -> true
 * isNumber(Infinity); // -> true
 * isNumber(-Infinity); // -> true
 * isNumber(''); // -> false
 */
export default function isNumber(value: unknown): value is number {
    return typeof value === 'number';
}
