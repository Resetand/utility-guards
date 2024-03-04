export type AnyFunction<TReturn = any> = (...args: any[]) => TReturn;
export type Class<T = unknown> = new (...args: any[]) => T;

/**
 * Narrow type U to T, if T is a subset of U.
 * If T is not a subset of U fallback to intersection between T and U
 *
 * @example
 * type T1 = Narrow<number, 1 | 2>; // -> 1 | 2
 * type T2 = Narrow<number, 1 | '2'>; // -> 1
 * type T3 = Narrow<Function, Record<string, unknown>>; // -> Function & Record<string, unknown>
 */
export type Narrow<U, T> = Extract<T, U> extends never ? (T extends U ? T : T & U) : Extract<T, U>;
export declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;

export type ValueType<T> = {
    [K in keyof T]: T[K];
}[keyof T];

export type Guard<TGuarded = unknown, TArgs extends any[] = void[]> = TArgs extends void[]
    ? (value: unknown | TGuarded) => value is TGuarded
    : (value: unknown | TGuarded, ...args: TArgs) => value is TGuarded;

export type GuardsContainerShape = {
    [method: string]: any;
};

export enum TypeTag {
    STRING = 'String',
    NUMBER = 'Number',
    BIGINT = 'BigInt',
    OBJECT = 'Object',
    BOOLEAN = 'Boolean',
    PROMISE = 'Promise',
    DATE = 'Date',
    SYMBOL = 'Symbol',
    REGEXP = 'RegExp',
    ERROR = 'Error',
    FUNCTION = 'Function',
    UNDEFINED = 'Undefined',
    NULL = 'Null',
}

export type CurriedGuard<TRes = unknown, TArgs extends unknown[] = unknown[]> = (...args: TArgs) => Guard<TRes>;

export type InferTypeSchema<TSchema> = TSchema extends unknown[]
    ? { [K in keyof TSchema]: InferTypeSchema<TSchema[K]> }
    : TSchema extends ObjectSchema
    ? { [K in keyof TSchema]: InferTypeSchema<TSchema[K]> }
    : InferGuardType<TSchema>;

type ObjectSchema = { [K in PropertyKey]: TypeSchema };
export type TypeSchema = ObjectSchema | Guard | [] | [TypeSchema] | [TypeSchema, ...TypeSchema[]];

export type InferGuardType<TGuard> = TGuard extends Guard<infer TGuarded, any[]> ? TGuarded : never;
