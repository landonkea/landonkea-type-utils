/**
 * array-utils.ts, Array manipulation utilities with TypeScript types.
 *
 * This module provides common array operations with full type safety.
 */

/**
 * Remove duplicate elements from an array.
 *
 * WHAT: Returns a new array containing only the first occurrence of each
 * value from the input.
 *
 * HOW: A `Set` automatically discards duplicate values (compared with
 * `===`, the same equality `Set` always uses), so spreading it back into
 * an array gives the deduplicated list in original insertion order.
 *
 * WHY: This is O(n), a Set lookup is O(1), versus the O(n^2) you'd get
 * from checking `indexOf`/`includes` for every element. Because `Set`
 * uses reference equality, this only dedupes primitives and identical
 * object references, not objects that are merely "equal" by value.
 *
 * @param arr - The input array
 * @returns A new array with duplicates removed
 *
 * @example
 * unique([1, 2, 2, 3, 3, 3]) // [1, 2, 3]
 * unique(["a", "b", "a"]) // ["a", "b"]
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Chunk an array into smaller arrays of a given size.
 *
 * WHAT: Splits one array into a list of sub-arrays ("chunks"), each with
 * at most `size` elements.
 *
 * HOW: Walks the array in steps of `size` and slices out each chunk.
 * `Array.slice` clamps to the array length on its own, so the final
 * chunk is simply shorter when the length isn't evenly divisible.
 *
 * WHY: A manual loop is used instead of a functional/recursive approach
 * because it avoids building intermediate arrays and keeps the
 * complexity obviously O(n).
 *
 * @param arr - The input array
 * @param size - The size of each chunk
 * @returns Array of chunks
 *
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * chunk([1, 2, 3], 5) // [[1, 2, 3]]
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * Flatten a nested array.
 *
 * WHAT: Recursively flattens an array that may contain nested arrays at
 * any depth into a single flat array.
 *
 * HOW: `reduce` builds up the flattened result; for each element, if it
 * is itself an array, the function recurses into it before concatenating,
 * otherwise the element is concatenated directly.
 *
 * WHY: Recursion (rather than a fixed number of `.flat()` calls) is what
 * lets this handle arbitrarily deep nesting without knowing the depth in
 * advance. The type `(T | T[])[]` only describes one level of nesting to
 * TypeScript, deeper nesting works at runtime but isn't fully expressible
 * without a recursive type, which would be overkill for this utility.
 *
 * @param arr - The nested array
 * @returns The flattened array
 *
 * @example
 * flatten([[1, 2], [3, [4, 5]]]) // [1, 2, 3, 4, 5]
 */
export function flatten<T>(arr: (T | T[])[]): T[] {
  return arr.reduce<T[]>((acc, val) => {
    return acc.concat(Array.isArray(val) ? flatten(val) : val);
  }, []);
}

/**
 * Group array elements by a key function.
 *
 * WHAT: Buckets the elements of an array into an object, keyed by
 * whatever `keyFn` returns for each element.
 *
 * HOW: Iterates once via `reduce`, computing each item's key and pushing
 * the item onto that key's bucket array, creating the bucket the first
 * time a key is seen.
 *
 * WHY: The key type is constrained to `string | number` because those are
 * the only primitive types JavaScript can use as object property keys
 * without silent coercion (e.g. a boolean key would just become the
 * string `"true"`/`"false"`, which is usually not what's intended). The
 * `{} as Record<K, T[]>` cast is needed because TypeScript can't prove an
 * empty object satisfies `Record<K, T[]>` up front, it's built up
 * incrementally as keys are added.
 *
 * @param arr - The input array
 * @param keyFn - Function to extract the group key
 * @returns Object with groups
 *
 * @example
 * groupBy([{name: "a", age: 1}, {name: "b", age: 2}], x => x.age)
 * // { 1: [{name: "a", age: 1}], 2: [{name: "b", age: 2}] }
 */
export function groupBy<T, K extends string | number>(
  arr: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

/**
 * Sort array by multiple fields.
 *
 * WHAT: Sorts an array of objects by one or more fields in priority
 * order, each field independently ascending or descending.
 *
 * HOW: For each pair of elements, it walks `fields` in order and returns
 * as soon as a field distinguishes the two items; if every field is
 * equal, the items are considered equal (returns 0). `orders[i]` picks
 * the direction for `fields[i]`, defaulting to `'asc'` when not supplied
 * so callers can omit `orders` entirely or only specify a prefix of it.
 *
 * WHY: `[...arr].sort(...)` copies the array first because `Array.sort`
 * mutates in place, and utility functions in this library are expected
 * to be non-destructive (matches the "returns a new array" convention
 * used elsewhere in this module).
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
export function sortByFields<T>(
  arr: T[],
  fields: (keyof T)[],
  orders: ('asc' | 'desc')[] = []
): T[] {
  return [...arr].sort((a, b) => {
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const order = orders[i] || 'asc';
      const aVal = a[field];
      const bVal = b[field];

      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

/**
 * Get the difference between two arrays.
 *
 * WHAT: Returns the elements of `arr1` that do not also appear in `arr2`.
 *
 * HOW: `arr2` is first converted to a `Set` so membership checks
 * (`set2.has(item)`) are O(1); `arr1` is then filtered down to items not
 * in that set.
 *
 * WHY: Building the `Set` once up front makes this O(n + m) overall
 * instead of the O(n * m) that `arr2.includes(item)` inside the filter
 * would cost. As with `unique`, membership is by reference/`===`
 * equality, so this compares primitives and identical object references,
 * not deep value equality.
 *
 * @param arr1 - The first array
 * @param arr2 - The second array
 * @returns Elements in arr1 that are not in arr2
 *
 * @example
 * difference([1, 2, 3, 4], [2, 4]) // [1, 3]
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter(item => !set2.has(item));
}

/**
 * Get the intersection of two arrays.
 *
 * WHAT: Returns the elements of `arr1` that also appear in `arr2`.
 *
 * HOW: Mirrors `difference` but keeps items present in the `Set` built
 * from `arr2` instead of excluding them.
 *
 * WHY: Same O(n + m) reasoning as `difference`, converting the lookup
 * array to a `Set` first avoids a nested-loop membership check.
 *
 * @param arr1 - The first array
 * @param arr2 - The second array
 * @returns Elements that appear in both arrays
 *
 * @example
 * intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter(item => set2.has(item));
}
