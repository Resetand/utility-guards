import { AnyFunction, Guard, NullOrUndefined, TypeTag, ClassConstructor } from './types';
import { curriedGuard, everyGuards, getTypeTag, invertGuard, someGuards } from './utils';

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
    return getTypeTag(value) === TypeTag.ERROR && isInstanceOf(value, Error);
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

const isPrimitive = someGuards(isNil, isBoolean, isString, isNumber, isBigInt, isSymbol);

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

const isClass = <T>(value: T | ClassConstructor): value is ClassConstructor => {
    return isFunction(value) && /^class\s/.test(Function.prototype.toString.call(value));
};

const isFunction = <T>(value: T | AnyFunction): value is AnyFunction => {
    return getTypeTag(value) === TypeTag.FUNCTION && !/^class\s/.test(Function.prototype.toString.call(value));
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

type InstanceOfGuard = {
    <T>(value: unknown, constructor: ClassConstructor<T>): value is T;
    <T>(constructor: ClassConstructor<T>): (value: unknown) => value is T;
};

const isInstanceOf: InstanceOfGuard = curriedGuard((value: unknown, constructor: ClassConstructor) => {
    return value instanceof constructor;
});

type RecordLike<P extends PropertyKey = PropertyKey> = Record<PropertyKey, unknown> & Record<P, unknown>;

type IsHasKeyGuard = {
    <T, P extends PropertyKey>(value: T | RecordLike, propertyName: P): value is RecordLike<P>;
    <P extends PropertyKey>(propertyName: P): <T>(value: T) => value is RecordLike<P> & T;
};

const isHasKey: IsHasKeyGuard = curriedGuard((value, propertyName) => {
    return value instanceof Object && Object.prototype.hasOwnProperty.call(value, propertyName);
});

type IsArrayOfGuard = {
    <TItemGuarded>(value: unknown, guard: Guard<TItemGuarded>): value is TItemGuarded[];
    <TItemGuarded>(guard: Guard<TItemGuarded>): (value: unknown) => value is TItemGuarded[];
};

const isArrayOf: IsArrayOfGuard = curriedGuard((value, guard: Guard<unknown>) => {
    return isArray(value) && value.every((value) => guard(value));
});

const GUARDS = {
    /**
     * Check if value a string literal or string created by `String` constructor
     *
     * @example
     * is.String(''); // -> true
     * is.String(String('')); // -> true
     * is.String(new String('')); // -> true
     * is.String(1); // -> false
     */
    String: isString,

    /**
     * Check if value a number literal or number created by `Number` constructor
     *
     * @example
     * is.Number(1); // -> true
     * is.Number(1.1); // -> true
     * is.Number(Number(1)); // -> true
     * is.Number(new Number(1)); // -> true
     * is.Number(''); // -> false
     */
    Number: isNumber,

    /**
     * Check if value a bigint literal or bigint created by `BigInt` constructor
     *
     * @example
     * is.BigInt(1n); // -> true
     * is.BigInt(BigInt(1)); // -> true
     * is.BigInt(new BigInt(1)); // -> true
     * is.BigInt(''); // -> false
     * is.BigInt(1); // -> false
     */
    BigInt: isBigInt,

    /**
     * Check if value a symbol
     *
     * @example
     * is.Symbol(Symbol('')); // -> true
     * is.Symbol(Symbol(1)); // -> true
     * is.Symbol(Symbol.iterator); // -> true
     * is.Symbol(''); // -> false
     */
    Symbol: isSymbol,

    /**
     * Check if value a regular expression or created by `RegExp` constructor
     *
     * @example
     * is.RegExp(/\w+/); // -> true
     * is.RegExp(new RegExp('\\w+', 'g')); // -> true
     * is.RegExp(''); // -> false
     */
    RegExp: isRegExp,

    /**
     * Check if value a JS error
     *
     * @example
     * is.Error(new Error('')); // -> true
     * is.Error(new CustomError()); // -> true
     * is.Error(''); // -> false
     */
    Error: isError,

    /**
     * Check if value a boolean
     *
     * @example
     * is.Boolean(true); // -> true
     * is.Boolean(false); // -> true
     * is.Boolean(1); // -> false
     */
    Boolean: isBoolean,

    /**
     * Check if value is a NaN
     *
     * @example
     * is.NaN(NaN); // -> true
     * is.NaN(42 / 'string'); // -> true
     * is.NaN(1); // -> false
     * is.NaN(''); // -> false
     * is.NaN(null); // -> false
     * is.NaN(undefined); // -> false
     */
    NaN: isNaN_,

    /**
     * Check if value is a null or undefined
     *
     * @example
     * is.Nil(null); // -> true
     * is.Nil(undefined); // -> true
     * is.Nil(0); // -> false
     * is.Nil(''); // -> false
     */
    Nil: isNil,

    /**
     * Check if value is a primitive
     * @see `AnyPrimitive`
     *
     * @example
     * is.Primitive(1); // -> true
     * is.Primitive(''); // -> true
     * is.Primitive(true); // -> true
     * is.Primitive(Symbol('')); // -> true
     * is.Primitive(BigInt(1)); // -> true
     * is.Primitive(null); // -> true
     * is.Primitive(undefined); // -> true
     *
     * is.Primitive({}); // -> false
     * is.Primitive([]); // -> false
     */
    Primitive: isPrimitive,

    /**
     * Check if value is a plain JavaScript object (excluding special classes or objects with other prototypes)
     * It may be object literal `{}` or instance created by `Object` constructor
     * or using `Object.create(null | Object)`
     *
     * @example
     * is.PlainObject({}); // -> true
     * is.PlainObject(Object.create(null)); // -> true
     * is.PlainObject(new Object()); // -> true
     *
     * is.PlainObject(new CustomClass()); // -> false
     * is.PlainObject([]); // -> false
     * is.PlainObject(null); // -> false
     */
    PlainObject: isPlainObject,

    /**
     * Check if value is array
     *
     * @example
     * is.Array([]); // -> true
     * is.Array(new Array()); // -> true
     * is.Array({}); // -> false
     */
    Array: isArray,

    /**
     * Check if value is an any function
     *
     * @example
     * is.Function(() => {}); // -> true
     * is.Function(function() {}); // -> true
     * is.Function(new Function()); // -> true
     * is.Function({}); // -> false
     *
     * is.Function(class {}); // -> false (although class is a constructor function in JS, it's expected behavior)
     */
    Function: isFunction,

    /**
     * Check if value is a class
     *
     * @example
     * is.Class(class {}); // -> true
     * is.Class(class CustomClass {}); // -> true
     * is.Class(class extends CustomClass {}); // -> true
     *
     * is.Class(() => {}); // -> false
     * is.Class(function() {}); // -> false
     * is.Class(new Function()); // -> false
     */
    Class: isClass,

    /**
     * Check if value is a promise object
     *
     * @example
     * is.Promise(new Promise((res) => res(1))); // -> true
     * is.Promise(Promise.resolve()); // -> true
     * is.Promise({ then: () => void 0 }); // -> false (see `is.PromiseLike`)
     * is.Promise({}); // -> false
     */
    Promise: isPromise,

    /**
     * Check if value is a promise-like object (has `then` method)
     *
     * @example
     * is.PromiseLike(new Promise((res) => res(1))); // -> true
     * is.PromiseLike(Promise.resolve()); // -> true
     * is.PromiseLike({ then: () => void 0 }); // -> true
     * is.PromiseLike({}); // -> false
     */
    PromiseLike: isPromiseLike,

    /**
     * Check if value is a valid JS date
     *
     * @example
     * is.Date(new Date()); // -> true
     * is.Date(new Date('01.02.1971')); // -> true
     * is.Date(new Date('invalid date')); // -> false
     */
    Date: isDate,

    /**
     * Check if value is iterable (arrays, strings, maps, sets, etc.)
     *
     * @example
     * is.Iterable([]); // -> true
     * is.Iterable(''); // -> true
     * is.Iterable(new Set()); // -> true
     * is.Iterable(new Map()); // -> true
     *
     * is.Iterable(new WeakSet()); // -> false
     * is.Iterable(new WeakMap()); // -> false
     * is.Iterable({}); // -> false
     * is.Iterable(null); // -> false
     */
    Iterable: isIterable,

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
    Empty: isEmpty,

    /**
     * Check if value is instance of given constructor
     *
     * @example
     * is.InstanceOf(new Cls(), Cls); // -> true
     * is.InstanceOf(new CustomError(), Error); // -> true
     * is.InstanceOf(new CustomError(), CustomError); // -> true
     * is.InstanceOf(new CustomError(), Cls); // -> false
     *
     * // guarded usage
     * is.InstanceOf(Cls)(new Cls()); // -> true
     * validate({value}, {value: is.InstanceOf(Cls)}); // -> true
     */
    InstanceOf: isInstanceOf,

    /**
     * Check if object has own property
     *
     * @example
     * is.HasKey({ a: 1 }, 'a'); // -> true
     * is.HasKey({ a: 1 }, 'b'); // -> false
     * is.HasKey({}, 'a'); // -> false
     *
     * // guarded usage
     * is.HasKey({ a: 1 })('a'); // -> true
     * validate({value}, {value: is.HasKey({ a: 1 })}); // -> true
     */
    HasKey: isHasKey,

    /**
     * Check if all elements of array match given guard
     *
     * @example
     * is.ArrayOf([1, 2, 3], is.Number); // -> true
     * is.ArrayOf([1, 2, '3'], is.Number); // -> false
     * is.ArrayOf([], is.Number); // -> true
     * is.ArrayOf([1, 2, 3], is.String); // -> false
     *
     * // guarded usage
     * is.ArrayOf(is.Number)([1, 2, 3]); // -> true
     * validate([1, 2, 3], is.ArrayOf(is.Number)); // -> true
     *
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
     * Invert given guard
     *
     * @example
     * const isNotString = is.$not(is.String);
     * isNotString(1); // -> true
     * isNotString(''); // -> false
     */
    $not: invertGuard,
};
