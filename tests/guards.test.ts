import is from '../src';
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
        passed: [23, 0x23, 1e1, Infinity, Number(123)],
        failed: [[], null, 'string', undefined, NaN],
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
        passed: [{}, Object.create(null), new String(''), [1, 2, 3], new Cls(), new CustomError()],
        failed: ['string', null, 0, false],
    }),
)('should check on AnyObject - %s', (value, expected) => {
    expect(is.AnyObject(value)).toBe(expected);
});

test.each(
    unwrap({
        passed: [{}, Object.create(null)],
        failed: ['string', new Cls(), null, [1, 2, 3], 0, () => 'test', new String('')],
    }),
)('should check on PlainObject - %s', (value, expected) => {
    expect(is.PlainObject(value)).toBe(expected);
});

test('should check on PlainObject with own property - %s', () => {
    expect(is.Has(Cls, 'toString')).toBe(false);
    expect(is.Has({}, 'toString')).toBe(false);
    expect(is.Has([1], '0')).toBe(true);
    expect(is.Has({ prop: 'example' }, 'prop')).toBe(true);
});

test('should check on value has direct or inherit property - %s', () => {
    expect(is.HasIn(Cls, 'toString')).toBe(true);
    expect(is.HasIn({}, 'toString')).toBe(true);
    expect(is.HasIn([1], '0')).toBe(true);
    expect(is.HasIn({ prop: 'example' }, 'prop')).toBe(true);
});

test.each(
    unwrap({
        passed: [undefined],
        failed: ['string', new Cls(), [1, 2, 3], 0, () => 'test', null],
    }),
)('should check on undefined - %s', (value, expected) => {
    expect(is.Undefined(value)).toBe(expected);
});

test.each(
    unwrap({
        passed: [null],
        failed: ['string', new Cls(), [1, 2, 3], 0, () => 'test', undefined],
    }),
)('should check on null - %s', (value, expected) => {
    expect(is.Null(value)).toBe(expected);
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
        passed: [() => '123', func, Function('a, b', 'return a + 2'), parseInt, JSON.stringify],
        failed: ['string', new Cls(), null, [1, 2, 3], 0, Cls],
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
        passed: [new Promise((res) => res(1)), Promise.resolve(), { then: () => void 0 }, new CustomPromise()],
        failed: [{}, () => 'test'],
    }),
)('should check on PromiseLike object - %s', (value, expected) => {
    expect(is.PromiseLike(value)).toBe(expected);
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
)('should check on Empty - %s', (value, expected) => {
    expect(is.Empty(value)).toBe(expected);
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
    expect(is.Falsy(value)).toBe(expected);
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
        passed: [new Error('example'), new CustomError(), new TypeError()],
        failed: [[1, 2], { a: 'some' }, 'string', 0, Cls, () => 'a'],
    }),
)('should check on Error - %s', (value, expected) => {
    expect(is.Error(value)).toBe(expected);
});

test.each(
    unwrap({
        passed: [[1, 2], [], [32, 3, new Number(32)], [Number(2)]],
        failed: [['asd'], [Cls], { a: 'some' }, 'string', 0, Cls, () => 'a'],
    }),
)('should check on Array of %s', (value, expected) => {
    expect(is.ArrayOf(value, is.Number)).toBe(expected);
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

test('Should work outside this context', () => {
    const { Number: isNumber } = is;
    expect([12, 32, 32].every(isNumber)).toBe(true);
});

test('Should curry guard', () => {
    expect(is.ArrayOf(is.Number)([1, 2, 3])).toBe(true);
    expect(is.ArrayOf(is.Number)([1, 2, '3'])).toBe(false);

    expect(is.InstanceOf(Cls)(new Cls())).toBe(true);
    expect(is.InstanceOf(Cls)(new CustomError())).toBe(false);

    expect(is.Has('prop')({ prop: 1 })).toBe(true);
    expect(is.Has('prop')({ prop: 1, otherProp: 2 })).toBe(true);
});

test('Should combine guards with $some', () => {
    const guard = is.$some(is.Number, is.String);
    expect(guard(1)).toBe(true);
    expect(guard('1')).toBe(true);
    expect(guard(true)).toBe(false);
});

test('Should combine guards with $every', () => {
    const guard = is.$every(is.Array, is.HasIn('attr'));

    type ArrWithAttr = number[] & { attr: number };

    const arrWithAttr = [1, 2, 3] as ArrWithAttr;
    arrWithAttr.attr = 42;

    expect(guard(arrWithAttr)).toBe(true);

    expect(guard([1, 2, 3])).toBe(false);
    expect(guard('some')).toBe(false);
});

test('Should combine guards with $every #2', () => {
    const isNotEmptyArray = is.$every(is.Array, is.$not(is.Empty));

    expect(isNotEmptyArray([])).toBe(false);
    expect(isNotEmptyArray('anything else')).toBe(false);
    expect(isNotEmptyArray([1, 2, 3])).toBe(true);
});

test('Should invert guard with $not', () => {
    const guard = is.ArrayOf(is.Number);
    const isNotArrayOfNumbers = is.$not(guard);

    expect(isNotArrayOfNumbers([1, 2, 3])).toBe(false);
    expect(isNotArrayOfNumbers([1, 2, '3'])).toBe(true);

    expect([1, 2, null, 3, undefined].filter(is.$not(is.Nil))).toEqual([1, 2, 3]);
    expect([1, 2, null, 3, undefined, 'test'].filter(is.$not(is.$some(is.Nil, is.String)))).toEqual([1, 2, 3]);
});
