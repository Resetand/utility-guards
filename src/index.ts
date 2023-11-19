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
import isInstanceOf from './guards/isInstanceOf';
import isIterable from './guards/isIterable';
import isNaN from './guards/isNaN';
import isNil from './guards/isNil';
import isNumber from './guards/isNumber';
import isAnyObject from './guards/isAnyObject';
import isPlainObject from './guards/isPlainObject';
import isPrimitive from './guards/isPrimitive';
import isPromise from './guards/isPromise';
import isPromiseLike from './guards/isPromiseLike';
import isRegExp from './guards/isRegExp';
import isSymbol from './guards/isSymbol';

import { everyGuards, invertGuard, someGuards } from './utils';

/**
 * Container for type guards
 */
const is = {
    String: isString,
    Number: isNumber,
    BigInt: isBigInt,
    Symbol: isSymbol,
    RegExp: isRegExp,
    Error: isError,
    Boolean: isBoolean,
    NaN: isNaN,
    Nil: isNil,
    Primitive: isPrimitive,
    Object: isAnyObject,
    PlainObject: isPlainObject,
    Array: isArray,
    Class: isClass,
    Function: isFunction,
    Promise: isPromise,
    PromiseLike: isPromiseLike,
    Date: isDate,
    Iterable: isIterable,
    Empty: isEmpty,
    InstanceOf: isInstanceOf,
    HasProperty: isHasProperty,
    ArrayOf: isArrayOf,

    // utility methods
    $some: someGuards,
    $every: everyGuards,
    $not: invertGuard,
};

export default is;

export { validate, validateStrict } from './validate';

export {
    // public utils
    someGuards as $some,
    everyGuards as $every,
    invertGuard as $not,
};

export {
    // public guards
    isArray,
    isArrayOf,
    isBigInt,
    isBoolean,
    isClass,
    isDate,
    isEmpty,
    isError,
    isFunction,
    isHasProperty,
    isInstanceOf,
    isIterable,
    isNaN,
    isNil,
    isNumber,
    isPlainObject,
    isPrimitive,
    isPromise,
    isPromiseLike,
    isRegExp,
    isString,
    isSymbol,
};
