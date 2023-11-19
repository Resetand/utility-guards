import { TypeTag } from '../types';
import { getTypeTag } from '../utils';

/**
 * Check if value a regular expression or created by `RegExp` constructor
 *
 * @example
 * isRegExp(/\w+/); // -> true
 * isRegExp(new RegExp('\\w+', 'g')); // -> true
 * isRegExp(''); // -> false
 */
export default function isRegExp<T>(value: T | RegExp): value is RegExp {
    return getTypeTag(value) === TypeTag.REGEXP;
}
