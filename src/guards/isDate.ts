import isNaN from './isNaN';
import { isType } from '../_utils';

/**
 * Check if value is a valid JS date
 *
 * @example
 * isDate(new Date()); // -> true
 * isDate(new Date('01.02.1971')); // -> true
 * isDate(new Date('invalid date')); // -> false
 */
export default function isDate(value: unknown): value is Date {
    return !!value && isType(value, 'Date') && !isNaN(Number(value));
}
