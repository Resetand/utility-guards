// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

import { curriedGuard } from './utils';
import { is } from './guards';
import { Guard, InferTypeSchema, TypeSchema } from './types';

type ValidateGuard = {
    <TSchema extends TypeSchema<any>>(value: unknown, schema: TSchema): value is InferTypeSchema<TSchema>;
    <TSchema extends TypeSchema<any>>(schema: TSchema): (value: unknown) => value is InferTypeSchema<TSchema>;
};

const validateFactory = (options: { strict: boolean }) => {
    const strict = options?.strict ?? false;

    return curriedGuard(
        <TSchema extends TypeSchema<any>>(value: unknown, schema: TSchema): value is InferTypeSchema<TSchema> => {
            if (is.Function(schema)) {
                return schema(value);
            }

            if (is.PlainObject(schema)) {
                const keysMismatch =
                    !is.PlainObject(value) || Object.keys(value).some((key) => !is.HasKey(schema, key));

                if (keysMismatch && strict) {
                    return false;
                }
                return Object.entries(schema).every(([key, guard]) =>
                    is.HasKey(value, key) ? validate(value[key], guard as Guard) : false,
                );
            }

            throw new Error('Schema must be an object schema or a guard function');
        },
    );
};

export const validate: ValidateGuard = validateFactory({ strict: false });
export const validateStrict: ValidateGuard = validateFactory({ strict: true });
