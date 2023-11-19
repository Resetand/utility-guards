import { TypeTag } from '../_types';
import { getTypeTag } from '../_utils';

/**
 * Check if value a symbol
 *
 * @example
 * isSymbol(Symbol('')); // -> true
 * isSymbol(Symbol(1)); // -> true
 * isSymbol(Symbol.iterator); // -> true
 * isSymbol(''); // -> false
 */
export default function isSymbol<T>(value: T | symbol): value is symbol {
    return getTypeTag(value) === TypeTag.SYMBOL;
}
