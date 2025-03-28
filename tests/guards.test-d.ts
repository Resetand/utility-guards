import {
    isString,
    isNumber,
    isBoolean,
    isUndefined,
    isNull,
    isFunction,
    isAsyncFunction,
    isPrimitive,
    isDate,
    isSymbol,
    isRegExp,
    isError,
    isArray,
    isAnyObject,
    isPlainObject,
    isHasOwn,
    isHasIn,
    isNil,
    isPromise,
    isPromiseLike,
    isIterable,
    isInstanceOf,
    isExactInstanceOf,
    isEmpty,
    isFalsy,
    isArrayOf,
    isNaN,
    isAny,
    isClass,
    isBigInt,
    $not,
    $every,
    $some,
} from '../src';

import { describe, test, expectTypeOf } from 'vitest';
import { withValue } from './utils';
import { AnyAsyncFunction, AnyFunction, Class } from '../src/_types';

class Cls {}
class CustomError extends Error {
    unique = true;
}

describe('guards static typing tests', () => {
    test('Should check isString typing', () => {
        type LiteralUnion<T extends U, U = string> = T | (U & { _?: never });

        withValue((v: unknown) => {
            isString(v) && expectTypeOf(v).toEqualTypeOf<string>();
        });

        withValue((v: string) => {
            isString(v) && expectTypeOf(v).toEqualTypeOf<string>();
        });

        withValue((v: number) => {
            isString(v) && expectTypeOf(v).toEqualTypeOf<never>();
        });

        withValue((v: '' | number[]) => {
            isString(v) && expectTypeOf(v).toEqualTypeOf<''>();
        });

        withValue((v: LiteralUnion<'a' | 'b'>) => {
            isString(v) && expectTypeOf(v).toEqualTypeOf<LiteralUnion<'a' | 'b'>>();
        });
    });

    test('Should check isNumber typing', () => {
        withValue((v: number) => {
            isNumber(v) && expectTypeOf(v).toEqualTypeOf<number>();
        });

        withValue((v: number) => {
            isNumber(v) && expectTypeOf(v).toEqualTypeOf<number>();
        });

        withValue((v: 0 | string) => {
            isNumber(v) && expectTypeOf(v).toEqualTypeOf<0>();
        });

        withValue((v: string) => {
            isNumber(v) && expectTypeOf(v).toEqualTypeOf<never>();
        });
    });

    test('Should check isBoolean typing', () => {
        withValue((v: unknown) => {
            isBoolean(v) && expectTypeOf(v).toEqualTypeOf<boolean>();
        });

        withValue((v: boolean) => {
            isBoolean(v) && expectTypeOf(v).toEqualTypeOf<boolean>();
        });

        withValue((v: true | string) => {
            isBoolean(v) && expectTypeOf(v).toEqualTypeOf<true>();
        });

        withValue((v: string) => {
            isBoolean(v) && expectTypeOf(v).toEqualTypeOf<never>();
        });
    });

    test('Should check isUndefined typing', () => {
        withValue((v: unknown) => {
            isUndefined(v) && expectTypeOf(v).toEqualTypeOf<undefined>();
        });

        withValue((v: undefined) => {
            isUndefined(v) && expectTypeOf(v).toEqualTypeOf<undefined>();
        });

        withValue((v: string) => {
            isUndefined(v) && expectTypeOf(v).toEqualTypeOf<never>();
        });
    });

    test('Should check isNull typing', () => {
        withValue((v: unknown) => {
            isNull(v) && expectTypeOf(v).toEqualTypeOf<null>();
        });

        withValue((v: null) => {
            isNull(v) && expectTypeOf(v).toEqualTypeOf<null>();
        });

        withValue((v: string) => {
            isNull(v) && expectTypeOf(v).toEqualTypeOf<never>();
        });
    });

    test('Should check isNil typing', () => {
        withValue((v: unknown) => {
            isNil(v) && expectTypeOf(v).toEqualTypeOf<null | undefined>();
        });

        withValue((v: null) => {
            isNil(v) && expectTypeOf(v).toEqualTypeOf<null>();
        });

        withValue((v: undefined) => {
            isNil(v) && expectTypeOf(v).toEqualTypeOf<undefined>();
        });

        withValue((v: string | undefined) => {
            isNil(v) && expectTypeOf(v).toEqualTypeOf<undefined>();
        });

        withValue((v: string | null) => {
            isNil(v) && expectTypeOf(v).toEqualTypeOf<null>();
        });
    });

    test('Should check isFunction typing', () => {
        type ExampleCallback = (a: number, b: string) => boolean;
        type Dict = Record<string, unknown>;
        type FunctionWithProps = ExampleCallback & { prop: number };

        withValue((v: unknown) => {
            isFunction(v) && expectTypeOf(v).toEqualTypeOf<AnyFunction>();
        });

        withValue((v: ExampleCallback) => {
            isFunction(v) && expectTypeOf(v).toEqualTypeOf<ExampleCallback>();
        });

        withValue((v: null) => {
            isFunction(v) && expectTypeOf(v).toEqualTypeOf<never>();
        });

        withValue((v: Dict) => {
            isFunction(v) && expectTypeOf(v).toEqualTypeOf<Dict & AnyFunction>();
        });

        withValue((v: FunctionWithProps | { prop: number }) => {
            isFunction(v) && expectTypeOf(v).toEqualTypeOf<FunctionWithProps>();
        });
    });

    test('Should check isAsyncFunction typing', () => {
        type ExampleCallback = (a: number, b: string) => boolean;
        type Dict = Record<string, unknown>;

        withValue((v: unknown) => {
            isAsyncFunction(v) && expectTypeOf(v).toEqualTypeOf<AnyAsyncFunction>();
        });

        withValue((v: ExampleCallback) => {
            isAsyncFunction(v) && expectTypeOf(v).toEqualTypeOf<ExampleCallback & AnyAsyncFunction>();
        });

        withValue((v: null) => {
            isAsyncFunction(v) && expectTypeOf(v).toEqualTypeOf<never>();
        });

        withValue((v: Dict) => {
            isAsyncFunction(v) && expectTypeOf(v).toEqualTypeOf<Dict & AnyAsyncFunction>();
        });
    });

    test('Should check isClass typing', () => {
        withValue((v: unknown) => {
            isClass(v) && expectTypeOf(v).toEqualTypeOf<Class>();
            isClass(v) && expectTypeOf(v).instance.toEqualTypeOf<unknown>();
        });

        withValue((v: Class<Cls> | null) => {
            isClass(v) && expectTypeOf(v).toEqualTypeOf<Class<Cls>>();
            isClass(v) && expectTypeOf(v).instance.toEqualTypeOf<Cls>();
        });

        withValue((v: AnyFunction) => {
            isClass(v) && expectTypeOf(v).toEqualTypeOf<AnyFunction & Class>();
            isClass(v) && expectTypeOf(v).instance.toEqualTypeOf<unknown>();
        });

        withValue((v: Class<Cls> | Class<CustomError>) => {
            isClass(v) && expectTypeOf(v).toEqualTypeOf<Class<Cls> | Class<CustomError>>();
        });
    });

    test('Should check isEmpty typing', () => {
        type AnyEmptyValue = [] | Record<PropertyKey, never> | '' | Set<never> | Map<never, never> | null | undefined;

        withValue((v: unknown) => {
            isEmpty(v) && expectTypeOf(v).toEqualTypeOf<AnyEmptyValue>();
        });

        withValue((v: string) => {
            isEmpty(v) && expectTypeOf(v).toEqualTypeOf<''>();
        });

        withValue((v: Record<string, number>) => {
            isEmpty(v) && expectTypeOf(v).toEqualTypeOf<Record<PropertyKey, never>>();
        });

        withValue((v: Set<number>) => {
            isEmpty(v) && expectTypeOf(v).toEqualTypeOf<Set<never>>();
        });

        withValue((v: Map<string, number>) => {
            isEmpty(v) && expectTypeOf(v).toEqualTypeOf<Map<never, never>>();
        });

        withValue((v: null) => {
            isEmpty(v) && expectTypeOf(v).toEqualTypeOf<null>();
        });

        withValue((v: undefined) => {
            isEmpty(v) && expectTypeOf(v).toEqualTypeOf<undefined>();
        });

        withValue((v: '' | 0 | number[] | null) => {
            isEmpty(v) && expectTypeOf(v).toEqualTypeOf<'' | [] | null>();
        });

        withValue((v: AnyFunction) => {
            isEmpty(v) && expectTypeOf(v).toEqualTypeOf<AnyEmptyValue & AnyFunction>();
        });
    });

    test('Should check isArray typing', () => {
        type ArrayWithProps = number[] & { prop: number };

        withValue((v: unknown) => {
            isArray(v) && expectTypeOf(v).toEqualTypeOf<unknown[]>();
        });

        withValue((v: number[]) => {
            isArray(v) && expectTypeOf(v).toEqualTypeOf<number[]>();
        });

        withValue((v: string | number[]) => {
            isArray(v) && expectTypeOf(v).toEqualTypeOf<number[]>();
        });

        withValue((v: ArrayWithProps | string | Iterable<number>) => {
            isArray(v) && expectTypeOf(v).toEqualTypeOf<ArrayWithProps>();
        });
    });

    test('Should check isArrayOf typing', () => {
        type ArrayWithProps = number[] & { prop: number };

        withValue((v: unknown) => {
            isArrayOf(isNumber)(v) && expectTypeOf(v).toEqualTypeOf<number[]>();
        });

        withValue((v: number[]) => {
            isArrayOf(isNumber)(v) && expectTypeOf(v).toEqualTypeOf<number[]>();
        });

        withValue((v: (string | number)[]) => {
            isArrayOf(isNumber)(v) && expectTypeOf(v).toEqualTypeOf<number[]>();
        });

        withValue((v: ArrayWithProps | string[]) => {
            isArrayOf(isNumber)(v) && expectTypeOf(v).toEqualTypeOf<ArrayWithProps>();
        });
    });

    test('Should check isInstanceOf typing', () => {
        withValue((v: unknown) => {
            isInstanceOf(v, Cls) && expectTypeOf(v).toEqualTypeOf<Cls>();
        });

        withValue((v: unknown) => {
            isInstanceOf(Cls)(v) && expectTypeOf(v).toEqualTypeOf<Cls>();
        });

        withValue((v: unknown) => {
            isInstanceOf(v, CustomError) && expectTypeOf(v).toEqualTypeOf<CustomError>();
        });

        withValue((v: unknown) => {
            isInstanceOf(CustomError)(v) && expectTypeOf(v).toEqualTypeOf<CustomError>();
        });
    });

    test('Should check isExactInstanceOf typing', () => {
        withValue((v: unknown) => {
            isExactInstanceOf(v, Cls) && expectTypeOf(v).toEqualTypeOf<Cls>();
        });

        withValue((v: unknown) => {
            isExactInstanceOf(Cls)(v) && expectTypeOf(v).toEqualTypeOf<Cls>();
        });

        withValue((v: unknown) => {
            isExactInstanceOf(v, CustomError) && expectTypeOf(v).toEqualTypeOf<CustomError>();
        });

        withValue((v: unknown) => {
            isExactInstanceOf(CustomError)(v) && expectTypeOf(v).toEqualTypeOf<CustomError>();
        });
    });

    test('Should check isHasOwn typing', () => {
        type PropShape<T = unknown> = { prop: T };
        type AnotherShape<T = string> = { another: T };

        withValue((v: unknown) => {
            isHasOwn(v, 'prop') && expectTypeOf(v).toEqualTypeOf<PropShape>();
        });

        withValue((v: unknown) => {
            isHasOwn('prop')(v) && expectTypeOf(v).toEqualTypeOf<PropShape>();
        });

        withValue((v: PropShape<number>) => {
            isHasOwn('prop')(v) && expectTypeOf(v).toEqualTypeOf<PropShape<number>>();
        });

        withValue((v: AnotherShape) => {
            isHasOwn(v, 'prop') && expectTypeOf(v).toEqualTypeOf<PropShape & AnotherShape>();
        });

        withValue((v: AnotherShape) => {
            isHasOwn('prop')(v) && expectTypeOf(v).toEqualTypeOf<PropShape & AnotherShape>();
        });

        withValue((v: AnyFunction) => {
            isHasOwn(v, 'prop') && expectTypeOf(v).toEqualTypeOf<AnyFunction & PropShape>();
        });

        withValue((v: { a: number } | undefined) => {
            isHasOwn('a')(v) && expectTypeOf(v).toEqualTypeOf<{ a: number }>();
        });

        withValue((v: { a: number } | { b: string } | undefined | string) => {
            isHasOwn('a')(v) && expectTypeOf(v).toEqualTypeOf<{ a: number }>();
        });

        withValue((v: null) => {
            isHasOwn(v, 'prop') && expectTypeOf(v).toEqualTypeOf<never>();
        });
    });

    test('Should check isHasIn typing', () => {
        type PropShape<T = unknown> = { prop: T };
        type AnotherShape<T = string> = { another: T };

        withValue((v: unknown) => {
            isHasIn(v, 'prop') && expectTypeOf(v).toEqualTypeOf<PropShape>();
        });

        withValue((v: unknown) => {
            isHasIn('prop')(v) && expectTypeOf(v).toEqualTypeOf<PropShape>();
        });

        withValue((v: AnotherShape) => {
            isHasIn(v, 'prop') && expectTypeOf(v).toEqualTypeOf<PropShape & AnotherShape>();
        });

        withValue((v: AnotherShape) => {
            isHasIn('prop')(v) && expectTypeOf(v).toEqualTypeOf<PropShape & AnotherShape>();
        });

        withValue((v: AnyFunction) => {
            isHasIn(v, 'prop') && expectTypeOf(v).toEqualTypeOf<AnyFunction & PropShape>();
        });

        withValue((v: null) => {
            isHasIn(v, 'prop') && expectTypeOf(v).toEqualTypeOf<never>();
        });
    });

    test('Should check isPromise typing', () => {
        withValue((v: unknown) => {
            isPromise(v) && expectTypeOf(v).toEqualTypeOf<Promise<unknown>>();
        });

        withValue((v: Promise<number> | number) => {
            isPromise(v) && expectTypeOf(v).toEqualTypeOf<Promise<number>>();
        });
    });

    test('Should check isPromiseLike typing', () => {
        withValue((v: unknown) => {
            isPromiseLike(v) && expectTypeOf(v).toEqualTypeOf<PromiseLike<unknown>>();
        });

        withValue((v: Promise<number> | number) => {
            isPromiseLike(v) && expectTypeOf(v).toEqualTypeOf<Promise<number>>();
        });

        withValue((v: PromiseLike<number> | number) => {
            isPromiseLike(v) && expectTypeOf(v).toEqualTypeOf<PromiseLike<number>>();
        });
    });

    test('Should check isIterable typing', () => {
        withValue((v: unknown) => {
            isIterable(v) && expectTypeOf(v).toEqualTypeOf<Iterable<unknown>>();
        });

        withValue((v: Iterable<number> | number) => {
            isIterable(v) && expectTypeOf(v).toEqualTypeOf<Iterable<number>>();
        });

        withValue((v: string | number) => {
            isIterable(v) && expectTypeOf(v).toEqualTypeOf<string>();
        });

        withValue((v: string[] | number | AnyFunction) => {
            isIterable(v) && expectTypeOf(v).toEqualTypeOf<string[]>();
        });
    });

    test('Should check isRegExp typing', () => {
        withValue((v: unknown) => {
            isRegExp(v) && expectTypeOf(v).toEqualTypeOf<RegExp>();
        });

        withValue((v: RegExp | string) => {
            isRegExp(v) && expectTypeOf(v).toEqualTypeOf<RegExp>();
        });
    });

    test('Should check isSymbol typing', () => {
        withValue((v: unknown) => {
            isSymbol(v) && expectTypeOf(v).toEqualTypeOf<symbol>();
        });

        withValue((v: symbol | string) => {
            isSymbol(v) && expectTypeOf(v).toEqualTypeOf<symbol>();
        });

        withValue((v: string) => {
            isSymbol(v) && expectTypeOf(v).toEqualTypeOf<never>();
        });
    });

    test('Should check isError typing', () => {
        withValue((v: unknown) => {
            isError(v) && expectTypeOf(v).toEqualTypeOf<Error>();
        });

        withValue((v: Error | string) => {
            isError(v) && expectTypeOf(v).toEqualTypeOf<Error>();
        });

        withValue((v: null) => {
            isError(v) && expectTypeOf(v).toEqualTypeOf<never>();
        });
    });

    test('Should check isError typing', () => {
        withValue((v: unknown) => {
            isError(v) && expectTypeOf(v).toEqualTypeOf<Error>();
        });

        withValue((v: Error | string) => {
            isError(v) && expectTypeOf(v).toEqualTypeOf<Error>();
        });

        withValue((v: null) => {
            isError(v) && expectTypeOf(v).toEqualTypeOf<never>();
        });
    });

    test('Should check isPlainObject typing', () => {
        type Shape = { a: number; b: string };

        type ComplexType = string | number | Iterable<ComplexType> | boolean | null | undefined;

        withValue((v: unknown) => {
            isPlainObject(v) && expectTypeOf(v).toEqualTypeOf<{ [key: string]: unknown }>();
        });

        withValue<Record<string, unknown> | string | string[] | Function>((v) => {
            isPlainObject(v) && expectTypeOf(v).toEqualTypeOf<Record<string, unknown>>();
        });

        withValue((v: Shape | AnyFunction) => {
            isPlainObject(v) && expectTypeOf(v).toEqualTypeOf<Shape>();
        });

        withValue((v: Cls | Record<string, unknown>) => {
            isPlainObject(v) && expectTypeOf(v).toEqualTypeOf<Record<string, unknown>>();
        });

        withValue((v: ComplexType | Shape) => {
            isPlainObject(v) && expectTypeOf(v).toEqualTypeOf<Shape>();
        });
    });

    test('Should check isAnyObject typing', () => {
        type Shape = { a: number; b: string };

        withValue((v: unknown) => {
            isAnyObject(v) && expectTypeOf(v).toEqualTypeOf<object>();
        });
        withValue((v: Record<string, unknown>) => {
            isAnyObject(v) && expectTypeOf(v).toEqualTypeOf<Record<string, unknown>>();
        });
        withValue((v: null | Function | string | { some: number } | Cls) => {
            isAnyObject(v) && expectTypeOf(v).toEqualTypeOf<Function | { some: number } | Cls>();
        });

        withValue((v: Shape | Cls) => {
            isAnyObject(v) && expectTypeOf(v).toEqualTypeOf<Shape | Cls>();
        });
    });

    test('Should check isPrimitive typing', () => {
        type Primitive = string | number | bigint | boolean | symbol | null | undefined;

        withValue((v: unknown) => {
            isPrimitive(v) && expectTypeOf(v).toEqualTypeOf<Primitive>();
        });

        withValue((v: Primitive) => {
            isPrimitive(v) && expectTypeOf(v).toEqualTypeOf<Primitive>();
        });

        withValue((v: null | AnyFunction | string) => {
            isPrimitive(v) && expectTypeOf(v).toEqualTypeOf<null | string>();
        });
    });

    test('Should check isNaN typing', () => {
        withValue((v: unknown) => {
            isNaN(v) && expectTypeOf(v).toEqualTypeOf<number>();
        });

        withValue((v: number) => {
            isNaN(v) && expectTypeOf(v).toEqualTypeOf<number>();
        });

        withValue((v: number) => {
            !isNaN(v) && expectTypeOf(v).toEqualTypeOf<number>();
        });

        withValue((v: string) => {
            isNaN(v) && expectTypeOf(v).toEqualTypeOf<never>();
        });
    });

    test('Should check isFalsy typing', () => {
        type Falsy = '' | 0 | false | null | undefined;

        withValue((v: unknown) => {
            isFalsy(v) && expectTypeOf(v).toEqualTypeOf<Falsy>();
        });

        withValue((v: '' | 0 | false | null | undefined) => {
            isFalsy(v) && expectTypeOf(v).toEqualTypeOf<'' | 0 | false | null | undefined>();
        });

        withValue((v: symbol) => {
            isFalsy(v) && expectTypeOf(v).toEqualTypeOf<never>();
        });
    });

    test('Should check isAny typing', () => {
        withValue((v: unknown) => {
            isAny(v) && expectTypeOf(v).toEqualTypeOf<any>();
        });

        withValue((v: null) => {
            isAny(v) && expectTypeOf(v).toEqualTypeOf<null>();
        });
    });

    test('Should check isDate typing', () => {
        withValue((v: unknown) => {
            isDate(v) && expectTypeOf(v).toEqualTypeOf<Date>();
        });

        withValue((v: Date) => {
            isDate(v) && expectTypeOf(v).toEqualTypeOf<Date>();
        });

        withValue((v: null) => {
            isDate(v) && expectTypeOf(v).toEqualTypeOf<never>();
        });
    });
});

