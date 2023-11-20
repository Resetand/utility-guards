import { curriedGuard } from './_utils';

type IsEqualCallback = (value: unknown, expectedValue: unknown) => boolean;

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
    <const T>(expectedValue: T, isEqual: IsEqualCallback): (value: unknown | T) => value is T;
    <const T>(value: unknown | T, expectedValue: T): value is T;
    <const T>(value: unknown | T, expectedValue: T, isEqual: IsEqualCallback): value is T;
};

const defaultIsEqual = Object.is;

const is: IsGuard = curriedGuard((value: unknown, expectedValue: unknown, isEqual: IsEqualCallback = defaultIsEqual) =>
    isEqual(value, expectedValue),
);

export default is;

const isSome = is('some', Object.is);

isSome('some');
