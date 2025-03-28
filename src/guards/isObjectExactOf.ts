import { Guard, InferGuardType } from '../_types';
import { curriedGuard } from '../utils/_curried-guard';
import isHasOwn from './isHasOwn';

type ObjectSchema = Record<string, Guard>;
type InferObjectSchema<TSchema extends ObjectSchema> = {
    [K in keyof TSchema]: InferGuardType<TSchema[K]>;
};

type ObjectExactOfGuard = {
    /**
     * Similar to `isObjectOf` but checks for exact object with no additional properties allowed
     */
    <S extends ObjectSchema>(value: unknown, schema: S): value is InferObjectSchema<S>;
    <S extends ObjectSchema>(schema: S): (value: unknown) => value is InferObjectSchema<S>;
};

const isObjectExactOf: ObjectExactOfGuard = curriedGuard((value: any, schema: ObjectSchema) => {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    if (Object.keys(value).length !== Object.keys(schema).length) {
        return false;
    }

    for (const key in schema) {
        if (!isHasOwn(value, key)) {
            return false;
        }
        if (!schema[key](value[key])) {
            return false;
        }
    }

    return true;
});

export default isObjectExactOf;
