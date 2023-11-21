import type { NullOrUndefined } from '../_types';

import isPlainObject from './isPlainObject';
import isArray from './isArray';
import isString from './isString';
import isNil from './isNil';
import isInstanceOf from './isInstanceOf';

// type ExtractEmpty<T> = Extract<T, NullOrUndefined | '' | [] | { [P in keyof T]: never } | never>;

type ExtractEmpty<T> = T extends unknown[]
    ? []
    : T extends string
    ? ''
    : T extends { [P in keyof T]: never }
    ? {}
    : T extends NullOrUndefined
    ? NullOrUndefined
    : never;

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
export default function isEmpty<T>(value: T): value is T & ExtractEmpty<T> {
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
