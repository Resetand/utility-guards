[npm-image]: http://img.shields.io/npm/v/utility-guards.svg
[npm-url]: http://npmjs.org/package/utility-guards
[codecov-image]: https://codecov.io/gh/Resetand/utility-guards/graph/badge.svg?token=W0mWVyiEng
[codecov-url]: https://codecov.io/gh/Resetand/utility-guards

<p align="center" dir="auto">

<h1 align="center">utility-guards</h1>
<h3 align="center">
Set of guard function for runtime type checking in JavaScript with complete TypeScript support
<br/>

</h3>

<strong>

</strong>
</p>

<p align="center">
  <a href="https://npmjs.com/package/utility-guards"><img src="https://img.shields.io/npm/v/utility-guards.svg" alt="npm package"></a>
  <a href="https://codecov.io/gh/Resetand/utility-guards"><img src="https://codecov.io/gh/Resetand/utility-guards/graph/badge.svg?token=W0mWVyiEng" alt="codecov"></a>
  <a href="https://npmjs.com/package/utility-guards"><img src="https://img.shields.io/bundlejs/size/utility-guards" alt="package gzipped size"></a>
</p>
<br/>
<br/>

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
-   [`isAny`](#isany)

---

## API

### Primitive Checks

#### `isString`

Checks if a value is a string (based on `typeof`)

```ts
isString('hello'); // true
isString(123); // false
```

#### `isNumber`

Checks if a value is a number (based on `typeof`)

```ts
isNumber(123); // true
isNumber('123'); // false
```

#### `isFiniteNumber`

Checks if a values is a finite number (not `NaN`, `Infinity`, or `-Infinity`)

```ts
isFiniteNumber(123); // true
isFiniteNumber(NaN); // false
isFiniteNumber(Infinity); // false
```

#### `isBoolean`

Checks if a value is a boolean (based on `typeof`)

```ts
isBoolean(true); // true
isBoolean(0); // false
```

#### `isBigInt`

Checks if value is a `bigint` (based on `typeof`)

```ts
isBigInt(123n); // true
isBigInt(BigInt(123)); // true
isBigInt(123); // false
```

#### `isSymbol`

Checks for symbol type (based on `typeof`)

```ts
isSymbol(Symbol('foo')); // true
```

#### `isNull`

Checks if value is exactly `null`.

```ts
isNull(null); // true
isNull(undefined); // false
```

#### `isUndefined`

Checks if value is exactly `undefined`.

```ts
isUndefined(undefined); // true
isUndefined(null); // false
```

#### `isNil`

Checks if value is `null` or `undefined`.

```ts
isNil(null); // true
isNil(undefined); // true
```

#### `isNaN`

Strict `NaN` check

```ts
isNaN(NaN); // true
isNaN('foo'); // false
```

#### `isPrimitive`

Checks for JS primitive types including (`string`, `number`, `boolean`, `bigint`, `symbol`, `null`, and `undefined`).

```ts
isPrimitive('hello'); // true
```

#### `isFalsy`

Checks if value is falsy: `false`, `0`, `''`, `null`, `undefined`

```ts
isFalsy(false); // true
isFalsy(0); // true
isFalsy(''); // true
```

### Object Checks

#### `isAnyObject`

Loose check for object-like values (including arrays, maps).

```ts
isAnyObject({}); // true
isAnyObject([]); // true
isAnyObject(new Map()); // true
isAnyObject(new MyClass()); // true
```

#### `isPlainObject`

Strictly checks for plain objects with default prototype.

```ts
isPlainObject({}); // true
isPlainObject(new Map()); // false
isPlainObject(new MyClass()); // false
isPlainObject(Object.create(null)); // true
```

#### `isEmpty`

Checks if the value is empty (e.g. empty array, string, object, map, set).

```ts
isEmpty({}); // true
isEmpty([]); // true
isEmpty(''); // true
isEmpty(new Map()); // true
isEmpty(new Set()); // true
```

#### `isArray`

Checks if value is an array (based on `Array.isArray`)

```ts
isArray([]); // true
isArray({}); // false
```

#### `isArrayOf`

Checks if every item in an array passes a specified guard.

```ts
isArrayOf(['hello', 'world'], isString); // true
isArrayOf(['hello', 123], isString); // false

// can also use currying
is.ArrayOf(isString)(['hello', 'world']); // true
```

#### `isTupleOf`

Checks if the value is an array that exactly matches a given tuple schema.

```ts
isTupleOf(['hello', 123], [isString, isNumber]); // true
isTupleOf(['hello', 'world'], [isString, isNumber]); // false
isTupleOf([123], [isString, isNumber]); // false
```

#### `isObjectOf`

Checks if the value is an object that matches a given schema.

```ts
isObjectOf({ a: 1, b: 'hello' }, { a: isNumber, b: isString }); // true
isObjectOf({ a: 1, b: 'hello' }, { a: isNumber, b: isString, c: isBoolean }); // false

isObjectOf({ a: 1, b: 'hello', extra: true }, { a: isNumber, b: isString }); // true (see `isObjectExactOf` for strict check)
```

#### `isObjectExactOf`

Same as `isObjectOf`, but strictly checks that the object matches the schema without extra keys.

```ts
isObjectExactOf({ a: 1, b: 'hello', extra: true }, { a: isNumber, b: isString }); // false
```

### Function & Class Checks

#### `isFunction`

Checks if a value is a function (but not a ES6 class constructor).

#### `isAsyncFunction`

Checks if value is an async function. Uses `Object.prototype.toString` hack to check for `AsyncFunction`. Only works with actual async functions defined with `async` keyword.

```ts
isAsyncFunction(async () => {}); // true
isAsyncFunction(function () {}); // false
isAsyncFunction(() => new Promise(() => {})); // false
```

#### `isClass`

Checks if value is a ES6 class constructor. Uses `Object.prototype.toString` hack. Only works with ES6 classes defined with `class` keyword.

```ts
isClass(class MyClass {}); // true
isClass(function () {}); // false
```

### Special Structures

#### `isRegExp`

Checks if value is a `RegExp` instance.

```ts
isRegExp(/abc/); // true
isRegExp(new RegExp('abc')); // true
```

#### `isDate`

Checks if value is a `Date` instance.

```ts
isDate(new Date()); // true
isDate(new Date('INVALID')); // true, includes invalid dates (see `isValidDate` for strict check)
isDate('2023-01-01'); // false
```

#### `isValidDate`

Same as `isDate`, but checks if the date is valid (i.e. not `Invalid Date`).

```ts
isValidDate(new Date()); // true
isValidDate(new Date('INVALID')); // false
```

#### `isIterable`

Checks if value is iterable, meaning it has a `[Symbol.iterator]` method and can be used in a `for...of` loop and spread operator.

```ts
isIterable(new Set([1, 2])); // true
isIterable(new Map()); // true
isIterable(new Map().keys()); // true
isIterable((function* () {})()); // true
isIterable({}); // false
```

#### `isPromise`

Checks if value is a native `Promise` instance.

```ts
isPromise(new Promise(() => {})); // true
isPromise({ then: () => {} }); // false
```

#### `isPromiseLike`

Checks if value is a promise-like object, meaning it has a `then` method.

```ts
isPromiseLike(new Promise(() => {})); // true
isPromiseLike({ then: () => {} }); // true
isPromiseLike({ then: 'foo' }); // false
```

#### `isError`

Checks if value is an instance of `Error`.

```ts
isError(new Error('foo')); // true
isError(new TypeError('foo')); // true
isError(new MyCustomError('foo')); // true
```

### Advanced Structural Guards

#### `isHasOwn`

Checks if object has an own property (not inherited).

```ts
class Cls {
    get key() {
        return 'value';
    }
}
const obj = { key: 'value' };

isHasOwn(obj, 'key'); // true
isHasOwn(new Cls(), 'key'); // false
isHasOwn('key')(obj); // support currying
```

#### `isHasIn`

Checks if property exists in object or its prototype chain.

```ts
isHasIn(obj, 'key'); // true
isHasIn(new Cls(), 'key'); // true
isHasIn('key')(obj); // support currying
```

#### `isInstanceOf`

Checks if value is instance of constructor using `instanceof`.

```ts
class A {}
class B extends A {}

isInstanceOf(new A(), A); // true
isInstanceOf(new B(), A); // true
```

#### `isInstanceExactOf`

Strict check that prototype is exactly the one from constructor (not a subclass).

```ts
isInstanceExactOf(new A(), A); // true
isInstanceExactOf(new B(), A); // false
```

### Combinators

#### `$not`

Inverts a given guard

```ts
const isNotString = $not(isString);
isNotString(123); // true
```

#### `$some`

Logical OR combinator: passes if any guard returns true.

```ts
const isStringOrNumber = $some(isString, isNumber);
isStringOrNumber('hello'); // true
isStringOrNumber(123); // true
```

#### `$every`

Logical AND combinator: passes if all guards return true.

```ts
const isStringAndNotEmpty = $every(isString, $not(isEmpty));
isStringAndNotEmpty('hello'); // true
isStringAndNotEmpty(''); // false
```

### Utility

#### `is`

Checks two values for equality using `Object.is` (or custom equality function).
Can be used for build more complex guards (e.g. `isObjectOf`, `isTupleOf` etc.).

```ts
is(123, 123); // true
is(123)(123); // support currying
```

#### `isAny`

A guard that always returns `true`. Useful as a wildcard in validations.

```ts
isAny(ANYTHING); // true
```

---

## Types

All guards follow this signature:

```ts
// basic guards with single argument
(value: unknown) => value is T

// guards with multiple arguments (isArrayOf, isTupleOf, isObjectOf, isInstanceOf, isHasOwn etc.)
// supports currying
(value: unknown, ...args: unknown[]) => value is T
(...args: unknown[]) => (value: unknown) => value is T
```

---

## License

MIT © Resetand
