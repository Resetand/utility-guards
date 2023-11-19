import isArray from './isArray';
import type { Guard } from '../types';
import { curriedGuard } from '../utils';

type IsArrayOfGuard = {
    <TItemGuarded>(value: unknown, guard: Guard<TItemGuarded>): value is TItemGuarded[];
    <TItemGuarded>(guard: Guard<TItemGuarded>): (value: unknown) => value is TItemGuarded[];
};

/**
 * Check if all elements of array match given guard
 *
 * @example
 * isArrayOf([1, 2, 3], is.Number); // -> true
 * isArrayOf([1, 2, '3'], is.Number); // -> false
 * isArrayOf([], is.Number); // -> true
 * isArrayOf([1, 2, 3], is.String); // -> false
 *
 * // guarded usage
 * isArrayOf(is.Number)([1, 2, 3]); // -> true
 * validate([1, 2, 3], is.ArrayOf(is.Number)); // -> true
 *
 */
const isArrayOf: IsArrayOfGuard = curriedGuard((value, guard: Guard<unknown>) => {
    return isArray(value) && value.every((value) => guard(value));
});

export default isArrayOf;
