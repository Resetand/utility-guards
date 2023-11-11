import { validateBySchema, validateBySchemaStrict } from '../src/schema';
import { test, expect } from 'vitest';
import { is } from '../src/guards';
import { createValidateSchema } from '../src/utils';

test('Should validate by schema shape (validateBySchema)', () => {
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

    const schema = createValidateSchema<typeof obj>({
        a: is.Number,
        b: is.$some(is.String, is.Nil),
        c: {
            d: is.Boolean,
            e: {
                f: is.Number,
                g: is.String,
            },
        },
    });

    expect(validateBySchema(obj, schema)).toBe(true);

    expect(validateBySchema(42, is.Number)).toBe(true);
    expect(validateBySchema(42, is.$some(is.Number, is.Nil))).toBe(true);

    expect(validateBySchema(42, is.String)).toBe(false);
    expect(validateBySchema({ a: 1 }, schema)).toBe(false);

    expect(validateBySchema({ a: 1, otherParam: 'here' }, { a: is.Number })).toBe(true);
    expect(validateBySchemaStrict({ a: 1, otherParam: 'here' }, { a: is.Number })).toBe(false);

    expect(validateBySchema([21, 2, 32], is.$curried(is.ArrayOf)(is.Number))).toBe(true);
});
