import { RecordLike } from '../_types';
import { curriedGuard } from '../_utils';

type IsHasInGuard = {
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
    <T, P extends PropertyKey>(value: T | RecordLike, propertyName: P): value is RecordLike<P>;
    <P extends PropertyKey>(propertyName: P): <T>(value: T) => value is RecordLike<P> & T;
};

const isHasIn: IsHasInGuard = curriedGuard((value, propertyName) => {
    return value instanceof Object && propertyName in value;
});

export default isHasIn;
