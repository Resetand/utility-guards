import { TypeTag } from '../types';
import { getTypeTag } from '../utils';

import isNaN from './isNaN';

/**
 * Check if value is a valid JS date
 *
 * @example
 * isDate(new Date()); // -> true
 * isDate(new Date('01.02.1971')); // -> true
 * isDate(new Date('invalid date')); // -> false
 */
export default function isDate<T>(value: T | Date): value is Date {
    return !!value && getTypeTag(value) === TypeTag.DATE && !isNaN(Number(value));
}
