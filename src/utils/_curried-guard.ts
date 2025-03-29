export type CurriedGuard<TArgs extends any[]> = {
    <T>(value: unknown, ...args: TArgs): value is T;
    <T>(...args: TArgs): (value: unknown) => value is T;
};

type Discriminator<TArgs extends any[]> = (
    args: TArgs | [value: unknown, ...args: TArgs],
    guard: (value: unknown, ...args: TArgs) => boolean,
) => boolean | ((value: unknown) => boolean);

const _defaultDiscriminator: Discriminator<unknown[]> = (args, guard) => {
    const expectedArgsCount = guard.length;
    const actualArgsCount = args.length;

    if (actualArgsCount >= expectedArgsCount) {
        return guard(args[0]!, ...args.slice(1));
    } else {
        return (value: unknown) => guard(value, ...args);
    }
};

export const curriedGuard = <TArgs extends any[]>(
    guard: (value: unknown, ...args: TArgs) => boolean,
    discriminator: Discriminator<TArgs> = _defaultDiscriminator as unknown as Discriminator<TArgs>,
): CurriedGuard<TArgs> => {
    return ((...args: unknown[]) => (discriminator as any)(args, guard)) as unknown as CurriedGuard<TArgs>;
};
