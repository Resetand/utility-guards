import type { Class } from '../_types';
import { isType } from '../_utils';

/**
 * Check if value is a class.
 * Only ES6 classes will be considered as classes.
 * It means that function created by `class` keyword will be considered as a class.
 *
 * @example
 * isClass(class {}); // -> true
 * isClass(class CustomClass {}); // -> true
 * isClass(class extends CustomClass {}); // -> true
 *
 * isClass(() => {}); // -> false
 * isClass(function() {}); // -> false
 * isClass(new Function()); // -> false
 */
export default function isClass(value: unknown): value is Class {
    return isType(value, 'Function') && /^class\s/.test(Function.prototype.toString.call(value));
}
