/**
 * ## !!! WARNING !!!
 * **This method is not type safe and may lead to unexpected runtime errors**
 * **You probably want to use `isPlainObject` instead**
 * ---
 *
 * Checks if value is the language type of Object and not null
 *
 *
 * @example
 * isAnyObject({}); // -> true
 * isAnyObject([]); // -> true
 * isAnyObject(new Object()); // -> true
 * isAnyObject(new String('')); // -> true
 * isAnyObject(Object.create(null)); // -> true
 * isAnyObject(null); // -> false
 * isAnyObject(undefined); // -> false
 * isAnyObject(0); // -> false
 * isAnyObject(''); // -> false
 * isAnyObject(false); // -> false
 */
export default function isAnyObject<T>(value: T | object): value is object {
    return value != null && typeof value === 'object';
}
