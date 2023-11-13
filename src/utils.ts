// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

import { CurriedGuard, TypeTag, Guard, InferGuardType } from './types';

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

export const curryGuard = <TValue, TRes extends TValue, TArgs extends unknown[]>(
    guard: (value: TValue, ...args: TArgs) => value is TRes,
): CurriedGuard<TRes, TArgs> => {
    return (...args: TArgs): Guard<TRes> => {
        return (value): value is TRes => {
            return guard(value as TValue, ...args);
        };
    };
};

type $SomeGuards<TGuards extends Guard[]> = Guard<InferGuardType<TGuards[number]>>;

export const someGuards = <TGuards extends Guard[]>(...guards: TGuards): $SomeGuards<TGuards> => {
    return ((value: unknown, ...args: any[]) => guards.some((guard) => guard(value, ...args))) as $SomeGuards<TGuards>;
};

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type $EveryGuards<TGuards extends Guard[]> = Guard<UnionToIntersection<InferGuardType<TGuards[number]>>>;

export const everyGuards = <TGuards extends Guard[]>(...guards: TGuards): $EveryGuards<TGuards> => {
    return ((value: unknown, ...args: any[]) =>
        guards.every((guard) => guard(value, ...args))) as $EveryGuards<TGuards>;
};

export const invertGuard = <TGuarded, TArgs extends unknown[]>(guard: Guard<TGuarded, TArgs>) => {
    return <TValue>(value: TValue, ...args: TArgs): value is Exclude<TValue, TGuarded> => !guard(value as any, ...args);
};
