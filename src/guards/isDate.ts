/**
 * Check if value is a JS Date object.
 *
 * @example
 * isDate(new Date()); // -> true
 * isDate(new Date('01.02.1971')); // -> true
 * isDate(new Date('invalid date')); // -> true, see `isValidDate` for more strict check
 * isDate('01.02.1971'); // -> false
 */
export default function isDate(value: unknown): value is Date {
    return value instanceof Date;
}
