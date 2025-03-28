/**
 * Check if value a bigint literal or bigint created by `BigInt` constructor.
 *
 * @example
 * isBigInt(1n); // -> true
 * isBigInt(BigInt(1)); // -> true
 * isBigInt(new BigInt(1)); // -> true
 * isBigInt(''); // -> false
 * isBigInt(1); // -> false
 */
export default function isBigInt(value: unknown): value is bigint {
    return typeof value === 'bigint';
}
