import { isType } from '../_utils';
/**
 * Check if value a number literal or number created by `Number` constructor and not `NaN`
 *
 *
 * @example
 * isNumber(1); // -> true
 * isNumber(NaN); // -> false, see below
 * isNumber(1.1); // -> true
 * isNumber(Number(1)); // -> true
 * isNumber(new Number(1)); // -> true
 * isNumber(''); // -> false
 *
 * @note
 * Although `NaN` is considered a number in JS `isNumber` will return `false` for `NaN`.
 * `NaN` is a special literal and in most cases you expect a number to be a valid number.
 * If you want to check if value is number (including `NaN`) use `isNumber(value) || isNaN(value)` instead.
 */
export default function isNumber(value: unknown): value is number {
    return isType(value, 'Number') && !Number.isNaN(value);
}
