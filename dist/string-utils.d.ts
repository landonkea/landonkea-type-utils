/**
 * string-utils.ts — String manipulation utilities with TypeScript types.
 *
 * This module provides common string operations with full type safety.
 */
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
export declare function capitalize(str: string): string;
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
export declare function camelCase(str: string): string;
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
export declare function snakeCase(str: string): string;
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
export declare function truncate(str: string, maxLength: number, suffix?: string): string;
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
export declare function isPalindrome(str: string, caseSensitive?: boolean): boolean;
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
export declare function countOccurrences(str: string, substring: string): number;
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
export declare function extractEmails(str: string): string[];
//# sourceMappingURL=string-utils.d.ts.map