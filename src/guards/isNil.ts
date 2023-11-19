import $some from '../$some';
import isNull from './isNull';
import isUndefined from './isUndefined';

/**
 * Check if value is a null or undefined
 *
 * @example
 * isNil(null); // -> true
 * isNil(undefined); // -> true
 * isNil(0); // -> false
 * isNil(''); // -> false
 */
const isNil = $some(isNull, isUndefined);

export default isNil;
