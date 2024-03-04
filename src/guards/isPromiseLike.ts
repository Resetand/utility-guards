import isPromise from './isPromise';
import isFunction from './isFunction';
import isHasIn from './isHasIn';

/**
 * Check if value is a promise-like object (has `then` method)
 *
 * @example
 * isPromiseLike(new Promise((res) => res(1))); // -> true
 * isPromiseLike(Promise.resolve()); // -> true
 * isPromiseLike({ then: () => void 0 }); // -> true
 * isPromiseLike({}); // -> false
 */
export default function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
    return isPromise(value) || (isHasIn(value, 'then') && isFunction(value.then));
}
