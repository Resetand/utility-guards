import isPlainObject from './isPlainObject';
import isArray from './isArray';
import isString from './isString';
import isNil from './isNil';
import isInstanceOf from './isInstanceOf';

type EmptyValue = '' | null | undefined | [] | Record<PropertyKey, never> | Map<never, never> | Set<never>;

/**
 * Check if value is empty:
 *
 * @example
 * isEmpty({}); // -> true
 * isEmpty([]); // -> true
 * isEmpty(new Set()); // -> true
 * isEmpty(new Map()); // -> true
 * isEmpty(''); // -> true
 * isEmpty(null); // -> true
 * isEmpty(undefined); // -> true
 *
 * isEmpty(0); // -> false
 * isEmpty(false); // -> false
 * isEmpty({ a: 1 }); // -> false
 * isEmpty([1]); // -> false
 * isEmpty(new Set([1])); // -> false
 * isEmpty(new Map([['a', 1]])); // -> false
 * isEmpty('a'); // -> false
 *
 */
export default function isEmpty(value: unknown): value is EmptyValue {
    if (isPlainObject(value)) {
        return !Object.keys(value).length;
    }
    if (isArray(value)) {
        return !value.length;
    }
    if (isInstanceOf(value, Set) || isInstanceOf(value, Map)) {
        return !value.size;
    }
    if (isString(value)) {
        return value === '';
    }

    return isNil(value);
}
