# TS Types Guard util

Util for runtime types checking for JS(TS)

[![codecov][codecov-image]][codecov-url] [![NPM version][npm-image]][npm-url]

[npm-image]: http://img.shields.io/npm/v/ts-types-guard.svg
[npm-url]: http://npmjs.org/package/ts-types-guard
[codecov-image]: https://codecov.io/gh/Resetand/ts-types-guard/graph/badge.svg?token=W0mWVyiEng
[codecov-url]: https://codecov.io/gh/Resetand/ts-types-guard

```bash
npm install ts-types-guard
```

#### `Guards`

| Name                           | Description                                                                                                                                                       |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `is.String(value)`             | Checks is a value a string literal or string created by `String` constructor                                                                                      |
| `is.Number(value)`             | Checks is a value a number literal or number created by `Number` constructor                                                                                      |
| `is.Boolean(value)`            | Checks is a value a boolean                                                                                                                                       |
| `is.NaN(value)`                | Checks if a value is a NaN value                                                                                                                                  |
| `is.Nil(value)`                | Checks if a value is a null or undefined                                                                                                                          |
| `is.Symbol(value)`             | Checks if a value is a `Symbol`                                                                                                                                   |
| `is.RegExp(value)`             | Checks if a value is a RegExp object or RegExp literal                                                                                                            |
| `is.Error(value)`              | Checks if a value is an Error object                                                                                                                              |
| `is.Primitive(value)`          | Checks if a value is a primitive value                                                                                                                            |
| `is.PlainObject(value)`        | Checks if a value is a plain JavaScript object                                                                                                                    |
| `is.Array(value)`              | Checks if a value is array                                                                                                                                        |
| `is.Function(value)`           | Checks if a value is an any function                                                                                                                              |
| `is.Promise(value)`            | Checks if a value is a promise object                                                                                                                             |
| `is.Date(value)`               | Checks if a value is a valid JS Date object                                                                                                                       |
| `is.Empty(value)`              | Checks if a value is empty: Value is considered as empty if it's – empty object: `{}`, empty array: `[]`, empty string: `''`, nullable value: `null or undefined` |
| `is.HasKey(obj, propertyName)` | Checks if an object has a property                                                                                                                                |

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
