import { TypeTag } from '../types';
import { getTypeTag } from '../utils';

/**
 * Check if value a number literal or number created by `Number` constructor
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
 * Although `NaN` is considered a number in JS, it's not a valid number
 * in most cases you want to check if value is a valid number, so `isNumber(NaN)` returns `false`
 */
export default function isNumber<T>(value: T | number): value is number {
    return getTypeTag(value) === TypeTag.NUMBER && !isNaN(Number(value));
}
