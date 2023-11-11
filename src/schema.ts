// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

import { is } from './guards';
import { InferTypeSchema, TypeSchema } from './types';

const validateBySchemaFactory = (options: { strict: boolean }) => {
    const strict = options?.strict ?? false;

    const validate = <TValue, TSchema extends TypeSchema<any>>(
        value: TValue,
        schema: TSchema,
    ): value is TValue & InferTypeSchema<TSchema, TValue> => {
        if (is.Function(schema)) {
            return schema(value);
        }

        if (is.Array(schema)) {
            return schema.some((guard) => validate(value, guard));
        }

        if (is.PlainObject(value)) {
            if (Object.keys(value).length !== Object.keys(schema).length && strict) {
                return false;
            }
            return Object.entries(schema).every(([key, guard]) =>
                is.HasKey(value, key) ? validate(value[key], guard) : false,
            );
        }
        return false;
    };

    return validate;
};

export const validateBySchema = validateBySchemaFactory({ strict: false });
export const validateBySchemaStrict = validateBySchemaFactory({ strict: true });
