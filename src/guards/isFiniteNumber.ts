/**
 * Check if value a finite number, which mean a valid number that is not NaN, Infinity or -Infinity.
 *
 * @example
 * isFiniteNumber(1); // -> true
 * isFiniteNumber(Number(1)); // -> true
 * isFiniteNumber(NaN); // -> false
 * isFiniteNumber(Infinity); // -> false
 * isFiniteNumber(-Infinity); // -> false
 * isFiniteNumber('42'); // -> false
 *
 */
export default function isFiniteNumber(value: number): boolean;
export default function isFiniteNumber(value: unknown): value is number;
export default function isFiniteNumber(value: unknown): value is number {
    return typeof value === 'number' && isFinite(value);
}
