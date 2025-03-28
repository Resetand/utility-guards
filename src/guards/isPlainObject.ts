type PlainObject = {
    [key: string]: unknown;
};

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
export default function isPlainObject(value: unknown): value is PlainObject {
    if (value === null || !(typeof value === 'object')) {
        return false;
    }

    if (Object.getPrototypeOf(value) === null) {
        return true;
    }

    return value instanceof Object && value.constructor === Object && Object.getPrototypeOf(value) === Object.prototype;
}
