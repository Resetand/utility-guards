import $some from '../some';
import isNull from './isNull';
import isUndefined from './isUndefined';

const isNilImpl = $some(isNull, isUndefined);

/**
 * Check if value is a null or undefined
 *
 * @example
 * isNil(null); // -> true
 * isNil(undefined); // -> true
 * isNil(0); // -> false
 * isNil(''); // -> false
 */
export default function isNil(value: unknown): value is null | undefined {
    return isNilImpl(value);
}
