import { Guard, InferGuardType } from '../_types';
import { curriedGuard } from '../utils/_curried-guard';
import isHasOwn from './isHasOwn';

type ObjectSchema = Record<string, Guard>;
type InferObjectSchema<TSchema extends ObjectSchema> = {
    [K in keyof TSchema]: InferGuardType<TSchema[K]>;
};

export type ObjectOfGuard = {
    /**
     * Checks if value is a object that matches given schema
     *
     * @example
     *
     * isObjectOf({a: 1, b: 'a'}, {a: isNumber, b: isString}); // -> true
     * isObjectOf({a: 1, b: 'a'}, {a: isString, b: isNumber}); // -> false
     * isObjectOf(schema)({a: 1, b: 'a'}); // -> true
     *
     * @example
     * // Additional properties are allowed, to check for exact object use `isObjectExactOf`
     * isObjectOf({a: 1, b: 'a'}, {a: isNumber}); // -> true
     *
     * @example
     * // Check only direct properties (own properties)
     * class MyClass {
     *    myMethod() {}
     * }
     * isObjectOf(new MyClass(), {myMethod: isFunction}); // -> false
     *
     *
     */
    <S extends ObjectSchema>(value: unknown, schema: S): value is InferObjectSchema<S>;
    <S extends ObjectSchema>(schema: S): (value: unknown) => value is InferObjectSchema<S>;
};

const isObjectOf: ObjectOfGuard = curriedGuard((value: any, schema: ObjectSchema) => {
    if (typeof value !== 'object' || value === null) {
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

export default isObjectOf;
