import {
    default as is,
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
    isEmpty,
    isFalsy,
    isArrayOf,
    isNaN,
    $not,
    $every,
    $some,
    isAny,
    isClass,
    isBigInt,
    isExactInstanceOf,
} from '../src';

import { describe, test, expect } from 'vitest';

const unwrap = <TP, TF>(tests: { passed: TP[]; failed: TF[] }) => {
    return [...tests.passed.map((p) => [p, true]), ...tests.failed.map((f) => [f, false])] as [TP | TF, boolean][];
};

// export const assertType = <T>(_: T) => {};

class Cls {}
class SubCls extends Cls {}
class CustomError extends Error {
    unique = true;
}
function func() {}
async function asyncFunc() {}

function* generator() {
    yield 1;
    yield 2;
}

class CustomPromise {
    then() {
        return this;
    }

    catch() {
        return this;
    }

    finally() {
        return this;
    }
}

describe('Guards runtime tests', () => {
    test.each(
        unwrap({
            passed: ['test', String('test2')],
            failed: [[], null, 100, false, undefined],
        }),
    )('should check on String - %s', (value, expected) => {
        expect(isString(value)).toBe(expected);
    });

    test.each(
        unwrap({
            passed: [23, 0x23, 1e1, Infinity, Number(123)],
            failed: [[], null, 'string', undefined, NaN],
        }),
    )('should check on Number - %s', (value, expected) => {
        expect(isNumber(value)).toBe(expected);
    });

    test.each(
        unwrap({
            passed: [NaN, Number('s')],
            failed: [123, Infinity, 123, null, 'string', undefined],
        }),
    )('should check on NaN - %s', (value, expected) => {
        expect(isNaN(value)).toBe(expected);
    });

    test.each(
        unwrap({
            passed: [true, false],
            failed: ['string', 0, '', null, NaN],
        }),
    )('should check on Boolean - %s', (value, expected) => {
        expect(isBoolean(value)).toBe(expected);
    });

    test.each(
        unwrap({
            passed: [{}, Object.create(null), new String(''), [1, 2, 3], new Cls(), new CustomError()],
            failed: ['string', null, 0, false],
        }),
    )('should check on AnyObject - %s', (value, expected) => {
        expect(isAnyObject(value)).toBe(expected);
    });

    test.each(
        unwrap({
            passed: [{}, Object.create(null)],
            failed: ['string', new Cls(), null, [1, 2, 3], 0, () => 'test', new String('')],
        }),
    )('should check on PlainObject - %s', (value, expected) => {
        expect(isPlainObject(value)).toBe(expected);
    });

    test('should check on PlainObject with own property - %s', () => {
        expect(isHasOwn(Cls, 'toString')).toBe(false);
        expect(isHasOwn({}, 'toString')).toBe(false);
        expect(isHasOwn([1], '0')).toBe(true);
        expect(isHasOwn({ prop: 'example' }, 'prop')).toBe(true);
    });

    test('should check on value has direct or inherit property - %s', () => {
        expect(isHasIn(Cls, 'toString')).toBe(true);
        expect(isHasIn({}, 'toString')).toBe(true);
        expect(isHasIn([1], '0')).toBe(true);
        expect(isHasIn({ prop: 'example' }, 'prop')).toBe(true);
    });

    test.each(
        unwrap({
            passed: [undefined],
            failed: ['string', new Cls(), [1, 2, 3], 0, () => 'test', null],
        }),
    )('should check on undefined - %s', (value, expected) => {
        expect(isUndefined(value)).toBe(expected);
    });

    test.each(
        unwrap({
            passed: [null],
            failed: ['string', new Cls(), [1, 2, 3], 0, () => 'test', undefined],
        }),
    )('should check on null - %s', (value, expected) => {
        expect(isNull(value)).toBe(expected);
    });

    test.each(
        unwrap({
            passed: [null, undefined],
            failed: ['string', new Cls(), [1, 2, 3], 0, () => 'test'],
        }),
    )('should check on Nill - %s', (value, expected) => {
        expect(isNil(value)).toBe(expected);
    });

    test.each(
        unwrap({
            /* eslint-disable no-new-func */
            passed: [() => '123', func, Function('a, b', 'return a + 2'), parseInt, JSON.stringify, asyncFunc],
            failed: ['string', new Cls(), null, [1, 2, 3], 0, Cls],
        }),
    )('should check on Function - %s', (value, expected) => {
        expect(isFunction(value)).toBe(expected);
    });

    test.each(
        unwrap({
            /* eslint-disable no-new-func */
            passed: [async () => '123', asyncFunc],
            failed: ['string', new Cls(), null, [1, 2, 3], 0, Cls, func, () => 'test'],
        }),
    )('should check on AsyncFunction - %s', (value, expected) => {
        expect(isAsyncFunction(value)).toBe(expected);
    });

    test.each(
        unwrap({
            // @ts-ignore
            passed: [BigInt(1), BigInt('1'), 42n],
            failed: ['string', null, [1, 2, 3], 0, () => 'test'],
        }),
    )('should check on BigInt - %s', (value, expected) => {
        expect(isBigInt(value)).toBe(expected);
    });

    test.each(
        unwrap({
            passed: [Cls, CustomError, CustomPromise],
            failed: ['string', null, [1, 2, 3], 0, () => 'test'],
        }),
    )('should check on isClass - %s', (value, expected) => {
        expect(isClass(value)).toBe(expected);
    });

    test.each(
        unwrap({
            passed: ['test', 1, BigInt(1), null, undefined, true, false, Symbol('test')],
            failed: [{}, () => 'test', [1, 2, 3]],
        }),
    )('should check on Primitive - %s', (value, expected) => {
        expect(isPrimitive(value)).toBe(expected);
    });

    test.each(
        unwrap({
            passed: [new Promise((res) => res(1)), Promise.resolve()],
            failed: [{}, () => 'test', { then: () => void 0 }],
        }),
    )('should check on Promise object - %s', (value, expected) => {
        expect(isPromise(value)).toBe(expected);
    });

    test.each(
        unwrap({
            passed: [new Promise((res) => res(1)), Promise.resolve(), { then: () => void 0 }, new CustomPromise()],
            failed: [{}, () => 'test'],
        }),
    )('should check on PromiseLike object - %s', (value, expected) => {
        expect(isPromiseLike(value)).toBe(expected);
    });

    test.each(
        unwrap({
            passed: [
                [],
                [1, 2, 3],
                Array(10),
                new Map(),
                new Set(),
                new Set([1, 2, 3]),
                'some string',
                generator(),
                new Set([1, 2]).entries(),
            ],
            failed: [{}, () => 'test', { then: () => void 0 }, new Promise((res) => res(1))],
        }),
    )('should check on Iterable - s%', (value, expected) => {
        expect(isIterable(value)).toBe(expected);
    });

    test.each(
        unwrap({
            passed: [new Date(), new Date('01.02.1971')],
            failed: [123123, new Date('invalid date'), '01.02.1971'],
        }),
    )('should check on Date - %s', (value, expected) => {
        expect(isDate(value)).toBe(expected);
    });

    test('should check on InstanceOf - s%', () => {
        expect(isInstanceOf(new Cls(), Cls)).toBe(true);
        expect(isInstanceOf(new CustomError(), Error)).toBe(true);
        expect(isInstanceOf(new CustomError(), CustomError)).toBe(true);
        expect(isInstanceOf(new CustomError(), Cls)).toBe(false);
        expect(isInstanceOf(new Cls(), CustomError)).toBe(false);
        expect(isInstanceOf(new Cls(), Error)).toBe(false);
        expect(isInstanceOf({}, Cls)).toBe(false);
    });

    test('should check on ExactInstanceOf', () => {
        expect(isExactInstanceOf(new Cls(), Cls)).toBe(true);
        expect(isExactInstanceOf(new SubCls(), Cls)).toBe(false);
        expect(isExactInstanceOf(new Cls(), SubCls)).toBe(false);
        expect(isExactInstanceOf(new SubCls(), SubCls)).toBe(true);
        expect(isInstanceOf({}, Cls)).toBe(false);
    });

    test.each(
        unwrap({
            passed: ['', [], {}, new Map(), new Set()],
            failed: [[1, 2], { a: 'some' }, 'string', 0, Cls, () => 'a', new Set([1, 2, 3]), new Date()],
        }),
    )('should check on Empty - %s', (value, expected) => {
        expect(isEmpty(value)).toBe(expected);
    });

    test.each(
        unwrap({
            passed: ['', false, 0, null, undefined, NaN],
            failed: [
                [1, 2],
                { a: 'some' },
                'string',
                Cls,
                () => 'a',
                new Set([1, 2, 3]),
                new Date(),
                new Boolean(false),
                new Number(0),
                new String(''),
            ],
        }),
    )('should check on Falsy - %s', (value, expected) => {
        expect(isFalsy(value)).toBe(expected);
    });

    test.each(
        unwrap({
            passed: [Symbol('new'), Symbol.iterator, Symbol()],
            failed: [[1, 2], { a: 'some' }, 'string', 0, Cls, () => 'a'],
        }),
    )('should check on Symbol - %s', (value, expected) => {
        expect(isSymbol(value)).toBe(expected);
    });

    test.each(
        unwrap({
            passed: [/\w+/, new RegExp('\\w+', 'g')],
            failed: [[1, 2], { a: 'some' }, 'string', 0, Cls, () => 'a'],
        }),
    )('should check on RegExp - %s', (value, expected) => {
        expect(isRegExp(value)).toBe(expected);
    });

    test.each(
        unwrap({
            passed: [new Error('example'), new CustomError(), new TypeError()],
            failed: [[1, 2], { a: 'some' }, 'string', 0, Cls, () => 'a'],
        }),
    )('should check on Error - %s', (value, expected) => {
        expect(isError(value)).toBe(expected);
    });

    test.each(
        unwrap({
            passed: [[1, 2], [], [32, 3, new Number(32)], [Number(2)]],
            failed: [['asd'], [Cls], { a: 'some' }, 'string', 0, Cls, () => 'a'],
        }),
    )('should check on Array of %s', (value, expected) => {
        expect(isArrayOf(value, isNumber)).toBe(expected);
    });

    test('should check on exact match (is)', () => {
        expect(is(42, 42)).toBe(true);
        expect(is(42)(42)).toBe(true);
        expect(is(42)(43)).toBe(false);
        expect(is(NaN, NaN));
        expect(is(NaN)(NaN));

        const fakeEqual = (_a: unknown, _b: unknown) => true;

        expect(is(42, 'test', fakeEqual)).toBe(true);
        expect(is('test', fakeEqual)(42)).toBe(true);
    });

    test('should throw invalid arguments error (is)', () => {
        const fakeEqual = (_a: unknown, _b: unknown) => true;

        // @ts-ignore
        expect(() => is(fakeEqual, 'a', 'b', 'c')).toThrowError();

        // @ts-ignore
        expect(() => is('a', 'b', 'c')());
    });

    test.each(
        unwrap({
            passed: [
                [1, 2, 3],
                { a: 1, b: 2 },
                new Map(),
                new Set(),
                new Set([1, 2, 3]),
                'some string',
                generator(),
                new Set([1, 2]).entries(),
            ],
            failed: [],
        }),
    )('should check on Any - %s', (value, expected) => {
        expect(isAny(value)).toBe(expected);
    });
});

