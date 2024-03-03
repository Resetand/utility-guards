export type AnyGuard<TGuarded = any, TInput = any, TArgs extends any[] = any[]> = (
    input: TInput | TGuarded,
    ...args: TArgs
) => input is TGuarded;

export const assertGuardedType = <TExpected>() => {
    return <TInput = unknown, TArgs extends any[] = any[]>(
        _guard: AnyGuard<TExpected, TInput, TArgs>,
        _input?: TInput,
        ..._args: TArgs
    ) => void 0;
};
