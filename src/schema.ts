// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

import { is } from './guards';
import { InferTypeSchema, TypeSchema } from './types';

const validateBySchemaFactory = (options: { strict: boolean }) => {
    const strict = options?.strict ?? false;

    const validate = <TSchema extends TypeSchema<any>>(
        value: unknown,
        schema: TSchema,
    ): value is InferTypeSchema<TSchema> => {
        if (is.Function(schema)) {
            return schema(value);
        }

        if (is.Array(schema)) {
            return schema.some((guard) => validate(value, guard as any));
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
