type NullOrUndefined = null | undefined;
type AnyFunction<TReturn = any> = (...args: any[]) => TReturn;
type AnyPrimitive = string | number | bigint | boolean | symbol | null | undefined;
type GuardFunction<TGuarded = unknown> = (value: unknown) => value is TGuarded;

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
    return Object.prototype.toString.call(value).slice(8, -1) as TypeTag;
};

type CurriedGuardFunction<TGuarded = unknown, TArgs extends unknown[] = unknown[]> = (
    ...args: TArgs
) => GuardFunction<TGuarded>;

const curryGuard = <TValue, TGuarded extends TValue, TArgs extends unknown[]>(
    guard: (value: TValue, ...args: TArgs) => value is TGuarded,
): CurriedGuardFunction<TGuarded, TArgs> => {
    return (...args: TArgs): GuardFunction<TGuarded> => {
        return (value): value is TGuarded => {
            return guard(value as TValue, ...args);
        };
    };
};

const bindProperty = <TSource, TMethodProp extends keyof TSource>(source: TSource, prop: TMethodProp) => {
    const currentValue = source[prop];

    if (is.Function(currentValue)) {
        delete source[prop];
        source[prop] = currentValue;
    }
};

/**
 * Util for runtime types checking.
 */
const is = {
    /**
     * Check if value a string literal or string created by `String` constructor
     */
    String: (value: unknown): value is string => {
        return getTypeTag(value) === TypeTag.STRING;
    },

    /**
     * Check if value a number literal or number created by `Number` constructor
     */
    Number: (value: unknown): value is number => {
        return getTypeTag(value) === TypeTag.NUMBER;
    },

    /**
     * Check if value a symbol
     */
    Symbol: (value: unknown): value is symbol => {
        return getTypeTag(value) === TypeTag.SYMBOL;
    },

    /**
     * Check if value a regular expression or created by `RegExp` constructor
     */
    RegExp: (value: unknown): value is RegExp => {
        return getTypeTag(value) === TypeTag.REGEXP;
    },

    /**
     * Check if value a JS error
     */
    Error: (value: unknown): value is Error => {
        return value instanceof Error && getTypeTag(value) === TypeTag.ERROR;
    },

    /**
     * Check if value a boolean
     */
    Boolean: (value: unknown): value is boolean => {
        return getTypeTag(value) === TypeTag.BOOLEAN;
    },

    /**
     * Check if value is a NaN
     */
    NaN: (value: unknown): value is number => {
        return is.Number(value) && isNaN(value);
    },

    /**
     * Check if value is a null or undefined
     */
    Nil: (value: unknown): value is NullOrUndefined => {
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
     * Check if value is a promise-like object (has `then` method)
     */
    PromiseLike: (value: unknown): value is Promise<unknown> => {
        return is.Promise(value) || (is.HasKey(value, 'then') && is.Function(value.then));
    },

    /**
     * Check if value is a valid JS date
     */
    Date: (value: unknown): value is Date => {
        return !!value && getTypeTag(value) === TypeTag.DATE && !is.NaN(Number(value));
    },

    /**
     * Check if value is iterable (arrays, strings, maps, sets, etc.)
     */
    Iterable: (value: unknown): value is Iterable<unknown> => {
        return Symbol.iterator in Object(value);
    },

    /**
     * Check if value is empty:
     * Value is considered as empty if it's
     * - empty object: `{}`
     * - empty array: `[]`
     * - empty Set: `new Set()`
     * - empty Map: `new Map()`
     * - empty string: `''`
     * - nullable value: `null or undefined`
     */
    Empty: <T>(value: T): value is Extract<T, NullOrUndefined | '' | { [P in keyof T]: never } | never> => {
        if (is.PlainObject(value)) {
            return !Object.keys(value).length;
        }
        if (is.Array(value)) {
            return !value.length;
        }
        if (is.InstanceOf(value, Set) || is.InstanceOf(value, Map)) {
            return !value.size;
        }
        if (is.String(value)) {
            return value === '';
        }

        return is.Nil(value);
    },

    /**
     * Check if value is instance of given constructor
     */
    InstanceOf: <T>(value: unknown, constructor: new (...args: any[]) => T): value is T => {
        return value instanceof constructor;
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
     * Check if all elements of array match given guard
     */
    ArrayOf: <T>(value: unknown, guard: GuardFunction<T>): value is T[] => {
        return is.Array(value) && value.every(guard);
    },

    get $HasKey() {
        return curryGuard(is.HasKey);
    },

    get $InstanceOf() {
        return curryGuard(is.InstanceOf);
    },

    get $ArrayOf() {
        return curryGuard(is.ArrayOf);
    },
};

bindProperty(is, '$HasKey');
bindProperty(is, '$ArrayOf');
bindProperty(is, '$InstanceOf');

export default is;

// -----------------------------------------------------------------------------
// validateBySchema
// -----------------------------------------------------------------------------

export type TypeSchema<T> = T extends Record<string, unknown> ? _ObjectSchema<T> : GuardFunction | GuardFunction[];

type _ObjectSchema<T extends Record<string, unknown>> = {
    [K in keyof T]: GuardFunction | TypeSchema<T[K]>;
};

type _InferTypeGuard<TGuard extends GuardFunction> = TGuard extends (value: unknown) => value is infer T ? T : never;
type _InferTypeGuardArray<TG1 extends GuardFunction[]> = TG1 extends GuardFunction<infer T>[] ? T : never;

type _InferTypeSchema<TSchema, TValue = unknown> = TSchema extends Record<string, unknown>
    ? { [K in keyof TSchema]: _InferTypeSchema<TSchema[K], K extends keyof TValue ? TValue[K] : never> }
    : TSchema extends GuardFunction
    ? _InferTypeGuard<TSchema> & TValue
    : TSchema extends GuardFunction[]
    ? _InferTypeGuardArray<TSchema> & TValue
    : never;

const _validateBySchemaImpl = <TValue, TSchema extends TypeSchema<any>>(
    value: TValue,
    schema: TSchema,
    options?: { strict?: boolean },
): value is TValue & _InferTypeSchema<TSchema, TValue> => {
    const strictShape = options?.strict ?? false;

    if (is.Function(schema)) {
        return schema(value);
    }

    if (is.Array(schema)) {
        return schema.some((guard) => _validateBySchemaImpl(value, guard));
    }

    if (is.PlainObject(value)) {
        if (Object.keys(value).length !== Object.keys(schema).length && strictShape) {
            return false;
        }
        return Object.entries(schema).every(([key, guard]) =>
            is.HasKey(value, key) ? _validateBySchemaImpl(value[key], guard) : false,
        );
    }
    return false;
};

export const validateBySchema = <TValue, TSchema extends TypeSchema<any>>(
    value: TValue,
    schema: TSchema,
): value is TValue & _InferTypeSchema<TSchema, TValue> => {
    return _validateBySchemaImpl(value, schema, { strict: false });
};

export const validateBySchemaStrict = <TValue, TSchema extends TypeSchema<any>>(
    value: TValue,
    schema: TSchema,
): value is TValue & _InferTypeSchema<TSchema, TValue> => {
    return _validateBySchemaImpl(value, schema, { strict: true });
};
