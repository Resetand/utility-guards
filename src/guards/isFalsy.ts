type $ExtractNumber<T> = T extends number ? 0 : never;
type $ExtractBoolean<T> = T extends boolean ? false : never;
type $ExtractString<T> = T extends string ? '' : never;
type $ExtractNull<T> = T extends null ? null : never;
type $ExtractUndefined<T> = T extends undefined ? undefined : never;
type $ExtractFalsy<T> =
    | $ExtractNumber<T>
    | $ExtractBoolean<T>
    | $ExtractString<T>
    | $ExtractNull<T>
    | $ExtractUndefined<T>;

type $ExtractFalsyFor<T> = $ExtractFalsy<T> extends T ? $ExtractFalsy<T> : $ExtractFalsy<T> & T;

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
export default function isFalsy<T>(value: T): value is $ExtractFalsyFor<T> {
    return !value;
}
