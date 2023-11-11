// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

import { CurriedGuard, TypeTag, Guard } from './types';

/**
 * Return object type string representation
 * @see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
 * @example
 * {} // -> "Object" ("[object Object]"")
 * '' // -> "String" ("[object String]"")
 * [] // -> "Array"  ("[object Array]"")
 */
export const getTypeTag = (value: unknown): TypeTag => {
    return Object.prototype.toString.call(value).slice(8, -1) as TypeTag;
};

/**
 * Curry guard function
 */
export const curryGuard = <TValue, TRes extends TValue, TArgs extends unknown[]>(
    guard: (value: TValue, ...args: TArgs) => value is TRes,
): CurriedGuard<TRes, TArgs> => {
    return (...args: TArgs): Guard<TRes> => {
        return (value): value is TRes => {
            return guard(value as TValue, ...args);
        };
    };
};
