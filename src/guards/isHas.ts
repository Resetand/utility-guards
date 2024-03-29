import { curriedGuard } from '../_utils';

type IsHasGuard = {
    /**
     * Check if value is an any object and has a direct property with given name
     *
     * This method based on `Object.prototype.hasOwnProperty` and does not check prototype chain
     *
     *
     * @example
     * class A {
     *    method() {}
     * }
     * isHas({ a: 1 }, 'a'); // -> true
     * isHas({ a: 1 }, 'b'); // -> false
     * isHas({}, 'a'); // -> false
     * isHas(new A(), 'method'); // -> false (see `is.HasIn`)
     *
     * // curried usage
     * isHas({ a: 1 })('a'); // -> true
     * validate({value}, {value: is.isHas({ a: 1 })}); // -> true
     */
    <T, P extends PropertyKey>(value: unknown, propertyName: P): value is Record<P, unknown>;
    <P extends PropertyKey>(propertyName: P): (value: unknown) => value is Record<P, unknown>;
};

const isHas: IsHasGuard = curriedGuard((value, propertyName) => {
    return value instanceof Object && Object.prototype.hasOwnProperty.call(value, propertyName);
});

export default isHas;
