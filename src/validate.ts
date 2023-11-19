import type { InferTypeSchema, TypeSchema } from './types';
import { curriedGuard } from './utils';

import isFunction from './guards/isFunction';
import isPlainObject from './guards/isPlainObject';
import isHasProperty from './guards/isHasProperty';

type ValidateGuard = {
    <TSchema extends TypeSchema<any>>(value: unknown, schema: TSchema): value is InferTypeSchema<TSchema>;
    <TSchema extends TypeSchema<any>>(schema: TSchema): (value: unknown) => value is InferTypeSchema<TSchema>;
};

const validateFactory = (options: { strict: boolean }) => {
    const strict = options?.strict ?? false;

    return curriedGuard<[schema: TypeSchema<any>]>((value, schema) => {
        if (isFunction(schema)) {
            return schema(value);
        }

        if (isPlainObject(schema) && !isPlainObject(value)) {
            return false;
        }

        if (isPlainObject(schema)) {
            const keys = !strict ? Object.keys(schema) : [...new Set([...Object.keys(schema), ...Object.keys(value!)])];

            return keys.every((key) =>
                isHasProperty(value, key) && isHasProperty(schema, key)
                    ? validate(value[key], schema[key]) //
                    : false,
            );
        }

        throw new Error('Schema must be an object schema or a guard function');
    });
};

/**
 * Validate value against schema
 * @example
 * import { isString, isNumber, validate } from 'ts-type-guards';
 *
 * const schema = { a: isNumber, b: isString };
 * validate({ a: 1, b: '2' }, schema); // -> true
 * validate({ a: 1, b: 2, extra: true }, schema); // -> true
 * validate({ a: 1, b: 2 }, schema); // -> false
 */
export const validate: ValidateGuard = validateFactory({ strict: false });

/**
 * Validate value against schema
 * @example
 * import { isString, isNumber, validateStrict } from 'ts-type-guards';
 *
 * const schema = { a: isNumber, b: isString };
 * validateStrict({ a: 1, b: '2' }, schema); // -> true
 * validateStrict({ a: 1, b: 2, extra: true }, schema); // -> false
 * validateStrict({ a: 1, b: 2 }, schema); // -> false
 */
export const validateStrict: ValidateGuard = validateFactory({ strict: true });
