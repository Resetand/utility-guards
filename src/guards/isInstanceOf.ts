import type { ClassConstructor } from '../_types';
import { curriedGuard } from '../_utils';

type InstanceOfGuard = {
    /**
     * Check if value is instance of given constructor
     *
     * @example
     * isInstanceOf(new Cls(), Cls); // -> true
     * isInstanceOf(new CustomError(), Error); // -> true
     * isInstanceOf(new CustomError(), CustomError); // -> true
     * isInstanceOf(new CustomError(), Cls); // -> false
     *
     * // curried usage
     * isInstanceOf(Cls)(new Cls()); // -> true
     * validate({value}, {value: is.InstanceOf(Cls)}); // -> true
     */
    <T>(value: unknown, constructor: ClassConstructor<T>): value is T;
    <T>(constructor: ClassConstructor<T>): (value: unknown) => value is T;
};

const isInstanceOf: InstanceOfGuard = curriedGuard((value: unknown, constructor: ClassConstructor) => {
    return value instanceof constructor;
});

export default isInstanceOf;
