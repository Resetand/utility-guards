# TS Types Guard util

Util for runtime types checking for JS(TS)

[![codecov][codecov-image]][codecov-url] [![NPM version][npm-image]][npm-url]

[npm-image]: http://img.shields.io/npm/v/ts-types-guard.svg
[npm-url]: http://npmjs.org/package/ts-types-guard
[github-action-image]: https://github.com/Resetand/ts-types-guard/actions/workflows/ci.yaml/badge.svg
[github-action-url]: https://github.com/Resetand/ts-types-guard/actions/workflows/ci.yaml
[codecov-image]: https://codecov.io/gh/Resetand/ts-types-guard/branch/master/graph/badge.svg?token=OBD8KR7Y98
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
| `is.RegExp(value)`             | Checks if a value is a RegExp object                                                                                                                              |
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

const value: number | { property: 42 } = 32;

if (is.PlainObject(value)) {
    console.log(value.property); // ok
} else {
    value.property; // TS error
    value * 32; // TS error
}
```
