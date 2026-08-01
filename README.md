# landonkea-type-utils

A small collection of common string and array utility functions, written in
TypeScript with full type annotations.

## Install

This is a local/private package (not published to npm). To use it in
another project on the same machine, either:

```bash
npm install /path/to/landonkea-type-utils
```

or clone it and import from a relative path.

## Usage

```ts
import { capitalize, camelCase, chunk, groupBy } from 'landonkea-type-utils';

capitalize('hello');           // 'Hello'
camelCase('foo-bar-baz');      // 'fooBarBaz'
chunk([1, 2, 3, 4, 5], 2);     // [[1, 2], [3, 4], [5]]
groupBy(people, p => p.age);   // { 25: [...], 30: [...] }
```

## API

### String utilities (`src/string-utils.ts`)

| Function | Description |
| --- | --- |
| `capitalize(str)` | Upper-cases the first letter of a string. |
| `camelCase(str)` | Converts a space/hyphen/underscore separated string to camelCase. |
| `snakeCase(str)` | Converts a camelCase or hyphenated string to snake_case. |
| `truncate(str, maxLength, suffix?)` | Truncates a string to `maxLength` characters, appending `suffix` (default `'...'`). |
| `isPalindrome(str, caseSensitive?)` | Checks whether a string reads the same forwards and backwards. |
| `countOccurrences(str, substring)` | Counts (possibly overlapping) occurrences of a substring. |
| `extractEmails(str)` | Extracts all email-like substrings from text. |

### Array utilities (`src/array-utils.ts`)

| Function | Description |
| --- | --- |
| `unique(arr)` | Removes duplicate elements. |
| `chunk(arr, size)` | Splits an array into chunks of a given size. |
| `flatten(arr)` | Recursively flattens a nested array. |
| `groupBy(arr, keyFn)` | Groups elements into an object keyed by `keyFn(item)`. |
| `sortByFields(arr, fields, orders?)` | Sorts by multiple fields, each independently ascending or descending. |
| `difference(arr1, arr2)` | Elements in `arr1` not present in `arr2`. |
| `intersection(arr1, arr2)` | Elements present in both arrays. |

See the JSDoc comments in `src/string-utils.ts` and `src/array-utils.ts`
for full parameter details, examples, and notes on edge-case behavior.

## Development

```bash
npm run build   # compile TypeScript to dist/
npm test        # build output required first (see below), then run tests
npm run dev      # build and run tests in one step
```

Tests live in `src/test.ts` and run as plain compiled JS via
`node dist/test.js` — no test framework dependency. `npm test` assumes
`dist/` is already built; use `npm run dev` to build and test together.
