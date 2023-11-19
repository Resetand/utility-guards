import isFunction from './isFunction';
import isHasProperty from './isHasProperty';

/**
 * Check if value is a promise-like object (has `then` method)
 *
 * @example
 * isPromiseLike(new Promise((res) => res(1))); // -> true
 * isPromiseLike(Promise.resolve()); // -> true
 * isPromiseLike({ then: () => void 0 }); // -> true
 * isPromiseLike({}); // -> false
 */
export default function isPromiseLike<T>(value: T | PromiseLike<any>): value is PromiseLike<any> {
    return isHasProperty(value, 'then') && isFunction(value.then);
}
