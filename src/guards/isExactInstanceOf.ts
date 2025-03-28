import type { Class } from '../_types';
import { curriedGuard } from '../_utils';

type ExactInstanceOfGuard = {
    /**
     * Check if value is an exact instance of given constructor
     *
     * @example
     * class A {}
     * class B extends A {}
     * isInstanceOf(new A(), A); // -> true
     * isInstanceOf(new B(), A); // -> false
     */
    <T>(value: unknown, constructor: Class<T>): value is T;
    <T>(constructor: Class<T>): (value: unknown) => value is T;
};

const isExactInstanceOf: ExactInstanceOfGuard = curriedGuard((value: unknown, constructor: Class) => {
    return value instanceof constructor && Object.getPrototypeOf(value) === constructor.prototype;
});

export default isExactInstanceOf;
