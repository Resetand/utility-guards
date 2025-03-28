import { Nominal, UnionToIntersection, InferGuardType } from '_types';
import { isString, $some, isBoolean, isFunction } from 'index';
import { describe, test, expectTypeOf } from 'vitest';

describe('types test', () => {
    test('UnionToIntersection', () => {
        expectTypeOf<UnionToIntersection<number | string>>().toEqualTypeOf<number & string>();
    });

    test('Nominal', () => {
        type USD = Nominal<number, 'USD'>;
        // @ts-expect-error
        expectTypeOf<USD>().toMatchTypeOf<number>();
    });

    test('InferGuardType', () => {
        expectTypeOf<InferGuardType<typeof isString>>().toMatchTypeOf<string>();

        const isBooleanOrFunction = $some(isBoolean, isFunction);
        expectTypeOf<InferGuardType<typeof isBooleanOrFunction>>().toMatchTypeOf<boolean | Function>();
    });
});