test('Should work outside this context', () => {
    const { Number: isNumber } = is;
    expect([12, 32, 32].every(isNumber)).toBe(true);
});

describe('utility functions (hoc)', () => {
    test('Should combine guards with $some', () => {
        const guard = $some(isNumber, isString);
        expect(guard(1)).toBe(true);
        expect(guard('1')).toBe(true);
        expect(guard(true)).toBe(false);
    });

    test('Should combine guards with $every', () => {
        const guard = $every(isArray, isHasIn('attr'));

        type ArrWithAttr = number[] & { attr: number };

        const arrWithAttr = [1, 2, 3] as ArrWithAttr;
        arrWithAttr.attr = 42;

        expect(guard(arrWithAttr)).toBe(true);

        expect(guard([1, 2, 3])).toBe(false);
        expect(guard('some')).toBe(false);
    });

    test('Should combine guards with $every #2', () => {
        const isNotEmptyArray = $every(isArray, $not(isEmpty));

        expect(isNotEmptyArray([])).toBe(false);
        expect(isNotEmptyArray('anything else')).toBe(false);
        expect(isNotEmptyArray([1, 2, 3])).toBe(true);
    });

    test('Should invert guard with $not', () => {
        const guard = isArrayOf(isNumber);
        const isNotArrayOfNumbers = $not(guard);

        expect(isNotArrayOfNumbers([1, 2, 3])).toBe(false);
        expect(isNotArrayOfNumbers([1, 2, '3'])).toBe(true);

        expect([1, 2, null, 3, undefined].filter($not(isNil))).toEqual([1, 2, 3]);
        expect([1, 2, null, 3, undefined, 'test'].filter($not($some(isNil, isString)))).toEqual([1, 2, 3]);
    });
});
