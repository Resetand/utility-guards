import type { AnyRecord } from '../_types';
import { TypeTag } from '../_types';
import { getTypeTag } from '../_utils';

/**
 * Check if value is a plain JavaScript object (excluding special classes or objects with other prototypes)
 * It may be object literal `{}` or instance created by `Object` constructor
 * or using `Object.create(null | Object)`
 *
 * @example
 * isPlainObject({}); // -> true
 * isPlainObject(Object.create(null)); // -> true
 * isPlainObject(new Object()); // -> true
 *
 * isPlainObject(new CustomClass()); // -> false
 * isPlainObject([]); // -> false
 * isPlainObject(null); // -> false
 */
export default function isPlainObject<T>(value: T | AnyRecord): value is AnyRecord {
    if (getTypeTag(value) !== TypeTag.OBJECT) {
        return false;
    }

    if (Object.getPrototypeOf(value) === null) {
        return true;
    }

    return value instanceof Object && value.constructor === Object && Object.getPrototypeOf(value) === Object.prototype;
}
