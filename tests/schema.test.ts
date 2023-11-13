import { schemaGuard, schemaGuardStrict } from '../src/schema';
import { test, expect } from 'vitest';
import { is } from '../src/guards';

test('Should validate by schema shape (schemaGuard)', () => {
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

    expect(schemaGuard(obj, schema)).toBe(true);

    expect(schemaGuard(42, is.Number)).toBe(true);
    expect(schemaGuard(42, is.$some(is.Number, is.Nil))).toBe(true);

    expect(schemaGuard(42, is.String)).toBe(false);
    expect(schemaGuard({ a: 1 }, schema)).toBe(false);

    expect(schemaGuard({ a: 1, otherParam: 'here' }, { a: is.Number })).toBe(true);
    expect(schemaGuardStrict({ a: 1, otherParam: 'here' }, { a: is.Number })).toBe(false);

    expect(schemaGuard([21, 2, 32], is.$curried(is.ArrayOf)(is.Number))).toBe(true);

    expect(() => schemaGuard(42, 'UNKNOWN_SCHEMA' as any)).toThrowError();
});
