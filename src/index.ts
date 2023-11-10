type Nullable = undefined | null;
type AnyFunction<TReturn = any> = (...args: any[]) => TReturn;
type AnyPrimitive = string | number | bigint | boolean | symbol | null | undefined;

enum TypeTag {
    STRING = 'String',
    NUMBER = 'Number',
    OBJECT = 'Object',
    BOOLEAN = 'Boolean',
    PROMISE = 'Promise',
    DATE = 'Date',
    SYMBOL = 'Symbol',
    REGEXP = 'RegExp',
    ERROR = 'Error',
}

/**
 * return object type string representation
 * @see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
 * @example
 * {} // -> "Object" ("[object Object]"")
 * '' // -> "String" ("[object String]"")
 * [] // -> "Array"  ("[object Array]"")
 */
const getTypeTag = (value: unknown): TypeTag => {
    return Object.prototype.toString.call(value).slice(8, -1);
};

/**
 * Util for runtime types checking.
 */
const is = {
    /**
     * Checks is a value a string literal or string created by `String` constructor
     */
    String: (value: unknown): value is string => {
        return getTypeTag(value) === TypeTag.STRING;
    },

    /**
     * Checks is a value a number literal or number created by `Number` constructor
     */
    Number: (value: unknown): value is number => {
        return getTypeTag(value) === TypeTag.NUMBER;
    },

    Symbol: (value: unknown): value is symbol => {
        return getTypeTag(value) === TypeTag.SYMBOL;
    },

    RegExp: (value: unknown): value is RegExp => {
        return getTypeTag(value) === TypeTag.REGEXP;
    },

    Error: (value: unknown): value is Error => {
        return value instanceof Error && getTypeTag(value) === TypeTag.ERROR;
    },

    /**
     * Checks is a value a boolean
     */
    Boolean: (value: unknown): value is boolean => {
        return getTypeTag(value) === TypeTag.BOOLEAN;
    },

    /**
     * Checks if value is a NaN
     */
    NaN: (value: unknown): value is number => {
        return is.Number(value) && isNaN(value);
    },

    /**
     * Checks if value is a null or undefined
     */
    Nil: (value: unknown): value is Nullable => {
        return value === null || value === undefined;
    },

    /**
     * Check if value is a primitive
     * @see `AnyPrimitive`
     */
    Primitive: (value: unknown): value is AnyPrimitive => {
        return value === null || (typeof value !== 'object' && typeof value !== 'function');
    },

    /**
     * Check if value is a plain JavaScript object (excluding special classes or objects with other prototypes)
     * It may be object literal `{}` or instance created by `Object` constructor
     * or using `Object.create(null | Object)`
     */
    PlainObject: (value: unknown): value is Record<PropertyKey, unknown> => {
        if (getTypeTag(value) !== TypeTag.OBJECT) {
            return false;
        }

        if (Object.getPrototypeOf(value) === null) {
            return true;
        }

        return (
            value instanceof Object && value.constructor === Object && Object.getPrototypeOf(value) === Object.prototype
        );
    },

    /**
     * Check if object has own property
     */
    HasKey: <P extends string>(
        value: unknown,
        propertyName: P,
    ): value is Record<PropertyKey, unknown> & Record<P, unknown> => {
        return value instanceof Object && Object.prototype.hasOwnProperty.call(value, propertyName);
    },

    /**
     * Check if value is array
     */
    Array: (value: unknown): value is unknown[] => {
        return Array.isArray(value);
    },

    /**
     * Check if value is an any function
     */
    Function: (value: unknown): value is AnyFunction => {
        return typeof value === 'function';
    },

    /**
     * Check if value is a promise object
     */
    Promise: (value: unknown): value is Promise<unknown> => {
        return !!value && getTypeTag(value) === TypeTag.PROMISE;
    },

    /**
     * Check if value is a valid JS date
     */
    Date: (value: unknown): value is Date => {
        return !!value && getTypeTag(value) === TypeTag.DATE && !is.NaN(Number(value));
    },

    /**
     * Check if value is empty:
     * Value is considered as empty if it's
     * - empty object: `{}`
     * - empty array: `[]`
     * - empty string: `''`
     * - nullable value: `null or undefined`
     */
    Empty: <T>(value: T): value is Extract<T, Nullable | '' | { [P in keyof T]: never } | never> => {
        if (is.PlainObject(value)) {
            return !Object.keys(value).length;
        }
        if (is.Array(value)) {
            return !value.length;
        }
        if (is.String(value)) {
            return value === '';
        }

        return is.Nil(value);
    },
};

export default is;
