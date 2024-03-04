import {
    isString,
    isNumber,
    isBoolean,
    isUndefined,
    isNull,
    isFunction,
    isPrimitive,
    isDate,
    isSymbol,
    isRegExp,
    isError,
    isArray,
    isAnyObject,
    isPlainObject,
    isHas,
    isHasIn,
    isNil,
    isPromise,
    isPromiseLike,
    isIterable,
    isInstanceOf,
    isEmpty,
    isFalsy,
    isArrayOf,
    isNaN,
    $not,
    $every,
    $some,
    isAny,
    isClass,
} from '../src';

import { describe, test, expectTypeOf } from 'vitest';
import { withValue } from './utils';
import { AnyFunction, AnyRecord, ClassConstructor } from '../src/_types';

class Cls {}
class CustomError extends Error {
    unique = true;
}

describe('guards static typing tests', () => {
    test('Should check isString typing', () => {
        withValue((v: unknown) => {
            isString(v) && expectTypeOf(v).toEqualTypeOf<string>();
        });

        withValue((v: string) => {
            isString(v) && expectTypeOf(v).toEqualTypeOf<string>();
        });

        withValue((v: number) => {
            isString(v) && expectTypeOf(v).toEqualTypeOf<never>();
        });
    });

    test('Should check isNumber typing', () => {
        withValue((v: number) => {
            isNumber(v) && expectTypeOf(v).toEqualTypeOf<number>();
        });

        withValue((v: number) => {
            isNumber(v) && expectTypeOf(v).toEqualTypeOf<number>();
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
    });

    test('Should check isClass typing', () => {
        withValue((v: unknown) => {
            isClass(v) && expectTypeOf(v).toEqualTypeOf<ClassConstructor>();
        });

        withValue((v: ClassConstructor<Cls> | null) => {
            isClass(v) && expectTypeOf(v).toEqualTypeOf<ClassConstructor<Cls>>();
        });

        withValue((v: AnyFunction) => {
            isClass(v) && expectTypeOf(v).toEqualTypeOf<AnyFunction & ClassConstructor>();
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

    test('Should check isArrayOf typing', () => {
        withValue((v: unknown) => {
            isArrayOf(isNumber)(v) && expectTypeOf(v).toEqualTypeOf<number[]>();
        });

        withValue((v: number[]) => {
            isArrayOf(isNumber)(v) && expectTypeOf(v).toEqualTypeOf<number[]>();
        });

        withValue((v: (string | number)[]) => {
            isArrayOf(isNumber)(v) && expectTypeOf(v).toEqualTypeOf<number[]>();
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

    test('Should check isHas typing', () => {
        type PropShape<T = unknown> = { prop: T };
        type AnotherShape<T = string> = { another: T };

        withValue((v: unknown) => {
            isHas(v, 'prop') && expectTypeOf(v).toEqualTypeOf<PropShape>();
        });

        withValue((v: unknown) => {
            isHas('prop')(v) && expectTypeOf(v).toEqualTypeOf<PropShape>();
        });

        withValue((v: PropShape<number>) => {
            isHas('prop')(v) && expectTypeOf(v).toEqualTypeOf<PropShape<number>>();
        });

        withValue((v: AnotherShape) => {
            isHas(v, 'prop') && expectTypeOf(v).toEqualTypeOf<PropShape & AnotherShape>();
        });

        withValue((v: AnotherShape) => {
            isHas('prop')(v) && expectTypeOf(v).toEqualTypeOf<PropShape & AnotherShape>();
        });

        withValue((v: AnyFunction) => {
            isHas(v, 'prop') && expectTypeOf(v).toEqualTypeOf<AnyFunction & PropShape>();
        });

        withValue((v: null) => {
            isHas(v, 'prop') && expectTypeOf(v).toEqualTypeOf<never>();
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
            isPromiseLike(v) && expectTypeOf(v).toEqualTypeOf<PromiseLike<any>>();
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
        withValue((v: unknown) => {
            isPlainObject(v) && expectTypeOf(v).toEqualTypeOf<AnyRecord>();
        });

        withValue<Record<string, unknown> | string>((v) => {
            isPlainObject(v) && expectTypeOf(v).toEqualTypeOf<Record<string, unknown>>();
        });
    });

    test('Should check isAnyObject typing', () => {
        withValue((v: unknown) => {
            isAnyObject(v) && expectTypeOf(v).toEqualTypeOf<object>();
        });
        withValue((v: Record<string, unknown>) => {
            isAnyObject(v) && expectTypeOf(v).toEqualTypeOf<Record<string, unknown>>();
        });
        withValue((v: null | Function | string | { some: number } | Cls) => {
            isAnyObject(v) && expectTypeOf(v).toEqualTypeOf<Function | { some: number } | Cls>();
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
            isAny(v) && expectTypeOf(v).toEqualTypeOf<unknown>();
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

    test('Should check $not typing', () => {
        withValue((v: unknown) => {
            $not(isNumber)(v) && expectTypeOf(v).toEqualTypeOf<unknown>();
        });

        withValue((v: string | AnyRecord | number) => {
            $not(isNumber)(v) && expectTypeOf(v).toEqualTypeOf<string | AnyRecord>();
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

        withValue((v: unknown) => {
            notEmptyArray(v) && expectTypeOf(v).toEqualTypeOf<unknown>();
        });
    });
});