[npm-image]: http://img.shields.io/npm/v/ts-types-guard.svg
[npm-url]: http://npmjs.org/package/ts-types-guard
[codecov-image]: https://codecov.io/gh/Resetand/ts-types-guard/graph/badge.svg?token=W0mWVyiEng
[codecov-url]: https://codecov.io/gh/Resetand/ts-types-guard

<p align="center" dir="auto">
<img src="https://github.com/Resetand/ts-types-guard/blob/main/assets/logo.png?raw=true" width="80%" />
<br/>
<strong style='font-size: 1.5em'>Util for runtime types checking for JS(TS)</strong>
</p>

<p align="center">
  <a href="https://npmjs.com/package/ts-types-guard"><img src="https://img.shields.io/npm/v/ts-types-guard.svg" alt="npm package"></a>
  <a href="https://codecov.io/gh/Resetand/ts-types-guard"><img src="https://codecov.io/gh/Resetand/ts-types-guard/graph/badge.svg?token=W0mWVyiEng" alt="codecov"></a>
  <a href="https://npmjs.com/package/ts-types-guard"><img src="https://img.shields.io/bundlejs/size/ts-types-guard" alt="package gzipped size"></a>
</p>
<br/>
<br/>

# TS Types Guard

### **Features:**

-   🛠️ Reliable type checking for JS runtime
-   📦 Zero dependencies and only ~800 bytes gzipped size
-   🔩 Full Typescript guard support
-   🔩 Isomorphic: works in browser and node.js
-   🔑 Addon: `validate` and `validateStrict` validators for runtime values (object) validation

```bash
npm install ts-types-guard
```

```tsx
import is from 'ts-types-guard';
```

## `Guards`

| Name                                | Description                                                               |
| ----------------------------------- | ------------------------------------------------------------------------- |
| `is.String(value)`                  | Check if value a string literal or string created by `String` constructor |
| `is.Number(value)`                  | Check if value a number literal or number created by `Number` constructor |
| `is.Boolean(value)`                 | Check if value a boolean                                                  |
| `is.NaN(value)`                     | Check if value is a NaN value                                             |
| `is.Nil(value)`                     | Check if value is a null or undefined                                     |
| `is.Symbol(value)`                  | Check if value is a `Symbol`                                              |
| `is.RegExp(value)`                  | Check if value is a RegExp object or RegExp literal                       |
| `is.Error(value)`                   | Check if value is an JS Error object                                      |
| `is.Primitive(value)`               | Check if value is a primitive                                             |
| `is.PlainObject(value)`             | Check if value is a plain JavaScript object                               |
| `is.Array(value)`                   | Check if value is array                                                   |
| `is.Function(value)`                | Check if value is an any function (except class definition)               |
| `is.Class(value)`                   | Check if value is a class definition                                      |
| `is.Promise(value)`                 | Check if value is a promise object                                        |
| `is.PromiseLike(value)`             | Check if value is a promise-like object (has `then` method)               |
| `is.Iterable(value)`                | Check if value is iterable (arrays, strings, maps, sets, etc.)            |
| `is.Date(value)`                    | Check if value is a valid JS Date object                                  |
| `is.Empty(value)`                   | Check if value is empty                                                   |
| `is.HasProperty(obj, propertyName)` | Check if an object has a property                                         |
| `is.ArrayOf(array, guard)`          | Check if all elements of array match given guard                          |
| `is.InstanceOf(value, constructor)` | Check if value is instance of given constructor                           |

**ℹ️ Value is considered as empty if it's**

-   Empty object: `{}`
-   Empty array: `[]`
-   Empty Map: `new Map()`
-   Empty Set: `new Set()`
-   Empty string: `''`
-   Nullable value: `null or undefined`

### Usage

```tsx
import is from 'ts-guards';

const value: string | number = get();

if (is.String(value)) {
    value.toUpperCase(); // Ensures that value is string
} else {
    value.toFixed(); // Ensures that value is number
}
```

```tsx
type Data = { prop1: number; prop2: string };

const dataOrNil = null! as Data | null | undefined;

if (!is.Nil(dataOrNil)) {
    console.log(dataOrNil.prop1); // OK
} else {
    console.log(dataOrNil.prop2); // TS Error
}
```

### `$` Utility methods

#### `$not`

Inverse given guard

```tsx
const notIsNil = is.$not(is.Nil);

const arr = [1, null, 2, undefined, 3];
const filtered = arr.filter(notIsNil);

console.log(filtered); // [1, 2, 3] (type: number[])
```

#### `$some` and `$every`

Combine multiple guards with `some` or `every` logic

```tsx
const isNumberOrString = is.$some(is.Number, is.String);
const isEmptyArray = is.$every(is.Array, is.Empty);

isNumberOrString(42); // true
isNumberOrString('42'); // true

isEmptyArray([]); // true
isEmptyArray([1, 2, 3]); // false
```

### Curried guards

**ℹ️ Guards with extra arguments are curried functions**

```tsx
is.ArrayOf(42, is.Number); // valid
is.ArrayOf(is.Number)(42); // also valid

is.InstanceOf(null!, ArrayBuffer); // valid
is.InstanceOf(ArrayBuffer)(null!); // also valid
```

```tsx
import is, { validate } from 'ts-types-guard';
const value = JSON.parse('...');

// validate also supports currying
validate(value, { someProp: is.ArrayOf(is.Number) }); // valid
validate({ someProp: is.ArrayOf(is.Number) })(valid); // valid
```

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
