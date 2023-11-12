import { is } from '../src/guards';
import { test, expect } from 'vitest';

const unwrap = <TP, TF>(tests: { passed: TP[]; failed: TF[] }) => {
    return [...tests.passed.map((p) => [p, true]), ...tests.failed.map((f) => [f, false])] as [TP | TF, boolean][];
};

class Cls {}
class CustomError extends Error {}
function func() {}
function* generator() {
    yield 1;
    yield 2;
}

test.each(
    unwrap({
        passed: ['test', String('test2')],
        failed: [[], null, 100, false, undefined],
    }),
)('should check on String - %s', (value, expected) => {
    expect(is.String(value)).toBe(expected);
});

test.each(
    unwrap({
        passed: [23, 0x23, 1e1, NaN, Infinity, Number(123)],
        failed: [[], null, 'string', undefined],
    }),
)('should check on Number - %s', (value, expected) => {
    expect(is.Number(value)).toBe(expected);
});

test.each(
    unwrap({
        passed: [NaN, Number('s')],
        failed: [123, Infinity, 123, null, 'string', undefined],
    }),
)('should check on NaN - %s', (value, expected) => {
    expect(is.NaN(value)).toBe(expected);
});

test.each(
    unwrap({
        passed: [true, false],
        failed: ['string', 0, '', null, NaN],
    }),
)('should check on Boolean - %s', (value, expected) => {
    expect(is.Boolean(value)).toBe(expected);
});

test.each(
    unwrap({
        passed: [{}, Object.create(null)],
        failed: ['string', new Cls(), null, [1, 2, 3], 0, () => 'test'],
    }),
)('should check on PlainObject - %s', (value, expected) => {
    expect(is.PlainObject(value)).toBe(expected);
});

test('should check on PlainObject with own property - %s', () => {
    expect(is.HasKey(Cls, 'toString')).toBe(false);
    expect(is.HasKey({}, 'toString')).toBe(false);
    expect(is.HasKey([1], '0')).toBe(true);
    expect(is.HasKey({ prop: 'example' }, 'prop')).toBe(true);
});

test.each(
    unwrap({
        passed: [null, undefined],
        failed: ['string', new Cls(), [1, 2, 3], 0, () => 'test'],
    }),
)('should check on Nill - %s', (value, expected) => {
    expect(is.Nil(value)).toBe(expected);
});

test.each(
    unwrap({
        /* eslint-disable no-new-func */
        passed: [() => '123', Cls, func, Function('a, b', 'return a + 2'), parseInt, JSON.stringify],
        failed: ['string', new Cls(), null, [1, 2, 3], 0],
    }),
)('should check on Function - %s', (value, expected) => {
    expect(is.Function(value)).toBe(expected);
});

test.each(
    unwrap({
        passed: ['test', 1, BigInt(1), null, undefined, true, false, Symbol('test')],
        failed: [{}, () => 'test', [1, 2, 3]],
    }),
)('should check on Primitive - %s', (value, expected) => {
    expect(is.Primitive(value)).toBe(expected);
});

test.each(
    unwrap({
        passed: [new Promise((res) => res(1)), Promise.resolve()],
        failed: [{}, () => 'test', { then: () => void 0 }],
    }),
)('should check on Promise object - %s', (value, expected) => {
    expect(is.Promise(value)).toBe(expected);
});

test.each(
    unwrap({
        passed: [new Promise((res) => res(1)), Promise.resolve(), { then: () => void 0 }],
        failed: [{}, () => 'test'],
    }),
)('should check on PromiseLike object - %s', (value, expected) => {
    expect(is.PromiseLike(value)).toBe(expected);
});

test.each(
    unwrap({
        passed: [[], [1, 2, 3], Array(10), new Map(), new Set(), new Set([1, 2, 3]), 'some string', generator()],
        failed: [{}, () => 'test', { then: () => void 0 }, new Promise((res) => res(1))],
    }),
)('should check on Iterable', (value, expected) => {
    expect(is.Iterable(value)).toBe(expected);
});

test.each(
    unwrap({
        passed: [new Date(), new Date('01.02.1971')],
        failed: [123123, new Date('invalid date'), '01.02.1971'],
    }),
)('should check on Date - %s', (value, expected) => {
    expect(is.Date(value)).toBe(expected);
});

