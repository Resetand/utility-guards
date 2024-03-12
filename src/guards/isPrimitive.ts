import isBigInt from './isBigInt';
import isBoolean from './isBoolean';
import isNumber from './isNumber';
import isString from './isString';
import isSymbol from './isSymbol';
import isNil from './isNil';
import $some from '../some';

type Primitive = string | number | boolean | symbol | bigint | null | undefined;

const isPrimitiveImpl = $some(isNil, isBoolean, isString, isNumber, isBigInt, isSymbol);

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
export default function isPrimitive(value: unknown): value is Primitive {
    return isPrimitiveImpl(value);
}
