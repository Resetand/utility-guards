/**
 * Returns true for any value.
 * This is special case guard that originally was created to be used with `validate` function.
 *
 * @example
 * // using with validate function
 * if (validate(value, { someProp: isAny, someOtherProp: isString })) {
 *   value.someProp // type unknown
 * }
 * 
 * @example
 * const obj = JSON.parse(value) as { a: number } | { b: string };
 * if (validate(obj, { a: isAny })) {
 *   obj.a // type number
 * }

 *
 * @example
 * isAny(1); // -> true
 * isAny(''); // -> true
 * isAny(<WHATEVER>); // -> true
 */
export default function isAny(_value: unknown): _value is any {
    return true;
}
