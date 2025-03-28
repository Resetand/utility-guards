import $every from './every';
import $not from './not';
import $some from './some';

import isString from './guards/isString';
import isArray from './guards/isArray';
import isArrayOf from './guards/isArrayOf';
import isBigInt from './guards/isBigInt';
import isBoolean from './guards/isBoolean';
import isClass from './guards/isClass';
import isDate from './guards/isDate';
import isEmpty from './guards/isEmpty';
import isError from './guards/isError';
import isFunction from './guards/isFunction';
import isAsyncFunction from './guards/isAsyncFunction';
import isHasOwn from './guards/isHasOwn';
import isHasIn from './guards/isHasIn';
import isInstanceOf from './guards/isInstanceOf';
import isExactInstanceOf from './guards/isExactInstanceOf';
import isIterable from './guards/isIterable';
import isNaN from './guards/isNaN';
import isUndefined from './guards/isUndefined';
import isNull from './guards/isNull';
import isNil from './guards/isNil';
import isNumber from './guards/isNumber';
import isAnyObject from './guards/isAnyObject';
import isPlainObject from './guards/isPlainObject';
import isPrimitive from './guards/isPrimitive';
import isPromise from './guards/isPromise';
import isPromiseLike from './guards/isPromiseLike';
import isRegExp from './guards/isRegExp';
import isSymbol from './guards/isSymbol';
import isFalsy from './guards/isFalsy';
import isAny from './guards/isAny';

import _isGuard, { IsGuard } from './_is-guard';
import { Guard } from '_types';

/**
 * Container with type guards
 */
const _container = {
    String: isString,
    Number: isNumber,
    BigInt: isBigInt,
    Symbol: isSymbol,
    RegExp: isRegExp,
    Error: isError,
    Boolean: isBoolean,
    NaN: isNaN,
    Undefined: isUndefined,
    Null: isNull,
    Nil: isNil,
    Primitive: isPrimitive,
    AnyObject: isAnyObject,
    PlainObject: isPlainObject,
    Array: isArray,
    Class: isClass,
    Function: isFunction,
    AsyncFunction: isAsyncFunction,
    Promise: isPromise,
    PromiseLike: isPromiseLike,
    Date: isDate,
    Iterable: isIterable,
    Empty: isEmpty,
    Falsy: isFalsy,
    InstanceOf: isInstanceOf,
    ExactInstanceOf: isExactInstanceOf,
    Any: isAny,
    HasOwn: isHasOwn,
    HasIn: isHasIn,
    ArrayOf: isArrayOf,

    // utility methods
    $some,
    $every,
    $not,

    // deprecated
    // @deprecated use `is.HasOwn` instead
    Has: isHasOwn,
};

type IsGuardContainer = IsGuard & typeof _container;

/**
 * Singleton container with type guards
 *
 * @example
 * import is from 'utility-guards';
 *
 * is.String(''); // -> true
 *
 * @note
 * `is` is callable function, you can use it as a guard to check is value equals to some type (Object.is)
 */
const is: IsGuardContainer = Object.assign(_isGuard, _container);

export {
    is as default,

    // public guards
    isArray,
    isArrayOf,
    isBigInt,
    isBoolean,
    isClass,
    isDate,
    isEmpty,
    isFalsy,
    isError,
    isFunction,
    isAsyncFunction,
    isHasOwn,
    isHasIn,
    isInstanceOf,
    isExactInstanceOf,
    isIterable,
    isNaN,
    isUndefined,
    isNull,
    isNil,
    isNumber,
    isAnyObject,
    isPlainObject,
    isPrimitive,
    isPromise,
    isPromiseLike,
    isRegExp,
    isString,
    isSymbol,
    isAny,

    // public utils
    $some,
    $every,
    $not,

    // types
    type Guard,

    // deprecated
    /** @deprecated use `isHasOwn` instead */
    isHasOwn as isHas,
};
