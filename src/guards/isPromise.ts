import { TypeTag } from '../types';
import { getTypeTag } from '../utils';

/**
 * Check if value is a promise object
 *
 * @example
 * isPromise(new Promise((res) => res(1))); // -> true
 * isPromise(Promise.resolve()); // -> true
 * isPromise({ then: () => void 0 }); // -> false (see `is.PromiseLike`)
 * isPromise({}); // -> false
 */
export default function isPromise<T>(value: T | Promise<unknown>): value is Promise<unknown> {
    return !!value && getTypeTag(value) === TypeTag.PROMISE;
}
