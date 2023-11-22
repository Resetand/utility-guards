import type { Guard } from './_types';

/**
 * Invert given guard
 *
 * @example
 * const isNotString = $not(is.String);
 * isNotString(1); // -> true
 * isNotString(''); // -> false
 */
export default function $not<TGuarded, TArgs extends unknown[]>(guard: Guard<TGuarded, TArgs>) {
    return <TValue>(value: TValue, ...args: TArgs): value is Exclude<TValue, TGuarded> => !guard(value as any, ...args);
}
