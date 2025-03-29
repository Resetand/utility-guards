import { curriedGuard } from '../utils/_curried-guard';

export type HasOwnGuard = {
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
    <T, P extends PropertyKey>(value: unknown, propertyName: P): value is Record<P, unknown>;
    <P extends PropertyKey>(propertyName: P): (value: unknown) => value is Record<P, unknown>;
};

const isHasOwn: HasOwnGuard = curriedGuard((value, propertyName) => {
    return value instanceof Object && Object.prototype.hasOwnProperty.call(value, propertyName);
});

export default isHasOwn;
