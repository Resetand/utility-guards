import { isType } from '../_utils';

/**
 * Check if value a symbol
 *
 * @example
 * isSymbol(Symbol('')); // -> true
 * isSymbol(Symbol(1)); // -> true
 * isSymbol(Symbol.iterator); // -> true
 * isSymbol(''); // -> false
 */
export default function isSymbol(value: unknown): value is symbol {
    return isType(value, 'Symbol');
}
