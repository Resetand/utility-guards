export type IndexOf<A extends unknown[]> = {
    [K in keyof A]: A[K] extends A[number] ? K : never;
}[number];

export type NullOrUndefined = null | undefined;
export type AnyFunction<TReturn = any> = (...args: any[]) => TReturn;
export type AnyPrimitive = string | number | bigint | boolean | symbol | null | undefined;
export type AnyRecord = Record<PropertyKey, unknown>;
export type ClassConstructor<T = unknown> = new (...args: any[]) => T;

export type Guard<TGuarded = unknown, TArgs extends unknown[] = void[]> = TArgs extends void[]
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
    ? { [K in IndexOf<TSchema>]: InferTypeSchema<TSchema[K]> }
    : TSchema extends AnyRecord
    ? { [K in keyof TSchema]: InferTypeSchema<TSchema[K]> }
    : InferGuardType<TSchema>;

export type ObjectSchema = {
    [key: string]: TypeSchema;
};

export type TypeSchema = ObjectSchema | TypeSchema[] | Guard;

export type InferGuardType<TGuard> = TGuard extends Guard<infer TGuarded, any[]> ? TGuarded : never;
