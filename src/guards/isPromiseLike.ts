// import isPromise from './isPromise';
// import isFunction from './isFunction';
// import isHasIn from './isHasIn';

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
    if (value instanceof Promise) {
        return true; // Original promise
    }

    if (value !== null && typeof value === 'object' && 'then' in value && typeof value.then === 'function') {
        return true; // Promise-like object
    }

    return false;
}
