// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

import { curriedGuard } from './utils';
import { is } from './guards';
import { InferTypeSchema, TypeSchema } from './types';

type ValidateGuard = {
    <TSchema extends TypeSchema<any>>(value: unknown, schema: TSchema): value is InferTypeSchema<TSchema>;
    <TSchema extends TypeSchema<any>>(schema: TSchema): (value: unknown) => value is InferTypeSchema<TSchema>;
};

const validateFactory = (options: { strict: boolean }) => {
    const strict = options?.strict ?? false;

    return curriedGuard<[schema: TypeSchema<any>]>((value, schema) => {
        if (is.Function(schema)) {
            return schema(value);
        }

        if (is.PlainObject(schema) && !is.PlainObject(value)) {
            return false;
        }

        if (is.PlainObject(schema)) {
            const keys = !strict ? Object.keys(schema) : [...new Set([...Object.keys(schema), ...Object.keys(value!)])];

            return keys.every((key) =>
                is.HasProperty(value, key) && is.HasProperty(schema, key)
                    ? validate(value[key], schema[key]) //
                    : false,
            );
        }

        throw new Error('Schema must be an object schema or a guard function');
    });
};

export const validate: ValidateGuard = validateFactory({ strict: false });
export const validateStrict: ValidateGuard = validateFactory({ strict: true });
