type Primitive = string | number | boolean | symbol | bigint | null | undefined;

const typeOfMap = {
    object: false,
    function: false,
    undefined: true,
    string: true,
    number: true,
    boolean: true,
    bigint: true,
    symbol: true,
};

/**
 * Check if value is a primitive
 * @see `Primitive`
 *
 * @example
 * isPrimitive(1); // -> true
 * isPrimitive(''); // -> true
 * isPrimitive(true); // -> true
 * isPrimitive(Symbol('')); // -> true
 * isPrimitive(BigInt(1)); // -> true
 * isPrimitive(null); // -> true
 * isPrimitive(undefined); // -> true
 *
 * isPrimitive({}); // -> false
 * isPrimitive([]); // -> false
 */
export default function isPrimitive(value: unknown): value is Primitive {
    return typeOfMap[typeof value] || value === null;
}
