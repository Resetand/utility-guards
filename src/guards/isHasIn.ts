import { curriedGuard } from '../_utils';

export type IsHasInGuard = {
    /**
     * Check if value is an any object and a direct or inherited property
     *
     * This method based on `in` operator and checks prototype chain
     *
     * @example
     * class A {
     *    method() {}
     * }
     * isHasIn({ a: 1 }, 'a'); // -> true
     * isHasIn({ a: 1 }, 'b'); // -> false
     * isHasIn({}, 'a'); // -> false
     * isHasIn(new A(), 'method'); // -> true
     *
     * // curried usage
     * isHasIn({ a: 1 })('a'); // -> true
     * validate({value}, {value: is.isHasIn({ a: 1 })}); // -> true
     */
    <T, P extends PropertyKey>(value: unknown, propertyName: P): value is Record<P, unknown>;
    <P extends PropertyKey>(propertyName: P): (value: unknown) => value is Record<P, unknown>;
};

const isHasIn: IsHasInGuard = curriedGuard((value, propertyName) => {
    return value != null && propertyName in Object(value);
});

export default isHasIn;
