export type NullOrUndefined = null | undefined;
export type AnyFunction<TReturn = any> = (...args: any[]) => TReturn;
export type AnyPrimitive = string | number | bigint | boolean | symbol | null | undefined;
export type Guard<TIs = unknown, TArgs extends unknown[] = void[]> = (value: unknown, ...args: TArgs) => value is TIs;

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

export type TypeSchema<T> = T extends Record<string, unknown> ? ObjectSchema<T> : Guard | Guard[];

export type InferTypeSchema<TSchema, TValue = unknown> = TSchema extends Record<string, unknown>
    ? { [K in keyof TSchema]: InferTypeSchema<TSchema[K], K extends keyof TValue ? TValue[K] : never> }
    : TSchema extends Guard
    ? InferTypeGuard<TSchema> & TValue
    : TSchema extends Guard[]
    ? InferTypeGuardArray<TSchema> & TValue
    : never;

export type ObjectSchema<T extends Record<string, unknown>> = {
    [K in keyof T]: Guard | TypeSchema<T[K]>;
};

type InferTypeGuard<TGuard extends Guard> = TGuard extends (value: unknown) => value is infer T ? T : never;
type InferTypeGuardArray<TG1 extends Guard[]> = TG1 extends Guard<infer T>[] ? T : never;
