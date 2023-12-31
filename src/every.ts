import type { Guard, InferGuardType } from './_types';

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type $EveryGuards<TGuards extends Guard[]> = Guard<UnionToIntersection<InferGuardType<TGuards[number]>>>;

/**
 * Combine multiple guards into intersection guard
 * @example
 * const isEmptyArray = $every(is.Empty, isArray);
 * isEmptyArray([]); // -> true
 * isEmptyArray([1]); // -> false
 * isEmptyArray(null); // -> false
 */
export default function $every<TGuards extends Guard[]>(...guards: TGuards): $EveryGuards<TGuards> {
    return ((value: unknown) => guards.every((guard) => guard(value))) as $EveryGuards<TGuards>;
}
