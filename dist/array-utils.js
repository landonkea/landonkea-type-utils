"use strict";
/**
 * array-utils.ts — Array manipulation utilities with TypeScript types.
 *
 * This module provides common array operations with full type safety.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.unique = unique;
exports.chunk = chunk;
exports.flatten = flatten;
exports.groupBy = groupBy;
exports.sortByFields = sortByFields;
exports.difference = difference;
exports.intersection = intersection;
/**
 * Remove duplicate elements from an array.
 *
 * @param arr - The input array
 * @returns A new array with duplicates removed
 *
 * @example
 * unique([1, 2, 2, 3, 3, 3]) // [1, 2, 3]
 * unique(["a", "b", "a"]) // ["a", "b"]
 */
function unique(arr) {
    return [...new Set(arr)];
}
/**
 * Chunk an array into smaller arrays of a given size.
 *
 * @param arr - The input array
 * @param size - The size of each chunk
 * @returns Array of chunks
 *
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * chunk([1, 2, 3], 5) // [[1, 2, 3]]
 */
function chunk(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}
/**
 * Flatten a nested array.
 *
 * @param arr - The nested array
 * @returns The flattened array
 *
 * @example
 * flatten([[1, 2], [3, [4, 5]]]) // [1, 2, 3, 4, 5]
 */
function flatten(arr) {
    return arr.reduce((acc, val) => {
        return acc.concat(Array.isArray(val) ? flatten(val) : val);
    }, []);
}
/**
 * Group array elements by a key function.
 *
 * @param arr - The input array
 * @param keyFn - Function to extract the group key
 * @returns Object with groups
 *
 * @example
 * groupBy([{name: "a", age: 1}, {name: "b", age: 2}], x => x.age)
 * // { 1: [{name: "a", age: 1}], 2: [{name: "b", age: 2}] }
 */
function groupBy(arr, keyFn) {
    return arr.reduce((acc, item) => {
        const key = keyFn(item);
        if (!acc[key])
            acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {});
}
/**
 * Sort array by multiple fields.
 *
 * @param arr - The input array
 * @param fields - Array of field names to sort by
 * @param orders - Array of sort orders ('asc' or 'desc')
 * @returns The sorted array
 *
 * @example
 * sortByFields(
 *   [{name: "b", age: 2}, {name: "a", age: 1}],
 *   ['age', 'name'],
 *   ['asc', 'asc']
 * )
 * // [{name: "a", age: 1}, {name: "b", age: 2}]
 */
function sortByFields(arr, fields, orders = []) {
    return [...arr].sort((a, b) => {
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            const order = orders[i] || 'asc';
            const aVal = a[field];
            const bVal = b[field];
            if (aVal < bVal)
                return order === 'asc' ? -1 : 1;
            if (aVal > bVal)
                return order === 'asc' ? 1 : -1;
        }
        return 0;
    });
}
/**
 * Get the difference between two arrays.
 *
 * @param arr1 - The first array
 * @param arr2 - The second array
 * @returns Elements in arr1 that are not in arr2
 *
 * @example
 * difference([1, 2, 3, 4], [2, 4]) // [1, 3]
 */
function difference(arr1, arr2) {
    const set2 = new Set(arr2);
    return arr1.filter(item => !set2.has(item));
}
/**
 * Get the intersection of two arrays.
 *
 * @param arr1 - The first array
 * @param arr2 - The second array
 * @returns Elements that appear in both arrays
 *
 * @example
 * intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
 */
function intersection(arr1, arr2) {
    const set2 = new Set(arr2);
    return arr1.filter(item => set2.has(item));
}
//# sourceMappingURL=array-utils.js.map