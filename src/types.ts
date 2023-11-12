export type NullOrUndefined = null | undefined;
export type AnyFunction<TReturn = any> = (...args: any[]) => TReturn;
export type AnyPrimitive = string | number | bigint | boolean | symbol | null | undefined;

export type Guard<TGuarded = unknown, TArgs extends unknown[] = unknown[]> = (
    value: unknown,
    ...args: TArgs
) => value is TGuarded;

export type GuardsContainerShape = {
    [method: string]: any;
};

export enum TypeTag {
    STRING = 'String',
    NUMBER = 'Number',
    OBJECT = 'Object',
    BOOLEAN = 'Boolean',
    PROMISE = 'Promise',
    DATE = 'Date',
    SYMBOL = 'Symbol',
    REGEXP = 'RegExp',
    ERROR = 'Error',
}

export type CurriedGuard<TRes = unknown, TArgs extends unknown[] = unknown[]> = (...args: TArgs) => Guard<TRes>;

export type TypeSchema<T> = T extends Record<string, unknown> ? ObjectSchema<T> : Guard;

export type InferTypeSchema<TSchema> = TSchema extends ObjectSchema<infer TGuarded>
    ? TGuarded
    : TSchema extends Guard<infer TGuarded, any[]>
    ? TGuarded
    : never;

export type ObjectSchema<T extends Record<string, unknown>> = {
    [K in keyof T]: Guard | TypeSchema<T[K]>;
};

export type InferGuardType<TGuard> = TGuard extends Guard<infer TIs, any[]> ? TIs : never;
