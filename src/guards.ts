import { AnyFunction, AnyPrimitive, Guard, NullOrUndefined, TypeTag } from './types';
import { curryGuard, getTypeTag } from './utils';

/**
 * Check if value a string literal or string created by `String` constructor
 */
const isString = (value: unknown): value is string => {
    return getTypeTag(value) === TypeTag.STRING;
};

/**
 * Check if value a number literal or number created by `Number` constructor
 */
const isNumber = (value: unknown): value is number => {
    return getTypeTag(value) === TypeTag.NUMBER;
};

/**
 * Check if value a symbol
 */
const isSymbol = (value: unknown): value is symbol => {
    return getTypeTag(value) === TypeTag.SYMBOL;
};

/**
 * Check if value a regular expression or created by `RegExp` constructor
 */
const isRegExp = (value: unknown): value is RegExp => {
    return getTypeTag(value) === TypeTag.REGEXP;
};

/**
 * Check if value a JS error
 */
const isError = (value: unknown): value is Error => {
    return value instanceof Error && getTypeTag(value) === TypeTag.ERROR;
};

/**
 * Check if value a boolean
 */
const isBoolean = (value: unknown): value is boolean => {
    return getTypeTag(value) === TypeTag.BOOLEAN;
};

/**
 * Check if value is a NaN
 */
const isNaN_ = (value: unknown): value is number => {
    return isNumber(value) && isNaN(value);
};

/**
 * Check if value is a null or undefined
 */
const isNil = (value: unknown): value is NullOrUndefined => {
    return value === null || value === undefined;
};

/**
 * Check if value is a primitive
 * @see `AnyPrimitive`
 */
const isPrimitive = (value: unknown): value is AnyPrimitive => {
    return value === null || (typeof value !== 'object' && typeof value !== 'function');
};

/**
 * Check if value is a plain JavaScript object (excluding special classes or objects with other prototypes)
 * It may be object literal `{}` or instance created by `Object` constructor
 * or using `Object.create(null | Object)`
 */
const isPlainObject = (value: unknown): value is Record<PropertyKey, unknown> => {
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
const isArray = (value: unknown): value is unknown[] => {
    return Array.isArray(value);
};

/**
 * Check if value is an any function
 */
const isFunction = (value: unknown): value is AnyFunction => {
    return typeof value === 'function';
};

/**
 * Check if value is a promise object
 */
const isPromise = (value: unknown): value is Promise<unknown> => {
    return !!value && getTypeTag(value) === TypeTag.PROMISE;
};

/**
 * Check if value is a promise-like object (has `then` method)
 */
const isPromiseLike = (value: unknown): value is Promise<unknown> => {
    return isPromise(value) || (isHasKey(value, 'then') && isFunction(value.then));
};

/**
 * Check if value is a valid JS date
 */
const isDate = (value: unknown): value is Date => {
    return !!value && getTypeTag(value) === TypeTag.DATE && !isNaN_(Number(value));
};

/**
 * Check if value is iterable (arrays, strings, maps, sets, etc.)
 */
const isIterable = (value: unknown): value is Iterable<unknown> => {
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
const isHasKey = <P extends string>(
    value: unknown,
    propertyName: P,
): value is Record<PropertyKey, unknown> & Record<P, unknown> => {
    return value instanceof Object && Object.prototype.hasOwnProperty.call(value, propertyName);
};

/**
 * Check if all elements of array match given guard
 */
const isArrayOf = <T>(value: unknown, guard: Guard<T>): value is T[] => {
    return isArray(value) && value.every((value) => guard(value));
};

type $SomeGuards<T1 extends Guard, T2 extends Guard> = T1 | T2;
type $EveryGuards<T1 extends Guard, T2 extends Guard> = T1 & T2;

const someGuards = <T1 extends Guard, T2 extends Guard>(guard1: T1, guard2: T2): $SomeGuards<T1, T2> => {
    return ((value: unknown, ...args: any[]) => [guard1, guard2].some((guard) => guard(value, ...args))) as $SomeGuards<
        T1,
        T2
    >;
};

const everyGuards = <T1 extends Guard, T2 extends Guard>(guard1: T1, guard2: T2): $EveryGuards<T1, T2> => {
    return ((value: unknown, ...args: any[]) =>
        [guard1, guard2].every((guard) => guard(value, ...args))) as $EveryGuards<T1, T2>;
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
};
