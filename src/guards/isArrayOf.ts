import type { Guard } from '../_types';
import { curriedGuard } from '../utils/_curried-guard';

export type ArrayOfGuard = {
    /**
     * Check if all elements of array match given guard
     *
     * @example
     * isArrayOf([1, 2, 3], is.Number); // -> true
     * isArrayOf([1, 2, '3'], is.Number); // -> false
     * isArrayOf([], is.Number); // -> true
     * isArrayOf([1, 2, 3], is.String); // -> false
     *
     * // curried usage
     * isArrayOf(is.Number)([1, 2, 3]); // -> true
     * validate([1, 2, 3], is.ArrayOf(is.Number)); // -> true
     *
     */
    <TItemGuarded>(value: unknown, guard: Guard<TItemGuarded>): value is TItemGuarded[];
    <TItemGuarded>(guard: Guard<TItemGuarded>): (value: unknown) => value is TItemGuarded[];
};

const isArrayOf: ArrayOfGuard = curriedGuard((value, guard: Guard<unknown>) => {
    return Array.isArray(value) && value.every((value) => guard(value));
});

export default isArrayOf;
