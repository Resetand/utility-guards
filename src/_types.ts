export type AnyFunction<TReturn = any> = (...args: any[]) => TReturn;
export type AnyAsyncFunction<TReturn = any> = (...args: any[]) => Promise<TReturn>;
export type Class<T = unknown> = new (...args: any[]) => T;
export type Nominal<B, T = object> = T & { __brand: B };

export type Assign<T, U> = Omit<T, keyof U> & U;

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export type Guard<TGuarded = unknown, TArgs extends unknown[] = void[]> = (
    value: unknown,
    ...args: TArgs
) => value is TGuarded;

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
    AsyncFunction = 'AsyncFunction',
    UNDEFINED = 'Undefined',
    NULL = 'Null',
}

export type InferGuardType<TGuard> = TGuard extends Guard<infer TGuarded, any> ? TGuarded : never;
