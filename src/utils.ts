import type { TypeTag } from './types';

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
