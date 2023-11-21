import { RecordLike } from '../_types';
import { curriedGuard, isType } from '../_utils';

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
    <T, P extends PropertyKey>(value: T | RecordLike, propertyName: P): value is RecordLike<P>;
    <P extends PropertyKey>(propertyName: P): <T>(value: T) => value is RecordLike<P> & T;
};

const isHas: IsHasGuard = curriedGuard((value, propertyName) => {
    return isType(value, 'Object') && Object.prototype.hasOwnProperty.call(value, propertyName);
});

export default isHas;
