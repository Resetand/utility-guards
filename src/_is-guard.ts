import { curriedGuard } from './_utils';

export type IsGuard = {
    /**
     * Check if value is equal to expected value
     *
     * Based on Object.is
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     *
     * @example
     * is(1, 1); // -> true
     * is(1, 2); // -> false
     * is(1)(1); // -> true
     * is(1)(2); // -> false
     */
    <const T>(expectedValue: T): (value: unknown | T) => value is T;
    <const T>(value: unknown | T, expectedValue: T): value is T;
};

const is: IsGuard = curriedGuard((value: unknown, expectedValue: unknown) => Object.is(value, expectedValue));

export default is;
