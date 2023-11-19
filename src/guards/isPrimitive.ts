import isBigInt from './isBigInt';
import isBoolean from './isBoolean';
import isNumber from './isNumber';
import isString from './isString';
import isSymbol from './isSymbol';
import isNil from './isNil';
import $some from './$some';

/**
 * Check if value is a primitive
 * @see `AnyPrimitive`
 *
 * @example
 * isPrimitive(1); // -> true
 * isPrimitive(''); // -> true
 * isPrimitive(true); // -> true
 * isPrimitive(Symbol('')); // -> true
 * isPrimitive(BigInt(1)); // -> true
 * isPrimitive(null); // -> true
 * isPrimitive(undefined); // -> true
 *
 * isPrimitive({}); // -> false
 * isPrimitive([]); // -> false
 */
const isPrimitive = $some(isNil, isBoolean, isString, isNumber, isBigInt, isSymbol);

export default isPrimitive;
