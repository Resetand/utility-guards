type WithValue = {
    <TValue = never>(callback: (value: TValue) => unknown): TValue;
    <TValue>(value: TValue): (callback: (value: TValue) => unknown) => TValue;
    <TValue>(value: TValue, callback: (value: TValue) => unknown): TValue;
};

/**
 * This helper should be used only for static typing tests.
 * Helps to call a callback with value with inferred type.
 *
 * @example
 * withValue(1, (value) => { // value is number });
 * withValue(1)((value) => { // value is number });
 * withValue((value) => { // value is never });
 * withValue((value: number) => { // value is number }); // NOTE that in reality it's `null`
 */
export const withValue: WithValue = (value: unknown, callback?: (value: unknown) => unknown): any => {
    if (typeof value === 'function') {
        return value(null!); // allow to pass a typed callback
    }

    if (callback) {
        callback(value);
        return value;
    }

    return (callback: (value: unknown) => unknown) => {
        callback(value);
        return value;
    };
};
