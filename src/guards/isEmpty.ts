import isPlainObject from './isPlainObject';
import isArray from './isArray';
import isString from './isString';
import isNil from './isNil';
import isInstanceOf from './isInstanceOf';

type EmptyObject = Record<PropertyKey, never>;
type EmptyMap<TKey = unknown> = Map<TKey, never>;
type EmptySet = Set<never>;
type EmptyArray = [];
type EmptyString = '';
type AnyEmptyValue = EmptyArray | EmptyObject | EmptyString | EmptyMap | EmptySet | null | undefined;

type $ExtractEmptyArray<T> = T extends any[] ? EmptyArray : never;
type $ExtractEmptyObject<T> = T extends Record<PropertyKey, unknown> ? EmptyObject : never;
type $ExtractEmptyString<T> = T extends string ? EmptyString : never;
type $ExtractEmptyNull<T> = T extends null ? null : never;
type $ExtractEmptyUndefined<T> = T extends undefined ? undefined : never;
type $ExtractEmptyMap<T> = T extends Map<infer TKey, unknown> ? EmptyMap<TKey> : never;
type $ExtractEmptySet<T> = T extends Set<unknown> ? EmptySet : never;
type $ExtractEmptyUnknownFallback<T> = unknown extends T ? AnyEmptyValue : never;

type $ExtractEmpty<T> =
    | $ExtractEmptyArray<T>
    | $ExtractEmptyObject<T>
    | $ExtractEmptyString<T>
    | $ExtractEmptyNull<T>
    | $ExtractEmptyUndefined<T>
    | $ExtractEmptyMap<T>
    | $ExtractEmptySet<T>
    | $ExtractEmptyUnknownFallback<T>;

type $ExtractEmptyFor<T> = $ExtractEmpty<T> extends T ? $ExtractEmpty<T> : $ExtractEmpty<T> & T;

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
export default function isEmpty<T>(value: T): value is $ExtractEmptyFor<T> {
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