describe('utility static typing tests', () => {
    test('Should check $not typing', () => {
        withValue((v: unknown) => {
            $not(isNumber)(v) && expectTypeOf(v).toEqualTypeOf<unknown>();
        });

        withValue((v: string | { a: 1 } | number) => {
            $not(isNumber)(v) && expectTypeOf(v).toEqualTypeOf<string | { a: 1 }>();
            $not(isNumber)(v) && expectTypeOf(v).not.toEqualTypeOf<number>();
        });

        withValue((v: null) => {
            $not(isNull)(v) && expectTypeOf(v).toEqualTypeOf<never>();
            $not(isNull)(v) && expectTypeOf(v).not.toEqualTypeOf<null>();
        });
    });

    test('Should check $some typing', () => {
        const stringOrNumber = $some(isString, isNumber);
        const stringOrNumberOrArray = $some(stringOrNumber, isArray);

        withValue((v: unknown) => {
            stringOrNumber(v) && expectTypeOf(v).toEqualTypeOf<string | number>();
        });

        withValue((v: string | number | string[]) => {
            stringOrNumber(v) && expectTypeOf(v).toEqualTypeOf<string | number>();
        });

        withValue((v: string | number | string[]) => {
            stringOrNumberOrArray(v) && expectTypeOf(v).toEqualTypeOf<string | number | string[]>();
        });
    });

    test('Should check $every typing', () => {
        const notEmptyArray = $every(isArray, $not(isEmpty));
        const notEmptyArrayOrString = $some(notEmptyArray, isString);

        withValue((v: number[]) => {
            notEmptyArray(v) && expectTypeOf(v).toEqualTypeOf<number[]>();
        });

        withValue((v: string | number[]) => {
            notEmptyArrayOrString(v) && expectTypeOf(v).toEqualTypeOf<string | number[]>();
        });
    });

    test('Should combine complex logic', () => {
        withValue(['1', 2, '3', 4, null], (v) => {
            expectTypeOf(v.filter($not(isString))).toEqualTypeOf<(number | null)[]>();
            expectTypeOf(v.filter($not(isNumber))).toEqualTypeOf<(string | null)[]>();

            const notStringOrNumber = $not($some(isNumber, isString));
            const notStringAndNotNumber = $every($not(isNumber), $not(isString));

            expectTypeOf(v.filter(notStringOrNumber)).toEqualTypeOf<null[]>();
            expectTypeOf(v.filter(notStringAndNotNumber)).toEqualTypeOf<null[]>();
        });

        withValue((v: [] | [number, ...number[]]) => {
            const notEmptyArray = $every(isArray, isEmpty);
            notEmptyArray(v) && expectTypeOf(v).toEqualTypeOf<[]>();
        });
    });

    test('Should check isBigInt typing', () => {
        withValue((v: unknown) => {
            isBigInt(v) && expectTypeOf(v).toEqualTypeOf<bigint>();
        });

        withValue((v: bigint) => {
            isBigInt(v) && expectTypeOf(v).toEqualTypeOf<bigint>();
        });

        withValue((v: number) => {
            isBigInt(v) && expectTypeOf(v).toEqualTypeOf<never>();
        });
    });
});
