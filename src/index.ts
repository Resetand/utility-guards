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
import isHasProperty from './guards/isHasProperty';
import isHas from './guards/isHas';
import isHasIn from './guards/isHasIn';
import isInstanceOf from './guards/isInstanceOf';
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

import _isGuard, { IsGuard } from './_is-guard';

import validate, { validateStrict } from './validate';

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
    Promise: isPromise,
    PromiseLike: isPromiseLike,
    Date: isDate,
    Iterable: isIterable,
    Empty: isEmpty,
    Falsy: isFalsy,
    InstanceOf: isInstanceOf,

    /** @deprecated – use `Has` instead */
    HasProperty: isHasProperty,
    Has: isHas,
    HasIn: isHasIn,

    ArrayOf: isArrayOf,

    // utility methods
    $some,
    $every,
    $not,
};

type IsGuardContainer = IsGuard & typeof _container;

/**
 * Singleton container with type guards
 *
 * @note
 * `is` is callable function, use can use it as a guard to check is value equals to some type (Object.is)
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
    isHas,
    isHasIn,
    isHasProperty,
    isInstanceOf,
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

    // public utils
    $some,
    $every,
    $not,

    // validate methods
    validate,
    validateStrict,
};
