import { curriedGuard } from '../utils';

type RecordLike<P extends PropertyKey = PropertyKey> = Record<PropertyKey, unknown> & Record<P, unknown>;

type IsHasPropertyGuard = {
    /**
     * Check if object has own property
     *
     * @example
     * isHasProperty({ a: 1 }, 'a'); // -> true
     * isHasProperty({ a: 1 }, 'b'); // -> false
     * isHasProperty({}, 'a'); // -> false
     *
     * // curried usage
     * isHasProperty({ a: 1 })('a'); // -> true
     * validate({value}, {value: is.HasProperty({ a: 1 })}); // -> true
     */
    <T, P extends PropertyKey>(value: T | RecordLike, propertyName: P): value is RecordLike<P>;
    <P extends PropertyKey>(propertyName: P): <T>(value: T) => value is RecordLike<P> & T;
};

const isHasProperty: IsHasPropertyGuard = curriedGuard((value, propertyName) => {
    return value instanceof Object && Object.prototype.hasOwnProperty.call(value, propertyName);
});

export default isHasProperty;
