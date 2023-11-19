export type NullOrUndefined = null | undefined;
export type AnyFunction<TReturn = any> = (...args: any[]) => TReturn;
export type AnyPrimitive = string | number | bigint | boolean | symbol | null | undefined;
export type AnyRecord = Record<PropertyKey, unknown>;
export type ClassConstructor<T = unknown> = new (...args: any[]) => T;

export type Guard<TGuarded = unknown, TArgs extends unknown[] = void[]> = TArgs extends void[]
    ? (value: unknown) => value is TGuarded
    : (value: unknown, ...args: TArgs) => value is TGuarded;

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
}

export type CurriedGuard<TRes = unknown, TArgs extends unknown[] = unknown[]> = (...args: TArgs) => Guard<TRes>;

export type TypeSchema<T> = T extends Record<string, unknown> ? ObjectSchema<T> : Guard;

export type InferTypeSchema<TSchema> = TSchema extends Record<string, unknown>
    ? { [K in keyof TSchema]: InferTypeSchema<TSchema[K]> }
    : TSchema extends Guard<infer TGuarded, any[]>
    ? TGuarded
    : never;

export type ObjectSchema<T extends Record<string, unknown>> = {
    [K in keyof T]: Guard | TypeSchema<T[K]>;
};

export type InferGuardType<TGuard> = TGuard extends Guard<infer TIs, any[]> ? TIs : never;
