import type { ClassConstructor } from '../types';
import { curriedGuard } from '../utils';

type InstanceOfGuard = {
    <T>(value: unknown, constructor: ClassConstructor<T>): value is T;
    <T>(constructor: ClassConstructor<T>): (value: unknown) => value is T;
};

/**
 * Check if value is instance of given constructor
 *
 * @example
 * isInstanceOf(new Cls(), Cls); // -> true
 * isInstanceOf(new CustomError(), Error); // -> true
 * isInstanceOf(new CustomError(), CustomError); // -> true
 * isInstanceOf(new CustomError(), Cls); // -> false
 *
 * // guarded usage
 * isInstanceOf(Cls)(new Cls()); // -> true
 * validate({value}, {value: is.InstanceOf(Cls)}); // -> true
 */
const isInstanceOf: InstanceOfGuard = curriedGuard((value: unknown, constructor: ClassConstructor) => {
    return value instanceof constructor;
});

export default isInstanceOf;
