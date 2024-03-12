import type { Assign, Guard, InferGuardType, Nominal } from './_types';

import isFunction from './guards/isFunction';
import isPlainObject from './guards/isPlainObject';
import isHas from './guards/isHas';
import isArray from './guards/isArray';
import isAnyObject from './guards/isAnyObject';
import isHasIn from './guards/isHasIn';

export type InferTypeSchema<TSchema> = TSchema extends unknown[]
    ? { [K in keyof TSchema]: InferTypeSchema<TSchema[K]> }
    : TSchema extends ObjectSchema
    ? { [K in keyof TSchema]: InferTypeSchema<TSchema[K]> }
    : InferGuardType<TSchema>;

type ObjectSchema = { [K in PropertyKey]: TypeSchema };
export type TypeSchema = ObjectSchema | Guard | [] | [TypeSchema, ...TypeSchema[]];

type Missing = typeof Missing;
const Missing = Symbol('MISSING') as Nominal<'MiSSING', symbol>;
const isMissing = (value: unknown): value is Missing => value === Missing;

type ValidateOptions = {
    /**
     * Whatever to allow extra properties for object schema and extra items for array schema
     * @default `false`
     */
    allowExtra?: boolean;

    /**
     * Whatever to check for inherited properties
     * @default `false`
     */
    checkInheritedProperties?: boolean;
};

type ValidateOptionsWithAllowExtra = Assign<ValidateOptions, { allowExtra: true }>;

const OPTION_PROPS = ['checkInheritedProperties', 'allowExtra'] satisfies (keyof ValidateOptions)[];

type ArbitraryObject<T> = T extends Record<string, unknown> ? T & Record<PropertyKey, unknown> : T;

type ValidateGuard = {
    <TSchema extends TypeSchema>(
        value: unknown,
        schema: TSchema | Readonly<TSchema>,
        options: ValidateOptionsWithAllowExtra,
    ): value is ArbitraryObject<InferTypeSchema<TSchema>>;

    <TSchema extends TypeSchema>(
        value: unknown,
        schema: TSchema | Readonly<TSchema>,
        options?: ValidateOptions,
    ): value is InferTypeSchema<TSchema>;

    <TSchema extends TypeSchema>(schema: TSchema | Readonly<TSchema>, options?: ValidateOptionsWithAllowExtra): {
        (value: unknown): value is ArbitraryObject<InferTypeSchema<TSchema>>;
    };

    <TSchema extends TypeSchema>(schema: TSchema | Readonly<TSchema>, options?: ValidateOptions): {
        (value: unknown): value is InferTypeSchema<TSchema>;
    };
};

/**
 * Validate value against schema
 * @example
 * import { isString, isNumber, validate } from 'utility-guards';
 *
 * const schema = { a: isNumber, b: isString };
 * validate({ a: 1, b: '2' }, schema); // -> true
 * validate({ a: 1, b: 2, extra: true }, schema, { allowExtra: true }); // -> true
 * validate({ a: 1, b: 2 }, schema); // -> false
 *
 * const tupleSchema = [isNumber, isString];
 *
 * validate([1, '2'], tupleSchema); // -> true
 * validate([1, 2], tupleSchema); // -> false
 */
const validate = ((...args: any[]) => {
    const { options: _options, schema, value } = parseArgs(args);

    const options = isMissing(_options) ? undefined : _options;

    if (isMissing(schema)) {
        throw new Error('Schema is required');
    }

    if (isMissing(value)) {
        return (value: unknown) => validateImpl(value, schema, options);
    }

    return validateImpl(value, schema, options);
}) as ValidateGuard;

type ParsedArgs = {
    value: unknown | Missing;
    schema: TypeSchema | Missing;
    options: ValidateOptions | Missing;
};

const parseArgs = (args: any[]): ParsedArgs => {
    let finalValue: unknown | Missing = Missing;
    let finalSchema: TypeSchema | Missing = Missing;
    let finalOptions: ValidateOptions | Missing = Missing;

    if (args.length === 1) {
        const [schema] = args;
        finalSchema = schema;
    } else if (args.length === 2 && isSchema(args[0]) && isOptions(args[1])) {
        const [schema, options] = args;
        finalSchema = schema;
        finalOptions = options;
    } else if (args.length === 2 && isSchema(args[1])) {
        const [value, schema] = args;
        finalSchema = schema;
        finalValue = value;
    } else if (args.length === 3) {
        const [value, schema, options] = args;
        finalValue = value;
        finalSchema = schema;
        finalOptions = options;
    } else {
        throw new Error('Invalid arguments');
    }

    if ((!finalOptions || isMissing(finalOptions) || isOptions(finalOptions)) && isSchema(finalSchema)) {
        return {
            value: finalValue,
            schema: finalSchema,
            options: finalOptions,
        };
    }

    throw new Error('Invalid arguments');
};

const isSchema = (value: unknown): value is TypeSchema => {
    return (isArray(value) || isPlainObject(value) || isFunction(value)) && !isOptions(value);
};

const isOptions = (value: unknown): value is ValidateOptions => {
    if (!isPlainObject(value)) {
        return false;
    }

    if (Object.keys(value).length === 0) {
        return false;
    }

    return Object.keys(value).every((key) => OPTION_PROPS.includes(key as keyof ValidateOptions));
};

const validateImpl = (value: unknown, schema: TypeSchema, options?: ValidateOptions): boolean => {
    const { allowExtra = false, checkInheritedProperties = false } = options ?? {};

    if (isFunction(schema)) {
        return schema(value);
    }

    if (isArray(schema)) {
        const isSameLength = isArray(value) && schema.length === value.length;

        if (!isArray(value)) return false;
        if (!isSameLength && !allowExtra) return false;

        return schema.every((itemSchema, index) => validateImpl(value[index], itemSchema, options));
    }

    if (isPlainObject(schema) && !isAnyObject(value)) {
        return false;
    }

    if (isPlainObject(schema)) {
        const keys = allowExtra ? Object.keys(schema) : [...new Set([...Object.keys(schema), ...Object.keys(value!)])];

        const has = checkInheritedProperties ? isHasIn : isHas;

        return keys.every((key) =>
            has(value, key) && isHas(schema, key)
                ? validateImpl(value[key], schema[key], options) //
                : false,
        );
    }

    throw new Error('Schema must be an object schema or a guard function');
};

export default validate;
