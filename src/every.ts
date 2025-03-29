import type { Guard, InferGuardType, UnionToIntersection } from './_types';

type AnyGuard<TGuarded = unknown, TValue = unknown> = (value: TValue | TGuarded, ...args: any[]) => value is TGuarded;

export type EveryGuard = {
    <G1, V1, G2, V2>(
        g1: AnyGuard<G1, V1>, //
        g2: AnyGuard<G2, V2>,
    ): AnyGuard<G1 & G2, V1 | V2>;

    <G1, V1, G2, V2, G3, V3>(
        g1: AnyGuard<G1, V1>, //
        g2: AnyGuard<G2, V2>,
        g3: AnyGuard<G3, V3>,
    ): AnyGuard<G1 & G2 & G3, V1 | V2 | V3>;
    <G1, V1, G2, V2, G3, V3, G4, V4>(
        g1: AnyGuard<G1, V1>, //
        g2: AnyGuard<G2, V2>,
        g3: AnyGuard<G3, V3>,
        g4: AnyGuard<G4, V4>,
    ): AnyGuard<G1 & G2 & G3 & G4, V1 | V2 | V3 | V4>;

    <G1, V1, G2, V2, G3, V3, G4, V4, G5, V5>(
        g1: AnyGuard<G1, V1>,
        g2: AnyGuard<G2, V2>,
        g3: AnyGuard<G3, V3>,
        g4: AnyGuard<G4, V4>,
        g5: AnyGuard<G5, V5>,
    ): AnyGuard<G1 & G2 & G3 & G4 & G5, V1 | V2 | V3 | V4 | V5>;

    <G1, V1, G2, V2, G3, V3, G4, V4, G5, V5, G6, V6>(
        g1: AnyGuard<G1, V1>,
        g2: AnyGuard<G2, V2>,
        g3: AnyGuard<G3, V3>,
        g4: AnyGuard<G4, V4>,
        g5: AnyGuard<G5, V5>,
        g6: AnyGuard<G6, V6>,
    ): AnyGuard<G1 & G2 & G3 & G4 & G5 & G6, V1 | V2 | V3 | V4 | V5 | V6>;

    <TGuards extends Guard[]>(...guards: TGuards): AnyGuard<UnionToIntersection<InferGuardType<TGuards[number]>>>;
};

/**
 * Combine multiple guards into intersection guard
 * @example
 * const isEmptyArray = $every(is.Empty, isArray);
 * isEmptyArray([]); // -> true
 * isEmptyArray([1]); // -> false
 * isEmptyArray(null); // -> false
 *
 * @example
 * const isNotStringAndNotNumber = $every($not(isNumber), $not(isString));
 * const arr = [1, '', null];
 * arr.filter(isNotStringAndNotNumber); // type: null[]
 */
const $every: EveryGuard = (...guards: AnyGuard[]) => {
    return (value: any): value is unknown => guards.every((guard) => guard(value));
};

export default $every;
