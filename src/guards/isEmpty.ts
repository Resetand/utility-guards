import type { NullOrUndefined } from '../types';

import isPlainObject from './isPlainObject';
import isArray from './isArray';
import isString from './isString';
import isNil from './isNil';
import isInstanceOf from './isInstanceOf';

type ExtractEmpty<T> = Extract<T, NullOrUndefined | '' | { [P in keyof T]: never } | never>;

/**
 * Check if value is empty:
 *
 * @example
 * is.Empty({}); // -> true
 * is.Empty([]); // -> true
 * is.Empty(new Set()); // -> true
 * is.Empty(new Map()); // -> true
 * is.Empty(''); // -> true
 * is.Empty(null); // -> true
 * is.Empty(undefined); // -> true
 *
 * is.Empty(0); // -> false
 * is.Empty(false); // -> false
 * is.Empty({ a: 1 }); // -> false
 * is.Empty([1]); // -> false
 * is.Empty(new Set([1])); // -> false
 * is.Empty(new Map([['a', 1]])); // -> false
 * is.Empty('a'); // -> false
 *
 */
export default function isEmpty<T>(value: T): value is ExtractEmpty<T> {
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
