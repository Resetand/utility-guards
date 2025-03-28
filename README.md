[npm-image]: http://img.shields.io/npm/v/utility-guards.svg
[npm-url]: http://npmjs.org/package/utility-guards
[codecov-image]: https://codecov.io/gh/Resetand/utility-guards/graph/badge.svg?token=W0mWVyiEng
[codecov-url]: https://codecov.io/gh/Resetand/utility-guards

<p align="center" dir="auto">

<h1 align="center">utility-guards</h1>
<h3 align="center">
Utils for runtime and static type checking in JS and TS
<br/>
All base type guards that you used to copy from project to project in one place
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

### **Features:**

-   🛠️ Reliable type checking for JS runtime
-   📦 Zero dependencies and only ~800 bytes gzipped size
-   📦 Tree-shaking friendly
-   🔩 Full Typescript guard support
-   🔩 Isomorphic: works in browser and node.js
-   🔑 Addon: `validate` and `validateStrict` validators for runtime values (object) validation

<br/>
<br/>

## `API Reference`

-   [`isString`](#isstringvalue)
-   [`isNumber`](#isnumbervalue)
-   [`isBoolean`](#isbooleanvalue)
-   [`isNaN`](#isnanvalue)
-   [`isUndefined`](#isundefinedvalue)
-   [`isNull`](#isnullvalue)
-   [`isNil`](#isnilvalue)
-   [`isPrimitive`](#isprimitivevalue)
-   [`isSymbol`](#issymbolvalue)
-   [`isRegExp`](#isregexpvalue)
-   [`isError`](#iserrorvalue)
-   [`isAnyObject`](#isanyobjectvalue)
-   [`isPlainObject`](#isplainobjectvalue)
-   [`isArray`](#isarrayvalue)
-   [`isFunction`](#isfunctionvalue)
-   [`isClass`](#isclassvalue)
-   [`isPromise`](#ispromisevalue)
-   [`isPromiseLike`](#ispromiselikevalue)
-   [`isIterable`](#isiterablevalue)
-   [`isDate`](#isdatevalue)
-   [`isHasOwn`](#ishasvalue-propertyname)
-   [`isHasIn`](#ishasinvalue-propertyname)
-   [`isArrayOf`](#isarrayofvalue-guard)
-   [`isInstanceOf`](#isinstanceofvalue-constructor)
-   [`isEmpty`](#isemptyvalue)
-   [`is`](#isvalue-expectedvalue)
-   [`$not`](#notguard)
-   [`$some`](#_some)
-   [`$every`](#_every)
-   [`validate`](#validatevalue-schema)
-   [`validateStrict`](#validatestrictvalue-schema)

<br/>

---

<br/>

```bash
npm install utility-guards
```

### Usage

```tsx
// using named imports (tree-shaking friendly)
import { isString, isNumber, isNil, $not } from 'utility-guards';

isString('42'); // true
isNumber(42); // false

isString('42'); // true
isNumber(42); // false
$not(isNil)(0); // true
```

```tsx
// using standalone imports (tree-shaking friendly)
import isString from 'utility-guards/isString';
import isNumber from 'utility-guards/isNumber';
import isNil from 'utility-guards/isNil';
import $not from 'utility-guards/not';

isString('42'); // true
isNumber(42); // false
$not(isNil)(0); // true
```

```tsx
// Using default import – `is` namespace object
import is from 'utility-guards';

is.String('42'); // true
is.Number(42); // false
is.$not(is.Nil)(0); // true
```

<br/>

## API

### `isString(value)`

Check if value is an string literal or string created by `String` constructor

```tsx
isString('abc'); // true
isString(new String('abc')); // true
isString(42); // false
```

---

### `isNumber(value)`

Check if value is an number literal or number created by `Number` constructor and **not `NaN`**

ℹ️ Although `NaN` is considered a number in JS, it's not a valid number and in most cases, you probably want to check it separately

```tsx
isNumber(42); // true
isNumber(new Number(42)); // true
isNumber('42'); // false
isNumber(NaN); // false
```

---

### `isBoolean(value)`

Check if value is an boolean

```tsx
isBoolean(true); // true
isBoolean(false); // true
isBoolean(42); // false
```

---

### `isNaN(value)`

Check if value is an NaN value.

ℹ️ This method is based on `Number.isNaN` and is not the same as global isNaN which converts value to number before checking

```tsx
isNaN(NaN); // true
isNaN(2 + {}); // true
isNaN(42); // false
isNaN({}); // false
```

---

### `isUndefined(value)`

Check if value is a undefined

```tsx
isUndefined(undefined); // true
isUndefined(null); // false
```

---

### `isNull(value)`

Check if value is a null

```tsx
isNull(null); // true
isNull(undefined); // false
```

---

### `isNil(value)`

Check if value is a null or undefined

```tsx
isNil(null); // true
isNil(undefined); // true
isNil(0); // false
```

---

### `isPrimitive(value)`

Check if value is a primitive

ℹ️ Primitive values in JS are: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`

```tsx
isPrimitive(42); // true
isPrimitive([1, 2, 3]); // false
```

---

### `isSymbol(value)`

Check if value is a `Symbol`

```tsx
isSymbol(Symbol('42')); // true
isSymbol('42'); // false
```

---

### `isRegExp(value)`

Check if value is a RegExp object or RegExp literal

```tsx
isRegExp(/\w+/); // true
isRegExp(new RegExp('\\w+')); // true
```

---

### `isError(value)`

Check if value is an JS Error object

```tsx
isError(new Error()); // true
isError(new TypeError()); // true
```

---

### `isAnyObject(value)`

Check if value is a language type object (except null)

ℹ️ This method is not type safe and may lead to unexpected runtime errors. You probably want to use `isPlainObject` instead

```tsx
isAnyObject({}); // true
isAnyObject([]); // true
isAnyObject(new Map()); // true
isAnyObject(new String()); // true
```

---

### `isPlainObject(value)`

Check if value is a plain JavaScript object (excluding special classes or objects with other prototypes). It may be object literal `{}`, instance created by `Object` constructor or using `Object.create(null | Object)`

```tsx
isPlainObject({}); // true
isPlainObject([]); // false
isPlainObject(new Map()); // false
isPlainObject(new String()); // false
```

---

### `isArray(value)`

Check if value is array

```tsx
isArray([]); // true
isArray({ 0: 'a', length: 10 }); // false
```

---

### `isFunction(value)`

Check if value is an any function (except ES class definition)

```tsx
isFunction(() => {}); // true
isFunction(function () {}); // true
isFunction(async function () {}); // true
isFunction(class {}); // false, although ES6 class is a constructor function in JS, it's  expected behavior
```

---

### `isAsyncFunction(value)`

Check if value is ES6 async function definition

```tsx
isAsyncFunction(async function () {}); // true
isAsyncFunction(async () => {}); // true
isAsyncFunction(() => {}); // false
```

---

### `isClass(value)`

Check if value is a ES6 class definition

```tsx
isClass(class {}); // true
isClass(() => {}); // false
isClass(function () {}); // false
```

---

### `isPromise(value)`

Check if value is a native promise object

```tsx
isPromise(Promise.resolve()); // true
isPromise(new Promise(() => {})); // true
isPromise({ then: () => {} }); // false
```

---

### `isPromiseLike(value)`

Check if value is a promise-like object (has `then` method)

```tsx
isPromiseLike(Promise.resolve()); // true
isPromiseLike(new Promise(() => {})); // true
isPromiseLike({ then: () => {} }); // true
```

---

### `isIterable(value)`

Check if value is iterable (arrays, strings, maps, sets, etc.)

```tsx
isIterable([]); // true
isIterable('42'); // true
isIterable(new Map()); // true
```

---

### `isDate(value)`

Check if value is a valid JS Date object

```tsx
isDate(new Date()); // true
isDate(new Date('Invalid Date')); // false
```

---

### `isHasOwn(value, propertyName)`

> `(value, propertyName) => boolean`\
> `(propertyName) => (value) => boolean`

Check if value is an any object and has a direct property with given name

> ℹ️ This method based on `Object.prototype.hasOwnProperty` and does not check prototype chain

```tsx
isHasOwn({ a: 42 }, 'a'); // true
isHasOwn({ a: 42 }, 'b'); // false
```

---

### `isHasIn(value, propertyName)`

> `(value, propertyName) => boolean`\
> `(propertyName) => (value) => boolean`

Check if value is an any object and has a direct or inherited property with given name

> ℹ️ This method based on `in` operator and checks prototype chain

```tsx
isHasIn({ a: 42 }, 'a'); // true
isHasIn({ a: 42 }, 'b'); // false
isHasIn({ a: 42 }, 'toString'); // true

class A {
    method() {}
}

isHasIn(new A(), 'method'); // true
```

---

### `isArrayOf(value, guard)`

> `(value, guard) => boolean`\
> `(guard) => (value) => boolean`

Check if value is an array and all elements of the array match a given guard

```tsx
isArrayOf([1, 2, 3], isNumber); // true
isArrayOf([1, 2, 3], isString); // false
```

---

### `isInstanceOf(value, constructor)`

> `(value, constructor) => boolean`\
> `(constructor) => (value) => boolean`

Check if value is instance of given constructor

> ℹ️ This method based on `instanceof` operator

```tsx
isInstanceOf(new Map(), Map); // true
isInstanceOf(new Map(), Set); // false
```

---

### `isEmpty(value)`

Check if value is empty.

> Value is considered as empty if it's:
>
> -   Empty object: `{}`
> -   Empty array: `[]`
> -   Empty Map: `new Map()`
> -   Empty Set: `new Set()`
> -   Empty string: `''`
> -   Nullable value: `null or undefined`

```tsx
isEmpty({}); // true
isEmpty(new Set()); // true
isEmpty(null); // true
isEmpty(''); // true
isEmpty(0); // false
```

---

### `is(value, expectedValue)`

> 💡 You can use `is` container as a guard function

> `(value, expectedValue) => boolean`\
> `(value, expectedValue, isEqual) => boolean`
>
> `(expectedValue) => (value) => boolean`\
> `(expectedValue, isEqual) => (value) => boolean`

Check if value is equal to a given expected value.

ℹ️ By default will use `Object.is` for comparison, but you can pass custom `isEqual` function as a third argument

```tsx
is(42, 42); // true

const isExactly42 = is(42);

isExactly42(42); // true
isExactly42('anything else'); // false
```

```tsx
import is from 'utility-guards';
import isEqual from 'lodash/isEqual';

const isMyObject = is({ a: 3 }, isEqual);

isMyObject({ a: 3 }); // true
isMyObject({ a: 3, b: 4 }); // false
```

---

## utility methods

> All methods that starts with `$` are utility methods for manipulating with guards

### `$not(guard)`

Inverse given guard

```tsx
const notIsNil = $not(isNil);

const arr = [1, null, 2, undefined, 3];
const filtered = arr.filter(notIsNil);

console.log(filtered); // [1, 2, 3] (type: number[])
```

### `$some(guard1, guard2, ...)`<a name="_some"></a>

Combine multiple guards with `some` logic (logical OR)

```tsx
const isNumberOrString = $some(isNumber, isString);

isNumberOrString(42); // true
isNumberOrString('42'); // true
isNumberOrString(true); // false
```

### `$every(guard1, guard2, ...)`<a name="_every"></a>

Combine multiple guards with `every` logic (logical AND)

```tsx
const isEmptyArray = $every(isArray, isEmpty);

isEmptyArray([]); // true
isEmptyArray([1, 2, 3]); // false
```

## `validate` addon

### `validate(value, schema)`

> `(value, schema) => boolean`\
> `(schema) => (value) => boolean`

Allows to validate runtime values (objects) with given schema or guard

### Usage

#### Validate object with schema

```tsx
import { validate, isString, isNil, isBoolean } from 'utility-guards';

const obj = JSON.parse('...');

const schema = {
    a: isNumber,
    b: $some(isString, isNil), // string or nil
    c: {
        d: isBoolean,
        e: {
            f: isNumber,
            g: isString,
        },
    },
};

if (validate(obj, schema)) {
    // type of obj is inferred
    // { a: number, b: string | null, c: { d: boolean, e: { f: number, g: string } } }
    obj.c.e.f; // OK
} else {
    obj.c.e.f; // TS Error
}
```

#### Validate array with schema

```tsx
import { validate, isString, isNil, isBoolean, isArrayOf } from 'utility-guards';

const arr = JSON.parse('...');

const schema = [
    isString,
    isNil, // string or nil
    {
        d: isBoolean,
        e: isArrayOf(isNumber), // array of numbers only
    },
];

if (validate(arr, schema)) {
    // type of arr is inferred
    // [string, string | null, { d: boolean, e: number[] }]
    arr[2].e[0]; // OK
} else {
    arr[2].e[0]; // TS Error
}
```

#### Validate function args

One of the useful use-cases is to validate overloaded function arguments

```ts
type FunctionExample = {
    (value: string): void;
    (value: string, otherValue: number): void;
    (value: string, otherValue: number[]): void;
};

const example: FunctionExample = (...args: unknown[]) => {
    if (validate(args, [isString])) {
        const [value] = args; // [string]
    }
    if (validate(args, [isString, isNumber])) {
        const [value, otherValue] = args; // [string, number]
    }
    if (validate(args, [isString, isArrayOf(isNumber)])) {
        const [value, otherValue] = args; // [string, number[]]
    }

    // fallback
};
```

#### Validate value with guard

```tsx
import { validate, isArray, isEmpty, isString, isNil, isBoolean, $every, $some } from 'utility-guards';

const value = JSON.parse('...');

validate(value, isNumber); // is number
validate(value, $some(isNumber, isString)); // is number | string
validate(value, $every(isArray, isEmpty)); // is []

validate([1, 2, 3], isArrayOf(isNumber)); // true
validate([1, 2, 3, 'asd'], isArrayOf(isNumber)); // false
```

### `validateStrict(value, schema)`

> `(value, schema) => boolean`\
> `(schema) => (value) => boolean`

ℹ️ Use `validateStrict` to check if object has all properties from schema

Same as `validate` but also checks if object no extra properties

```tsx
import { validateStrict, isString, isNumber } from 'utility-guards';

const schema = {
    a: isNumber,
    b: isString,
};

validateStrict({ a: 42, b: '42' }, schema); // true
validateStrict({ a: 42, b: '42', c: true }, schema); // false
validateStrict({ a: 42 }, schema); // false
```

<br/>

---

<br/>

### Compose and create custom guard

```tsx
const isOkCode = $some(is(200), is(201), is(202));

const isUserProfile = validate({
    id: isNumber,
    name: isString,
    age: $some(isNumber, isNil),
    avatarUrl: $some(isString, isNil),
});

const isSuccessResult = validate({
    ok: is(true),
    code: isOkCode,
    result: {
        id: is.Number,
        users: is.ArrayOf(isUserProfile),
    },
});

// true
isSuccessResult({
    ok: true,
    code: 200,
    result: [
        {
            id: 42,
            user: {
                id: 42,
                name: 'John',
                age: null,
                avatarUrl: null,
            },
        },
    ],
});
```
