# TS Types Guard util

Util for runtime types checking for JS(TS)

[![NPM version][npm-image]][npm-url]

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

| Name            | Description                                                                                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **String**      | Checks is a value a string literal or string created by `String` constructor                                                                                   |
| **Number**      | Checks is a value a number literal or number created by `Number` constructor                                                                                   |
| **Boolean**     | Checks is a value a boolean                                                                                                                                    |
| **NaN**         | Checks if value is a NaN value                                                                                                                                 |
| **Nil**         | Checks if value is a null or undefined                                                                                                                         |
| **Primitive**   | Check if value is a primitive                                                                                                                                  |
| **PlainObject** | Check if value is a plain JavaScript object                                                                                                                    |
| **HasKey**      | Check if object has own property                                                                                                                               |
| **Array**       | Check if value is array                                                                                                                                        |
| **Function**    | Check if value is an any function                                                                                                                              |
| **Promise**     | Check if value is a promise object                                                                                                                             |
| **Date**        | Check if value is a valid JS date                                                                                                                              |
| **Empty**       | Check if value is empty: Value is considered as empty if it's – empty object: `{}`, empty array: `[]`, empty string: `''`, nullable value: `null or undefined` |

## Usage

```tsx
import is from 'ts-types-guard';

const value: number | { property: 42 } = 32;

if (is.PlainObject(value)) {
    console.log(value.property); // ok
}

value.property; // TS error
value * 32; // TS error
```
