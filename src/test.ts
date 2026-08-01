/**
 * test.ts — Tests for type-utils.
 *
 * Run with: npx ts-node src/test.ts
 * Or compile and run: npm run build && npm test
 */

import {
  capitalize,
  camelCase,
  snakeCase,
  truncate,
  isPalindrome,
  countOccurrences,
  extractEmails,
  unique,
  chunk,
  flatten,
  groupBy,
  sortByFields,
  difference,
  intersection,
} from './index';

// Test counter
let passed = 0;
let failed = 0;

/**
 * Assert that two primitive values are equal.
 *
 * WHAT: Compares `actual` to `expected` with strict equality, logs a
 * pass/fail line, and tallies the result into the module-level counters.
 *
 * HOW: Uses `===` directly, which is correct for primitives (numbers,
 * strings, booleans) but would fail for objects/arrays with the same
 * contents but different references — that case is handled separately by
 * `assertArrayEqual` below.
 *
 * WHY: This is a minimal hand-rolled assertion rather than a test
 * framework because the whole suite is meant to run with zero
 * dependencies via plain `node dist/test.js`.
 */
function assertEqual<T>(actual: T, expected: T, testName: string): void {
  if (actual === expected) {
    console.log(`  ✓ ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ ${testName}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    failed++;
  }
}

/**
 * Assert that two arrays are equal (deep comparison).
 *
 * WHAT: Compares `actual` to `expected` by contents rather than
 * reference, logs a pass/fail line, and tallies the result.
 *
 * HOW: Serializes both arrays with `JSON.stringify` and compares the
 * resulting strings, since two structurally-identical arrays are never
 * `===` equal in JavaScript.
 *
 * WHY: `JSON.stringify` is a pragmatic stand-in for a real deep-equality
 * check — good enough for this suite's plain data (numbers, strings,
 * simple objects) without pulling in a dependency, though it would be
 * fooled by things `JSON` can't represent faithfully (e.g. key order
 * differences in nested objects, `undefined` values, or `NaN`).
 */
function assertArrayEqual<T>(actual: T[], expected: T[], testName: string): void {
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(expected);

  if (actualStr === expectedStr) {
    console.log(`  ✓ ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ ${testName}: expected ${expectedStr}, got ${actualStr}`);
    failed++;
  }
}

// ========== string-utils tests ==========

console.log('\n=== string-utils.ts tests ===\n');

// capitalize
assertEqual(capitalize('hello'), 'Hello', 'capitalize: lowercase');
assertEqual(capitalize('Hello'), 'Hello', 'capitalize: already capitalized');
assertEqual(capitalize(''), '', 'capitalize: empty string');

// camelCase
assertEqual(camelCase('hello world'), 'helloWorld', 'camelCase: space separated');
assertEqual(camelCase('foo-bar-baz'), 'fooBarBaz', 'camelCase: hyphen separated');
assertEqual(camelCase('hello_world'), 'helloWorld', 'camelCase: underscore separated');

// snakeCase
assertEqual(snakeCase('helloWorld'), 'hello_world', 'snakeCase: camelCase');
assertEqual(snakeCase('fooBarBaz'), 'foo_bar_baz', 'snakeCase: camelCase');
assertEqual(snakeCase('hello-world'), 'hello_world', 'snakeCase: hyphen');

// truncate
assertEqual(truncate('Hello, World!', 10), 'Hello, ...', 'truncate: with ellipsis');
assertEqual(truncate('Hi', 10), 'Hi', 'truncate: no truncation needed');
assertEqual(truncate('Hello', 8, '...'), 'Hello', 'truncate: exact length');

// isPalindrome
assertEqual(isPalindrome('racecar'), true, 'palindrome: racecar');
assertEqual(isPalindrome('Hello'), false, 'palindrome: Hello');
assertEqual(isPalindrome('Racecar'), true, 'palindrome: case insensitive');

// countOccurrences
assertEqual(countOccurrences('hello world', 'l'), 3, 'countOccurrences: 3 l');
assertEqual(countOccurrences('aaa', 'a'), 3, 'countOccurrences: 3 a');
assertEqual(countOccurrences('hello', 'x'), 0, 'countOccurrences: 0 x');

// extractEmails
assertArrayEqual(
  extractEmails('Contact me at test@example.com or foo@bar.com'),
  ['test@example.com', 'foo@bar.com'],
  'extractEmails: two emails'
);
assertArrayEqual(extractEmails('no emails here'), [], 'extractEmails: none');

// ========== array-utils tests ==========

console.log('\n=== array-utils.ts tests ===\n');

// unique
assertArrayEqual(unique([1, 2, 2, 3, 3, 3]), [1, 2, 3], 'unique: numbers');
assertArrayEqual(unique(['a', 'b', 'a']), ['a', 'b'], 'unique: strings');

// chunk
assertArrayEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]], 'chunk: size 2');
assertArrayEqual(chunk([1, 2, 3], 5), [[1, 2, 3]], 'chunk: larger than array');

// flatten
assertArrayEqual(flatten([[1, 2], [3, [4, 5]]]), [1, 2, 3, 4, 5], 'flatten: nested');

// groupBy
const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 },
];
const grouped = groupBy(people, p => p.age);
assertEqual(grouped[25].length, 2, 'groupBy: 2 people age 25');
assertEqual(grouped[30].length, 1, 'groupBy: 1 person age 30');

// sortByFields
const items = [
  { name: 'b', age: 2 },
  { name: 'a', age: 1 },
  { name: 'c', age: 1 },
];
const sorted = sortByFields(items, ['age', 'name'], ['asc', 'asc']);
assertEqual(sorted[0].name, 'a', 'sortByFields: first');
assertEqual(sorted[1].name, 'c', 'sortByFields: second');
assertEqual(sorted[2].name, 'b', 'sortByFields: third');

// difference
assertArrayEqual(difference([1, 2, 3, 4], [2, 4]), [1, 3], 'difference: [1,2,3,4] - [2,4]');

// intersection
assertArrayEqual(intersection([1, 2, 3], [2, 3, 4]), [2, 3], 'intersection: [1,2,3] ∩ [2,3,4]');

// ========== Summary ==========

console.log('\n' + '='.repeat(40));
console.log(`Results: ${passed} passed, ${failed} failed, ${passed + failed} total`);
console.log('='.repeat(40) + '\n');

// Exit with error code if any tests failed
process.exit(failed > 0 ? 1 : 0);
