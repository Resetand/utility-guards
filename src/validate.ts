import type { InferTypeSchema, TypeSchema } from './_types';
import { curriedGuard } from './_utils';

import isFunction from './guards/isFunction';
import isPlainObject from './guards/isPlainObject';
import isHasOwn from './guards/isHasOwn';
import isArray from './guards/isArray';

type ValidateGuard = {
    <TSchema extends TypeSchema>(
        value: unknown,
        schema: TSchema | Readonly<TSchema>,
    ): value is InferTypeSchema<TSchema>;
    <TSchema extends TypeSchema>(schema: TSchema | Readonly<TSchema>): (
        value: unknown,
    ) => value is InferTypeSchema<TSchema>;
};

const validateFactory = (options: { strict: boolean }) => {
    const strict = options?.strict ?? false;

    const _validate = curriedGuard<[schema: TypeSchema]>((value, schema): boolean => {
        if (isFunction(schema)) {
            return schema(value);
        }

        if (isArray(schema)) {
            const isSameLength = isArray(value) && schema.length === value.length;
            return isSameLength ? value.every((item, index) => _validate(item, schema[index])) : false;
        }

        if (isPlainObject(schema) && !isPlainObject(value)) {
            return false;
        }

        if (isPlainObject(schema)) {
            const keys = !strict ? Object.keys(schema) : [...new Set([...Object.keys(schema), ...Object.keys(value!)])];

            return keys.every((key) =>
                isHasOwn(value, key) && isHasOwn(schema, key)
                    ? _validate(value[key], schema[key]) //
                    : false,
            );
        }

        throw new Error('Schema must be an object schema or a guard function');
    });

    return _validate;
};

/**
 * Validate value against schema
 * @example
 * import { isString, isNumber, validate } from 'utility-guards';
 *
 * const schema = { a: isNumber, b: isString };
 * validate({ a: 1, b: '2' }, schema); // -> true
 * validate({ a: 1, b: 2, extra: true }, schema); // -> true
 * validate({ a: 1, b: 2 }, schema); // -> false
 *
 * const tupleSchema = [isNumber, isString];
 *
 * validate([1, '2'], tupleSchema); // -> true
 * validate([1, 2], tupleSchema); // -> false
 */
const validate: ValidateGuard = validateFactory({ strict: false });

/**
 * Validate value against schema
 * In strict mode, extra properties for objects are not allowed
 * @example
 * import { isString, isNumber, validateStrict } from 'utility-guards';
 *
 * const schema = { a: isNumber, b: isString };
 * validateStrict({ a: 1, b: '2' }, schema); // -> true
 * validateStrict({ a: 1, b: 2, extra: true }, schema); // -> false
 * validateStrict({ a: 1, b: 2 }, schema); // -> false
 */
const validateStrict: ValidateGuard = validateFactory({ strict: true });

export {
    validate as default, //
    validateStrict,
};
