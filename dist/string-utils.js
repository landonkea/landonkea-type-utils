"use strict";
/**
 * string-utils.ts — String manipulation utilities with TypeScript types.
 *
 * This module provides common string operations with full type safety.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = capitalize;
exports.camelCase = camelCase;
exports.snakeCase = snakeCase;
exports.truncate = truncate;
exports.isPalindrome = isPalindrome;
exports.countOccurrences = countOccurrences;
exports.extractEmails = extractEmails;
/**
 * Capitalize the first letter of a string.
 *
 * @param str - The input string
 * @returns The string with the first letter capitalized
 *
 * @example
 * capitalize("hello") // "Hello"
 * capitalize("world") // "World"
 */
function capitalize(str) {
    if (str.length === 0)
        return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * Convert a string to camelCase.
 *
 * @param str - The input string
 * @returns The camelCase version
 *
 * @example
 * camelCase("hello world") // "helloWorld"
 * camelCase("foo-bar-baz") // "fooBarBaz"
 */
function camelCase(str) {
    return str
        .replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '')
        .replace(/^[A-Z]/, (char) => char.toLowerCase());
}
/**
 * Convert a string to snake_case.
 *
 * @param str - The input string
 * @returns The snake_case version
 *
 * @example
 * snakeCase("helloWorld") // "hello_world"
 * snakeCase("fooBarBaz") // "foo_bar_baz"
 */
function snakeCase(str) {
    return str
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .replace(/^_/, '')
        .replace(/-/g, '_');
}
/**
 * Truncate a string to a maximum length with ellipsis.
 *
 * @param str - The input string
 * @param maxLength - Maximum length (including ellipsis)
 * @param suffix - The suffix to add (default: "...")
 * @returns The truncated string
 *
 * @example
 * truncate("Hello, World!", 10) // "Hello, ..."
 * truncate("Hi", 10) // "Hi"
 */
function truncate(str, maxLength, suffix = '...') {
    if (str.length <= maxLength)
        return str;
    return str.slice(0, maxLength - suffix.length) + suffix;
}
/**
 * Check if a string is a palindrome.
 *
 * @param str - The input string
 * @param caseSensitive - Whether to consider case (default: false)
 * @returns True if the string is a palindrome
 *
 * @example
 * isPalindrome("racecar") // true
 * isPalindrome("Hello") // false
 */
function isPalindrome(str, caseSensitive = false) {
    const processed = caseSensitive ? str : str.toLowerCase();
    return processed === processed.split('').reverse().join('');
}
/**
 * Count occurrences of a substring in a string.
 *
 * @param str - The input string
 * @param substring - The substring to count
 * @returns The number of occurrences
 *
 * @example
 * countOccurrences("hello world", "l") // 3
 * countOccurrences("aaa", "a") // 3
 */
function countOccurrences(str, substring) {
    let count = 0;
    let pos = str.indexOf(substring);
    while (pos !== -1) {
        count++;
        pos = str.indexOf(substring, pos + 1);
    }
    return count;
}
/**
 * Extract all emails from a string.
 *
 * @param str - The input string
 * @returns Array of email addresses found
 *
 * @example
 * extractEmails("Contact me at test@example.com or foo@bar.com")
 * // ["test@example.com", "foo@bar.com"]
 */
function extractEmails(str) {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    return str.match(emailRegex) || [];
}
//# sourceMappingURL=string-utils.js.map