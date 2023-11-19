// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

import { TypeTag, Guard, InferGuardType } from './types';

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

type $SomeGuards<TGuards extends Guard[]> = Guard<InferGuardType<TGuards[number]>>;

/**
 * Combine multiple guards into union guard
 * @example
 * const isNumberOrString = is.$some(is.Number, is.String);
 * isNumberOrString(1); // -> true
 * isNumberOrString('1'); // -> true
 * isNumberOrString([]); // -> false
 */
export const someGuards = <TGuards extends Guard[]>(...guards: TGuards): $SomeGuards<TGuards> => {
    return ((value: unknown) => guards.some((guard) => guard(value))) as $SomeGuards<TGuards>;
};

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type $EveryGuards<TGuards extends Guard[]> = Guard<UnionToIntersection<InferGuardType<TGuards[number]>>>;

/**
 * Combine multiple guards into intersection guard
 * @example
 * const isNumberOrString = is.$every(is.Empty, isArray);
 * isNumberOrString([]); // -> true
 * isNumberOrString([1]); // -> false
 * isNumberOrString(null); // -> false
 */
export const everyGuards = <TGuards extends Guard[]>(...guards: TGuards): $EveryGuards<TGuards> => {
    return ((value: unknown) => guards.every((guard) => guard(value))) as $EveryGuards<TGuards>;
};

/**
 * Invert given guard
 *
 * @example
 * const isNotString = is.$not(is.String);
 * isNotString(1); // -> true
 * isNotString(''); // -> false
 */
export const invertGuard = <TGuarded, TArgs extends unknown[]>(guard: Guard<TGuarded, TArgs>) => {
    return <TValue>(value: TValue, ...args: TArgs): value is Exclude<TValue, TGuarded> => !guard(value as any, ...args);
};

export type CurriedGuard<TArgs extends any[]> = {
    <T>(value: unknown, ...args: TArgs): value is T;
    <T>(...args: TArgs): (value: unknown) => value is T;
};

export const curriedGuard = <TArgs extends any[]>(
    factory: (value: unknown, ...args: TArgs) => boolean,
): CurriedGuard<TArgs> => {
    const expectedArgsCount = factory.length;

    if (expectedArgsCount < 0) {
        return factory as any;
    }

    return ((...args: any[]) => {
        if (expectedArgsCount === args.length) {
            return (factory as any)(...args);
        }

        return (value: unknown) => (factory as any)(value, ...args);
    }) as CurriedGuard<TArgs>;
};
