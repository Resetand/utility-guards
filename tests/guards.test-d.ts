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
    isInstanceExactOf,
    isEmpty,
    isFalsy,
    isArrayOf,
    isNaN,
    isAny,
    isClass,
    isBigInt,
    isObjectOf,
    isObjectExactOf,
    isTupleOf,
    isFiniteNumber,
    isValidDate,
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
            if (isString(v)) {
                expectTypeOf(v).toEqualTypeOf<string>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: string) => {
            if (isString(v)) {
                expectTypeOf(v).toEqualTypeOf<string>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });

        withValue((v: number) => {
            if (isString(v)) {
                expectTypeOf(v).toEqualTypeOf<never>();
            } else {
                expectTypeOf(v).toEqualTypeOf<number>();
            }
        });

        withValue((v: '' | number[]) => {
            if (isString(v)) {
                expectTypeOf(v).toEqualTypeOf<''>();
            } else {
                expectTypeOf(v).toEqualTypeOf<number[]>();
            }
        });

        withValue((v: LiteralUnion<'a' | 'b'>) => {
            if (isString(v)) {
                expectTypeOf(v).toEqualTypeOf<LiteralUnion<'a' | 'b'>>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });
    });

    test('Should check isNumber typing', () => {
        withValue((v: number) => {
            if (isNumber(v)) {
                expectTypeOf(v).toEqualTypeOf<number>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });

        withValue((v: 0 | string) => {
            if (isNumber(v)) {
                expectTypeOf(v).toEqualTypeOf<0>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string>();
            }
        });

        withValue((v: string) => {
            if (isNumber(v)) {
                expectTypeOf(v).toEqualTypeOf<never>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string>();
            }
        });
    });

    test('Should check isFiniteNumber typing', () => {
        withValue((v: number) => {
            if (isFiniteNumber(v)) {
                expectTypeOf(v).toEqualTypeOf<number>();
            } else {
                expectTypeOf(v).toEqualTypeOf<number>();
            }
        });

        withValue((v: 0 | string) => {
            if (isFiniteNumber(v)) {
                expectTypeOf(v).toEqualTypeOf<0>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string>();
            }
        });

        withValue((v: string) => {
            if (isFiniteNumber(v)) {
                expectTypeOf(v).toEqualTypeOf<never>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string>();
            }
        });
    });

    test('Should check isNaN typing', () => {
        withValue((v: number) => {
            if (isNaN(v)) {
                expectTypeOf(v).toEqualTypeOf<number>();
            } else {
                expectTypeOf(v).toEqualTypeOf<number>();
            }
        });

        withValue((v: string) => {
            if (isNaN(v)) {
                expectTypeOf(v).toEqualTypeOf<never>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string>();
            }
        });
    });

    test('Should check isBoolean typing', () => {
        withValue((v: unknown) => {
            if (isBoolean(v)) {
                expectTypeOf(v).toEqualTypeOf<boolean>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: boolean) => {
            if (isBoolean(v)) {
                expectTypeOf(v).toEqualTypeOf<boolean>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });

        withValue((v: true | string) => {
            if (isBoolean(v)) {
                expectTypeOf(v).toEqualTypeOf<true>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string>();
            }
        });

        withValue((v: string) => {
            if (isBoolean(v)) {
                expectTypeOf(v).toEqualTypeOf<never>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string>();
            }
        });
    });

    test('Should check isUndefined typing', () => {
        withValue((v: unknown) => {
            if (isUndefined(v)) {
                expectTypeOf(v).toEqualTypeOf<undefined>();
            } else {
                // expectTypeOf(v).toEqualTypeOf<unknown>(); // FIXME
            }
        });

        withValue((v: undefined) => {
            if (isUndefined(v)) {
                expectTypeOf(v).toEqualTypeOf<undefined>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });

        withValue((v: string) => {
            if (isUndefined(v)) {
                expectTypeOf(v).toEqualTypeOf<never>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string>();
            }
        });
    });

    test('Should check isNull typing', () => {
        withValue((v: unknown) => {
            if (isNull(v)) {
                expectTypeOf(v).toEqualTypeOf<null>();
            } else {
                // expectTypeOf(v).toEqualTypeOf<unknown>(); // FIXME
            }
        });

        withValue((v: null) => {
            if (isNull(v)) {
                expectTypeOf(v).toEqualTypeOf<null>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });

        withValue((v: string) => {
            if (isNull(v)) {
                expectTypeOf(v).toEqualTypeOf<never>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string>();
            }
        });
    });

    test('Should check isNil typing', () => {
        withValue((v: unknown) => {
            if (isNil(v)) {
                expectTypeOf(v).toEqualTypeOf<null | undefined>();
            } else {
                // expectTypeOf(v).toEqualTypeOf<unknown>(); // FIXME
            }
        });

        withValue((v: null) => {
            if (isNil(v)) {
                expectTypeOf(v).toEqualTypeOf<null>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });

        withValue((v: undefined) => {
            if (isNil(v)) {
                expectTypeOf(v).toEqualTypeOf<undefined>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });

        withValue((v: string | undefined) => {
            if (isNil(v)) {
                expectTypeOf(v).toEqualTypeOf<undefined>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string>();
            }
        });

        withValue((v: string | null) => {
            if (isNil(v)) {
                expectTypeOf(v).toEqualTypeOf<null>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string>();
            }
        });
    });

    test('Should check isFunction typing', () => {
        type ExampleCallback = (a: number, b: string) => boolean;
        type Dict = Record<string, unknown>;
        type FunctionWithProps = ExampleCallback & { prop: number };

        withValue((v: unknown) => {
            if (isFunction(v)) {
                expectTypeOf(v).toEqualTypeOf<AnyFunction>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: ExampleCallback) => {
            if (isFunction(v)) {
                expectTypeOf(v).toEqualTypeOf<ExampleCallback>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });

        withValue((v: null) => {
            if (isFunction(v)) {
                expectTypeOf(v).toEqualTypeOf<never>();
            } else {
                expectTypeOf(v).toEqualTypeOf<null>();
            }
        });

        withValue((v: Dict) => {
            if (isFunction(v)) {
                expectTypeOf(v).toEqualTypeOf<Dict & AnyFunction>();
            } else {
                expectTypeOf(v).toEqualTypeOf<Dict>();
            }
        });

        withValue((v: FunctionWithProps | { prop: number }) => {
            if (isFunction(v)) {
                expectTypeOf(v).toEqualTypeOf<FunctionWithProps>();
            } else {
                expectTypeOf(v).toEqualTypeOf<{ prop: number }>();
            }
        });
    });

    test('Should check isAsyncFunction typing', () => {
        type ExampleCallback = (a: number, b: string) => boolean;
        type Dict = Record<string, unknown>;

        withValue((v: unknown) => {
            if (isAsyncFunction(v)) {
                expectTypeOf(v).toEqualTypeOf<AnyAsyncFunction>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: ExampleCallback) => {
            if (isAsyncFunction(v)) {
                expectTypeOf(v).toEqualTypeOf<ExampleCallback & AnyAsyncFunction>();
            } else {
                expectTypeOf(v).toEqualTypeOf<ExampleCallback>();
            }
        });

        withValue((v: null) => {
            if (isAsyncFunction(v)) {
                expectTypeOf(v).toEqualTypeOf<never>();
            } else {
                expectTypeOf(v).toEqualTypeOf<null>();
            }
        });

        withValue((v: Dict) => {
            if (isAsyncFunction(v)) {
                expectTypeOf(v).toEqualTypeOf<Dict & AnyAsyncFunction>();
            } else {
                expectTypeOf(v).toEqualTypeOf<Dict>();
            }
        });
    });

    test('Should check isClass typing', () => {
        withValue((v: unknown) => {
            if (isClass(v)) {
                expectTypeOf(v).toEqualTypeOf<Class>();
                expectTypeOf(v).instance.toEqualTypeOf<unknown>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: Class<Cls> | null) => {
            if (isClass(v)) {
                expectTypeOf(v).toEqualTypeOf<Class<Cls>>();
                expectTypeOf(v).instance.toEqualTypeOf<Cls>();
            } else {
                expectTypeOf(v).toEqualTypeOf<null>();
            }
        });

        withValue((v: AnyFunction) => {
            if (isClass(v)) {
                expectTypeOf(v).toEqualTypeOf<AnyFunction & Class>();
                expectTypeOf(v).instance.toEqualTypeOf<unknown>();
            } else {
                expectTypeOf(v).toEqualTypeOf<AnyFunction>();
            }
        });

        withValue((v: Class<Cls> | Class<CustomError>) => {
            if (isClass(v)) {
                expectTypeOf(v).toEqualTypeOf<Class<Cls> | Class<CustomError>>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });
    });

    test('Should check isEmpty typing', () => {
        type AnyEmptyValue = [] | Record<PropertyKey, never> | '' | Set<never> | Map<never, never> | null | undefined;

        withValue((v: unknown) => {
            if (isEmpty(v)) {
                expectTypeOf(v).toEqualTypeOf<AnyEmptyValue>();
            } else {
                // expectTypeOf(v).toEqualTypeOf<unknown>(); // FIXME
            }
        });

        withValue((v: string) => {
            if (isEmpty(v)) {
                expectTypeOf(v).toEqualTypeOf<''>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string>();
            }
        });

        withValue((v: Record<string, number>) => {
            if (isEmpty(v)) {
                expectTypeOf(v).toEqualTypeOf<Record<PropertyKey, never>>();
            } else {
                expectTypeOf(v).toEqualTypeOf<Record<string, number>>();
            }
        });

        withValue((v: Set<number>) => {
            if (isEmpty(v)) {
                expectTypeOf(v).toEqualTypeOf<Set<never>>();
            } else {
                expectTypeOf(v).toEqualTypeOf<Set<number>>();
            }
        });

        withValue((v: Map<string, number>) => {
            if (isEmpty(v)) {
                expectTypeOf(v).toEqualTypeOf<Map<never, never>>();
            } else {
                expectTypeOf(v).toEqualTypeOf<Map<string, number>>();
            }
        });

        withValue((v: null) => {
            if (isEmpty(v)) {
                expectTypeOf(v).toEqualTypeOf<null>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });

        withValue((v: undefined) => {
            if (isEmpty(v)) {
                expectTypeOf(v).toEqualTypeOf<undefined>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });

        withValue((v: '' | 0 | number[] | null) => {
            if (isEmpty(v)) {
                expectTypeOf(v).toEqualTypeOf<'' | [] | null>();
            } else {
                expectTypeOf(v).toEqualTypeOf<0 | number[]>();
            }
        });

        withValue((v: AnyFunction) => {
            if (isEmpty(v)) {
                expectTypeOf(v).toEqualTypeOf<AnyEmptyValue & AnyFunction>();
            } else {
                expectTypeOf(v).toEqualTypeOf<AnyFunction>();
            }
        });
    });

    test('Should check isArray typing', () => {
        type ArrayWithProps = number[] & { prop: number };

        withValue((v: unknown) => {
            if (isArray(v)) {
                expectTypeOf(v).toEqualTypeOf<unknown[]>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: number[]) => {
            if (isArray(v)) {
                expectTypeOf(v).toEqualTypeOf<number[]>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });

        withValue((v: string | number[]) => {
            if (isArray(v)) {
                expectTypeOf(v).toEqualTypeOf<number[]>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string>();
            }
        });

        withValue((v: ArrayWithProps | string | Iterable<number>) => {
            if (isArray(v)) {
                expectTypeOf(v).toEqualTypeOf<ArrayWithProps>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string | Iterable<number>>();
            }
        });
    });

    test('Should check isArrayOf typing', () => {
        type ArrayWithProps = number[] & { prop: number };

        withValue((v: unknown) => {
            if (isArrayOf(isNumber)(v)) {
                expectTypeOf(v).toEqualTypeOf<number[]>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: number[]) => {
            if (isArrayOf(isNumber)(v)) {
                expectTypeOf(v).toEqualTypeOf<number[]>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });

        withValue((v: (string | number)[]) => {
            if (isArrayOf(isNumber)(v)) {
                expectTypeOf(v).toEqualTypeOf<number[]>();
            } else {
                expectTypeOf(v).toEqualTypeOf<(string | number)[]>();
            }
        });

        withValue((v: ArrayWithProps | string[]) => {
            if (isArrayOf(isNumber)(v)) {
                expectTypeOf(v).toEqualTypeOf<ArrayWithProps>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string[]>();
            }
        });
    });

    test('Should check isInstanceOf typing', () => {
        withValue((v: unknown) => {
            if (isInstanceOf(v, Cls)) {
                expectTypeOf(v).toEqualTypeOf<Cls>();
            } else {
                // expectTypeOf(v).toEqualTypeOf<unknown>(); // FIXME
            }
        });

        withValue((v: unknown) => {
            if (isInstanceOf(Cls)(v)) {
                expectTypeOf(v).toEqualTypeOf<Cls>();
            } else {
                // expectTypeOf(v).toEqualTypeOf<unknown>(); // FIXME
            }
        });

        withValue((v: unknown) => {
            if (isInstanceOf(v, CustomError)) {
                expectTypeOf(v).toEqualTypeOf<CustomError>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>(); // FIXME
            }
        });
    });

    test('Should check isInstanceExactOf typing', () => {
        withValue((v: unknown) => {
            if (isInstanceExactOf(v, Cls)) {
                expectTypeOf(v).toEqualTypeOf<Cls>();
            } else {
                // expectTypeOf(v).toEqualTypeOf<unknown>(); // FIXME
            }
        });

        withValue((v: unknown) => {
            if (isInstanceExactOf(Cls)(v)) {
                expectTypeOf(v).toEqualTypeOf<Cls>();
            } else {
                // expectTypeOf(v).toEqualTypeOf<unknown>(); // FIXME
            }
        });

        withValue((v: unknown) => {
            if (isInstanceExactOf(v, CustomError)) {
                expectTypeOf(v).toEqualTypeOf<CustomError>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>(); // FIXME
            }
        });
    });

    test('Should check isHasOwn/isHasIn typing', () => {
        type PropShape<T = unknown> = { prop: T };
        type AnotherShape<T = string> = { another: T };
        const isHas = null! as typeof isHasOwn | typeof isHasIn;

        withValue((v: unknown) => {
            if (isHas(v, 'prop')) {
                expectTypeOf(v).toEqualTypeOf<PropShape>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: unknown) => {
            if (isHas('prop')(v)) {
                expectTypeOf(v).toEqualTypeOf<PropShape>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: PropShape<number>) => {
            if (isHas(v, 'prop')) {
                expectTypeOf(v).toEqualTypeOf<PropShape<number>>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });

        withValue((v: AnotherShape) => {
            if (isHas(v, 'prop')) {
                expectTypeOf(v).toEqualTypeOf<PropShape & AnotherShape>();
            } else {
                expectTypeOf(v).toEqualTypeOf<AnotherShape>();
            }
        });

        withValue((v: AnotherShape) => {
            if (isHas('prop')(v)) {
                expectTypeOf(v).toEqualTypeOf<PropShape & AnotherShape>();
            } else {
                expectTypeOf(v).toEqualTypeOf<AnotherShape>();
            }
        });

        withValue((v: AnyFunction) => {
            if (isHas(v, 'prop')) {
                expectTypeOf(v).toEqualTypeOf<AnyFunction & PropShape>();
            } else {
                expectTypeOf(v).toEqualTypeOf<AnyFunction>();
            }
        });

        withValue((v: { a: number } | undefined) => {
            if (isHas(v, 'a')) {
                expectTypeOf(v).toEqualTypeOf<{ a: number }>();
            } else {
                expectTypeOf(v).toEqualTypeOf<undefined>();
            }
        });

        withValue((v: { a: number } | { b: string } | undefined | string) => {
            if (isHas(v, 'a')) {
                expectTypeOf(v).toEqualTypeOf<{ a: number }>();
            } else {
                expectTypeOf(v).toEqualTypeOf<{ b: string } | undefined | string>();
            }
        });

        withValue((v: null) => {
            if (isHas(v, 'prop')) {
                expectTypeOf(v).toEqualTypeOf<never>();
            } else {
                expectTypeOf(v).toEqualTypeOf<null>();
            }
        });
    });

    test('Should check isPromise typing', () => {
        withValue((v: unknown) => {
            if (isPromise(v)) {
                expectTypeOf(v).toEqualTypeOf<Promise<unknown>>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: Promise<number> | number) => {
            if (isPromise(v)) {
                expectTypeOf(v).toEqualTypeOf<Promise<number>>();
            } else {
                expectTypeOf(v).toEqualTypeOf<number>();
            }
        });
    });

    test('Should check isPromiseLike typing', () => {
        withValue((v: unknown) => {
            if (isPromiseLike(v)) {
                expectTypeOf(v).toEqualTypeOf<PromiseLike<unknown>>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: Promise<number> | number) => {
            if (isPromiseLike(v)) {
                expectTypeOf(v).toEqualTypeOf<Promise<number>>();
            } else {
                expectTypeOf(v).toEqualTypeOf<number>();
            }
        });

        withValue((v: PromiseLike<number> | number) => {
            if (isPromiseLike(v)) {
                expectTypeOf(v).toEqualTypeOf<PromiseLike<number>>();
            } else {
                expectTypeOf(v).toEqualTypeOf<number>();
            }
        });
    });

    test('Should check isIterable typing', () => {
        withValue((v: unknown) => {
            if (isIterable(v)) {
                expectTypeOf(v).toEqualTypeOf<Iterable<unknown>>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: Iterable<number> | number) => {
            if (isIterable(v)) {
                expectTypeOf(v).toEqualTypeOf<Iterable<number>>();
            } else {
                expectTypeOf(v).toEqualTypeOf<number>();
            }
        });

        withValue((v: string | number) => {
            if (isIterable(v)) {
                expectTypeOf(v).toEqualTypeOf<string>();
            } else {
                expectTypeOf(v).toEqualTypeOf<number>();
            }
        });

        withValue((v: string[] | number | AnyFunction) => {
            if (isIterable(v)) {
                expectTypeOf(v).toEqualTypeOf<string[]>();
            } else {
                expectTypeOf(v).toEqualTypeOf<number | AnyFunction>();
            }
        });
    });

    test('Should check isRegExp typing', () => {
        withValue((v: unknown) => {
            if (isRegExp(v)) {
                expectTypeOf(v).toEqualTypeOf<RegExp>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: RegExp | string) => {
            if (isRegExp(v)) {
                expectTypeOf(v).toEqualTypeOf<RegExp>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string>();
            }
        });
    });

    test('Should check isSymbol typing', () => {
        withValue((v: unknown) => {
            if (isSymbol(v)) {
                expectTypeOf(v).toEqualTypeOf<symbol>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: symbol | string) => {
            if (isSymbol(v)) {
                expectTypeOf(v).toEqualTypeOf<symbol>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string>();
            }
        });

        withValue((v: string) => {
            if (isSymbol(v)) {
                expectTypeOf(v).toEqualTypeOf<never>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string>();
            }
        });
    });

    test('Should check isError typing', () => {
        withValue((v: unknown) => {
            if (isError(v)) {
                expectTypeOf(v).toEqualTypeOf<Error>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: Error | string) => {
            if (isError(v)) {
                expectTypeOf(v).toEqualTypeOf<Error>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string>();
            }
        });

        withValue((v: null) => {
            if (isError(v)) {
                expectTypeOf(v).toEqualTypeOf<never>();
            } else {
                expectTypeOf(v).toEqualTypeOf<null>();
            }
        });
    });

    test('Should check isPlainObject typing', () => {
        type Shape = { a: number; b: string };

        type ComplexType = string | number | Iterable<ComplexType> | boolean | null | undefined;

        withValue((v: unknown) => {
            if (isPlainObject(v)) {
                expectTypeOf(v).toEqualTypeOf<Record<string, unknown>>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue<Record<string, unknown> | string | string[] | Function>((v) => {
            if (isPlainObject(v)) {
                expectTypeOf(v).toEqualTypeOf<Record<string, unknown>>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string | string[] | Function>();
            }
        });

        withValue((v: Shape | AnyFunction) => {
            if (isPlainObject(v)) {
                expectTypeOf(v).toEqualTypeOf<Shape>();
            } else {
                expectTypeOf(v).toEqualTypeOf<AnyFunction>();
            }
        });

        withValue((v: Cls | Record<string, unknown>) => {
            // isPlainObject(v) && expectTypeOf(v).toEqualTypeOf<Record<string, unknown>>();
            if (isPlainObject(v)) {
                expectTypeOf(v).toEqualTypeOf<Record<string, unknown>>();
            } else {
                expectTypeOf(v).toEqualTypeOf<Cls>();
            }
        });

        withValue((v: ComplexType | Shape) => {
            if (isPlainObject(v)) {
                expectTypeOf(v).toEqualTypeOf<Shape>();
            } else {
                expectTypeOf(v).toEqualTypeOf<ComplexType>();
            }
        });
    });

    test('Should check isAnyObject typing', () => {
        type Shape = { a: number; b: string };

        withValue((v: unknown) => {
            if (isAnyObject(v)) {
                expectTypeOf(v).toEqualTypeOf<object>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });
        withValue((v: Record<string, unknown>) => {
            if (isAnyObject(v)) {
                expectTypeOf(v).toEqualTypeOf<Record<string, unknown>>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });
        withValue((v: null | Function | string | { some: number } | Cls) => {
            if (isAnyObject(v)) {
                expectTypeOf(v).toEqualTypeOf<Function | { some: number } | Cls>();
            } else {
                expectTypeOf(v).toEqualTypeOf<null | string>();
            }
        });

        withValue((v: Shape | Cls) => {
            if (isAnyObject(v)) {
                expectTypeOf(v).toEqualTypeOf<Shape | Cls>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });
    });

    test('Should check isPrimitive typing', () => {
        type Primitive = string | number | bigint | boolean | symbol | null | undefined;

        withValue((v: unknown) => {
            if (isPrimitive(v)) {
                expectTypeOf(v).toEqualTypeOf<Primitive>();
            } else {
                // expectTypeOf(v).toEqualTypeOf<unknown>(); // FIXME
            }
        });

        withValue((v: Primitive) => {
            if (isPrimitive(v)) {
                expectTypeOf(v).toEqualTypeOf<Primitive>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });

        withValue((v: null | AnyFunction | string) => {
            if (isPrimitive(v)) {
                expectTypeOf(v).toEqualTypeOf<null | string>();
            } else {
                expectTypeOf(v).toEqualTypeOf<AnyFunction>();
            }
        });
    });

    test('Should check isFalsy typing', () => {
        type Falsy = '' | 0 | false | null | undefined;

        withValue((v: unknown) => {
            if (isFalsy(v)) {
                expectTypeOf(v).toEqualTypeOf<Falsy>();
            } else {
                // expectTypeOf(v).toEqualTypeOf<unknown>(); // FIXME
            }
        });

        withValue((v: '' | 0 | false | null | undefined) => {
            if (isFalsy(v)) {
                expectTypeOf(v).toEqualTypeOf<Falsy>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });

        withValue((v: symbol) => {
            if (isFalsy(v)) {
                expectTypeOf(v).toEqualTypeOf<never>();
            } else {
                expectTypeOf(v).toEqualTypeOf<symbol>();
            }
        });
    });

    test('Should check isAny typing', () => {
        withValue((v: unknown) => {
            if (isAny(v)) {
                expectTypeOf(v).toEqualTypeOf<any>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });

        withValue((v: null) => {
            if (isAny(v)) {
                expectTypeOf(v).toEqualTypeOf<null>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });
    });

    test('Should check isDate typing', () => {
        withValue((v: unknown) => {
            if (isDate(v)) {
                expectTypeOf(v).toEqualTypeOf<Date>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: Date) => {
            if (isDate(v)) {
                expectTypeOf(v).toEqualTypeOf<Date>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });

        withValue((v: null) => {
            if (isDate(v)) {
                expectTypeOf(v).toEqualTypeOf<never>();
            } else {
                expectTypeOf(v).toEqualTypeOf<null>();
            }
        });
    });

    test('Should check isValidDate typing', () => {
        withValue((v: unknown) => {
            if (isValidDate(v)) {
                expectTypeOf(v).toEqualTypeOf<Date>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: Date) => {
            if (isValidDate(v)) {
                expectTypeOf(v).toEqualTypeOf<Date>();
            } else {
                expectTypeOf(v).toEqualTypeOf<Date>();
            }
        });

        withValue((v: null) => {
            if (isValidDate(v)) {
                expectTypeOf(v).toEqualTypeOf<never>();
            } else {
                expectTypeOf(v).toEqualTypeOf<null>();
            }
        });
    });

    test('Should check isObjectOf typing', () => {
        withValue((v: unknown) => {
            const schema = { a: isString, b: isNumber, c: isObjectOf({ d: isString }) };

            if (isObjectOf(v, schema)) {
                expectTypeOf(v).toEqualTypeOf<{ a: string; b: number; c: { d: string } }>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: Record<string, number>) => {
            const schema = { a: isString, b: isNumber };
            if (isObjectOf(v, schema)) {
                expectTypeOf(v).toEqualTypeOf<Record<string, number> & { a: string; b: number }>();
            } else {
                expectTypeOf(v).toEqualTypeOf<Record<string, number>>();
            }
        });

        withValue((v: null) => {
            if (isObjectOf(v, { a: isString })) {
                expectTypeOf(v).toEqualTypeOf<never>();
            } else {
                expectTypeOf(v).toEqualTypeOf<null>();
            }
        });
    });

    test('Should check isObjectExactOf typing', () => {
        withValue((v: unknown) => {
            const schema = { a: isString, b: isNumber, c: isObjectOf({ d: isString }) };

            if (isObjectExactOf(v, schema)) {
                expectTypeOf(v).toEqualTypeOf<{ a: string; b: number; c: { d: string } }>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: Record<string, number>) => {
            const schema = { a: isString, b: isNumber };
            if (isObjectExactOf(v, schema)) {
                expectTypeOf(v).toEqualTypeOf<Record<string, number> & { a: string; b: number }>();
            } else {
                expectTypeOf(v).toEqualTypeOf<Record<string, number>>();
            }
        });

        withValue((v: null) => {
            if (isObjectExactOf(v, { a: isString })) {
                expectTypeOf(v).toEqualTypeOf<never>();
            } else {
                expectTypeOf(v).toEqualTypeOf<null>();
            }
        });
    });

    test('Should check isTupleOf typing', () => {
        withValue((v: unknown) => {
            if (isTupleOf(v, [isString, isNumber])) {
                expectTypeOf(v).toEqualTypeOf<[string, number]>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: [string, number]) => {
            if (isTupleOf(v, [isString, isNumber])) {
                expectTypeOf(v).toEqualTypeOf<[string, number]>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });

        withValue((v: [string, number, ...number[]]) => {
            if (isTupleOf(v, [isString, isNumber])) {
                expectTypeOf(v).toEqualTypeOf<[string, number]>();
            } else {
                expectTypeOf(v).toEqualTypeOf<[string, number, ...number[]]>();
            }
        });

        withValue((v: string[]) => {
            if (isTupleOf(v, [isString, isNumber])) {
                expectTypeOf(v).toEqualTypeOf<[string, number] & string[]>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string[]>();
            }
        });
    });
});

describe('utility static typing tests', () => {
    test('Should check $not typing', () => {
        withValue((v: string | { a: 1 } | number) => {
            if ($not(isNumber)(v)) {
                expectTypeOf(v).toEqualTypeOf<string | { a: 1 }>();
                expectTypeOf(v).not.toEqualTypeOf<number>();
            } else {
                expectTypeOf(v).toEqualTypeOf<number>();
            }
        });

        withValue((v: null) => {
            if ($not(isNull)(v)) {
                expectTypeOf(v).toEqualTypeOf<never>();
                expectTypeOf(v).not.toEqualTypeOf<null>();
            }
        });
    });

    test('Should check $some typing', () => {
        const stringOrNumber = $some(isString, isNumber);
        const stringOrNumberOrArray = $some(stringOrNumber, isArray);

        withValue((v: unknown) => {
            if (stringOrNumber(v)) {
                expectTypeOf(v).toEqualTypeOf<string | number>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: string | number | string[]) => {
            if (stringOrNumber(v)) {
                expectTypeOf(v).toEqualTypeOf<string | number>();
            } else {
                expectTypeOf(v).toEqualTypeOf<string[]>();
            }
        });

        withValue((v: string | number | string[]) => {
            if (stringOrNumberOrArray(v)) {
                expectTypeOf(v).toEqualTypeOf<string | number | string[]>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });
    });

    test('Should check $every typing', () => {
        const notEmptyArray = $every(isArray, $not(isEmpty));
        const notEmptyArrayOrString = $some(notEmptyArray, isString);

        withValue((v: number[]) => {
            if (notEmptyArray(v)) {
                expectTypeOf(v).toEqualTypeOf<number[]>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
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
            if (isBigInt(v)) {
                expectTypeOf(v).toEqualTypeOf<bigint>();
            } else {
                expectTypeOf(v).toEqualTypeOf<unknown>();
            }
        });

        withValue((v: bigint) => {
            if (isBigInt(v)) {
                expectTypeOf(v).toEqualTypeOf<bigint>();
            } else {
                expectTypeOf(v).toEqualTypeOf<never>();
            }
        });

        withValue((v: number) => {
            if (isBigInt(v)) {
                expectTypeOf(v).toEqualTypeOf<never>();
            } else {
                expectTypeOf(v).toEqualTypeOf<number>();
            }
        });
    });
});
