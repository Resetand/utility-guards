import { TypeTag } from '../types';
import { getTypeTag } from '../utils';

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
