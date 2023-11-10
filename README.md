# TS Types Guard util

Util for runtime types checking for JS(TS)

[![codecov][codecov-image]][codecov-url] [![NPM version][npm-image]][npm-url]

[npm-image]: http://img.shields.io/npm/v/ts-types-guard.svg
[npm-url]: http://npmjs.org/package/ts-types-guard
[codecov-image]: https://codecov.io/gh/Resetand/ts-types-guard/graph/badge.svg?token=W0mWVyiEng
[codecov-url]: https://codecov.io/gh/Resetand/ts-types-guard

**Features:**

-   Full typescript guard support
-   Type inference for guards
-   Type inference for `guardsValidate` function

```bash
npm install ts-types-guard
```

```tsx
import is from 'ts-types-guard';
```

# `Guards`

| Name                           | Description                                                                                                                                                                                                    |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `is.String(value)`             | Check if value a string literal or string created by `String` constructor                                                                                                                                      |
| `is.Number(value)`             | Check if value a number literal or number created by `Number` constructor                                                                                                                                      |
| `is.Boolean(value)`            | Check if value a boolean                                                                                                                                                                                       |
| `is.NaN(value)`                | Check if value is a NaN value                                                                                                                                                                                  |
| `is.Nil(value)`                | Check if value is a null or undefined                                                                                                                                                                          |
| `is.Symbol(value)`             | Check if value is a `Symbol`                                                                                                                                                                                   |
| `is.RegExp(value)`             | Check if value is a RegExp object or RegExp literal                                                                                                                                                            |
| `is.Error(value)`              | Check if value is an JS Error object                                                                                                                                                                           |
| `is.Primitive(value)`          | Check if value is a primitive                                                                                                                                                                                  |
| `is.PlainObject(value)`        | Check if value is a plain JavaScript object                                                                                                                                                                    |
| `is.Array(value)`              | Check if value is array                                                                                                                                                                                        |
| `is.Function(value)`           | Check if value is an any function                                                                                                                                                                              |
| `is.Promise(value)`            | Check if value is a promise object                                                                                                                                                                             |
| `is.PromiseLike(value)`        | Check if value is a promise-like object (has `then` method)                                                                                                                                                    |
| `is.Iterable(value)`           | Check if value is iterable (arrays, strings, maps, sets, etc.)                                                                                                                                                 |
| `is.InstanceOf(value)`         | Check if value is instance of given constructor                                                                                                                                                                |
| `is.Date(value)`               | Check if value is a valid JS Date object                                                                                                                                                                       |
| `is.Empty(value)`              | Check if value is empty: Value is considered as empty if it's – empty object: `{}`, empty array: `[]`, empty Map: `new Map()`, empty Set: `new Set()`, empty string: `''`, nullable value: `null or undefined` |
| `is.HasKey(obj, propertyName)` | Check if an object has a property                                                                                                                                                                              |
| `is.ArrayOf(array, guard)`     | Check if all elements of array match given guard                                                                                                                                                               |

## Usage

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

# `guardsValidate`

## Usage

```tsx
import { guardsValidate } from 'ts-types-guard';

const obj = ...
const schema: TypeSchema<typeof obj> = {
    a: is.Number,
    b: [is.String, is.Nil], // string or nil
    c: {
        d: is.Boolean,
        e: {
            f: is.Number,
            g: is.String,
        },
    },
};

if (guardsValidate(obj, schema)) {
    obj.c.e.f // OK
} else {
    obj.c.e.f // TS Error
}

// usage with guard
guardsValidate(42, is.Number) // true
guardsValidate(42, [is.Number, is.String]) // true
guardsValidate('42', [is.Number, is.String]) // true
guardsValidate([], is.Number) // false
```
