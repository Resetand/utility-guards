[npm-image]: http://img.shields.io/npm/v/utility-guards.svg
[npm-url]: http://npmjs.org/package/utility-guards
[codecov-image]: https://codecov.io/gh/Resetand/utility-guards/graph/badge.svg?token=W0mWVyiEng
[codecov-url]: https://codecov.io/gh/Resetand/utility-guards

# utility-guards

<a href="https://npmjs.com/package/utility-guards"><img src="https://img.shields.io/npm/v/utility-guards.svg" alt="npm package"></a>
<a href="https://codecov.io/gh/Resetand/utility-guards"><img src="https://codecov.io/gh/Resetand/utility-guards/graph/badge.svg?token=W0mWVyiEng" alt="codecov"></a>
<a href="https://npmjs.com/package/utility-guards"><img src="https://img.shields.io/bundlejs/size/utility-guards" alt="package gzipped size"></a>

> A powerful set of **runtime** and **static type** guards for JavaScript and TypeScript.

## Motivation

JavaScript has a notoriously inconsistent system for runtime type checking — with scattered use of `typeof`, `instanceof`, `Array.isArray`, `Object.prototype.hasOwnProperty`, and more.
As well, TypeScript does not work properly with all of these checks, leading to confusion and bugs.

This library was created to unify all these scattered patterns into a consistent, type-safe, and minimal API.

## Features

-   🧪 Simple runtime type checking
-   💡 Full TypeScript type inference support
-   📦 Tree-shaking friendly and zero dependencies

---

## Installation

```bash
npm install utility-guards
```

---

## Usage

```ts
// import from the main package
import { isString, isNumber, isNil } from 'utility-guards';

isString(...);
isNumber(...);
isNil(...);
```

```ts
// or import standalone functions
import isString from 'utility-guards/isString';
import isNumber from 'utility-guards/isNumber';
import isNil from 'utility-guards/isNil';

isString(...);
isNumber(...);
isNil(...);
```

```ts
// or use the full guard container
import is from 'utility-guards';

is.String(...)
is.Number(...)
is.Nil(...)
```

---

## Table of Contents

### API

#### Primitive Checks

-   [`isString`](#isstring)
-   [`isNumber`](#isnumber)
-   [`isFiniteNumber`](#isfinitenumber)
-   [`isBoolean`](#isboolean)
-   [`isBigInt`](#isbigint)
-   [`isSymbol`](#issymbol)
-   [`isNull`](#isnull)
-   [`isUndefined`](#isundefined)
-   [`isNil`](#isnil)
-   [`isNaN`](#isnan)
-   [`isPrimitive`](#isprimitive)
-   [`isFalsy`](#isfalsy)

#### Object Checks

-   [`isAnyObject`](#isanyobject)
-   [`isPlainObject`](#isplainobject)
-   [`isEmpty`](#isempty)
-   [`isArray`](#isarray)
-   [`isArrayOf`](#isarrayof)
-   [`isTupleOf`](#istupleof)
-   [`isObjectOf`](#isobjectof)
-   [`isObjectExactOf`](#isobjectexactof)

#### Function & Class Checks

-   [`isFunction`](#isfunction)
-   [`isAsyncFunction`](#isasyncfunction)
-   [`isClass`](#isclass)

#### Special Structures

-   [`isRegExp`](#isregexp)
-   [`isDate`](#isdate)
-   [`isValidDate`](#isvaliddate)
-   [`isIterable`](#isiterable)
-   [`isPromise`](#ispromise)
-   [`isPromiseLike`](#ispromiselike)
-   [`isError`](#iserror)

#### Advanced Structural Guards

-   [`isHasOwn`](#ishasown)
-   [`isHasIn`](#ishasin)
-   [`isInstanceOf`](#isinstanceof)
-   [`isInstanceExactOf`](#isinstanceexactof)

#### Combinators

-   [`$not`](#not)
-   [`$some`](#some)
-   [`$every`](#every)

#### Utility

-   [`is`](#is)
-   [`is.Any`](#isany)

---

## API

### Primitive Checks

#### `isString`

Checks if a value is a string using `typeof === 'string'`.

#### `isNumber`

Checks if a value is a number using `typeof === 'number'`.

#### `isFiniteNumber`

Validates that a number is finite, excluding `NaN`, `Infinity`.

#### `isBoolean`

Checks if a value is a boolean.

#### `isBigInt`

Checks if value is a `bigint` using `typeof === 'bigint'`.

#### `isSymbol`

Checks for symbol type via `typeof === 'symbol'`.

#### `isNull`

Checks if value is exactly `null`.

#### `isUndefined`

Checks if value is exactly `undefined`.

#### `isNil`

Checks if value is `null` or `undefined`.

#### `isNaN`

Strict `NaN` check using `value !== value` trick.

#### `isPrimitive`

Checks for JS primitive types including `null`, `undefined`.

#### `isFalsy`

Checks if value is falsy: `false`, `0`, `''`, `null`, `undefined`.

### Object Checks

#### `isAnyObject`

Loose check for object-like values (including arrays, maps).

#### `isPlainObject`

Strictly checks for plain objects with default prototype.

#### `isEmpty`

Checks if the value is empty (e.g. empty array, string, object, map, set).

#### `isArray`

Uses `Array.isArray()` to determine if value is array.

#### `isArrayOf`

Checks if every item in an array passes a guard
