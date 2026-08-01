/**
 * string-utils.ts — String manipulation utilities with TypeScript types.
 *
 * This module provides common string operations with full type safety.
 */

/**
 * Capitalize the first letter of a string.
 *
 * WHAT: Upper-cases only the first character; the rest of the string is
 * left untouched.
 *
 * HOW: Splits the string into its first character and the remainder,
 * upper-cases the first character, and concatenates them back together.
 *
 * WHY: The empty-string check comes first because `''.charAt(0)` returns
 * `''` safely, but it's clearer (and avoids an unnecessary `.slice()`
 * call) to short-circuit and return the input directly.
 *
 * @param str - The input string
 * @returns The string with the first letter capitalized
 *
 * @example
 * capitalize("hello") // "Hello"
 * capitalize("world") // "World"
 */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert a string to camelCase.
 *
 * WHAT: Converts a space/hyphen/underscore separated string (or an
 * existing PascalCase/camelCase string) into camelCase.
 *
 * HOW: Two passes. First, the regex `/[-_\s]+(.)?/g` matches any run of
 * separator characters plus the single character immediately following
 * them, and replaces it with that character upper-cased — this both
 * removes the separators and capitalizes the start of each subsequent
 * word. `char` is optional (`(.)?`) to handle a trailing separator with
 * nothing after it, in which case the whole match is just removed.
 * Second, if the very first character ended up upper-case (e.g. input
 * started with "Hello ..."), it's lower-cased so the result is true
 * camelCase rather than PascalCase.
 *
 * WHY: Two separate, simple regex passes are easier to reason about and
 * debug than one combined pattern, and the intermediate result of pass
 * one is never observed, so there's no real cost to splitting it.
 *
 * @param str - The input string
 * @returns The camelCase version
 *
 * @example
 * camelCase("hello world") // "helloWorld"
 * camelCase("foo-bar-baz") // "fooBarBaz"
 */
export function camelCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, char: string) => char ? char.toUpperCase() : '')
    .replace(/^[A-Z]/, (char: string) => char.toLowerCase());
}

/**
 * Convert a string to snake_case.
 *
 * WHAT: Converts a camelCase or hyphenated string into snake_case.
 *
 * HOW: Runs a sequence of replacements where order matters: (1) insert an
 * underscore before every upper-case letter, (2) lower-case the whole
 * string so those upper-case letters become normal, (3) strip a leading
 * underscore that step 1 would have added if the string started with an
 * upper-case letter, (4) convert any hyphens to underscores so
 * hyphenated input is also normalized.
 *
 * WHY: The steps must run in this order — lower-casing before inserting
 * underscores would make upper-case letters undetectable, and stripping
 * the leading underscore has to happen after it's been inserted, not
 * before.
 *
 * @param str - The input string
 * @returns The snake_case version
 *
 * @example
 * snakeCase("helloWorld") // "hello_world"
 * snakeCase("fooBarBaz") // "foo_bar_baz"
 */
export function snakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '')
    .replace(/-/g, '_');
}

/**
 * Truncate a string to a maximum length with ellipsis.
 *
 * WHAT: Shortens a string to at most `maxLength` characters, appending
 * `suffix` when truncation actually happens.
 *
 * HOW: If the string already fits, it's returned unchanged. Otherwise the
 * string is sliced to `maxLength - suffix.length` characters so that the
 * sliced text plus the suffix together total exactly `maxLength`
 * characters, then the suffix is appended.
 *
 * WHY: Subtracting `suffix.length` before slicing is what guarantees the
 * *total* output length never exceeds `maxLength` — a naive
 * `str.slice(0, maxLength) + suffix` would overshoot by
 * `suffix.length` characters.
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
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Check if a string is a palindrome.
 *
 * WHAT: Determines whether a string reads the same forwards and
 * backwards.
 *
 * HOW: Optionally lower-cases the string, then compares it to its own
 * reversed form (built via split → reverse → join, since strings don't
 * have a native `.reverse()`).
 *
 * WHY: Case sensitivity is opt-in and defaults to `false` because most
 * real-world palindrome checks ("Racecar", "A man a plan...") are meant
 * to ignore case; making it a parameter rather than always normalizing
 * lets callers request strict/exact comparison when they need it.
 *
 * @param str - The input string
 * @param caseSensitive - Whether to consider case (default: false)
 * @returns True if the string is a palindrome
 *
 * @example
 * isPalindrome("racecar") // true
 * isPalindrome("Hello") // false
 */
export function isPalindrome(str: string, caseSensitive: boolean = false): boolean {
  const processed = caseSensitive ? str : str.toLowerCase();
  return processed === processed.split('').reverse().join('');
}

/**
 * Count occurrences of a substring in a string.
 *
 * WHAT: Counts how many times `substring` appears in `str`.
 *
 * HOW: Repeatedly calls `String.indexOf`, starting the search just past
 * the previous match (`pos + 1`) each time, until no further match is
 * found (`indexOf` returns -1).
 *
 * WHY: Searching from `pos + 1` rather than `pos + substring.length`
 * means overlapping matches are counted too (e.g. counting "aa" in
 * "aaa" gives 2, not 1) — this is a deliberate choice to count every
 * occurrence position rather than only non-overlapping ones.
 *
 * @param str - The input string
 * @param substring - The substring to count
 * @returns The number of occurrences
 *
 * @example
 * countOccurrences("hello world", "l") // 3
 * countOccurrences("aaa", "a") // 3
 */
export function countOccurrences(str: string, substring: string): number {
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
 * WHAT: Finds every substring that looks like an email address.
 *
 * HOW: Matches against a permissive email pattern — local part of
 * letters/digits/`._%+-`, an `@`, a domain of letters/digits/`.-`, and a
 * top-level domain of at least 2 letters — using the global flag so all
 * matches (not just the first) are returned.
 *
 * WHY: `String.match` with a global regex returns `null` (not `[]`) when
 * there are no matches, so `|| []` normalizes the "nothing found" case to
 * an empty array, keeping the return type simple (`string[]`, never
 * `null`) for callers. The regex intentionally isn't a fully
 * RFC-5322-compliant email validator — that grammar is far more
 * permissive and complex than practical text-extraction needs.
 *
 * @param str - The input string
 * @returns Array of email addresses found
 *
 * @example
 * extractEmails("Contact me at test@example.com or foo@bar.com")
 * // ["test@example.com", "foo@bar.com"]
 */
export function extractEmails(str: string): string[] {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  return str.match(emailRegex) || [];
}
