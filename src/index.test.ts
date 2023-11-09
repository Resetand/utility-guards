// import is from 'src/';

import is from './index';

const unwrap = <TP, TF>(tests: { passed: TP[]; failed: TF[] }) => {
    return [...tests.passed.map((p) => [p, true]), ...tests.failed.map((f) => [f, false])] as [TP | TF, boolean][];
};

describe('is - util for runtime+ts type guarding', () => {
    class Cls {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function func() {}

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
            passed: [new Date(), new Date('01.02.1971')],
            failed: [123123, new Date('invalid date'), '01.02.1971'],
        }),
    )('should check on Date - %s', (value, expected) => {
        expect(is.Date(value)).toBe(expected);
    });

    test.each(
        unwrap({
            passed: ['', [], {}],
            failed: [[1, 2], { a: 'some' }, 'string', 0, Cls, () => 'a'],
        }),
    )('should check on Not Empty - %s', (value, expected) => {
        expect(is.Empty(value)).toBe(expected);
    });
});
