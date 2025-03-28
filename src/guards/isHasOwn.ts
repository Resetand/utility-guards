import { curriedGuard } from '../_utils';

type IsHasOwnGuard = {
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
     * isHasOwn({ a: 1 }, 'a'); // -> true
     * isHasOwn({ a: 1 }, 'b'); // -> false
     * isHasOwn({}, 'a'); // -> false
     * isHasOwn(new A(), 'method'); // -> false (see `is.HasIn`)
     *
     * // curried usage
     * isHasOwn({ a: 1 })('a'); // -> true
     * validate({value}, {value: is.isHasOwn({ a: 1 })}); // -> true
     */
    <T, P extends PropertyKey>(value: T, propertyName: P): value is T & { [K in P]: unknown };
    <P extends PropertyKey>(propertyName: P): <T>(value: T) => value is T & { [K in P]: unknown };
};

const isHasOwn: IsHasOwnGuard = curriedGuard((value, propertyName) => {
    return value instanceof Object && Object.prototype.hasOwnProperty.call(value, propertyName);
});

export default isHasOwn;
