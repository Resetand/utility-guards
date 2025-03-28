/**
 * Check if value is a valid JS Date object.
 *
 * @example
 * isValidDate(new Date()); // -> true
 * isValidDate(new Date('01.02.1971')); // -> true
 * isValidDate(new Date('invalid date')); // -> false, use `isDate` for more loose check
 * isValidDate('01.02.1971'); // -> false
 */
export default function isValidDate(value: Date): boolean;
export default function isValidDate(value: unknown): value is Date;
export default function isValidDate(value: unknown): value is Date {
    return value instanceof Date && !isNaN(value.getTime());
}
