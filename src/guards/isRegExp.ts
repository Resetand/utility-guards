/**
 * Check if value a regular expression or created by `RegExp` constructor
 *
 * @example
 * isRegExp(/\w+/); // -> true
 * isRegExp(new RegExp('\\w+', 'g')); // -> true
 * isRegExp(''); // -> false
 */
export default function isRegExp(value: unknown): value is RegExp {
    return value instanceof RegExp;
}
