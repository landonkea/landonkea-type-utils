"use strict";
/**
 * test.ts — Tests for type-utils.
 *
 * Run with: npx ts-node src/test.ts
 * Or compile and run: npm run build && npm test
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
// Test counter
let passed = 0;
let failed = 0;
/**
 * Assert that two values are equal.
 */
function assertEqual(actual, expected, testName) {
    if (actual === expected) {
        console.log(`  ✓ ${testName}`);
        passed++;
    }
    else {
        console.error(`  ✗ ${testName}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
        failed++;
    }
}
/**
 * Assert that two arrays are equal (deep comparison).
 */
function assertArrayEqual(actual, expected, testName) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr === expectedStr) {
        console.log(`  ✓ ${testName}`);
        passed++;
    }
    else {
        console.error(`  ✗ ${testName}: expected ${expectedStr}, got ${actualStr}`);
        failed++;
    }
}
// ========== string-utils tests ==========
console.log('\n=== string-utils.ts tests ===\n');
// capitalize
assertEqual((0, index_1.capitalize)('hello'), 'Hello', 'capitalize: lowercase');
assertEqual((0, index_1.capitalize)('Hello'), 'Hello', 'capitalize: already capitalized');
assertEqual((0, index_1.capitalize)(''), '', 'capitalize: empty string');
// camelCase
assertEqual((0, index_1.camelCase)('hello world'), 'helloWorld', 'camelCase: space separated');
assertEqual((0, index_1.camelCase)('foo-bar-baz'), 'fooBarBaz', 'camelCase: hyphen separated');
assertEqual((0, index_1.camelCase)('hello_world'), 'helloWorld', 'camelCase: underscore separated');
// snakeCase
assertEqual((0, index_1.snakeCase)('helloWorld'), 'hello_world', 'snakeCase: camelCase');
assertEqual((0, index_1.snakeCase)('fooBarBaz'), 'foo_bar_baz', 'snakeCase: camelCase');
assertEqual((0, index_1.snakeCase)('hello-world'), 'hello_world', 'snakeCase: hyphen');
// truncate
assertEqual((0, index_1.truncate)('Hello, World!', 10), 'Hello, ...', 'truncate: with ellipsis');
assertEqual((0, index_1.truncate)('Hi', 10), 'Hi', 'truncate: no truncation needed');
assertEqual((0, index_1.truncate)('Hello', 8, '...'), 'Hello', 'truncate: exact length');
// isPalindrome
assertEqual((0, index_1.isPalindrome)('racecar'), true, 'palindrome: racecar');
assertEqual((0, index_1.isPalindrome)('Hello'), false, 'palindrome: Hello');
assertEqual((0, index_1.isPalindrome)('Racecar'), true, 'palindrome: case insensitive');
// countOccurrences
assertEqual((0, index_1.countOccurrences)('hello world', 'l'), 3, 'countOccurrences: 3 l');
assertEqual((0, index_1.countOccurrences)('aaa', 'a'), 3, 'countOccurrences: 3 a');
assertEqual((0, index_1.countOccurrences)('hello', 'x'), 0, 'countOccurrences: 0 x');
// extractEmails
assertArrayEqual((0, index_1.extractEmails)('Contact me at test@example.com or foo@bar.com'), ['test@example.com', 'foo@bar.com'], 'extractEmails: two emails');
assertArrayEqual((0, index_1.extractEmails)('no emails here'), [], 'extractEmails: none');
// ========== array-utils tests ==========
console.log('\n=== array-utils.ts tests ===\n');
// unique
assertArrayEqual((0, index_1.unique)([1, 2, 2, 3, 3, 3]), [1, 2, 3], 'unique: numbers');
assertArrayEqual((0, index_1.unique)(['a', 'b', 'a']), ['a', 'b'], 'unique: strings');
// chunk
assertArrayEqual((0, index_1.chunk)([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]], 'chunk: size 2');
assertArrayEqual((0, index_1.chunk)([1, 2, 3], 5), [[1, 2, 3]], 'chunk: larger than array');
// flatten
assertArrayEqual((0, index_1.flatten)([[1, 2], [3, [4, 5]]]), [1, 2, 3, 4, 5], 'flatten: nested');
// groupBy
const people = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 25 },
];
const grouped = (0, index_1.groupBy)(people, p => p.age);
assertEqual(grouped[25].length, 2, 'groupBy: 2 people age 25');
assertEqual(grouped[30].length, 1, 'groupBy: 1 person age 30');
// sortByFields
const items = [
    { name: 'b', age: 2 },
    { name: 'a', age: 1 },
    { name: 'c', age: 1 },
];
const sorted = (0, index_1.sortByFields)(items, ['age', 'name'], ['asc', 'asc']);
assertEqual(sorted[0].name, 'a', 'sortByFields: first');
assertEqual(sorted[1].name, 'c', 'sortByFields: second');
assertEqual(sorted[2].name, 'b', 'sortByFields: third');
// difference
assertArrayEqual((0, index_1.difference)([1, 2, 3, 4], [2, 4]), [1, 3], 'difference: [1,2,3,4] - [2,4]');
// intersection
assertArrayEqual((0, index_1.intersection)([1, 2, 3], [2, 3, 4]), [2, 3], 'intersection: [1,2,3] ∩ [2,3,4]');
// ========== Summary ==========
console.log('\n' + '='.repeat(40));
console.log(`Results: ${passed} passed, ${failed} failed, ${passed + failed} total`);
console.log('='.repeat(40) + '\n');
// Exit with error code if any tests failed
process.exit(failed > 0 ? 1 : 0);
//# sourceMappingURL=test.js.map