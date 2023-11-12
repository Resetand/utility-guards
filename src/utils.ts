// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

import { CurriedGuard, TypeTag, Guard, TypeSchema, InferGuardType } from './types';

/**
 * Return object type string representation
 * @see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
 * @example
 * {} // -> "Object" ("[object Object]"")
 * '' // -> "String" ("[object String]"")
 * [] // -> "Array"  ("[object Array]"")
 */
export const getTypeTag = (value: unknown): TypeTag => {
    return Object.prototype.toString.call(value).slice(8, -1) as TypeTag;
};

/**
 * Curry guard function
 */
export const curryGuard = <TValue, TRes extends TValue, TArgs extends unknown[]>(
    guard: (value: TValue, ...args: TArgs) => value is TRes,
): CurriedGuard<TRes, TArgs> => {
    return (...args: TArgs): Guard<TRes> => {
        return (value): value is TRes => {
            return guard(value as TValue, ...args);
        };
    };
};

type $SomeGuards<T1 extends Guard, T2 extends Guard> = Guard<InferGuardType<T1> | InferGuardType<T2>>;

export const someGuards = <T1 extends Guard, T2 extends Guard>(guard1: T1, guard2: T2): $SomeGuards<T1, T2> => {
    return ((value: unknown, ...args: any[]) => [guard1, guard2].some((guard) => guard(value, ...args))) as $SomeGuards<
        T1,
        T2
    >;
};

type $EveryGuards<T1 extends Guard, T2 extends Guard> = Guard<InferGuardType<T1> & InferGuardType<T2>>;

export const everyGuards = <T1 extends Guard, T2 extends Guard>(guard1: T1, guard2: T2): $EveryGuards<T1, T2> => {
    return ((value: unknown, ...args: any[]) =>
        [guard1, guard2].every((guard) => guard(value, ...args))) as $EveryGuards<T1, T2>;
};

export const invertGuard = <TGuarded, TArgs extends unknown[]>(guard: Guard<TGuarded, TArgs>) => {
    return <TValue>(value: TValue, ...args: TArgs): value is Exclude<TValue, TGuarded> => !guard(value as any, ...args);
};

export const createValidateSchema = <T = any>(schema: TypeSchema<T>) => schema;
