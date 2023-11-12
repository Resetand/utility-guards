import { AnyFunction, AnyPrimitive, Guard, NullOrUndefined, TypeTag } from './types';
import { curryGuard, everyGuards, getTypeTag, invertGuard, someGuards } from './utils';

/**
 * Check if value a string literal or string created by `String` constructor
 */
const isString = <T>(value: T | string): value is string => {
    return getTypeTag(value) === TypeTag.STRING;
};

/**
 * Check if value a number literal or number created by `Number` constructor
 */
const isNumber = <T>(value: T | number): value is number => {
    return getTypeTag(value) === TypeTag.NUMBER;
};

/**
 * Check if value a symbol
 */
const isSymbol = <T>(value: T | symbol): value is symbol => {
    return getTypeTag(value) === TypeTag.SYMBOL;
};

/**
 * Check if value a regular expression or created by `RegExp` constructor
 */
const isRegExp = <T>(value: T | RegExp): value is RegExp => {
    return getTypeTag(value) === TypeTag.REGEXP;
};

/**
 * Check if value a JS error
 */
const isError = <T>(value: T | Error): value is Error => {
    return value instanceof Error && getTypeTag(value) === TypeTag.ERROR;
};

/**
 * Check if value a boolean
 */
const isBoolean = <T>(value: T | boolean): value is boolean => {
    return getTypeTag(value) === TypeTag.BOOLEAN;
};

/**
 * Check if value is a NaN
 */
const isNaN_ = <T>(value: T | number): value is number => {
    return isNumber(value) && isNaN(value);
};

/**
 * Check if value is a null or undefined
 */
const isNil = <T>(value: T | NullOrUndefined): value is NullOrUndefined => {
    return value === null || value === undefined;
};

/**
 * Check if value is a primitive
 * @see `AnyPrimitive`
 */
const isPrimitive = <T>(value: T | AnyPrimitive): value is AnyPrimitive => {
    return value === null || (typeof value !== 'object' && typeof value !== 'function');
};

/**
 * Check if value is a plain JavaScript object (excluding special classes or objects with other prototypes)
 * It may be object literal `{}` or instance created by `Object` constructor
 * or using `Object.create(null | Object)`
 */
const isPlainObject = <T>(value: T | Record<PropertyKey, unknown>): value is Record<PropertyKey, unknown> => {
    if (getTypeTag(value) !== TypeTag.OBJECT) {
        return false;
    }

    if (Object.getPrototypeOf(value) === null) {
        return true;
    }

    return value instanceof Object && value.constructor === Object && Object.getPrototypeOf(value) === Object.prototype;
};

/**
 * Check if value is array
 */
const isArray = <T>(value: T | unknown[]): value is unknown[] => {
    return Array.isArray(value);
};

/**
 * Check if value is an any function
 */
const isFunction = <T>(value: T | AnyFunction): value is AnyFunction => {
    return typeof value === 'function';
};

/**
 * Check if value is a promise object
 */
const isPromise = <T>(value: T | Promise<unknown>): value is Promise<unknown> => {
    return !!value && getTypeTag(value) === TypeTag.PROMISE;
};

/**
 * Check if value is a promise-like object (has `then` method)
 */
const isPromiseLike = <T, TPromiseLike extends { then: AnyFunction }>(
    value: T | Promise<unknown> | TPromiseLike,
): value is Promise<unknown> | TPromiseLike => {
    return isPromise(value) || (isHasKey(value, 'then') && isFunction(value.then));
};

/**
 * Check if value is a valid JS date
 */
const isDate = <T>(value: T | Date): value is Date => {
    return !!value && getTypeTag(value) === TypeTag.DATE && !isNaN_(Number(value));
};

/**
 * Check if value is iterable (arrays, strings, maps, sets, etc.)
 */
const isIterable = <T>(value: T | Iterable<unknown>): value is Iterable<unknown> => {
    return Symbol.iterator in Object(value);
};

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

/**
 * Check if value is instance of given constructor
 */
const isInstanceOf = <T>(value: unknown, constructor: new (...args: any[]) => T): value is T => {
    return value instanceof constructor;
};

/**
 * Check if object has own property
 */
const isHasKey = <T, P extends string>(
    value: T | (Record<PropertyKey, unknown> & Record<P, unknown>),
    propertyName: P,
): value is Record<PropertyKey, unknown> & Record<P, unknown> => {
    return value instanceof Object && Object.prototype.hasOwnProperty.call(value, propertyName);
};

/**
 * Check if all elements of array match given guard
 */
const isArrayOf = <TItemGuarded>(value: unknown, guard: Guard<TItemGuarded>): value is TItemGuarded[] => {
    return isArray(value) && value.every((value) => guard(value));
};

const GUARDS = {
    String: isString,
    Number: isNumber,
    Symbol: isSymbol,
    RegExp: isRegExp,
    Error: isError,
    Boolean: isBoolean,
    NaN: isNaN_,
    Nil: isNil,
    Primitive: isPrimitive,
    PlainObject: isPlainObject,
    Array: isArray,
    Function: isFunction,
    Promise: isPromise,
    PromiseLike: isPromiseLike,
    Date: isDate,
    Iterable: isIterable,
    Empty: isEmpty,
    InstanceOf: isInstanceOf,
    HasKey: isHasKey,
    ArrayOf: isArrayOf,
};

/**
 * Util for runtime types checking.
 */
export const is = {
    ...GUARDS,

    // utility methods
    $some: someGuards,
    $every: everyGuards,
    $curried: curryGuard,
    $not: invertGuard,
};
