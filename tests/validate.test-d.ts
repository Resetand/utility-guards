import { test, describe, expectTypeOf } from 'vitest';
import is, { validate, validateStrict } from '../src';
import { withValue } from './utils';

describe('Validate static typing tests', () => {
    test('should infer guarded type from object schema', () => {
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

        type ExpectedType = {
            a: number;
            b: string | null | undefined;
            c: {
                d: boolean;
                e: {
                    f: number;
                    g: string;
                };
            };
        };

        withValue((v: unknown) => {
            validate(v, schema) && expectTypeOf(v).toEqualTypeOf<ExpectedType>();
        });
        withValue((v: unknown) => {
            validateStrict(v, schema) && expectTypeOf(v).toEqualTypeOf<ExpectedType>();
        });
    });

    test('should infer guarded type from object schema #2', () => {
        type ExpectedType = {
            a: [number, string];
            b: number[];
            c: [{ d: boolean; e: string }, { f: number; g: string }];
        };

        withValue((v: unknown) => {
            validate(v, {
                a: [is.Number, is.String],
                b: is.ArrayOf(is.Number),
                c: [
                    {
                        d: is.Boolean,
                        e: is.String,
                    },
                    {
                        f: is.Number,
                        g: is.String,
                    },
                ],
            }) && expectTypeOf(v).toEqualTypeOf<ExpectedType>();
        });
    });

    test('should infer guarded type from array schema', () => {
        type ExpectedType = [number, string, boolean];
        const schema = tuple(is.Number, is.String, is.Boolean);

        withValue((v: unknown) => {
            validate(v, schema) && expectTypeOf(v).toEqualTypeOf<ExpectedType>();
        });
        withValue((v: unknown) => {
            validateStrict(v, schema) && expectTypeOf(v).toEqualTypeOf<ExpectedType>();
        });
    });

    test('should infer guarded type from guard schema', () => {
        withValue((v: unknown) => {
            validate(v, is.Number) && expectTypeOf(v).toEqualTypeOf<number>();
        });
        withValue((v: unknown) => {
            validate(v, is.String) && expectTypeOf(v).toEqualTypeOf<string>();
        });
        withValue((v: unknown) => {
            validate(v, is.$some(is.String, is.Nil)) && expectTypeOf(v).toEqualTypeOf<string | null | undefined>();
        });
    });
});

const tuple = <T extends unknown[]>(...args: T) => args;
