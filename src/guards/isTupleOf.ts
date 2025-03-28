import { Guard, InferGuardType } from '../_types';
import { curriedGuard } from '../utils/_curried-guard';

type TupleSchema = [Guard, ...Guard[]];
type InferTupleSchema<TSchema extends TupleSchema> = {
    [K in keyof TSchema]: InferGuardType<TSchema[K]>;
};

export type TupleOfGuard = {
    /**
     * Checks if value is an array that matches given array of guards
     *
     * @example
     * isTupleOf([1, 'a'], [isNumber, isString]); // -> true
     * isTupleOf([1, 'a'], [isString, isNumber]); // -> false
     * isTupleOf([1, 'a', 'extra'], [isString, isNumber]); // -> false, (expecting exactly 2 items)
     */
    <S extends TupleSchema>(value: unknown, schema: S): value is InferTupleSchema<S>;
    <S extends TupleSchema>(schema: S): (value: unknown) => value is InferTupleSchema<S>;
};

const isTupleOf: TupleOfGuard = curriedGuard((value: unknown, schema: TupleSchema) => {
    if (!Array.isArray(value) || value.length !== schema.length) {
        return false;
    }

    for (let i = 0; i < schema.length; i++) {
        if (!schema[i](value[i])) {
            return false;
        }
    }

    return true;
});

export default isTupleOf;
