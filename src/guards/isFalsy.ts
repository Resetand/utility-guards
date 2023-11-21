type Falsy = false | 0 | '' | null | undefined;

/**
 * Check if value is falsy.
 *
 * Base on negation of `!` operator, that converts value to boolean.
 * Falsy is a value that converts to false when evaluated in a Boolean context.
 *
 * @example
 * isFalsy(0); // -> true
 * isFalsy(''); // -> true
 * isFalsy(false); // -> true
 * isFalsy(null); // -> true
 * isFalsy(1); // -> false
 */
export default function isFalsy<T>(value: T | Falsy): value is Falsy {
    return !value;
}
