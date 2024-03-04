import { test, expect, describe } from 'vitest';
import is, { validate, validateStrict } from '../src';

describe('Validate runtime tests', () => {
    test('Should validate by schema shape (validate)', () => {
        const obj = {
            a: 1,
            b: 'string',
            c: {
                d: true,
                e: {
                    f: 1,
                    g: 'string',
                },
            },
        };

        const schema = {
            a: is.Number,
            b: is.$some(is.String, is.Nil),
            c: {
                d: is.Boolean,
                e: {
                    f: is.Number,
                    g: is.String,
                },
            },
        };

        expect(validate(obj, schema)).toBe(true);

        expect(validate(42, is.Number)).toBe(true);
        expect(validate(42, is.$some(is.Number, is.Nil))).toBe(true);

        expect(validate(42, is.String)).toBe(false);
        expect(validate({ a: 1 }, schema)).toBe(false);
        expect(validate('SOME STRING VALUE', schema)).toBe(false);

        expect(validate({ a: 1, otherParam: 'here' }, { a: is.Number })).toBe(true);
        expect(validateStrict({ a: 1, otherParam: 'here' }, { a: is.Number })).toBe(false);

        expect(validate([21, 2, 32], is.ArrayOf(is.Number))).toBe(true);
        expect(validate(is.ArrayOf(is.Number))([21, 2, 32])).toBe(true);

        expect(() => validate(42, 'UNKNOWN_SCHEMA' as any)).toThrowError();
    });

    test('Should validate array schema', () => {
        const schema = [is.Number, is.String, is.Boolean];

        expect(validate([1, '2', true], schema)).toBe(true);
        expect(validate([1, '2', true, 4], schema)).toBe(false);
        expect(validate([1, '2'], schema)).toBe(false);
        expect(validate([1, '2', 'true'], schema)).toBe(false);
    });

    test('Should validate array schema (complex type)', () => {
        const schema = [is.Number, is.String, is.Boolean, [validate({ a: is.Number, b: is.String })]];

        expect(validate([1, '2', true, [{ a: 1, b: '2' }]], schema)).toBe(true);
        expect(validate([1, '2', true, [{ a: 1, b: 2 }]], schema)).toBe(false);
        expect(validate([1, '2', true, [{ a: 1 }]], schema)).toBe(false);
        expect(validate([1, '2', true, [{ a: 1, b: '2', c: 3 }]], schema)).toBe(true); // extra properties are allowed
    });
});
