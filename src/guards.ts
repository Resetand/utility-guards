import { AnyFunction, AnyPrimitive, Guard, NullOrUndefined, TypeTag } from './types';
import { curryGuard, everyGuards, getTypeTag, invertGuard, someGuards } from './utils';

const isString = <T>(value: T | string): value is string => {
    return getTypeTag(value) === TypeTag.STRING;
};

const isNumber = <T>(value: T | number): value is number => {
    return getTypeTag(value) === TypeTag.NUMBER;
};

const isBigInt = <T>(value: T | bigint): value is bigint => {
    return getTypeTag(value) === TypeTag.BIGINT;
};

const isSymbol = <T>(value: T | symbol): value is symbol => {
    return getTypeTag(value) === TypeTag.SYMBOL;
};

const isRegExp = <T>(value: T | RegExp): value is RegExp => {
    return getTypeTag(value) === TypeTag.REGEXP;
};

const isError = <T>(value: T | Error): value is Error => {
    return value instanceof Error && getTypeTag(value) === TypeTag.ERROR;
};

const isBoolean = <T>(value: T | boolean): value is boolean => {
    return getTypeTag(value) === TypeTag.BOOLEAN;
};

const isNaN_ = <T>(value: T | number): value is number => {
    return isNumber(value) && isNaN(value);
};

const isNil = <T>(value: T | NullOrUndefined): value is NullOrUndefined => {
    return value === null || value === undefined;
};

const isPrimitive = <T>(value: T | AnyPrimitive): value is AnyPrimitive => {
    return value === null || (typeof value !== 'object' && typeof value !== 'function');
};

const isPlainObject = <T>(value: T | Record<PropertyKey, unknown>): value is Record<PropertyKey, unknown> => {
    if (getTypeTag(value) !== TypeTag.OBJECT) {
        return false;
    }

    if (Object.getPrototypeOf(value) === null) {
        return true;
    }

    return value instanceof Object && value.constructor === Object && Object.getPrototypeOf(value) === Object.prototype;
};

const isArray = <T>(value: T | unknown[]): value is unknown[] => {
    return Array.isArray(value);
};

const isFunction = <T>(value: T | AnyFunction): value is AnyFunction => {
    return typeof value === 'function';
};

const isPromise = <T>(value: T | Promise<unknown>): value is Promise<unknown> => {
    return !!value && getTypeTag(value) === TypeTag.PROMISE;
};

const isPromiseLike = <T>(value: T | PromiseLike<any>): value is PromiseLike<any> => {
    return isPromise(value) || (isHasKey(value, 'then') && isFunction(value.then));
};

const isDate = <T>(value: T | Date): value is Date => {
    return !!value && getTypeTag(value) === TypeTag.DATE && !isNaN_(Number(value));
};

const isIterable = <T>(value: T | Iterable<unknown>): value is Iterable<unknown> => {
    return Symbol.iterator in Object(value);
};

const isEmpty = <T>(value: T): value is Extract<T, NullOrUndefined | '' | { [P in keyof T]: never } | never> => {
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
};

const isInstanceOf = <T>(value: unknown, constructor: new (...args: any[]) => T): value is T => {
    return value instanceof constructor;
};

const isHasKey = <T, P extends string>(
    value: T | (Record<PropertyKey, unknown> & Record<P, unknown>),
    propertyName: P,
): value is Record<PropertyKey, unknown> & Record<P, unknown> => {
    return value instanceof Object && Object.prototype.hasOwnProperty.call(value, propertyName);
};

const isArrayOf = <TItemGuarded>(value: unknown, guard: Guard<TItemGuarded>): value is TItemGuarded[] => {
    return isArray(value) && value.every((value) => guard(value));
};

const GUARDS = {
    /**
     * Check if value a string literal or string created by `String` constructor
     */
    String: isString,

    /**
     * Check if value a number literal or number created by `Number` constructor
     */
    Number: isNumber,

    /**
     * Check if value a bigint literal or bigint created by `BigInt` constructor
     */
    BigInt: isBigInt,

    /**
     * Check if value a symbol
     */
    Symbol: isSymbol,

    /**
     * Check if value a regular expression or created by `RegExp` constructor
     */
    RegExp: isRegExp,

    /**
     * Check if value a JS error
     */
    Error: isError,

    /**
     * Check if value a boolean
     */
    Boolean: isBoolean,

    /**
     * Check if value is a NaN
     */
    NaN: isNaN_,

    /**
     * Check if value is a null or undefined
     */
    Nil: isNil,

    /**
     * Check if value is a primitive
     * @see `AnyPrimitive`
     */
    Primitive: isPrimitive,

    /**
     * Check if value is a plain JavaScript object (excluding special classes or objects with other prototypes)
     * It may be object literal `{}` or instance created by `Object` constructor
     * or using `Object.create(null | Object)`
     */
    PlainObject: isPlainObject,

    /**
     * Check if value is array
     */
    Array: isArray,

    /**
     * Check if value is an any function
     */
    Function: isFunction,

    /**
     * Check if value is a promise object
     */
    Promise: isPromise,

    /**
     * Check if value is a promise-like object (has `then` method)
     */
    PromiseLike: isPromiseLike,

    /**
     * Check if value is a valid JS date
     */
    Date: isDate,

    /**
     * Check if value is iterable (arrays, strings, maps, sets, etc.)
     */
    Iterable: isIterable,

    /**
     * Check if value is empty:
     * Value is considered as empty if it's
     * - empty object: `{}`
     * - empty array: `[]`
     * - empty Set: `new Set()`
     * - empty Map: `new Map()`
     * - empty string: `''`
     * - nullable value: `null or undefined`
     */
    Empty: isEmpty,

    /**
     * Check if value is instance of given constructor
     */
    InstanceOf: isInstanceOf,

    /**
     * Check if object has own property
     */
    HasKey: isHasKey,

    /**
     * Check if all elements of array match given guard
     */
    ArrayOf: isArrayOf,
};

/**
 * Util for runtime types checking.
 */
export const is = {
    ...GUARDS,

    // utility methods

    /**
     * Combine multiple guards into union guard
     * @example
     * const isNumberOrString = is.$some(is.Number, is.String);
     * isNumberOrString(1); // -> true
     * isNumberOrString('1'); // -> true
     * isNumberOrString([]); // -> false
     */
    $some: someGuards,

    /**
     * Combine multiple guards into intersection guard
     * @example
     * const isNumberOrString = is.$every(is.Empty, isArray);
     * isNumberOrString([]); // -> true
     * isNumberOrString([1]); // -> false
     * isNumberOrString(null); // -> false
     */
    $every: everyGuards,

    /**
     * Creates curried version of guard
     */
    $curried: curryGuard,

    /**
     * Invert given guard
     *
     * @example
     * const isNotString = is.$not(is.String);
     * isNotString(1); // -> true
     * isNotString(''); // -> false
     */
    $not: invertGuard,
};
