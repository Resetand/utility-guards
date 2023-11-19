import type { Guard, InferGuardType } from '../types';

type $SomeGuards<TGuards extends Guard[]> = Guard<InferGuardType<TGuards[number]>>;

/**
 * Combine multiple guards into union guard
 * @example
 * const isNumberOrString = $some(is.Number, is.String);
 * isNumberOrString(1); // -> true
 * isNumberOrString('1'); // -> true
 * isNumberOrString([]); // -> false
 */
export default function $some<TGuards extends Guard[]>(...guards: TGuards): $SomeGuards<TGuards> {
    return ((value: unknown) => guards.some((guard) => guard(value))) as $SomeGuards<TGuards>;
}
