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
-   📦 tree-shaking friendly
-   🔩 Full Typescript guard support
-   🔩 Isomorphic: works in browser and node.js
-   🔑 Addon: `validate` and `validateStrict` validators for runtime values (object) validation

```bash
npm install utility-guards
```

### Usage

```tsx
// Using default import – `is` namespace object
import is from 'utility-guards';

is.String('42'); // true
is.Number(42); // false
is.$not(is.Nil)(0); // true
```

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
import $not from 'utility-guards/$not';

isString('42'); // true
isNumber(42); // false
$not(isNil)(0); // true
```

---

## `Guards`

#### `isString(value)` – Check if value a string literal or string created by `String` constructor

#### `isNumber(value)` – Check if value a number literal or number created by `Number` constructor

#### `isBoolean(value)` – Check if value a boolean

#### `isNaN(value)` – Check if value a NaN value

#### `isUndefined(value)` – Check if value is a undefined

#### `isNull(value)` – Check if value is a null

#### `isNil(value)` – Check if value is a null or undefined

#### `isPrimitive(value)` – Check if value is a primitive

#### `isSymbol(value)` – Check if value is a `Symbol`

#### `isRegExp(value)` – Check if value is a RegExp object or RegExp literal

#### `isError(value)` – Check if value is an JS Error object

#### `isAnyObject(value)` – Check if value is a language type object (except null)

#### `isPlainObject(value)` – Check if value is a plain JavaScript object

#### `isArray(value)` – Check if value is array

#### `isFunction(value)` – Check if value is an any function (except class definition)

#### `isClass(value)` – Check if value is a class definition

#### `isPromise(value)` – Check if value is a promise object

#### `isPromiseLike(value)` – Check if value is a promise-like object (has `then` method)

#### `isIterable(value)` – Check if value is iterable (arrays, strings, maps, sets, etc.)

#### `isDate(value)` – Check if value is a valid JS Date object

#### `isHasProperty(obj, propertyName)` – Check if an object has a property

#### `isArrayOf(array, guard)` – Check if all elements of array match given guard

#### `isInstanceOf(value, constructor)` – Check if value is instance of given constructor

#### `isEmpty(value)` – Check if value is empty.

> Value is considered as empty if it's:
>
> -   Empty object: `{}`
> -   Empty array: `[]`
> -   Empty Map: `new Map()`
> -   Empty Set: `new Set()`
> -   Empty string: `''`
> -   Nullable value: `null or undefined`

---

> All methods that starts with `$` are utility methods for manipulating with guards

#### `$not` – Inverse given guard

```tsx
import { $not } from 'utility-guards'; // or is.$not if you use default import
const notIsNil = $not(is.Nil);

const arr = [1, null, 2, undefined, 3];
const filtered = arr.filter(notIsNil);

console.log(filtered); // [1, 2, 3] (type: number[])
```

#### `$some` – Combine multiple guards with `some` logic (logical OR)

```tsx
import { $some, isNumber, isString } from 'utility-guards';

const isNumberOrString = $some(isNumber, isString);

isNumberOrString(42); // true
isNumberOrString('42'); // true
isNumberOrString(true); // false
```

#### `$every` – Combine multiple guards with `every` logic (logical AND)

```tsx
import { $every, isNumber, isArray } from 'utility-guards';

const isEmptyArray = $every(isArray, isEmpty);

isEmptyArray([]); // true
isEmptyArray([1, 2, 3]); // false
```

---

### is as a function guard

You can use `is` as a function guard.
It will check if value is equal to a given expected value.

Based on `Object.is` method for comparison

```tsx
import is from 'utility-guards';

is(42, 42); // true

const isNumber42 = is(42);
isNumber42(42); // true
```

### Curried guards

**ℹ️ Guards with extra arguments are curried functions**

```tsx
is.ArrayOf(42, is.Number); // valid
is.ArrayOf(is.Number)(42); // also valid

is.InstanceOf(null!, ArrayBuffer); // valid
is.InstanceOf(ArrayBuffer)(null!); // also valid
```

---

## `validate` addon

Allows to validate runtime values (objects) with given schema or guard

### Usage

```tsx
const obj = JSON.parse('...');

const schema = {
    a: is.Number,
    b: is.$some(is.String, is.Nil), // string or nil
    c: {
        d: is.Boolean,
        e: {
            f: is.Number,
            g: is.String,
        },
    },
};

if (validate(obj, schema)) {
    obj.c.e.f; // OK
} else {
    obj.c.e.f; // TS Error
}

// usage with guard
validate(42, is.Number); // true
validate(42, is.$some(is.Number, is.String)); // true
validate('42', is.$some(is.Number, is.String)); // true
validate([], is.Number); // false

validate([1, 2, 3], is.ArrayOf(is.Number)); // true
validate([1, 2, 3, 'asd'], is.ArrayOf(is.Number)); // false
```

ℹ️ Use `validateStrict` to check if object has all properties from schema

### Compose and create custom guard

```tsx
import is, { validate } from 'utility-guards';

function isExact<T>(expected: T) {
    return (value: unknown): value is T => Object.is(value, expected);
}

const isUserProfile = validate({
    id: is.Number,
    name: is.String,
    age: is.$some(is.Number, is.Nil),
    avatarUrl: is.$some(is.String, is.Nil),
});

const isSuccessResult = validate({
    ok: isExact(true),
    result: {
        id: is.Number,
        users: is.ArrayOf(isUserProfile),
    },
});

// true
isSuccessResult({
    ok: true,
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
