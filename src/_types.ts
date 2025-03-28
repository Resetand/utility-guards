export type AnyFunction<TReturn = any> = (...args: any[]) => TReturn;
export type Class<T = unknown> = new (...args: any[]) => T;

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export type Guard<TGuarded = unknown, TArgs extends any[] = void[]> = TArgs extends void[]
    ? (value: unknown | TGuarded) => value is TGuarded
    : (value: unknown | TGuarded, ...args: TArgs) => value is TGuarded;

export type InferGuardType<TGuard> = TGuard extends Guard<infer TGuarded, any[]> ? TGuarded : never;
