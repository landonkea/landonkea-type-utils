/**
 * array-utils.ts — Array manipulation utilities with TypeScript types.
 *
 * This module provides common array operations with full type safety.
 */
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
export declare function unique<T>(arr: T[]): T[];
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
export declare function chunk<T>(arr: T[], size: number): T[][];
/**
 * Flatten a nested array.
 *
 * @param arr - The nested array
 * @returns The flattened array
 *
 * @example
 * flatten([[1, 2], [3, [4, 5]]]) // [1, 2, 3, 4, 5]
 */
export declare function flatten<T>(arr: (T | T[])[]): T[];
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
export declare function groupBy<T, K extends string | number>(arr: T[], keyFn: (item: T) => K): Record<K, T[]>;
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
export declare function sortByFields<T>(arr: T[], fields: (keyof T)[], orders?: ('asc' | 'desc')[]): T[];
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
export declare function difference<T>(arr1: T[], arr2: T[]): T[];
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
export declare function intersection<T>(arr1: T[], arr2: T[]): T[];
//# sourceMappingURL=array-utils.d.ts.map