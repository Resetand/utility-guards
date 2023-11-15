import { curriedGuard } from '../src/utils';
import { expect, test } from 'vitest';

class Cls {}

test('Should curry guard', () => {
    const isInstanceGuard = curriedGuard(<T>(value: unknown, constructor: new (...args: any[]) => T): value is T => {
        return value instanceof constructor;
    });

    expect(isInstanceGuard(Cls)).toBeInstanceOf(Function);
    expect(isInstanceGuard(Cls)({})).toBe(false);
    expect(isInstanceGuard(Cls)(new Cls())).toBe(true);

    const isStringGuardMultipleArgs = curriedGuard(
        (value: unknown, _arg1: string, _arg2: number, _arg3: boolean): value is string => {
            return typeof value === 'string';
        },
    );

    expect(isStringGuardMultipleArgs('string', 42, false)).toBeInstanceOf(Function);
    expect(isStringGuardMultipleArgs('string', 42, false)('string')).toBe(true);
    expect(isStringGuardMultipleArgs('string', 42, false)(new Cls())).toBe(false);
});

// 1 1 2 3 5 8 12 20 32
function fib(position: number) {
    if (position < 2) {
        return 1;
    }

    // n ** n
    return fib(position - 1) + fib(position - 2);
}

function fib2(n: number) {
    let a = 1;
    let b = 1;

    for (let i = 3; i <= n; i++) {
        const c = a + b;
        a = b;
        b = c;
    }

    return b;
}
