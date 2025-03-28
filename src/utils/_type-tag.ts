import type { TypeTag } from '../_types';

/**
 * Return object type string representation
 * @see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
 * @example
 * {} // -> "Object" ("[object Object]"")
 * '' // -> "String" ("[object String]"")
 * [] // -> "Array"  ("[object Array]"")
 */
export const getTypeTag = (value: unknown): TypeTag => {
    return Object.prototype.toString.call(value).slice(8, -1) as TypeTag;
};

export const isType = (value: unknown, typeTag: `${TypeTag}`): boolean => {
    return getTypeTag(value) === typeTag;
};