test('should check on InstanceOf', () => {
    expect(is.InstanceOf(new Cls(), Cls)).toBe(true);
    expect(is.InstanceOf(new CustomError(), Error)).toBe(true);
    expect(is.InstanceOf(new CustomError(), CustomError)).toBe(true);
    expect(is.InstanceOf(new CustomError(), Cls)).toBe(false);
    expect(is.InstanceOf(new Cls(), CustomError)).toBe(false);
    expect(!is.InstanceOf(new Cls(), Error)).toBe(true);
});

test.each(
    unwrap({
        passed: ['', [], {}, new Map(), new Set()],
        failed: [[1, 2], { a: 'some' }, 'string', 0, Cls, () => 'a', new Set([1, 2, 3]), new Date()],
    }),
)('should check on Not Empty - %s', (value, expected) => {
    expect(is.Empty(value)).toBe(expected);
});

test.each(
    unwrap({
        passed: [Symbol('new'), Symbol.iterator, Symbol()],
        failed: [[1, 2], { a: 'some' }, 'string', 0, Cls, () => 'a'],
    }),
)('should check on Symbol - %s', (value, expected) => {
    expect(is.Symbol(value)).toBe(expected);
});

test.each(
    unwrap({
        passed: [/\w+/, new RegExp('\\w+', 'g')],
        failed: [[1, 2], { a: 'some' }, 'string', 0, Cls, () => 'a'],
    }),
)('should check on RegExp - %s', (value, expected) => {
    expect(is.RegExp(value)).toBe(expected);
});

test.each(
    unwrap({
        passed: [new Error('example'), new CustomError()],
        failed: [[1, 2], { a: 'some' }, 'string', 0, Cls, () => 'a'],
    }),
)('should check on Error - %s', (value, expected) => {
    expect(is.Error(value)).toBe(expected);
});

test.each(
    unwrap({
        passed: [[1, 2], [], [32, 3, new Number(32)]],
        failed: [['asd'], [Cls], { a: 'some' }, 'string', 0, Cls, () => 'a'],
    }),
)('should check on Array of %s', (value, expected) => {
    const $isArrayOf = is.$curried(is.ArrayOf);
    const isArrayOfNumbers = $isArrayOf(is.Number);
    expect(isArrayOfNumbers(value)).toBe(expected);
});

test('Should work outside this context', () => {
    const { Number: isNumber } = is;
    expect([12, 32, 32].every(isNumber)).toBe(true);
});

test('Should curry guard', () => {
    expect(is.$curried(is.ArrayOf)(is.Number)([1, 2, 3])).toBe(true);
    expect(is.$curried(is.ArrayOf)(is.Number)([1, 2, '3'])).toBe(false);

    expect(is.$curried(is.InstanceOf)(Cls)(new Cls())).toBe(true);
    expect(is.$curried(is.InstanceOf)(Cls)(new CustomError())).toBe(false);

    expect(is.$curried(is.HasKey)('prop')({ prop: 1 })).toBe(true);
    expect(is.$curried(is.HasKey)('prop')({ prop: 1, otherProp: 2 })).toBe(true);
});

test('Should combine guards with $some', () => {
    const guard = is.$some(is.Number, is.String);
    expect(guard(1)).toBe(true);
    expect(guard('1')).toBe(true);
    expect(guard(true)).toBe(false);
});

test('Should combine guards with $every', () => {
    const guard = is.$every(is.Array, is.$curried(is.HasKey)('attr'));

    type ArrWithAttr = number[] & { attr: number };

    const arrWithAttr = [1, 2, 3] as ArrWithAttr;
    arrWithAttr.attr = 42;

    expect(guard(arrWithAttr)).toBe(true);

    expect(guard([1, 2, 3])).toBe(false);
    expect(guard('some')).toBe(false);
});

test('Should invert guard with $not', () => {
    const guard = is.$curried(is.ArrayOf)(is.Number);
    const isNotArrayOfNumbers = is.$not(guard);

    expect(isNotArrayOfNumbers([1, 2, 3])).toBe(false);
    expect(isNotArrayOfNumbers([1, 2, '3'])).toBe(true);

    expect([1, 2, null, 3, undefined].filter(is.$not(is.Nil))).toEqual([1, 2, 3]);
    expect([1, 2, null, 3, undefined, 'test'].filter(is.$not(is.$some(is.Nil, is.String)))).toEqual([1, 2, 3]);
});
