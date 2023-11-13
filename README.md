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
| `is.Function(value)`                | Check if value is an any function                                         |
| `is.Promise(value)`                 | Check if value is a promise object                                        |
| `is.PromiseLike(value)`             | Check if value is a promise-like object (has `then` method)               |
| `is.Iterable(value)`                | Check if value is iterable (arrays, strings, maps, sets, etc.)            |
| `is.Date(value)`                    | Check if value is a valid JS Date object                                  |
| `is.Empty(value)`                   | Check if value is empty                                                   |
| `is.HasKey(obj, propertyName)`      | Check if an object has a property                                         |
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
import is from 'ts-types-guard';

type Data = {
    prop1: number,
    prop2: string,
}

const dataOrNil: Data | null | undefined = ...

if (!is.Nil(dataOrNil)) {
    console.log(dataOrNil.prop1) // OK
} else {
    console.log(dataOrNil.prop2) // TS Error
}


const dataOrCallback: Data | (() => Data) = ...
const resolvedData = is.Function(dataOrCallback) ? dataOrCallback() : dataOrCallback

const dataArr: Data[] = []

if (is.Empty(dataArr)) {
    // nil or no elements
    console.log('Array is empty')
}
```

### `$` Utility methods

#### `$some` and `$every`

Combine multiple guards with `some` or `every` logic

```tsx
const isNumberOrString = is.$some(is.Number, is.String);
const isArrayWithAttribute = is.$every(is.Array, is.HasKey('attr'));

isNumberOrString(42); // true
isNumberOrString('42'); // true

const arrWithAttr = [1, 2, 3];
arrWithAttr.attr = 42;
isArrayWithAttribute(arrWithAttr); // true

isArrayWithAttribute([1, 2, 3]); // false
```

#### `$not`

Inverse given guard

```tsx
const notIsNil = is.$not(is.Nil);

const arr = [1, null, 2, undefined, 3];
const filtered = arr.filter(notIsNil);

console.log(filtered); // [1, 2, 3] (type: number[])
```

## `validate`

### Usage

```tsx
import { validate } from 'ts-types-guard';

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
    obj.c.e.f // OK
} else {
    obj.c.e.f // TS Error
}

// usage with guard
validate(42, is.Number) // true
validate(42, is.$some(is.Number, is.String)) // true
validate('42', is.$some(is.Number, is.String)) // true
validate([], is.Number) // false

validate([1,2,3], is.ArrayOf(is.Number))) // true
validate([1,2,3, 'asd'], is.ArrayOf(is.Number))) // false
```

ℹ️ Use `validateStrict` to check if object has all properties from schema
