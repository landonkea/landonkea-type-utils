# Feature Ideas

Concrete additions that fit what this library already does: small,
dependency-free, fully-typed string and array helpers. Nothing here
needs a framework, a build tool change, or a new category of concern,
each one is a function (or a small family of functions) that slots
straight into `string-utils.ts` or `array-utils.ts` next to what's
already there.

## String utilities

1. **`kebabCase(str)`** — the one obvious gap next to `camelCase` and
   `snakeCase`. Same separator-normalization idea, hyphens instead of
   underscores. `kebabCase('fooBarBaz')` → `'foo-bar-baz'`.

2. **`titleCase(str)`** — capitalize the first letter of every word,
   lowercase the rest. Different from `capitalize()`, which only touches
   the first character of the whole string. Useful for names, headings,
   form labels.

3. **`slugify(str)`** — URL-safe slug: lowercase, strip accents/diacritics,
   replace anything that isn't `[a-z0-9]` with a hyphen, collapse repeated
   hyphens, trim leading/trailing ones. `slugify('Café Menu — 2026!')` →
   `'cafe-menu-2026'`. Genuinely different from `kebabCase`, this one has
   to handle punctuation and non-ASCII input, not just separator
   normalization.

4. **`escapeHtml(str)` / `unescapeHtml(str)`** — swap `&`, `<`, `>`, `"`,
   `'` for their HTML entities and back. Small, has real security value
   (safe interpolation into HTML templates), and pairs naturally with
   `extractEmails`/`extractUrls` if the extracted text ever gets rendered.

5. **`stripHtml(str)`** — remove tags from a string, leaving plain text.
   Common need whenever `extractEmails` or `extractUrls` is fed
   HTML-sourced text instead of plain text.

6. **`extractUrls(str)`** — same shape as `extractEmails`, different
   regex. The two functions already sit next to each other conceptually;
   right now only one of the pair exists.

7. **`wordCount(str)`** — split on whitespace, filter empty strings from
   consecutive spaces, return the count. Trivial to implement, comes up
   constantly (character/word limits on form inputs, content length
   validation).

8. **`randomString(length, charset?)`** — generate a random string for
   IDs, tokens, or test fixtures, with an optional custom character set
   (default alphanumeric). Not cryptographically secure by default, and
   the doc comment should say so explicitly, this is for slugs and test
   data, not session tokens.

9. **`maskString(str, visibleChars?, maskChar?)`** — replace the middle
   of a string with a mask character, keeping a few characters visible at
   each end. `maskString('4111111111111111', 4)` → `'4111********1111'`.
   Common in any UI that displays a stored email, phone number, or card
   number without exposing the whole thing.

10. **`levenshteinDistance(a, b)`** — edit distance between two strings.
    Enables "did you mean...?" suggestions and fuzzy matching without
    pulling in a whole fuzzy-search dependency. Pairs naturally with
    `isPalindrome` as another "compare two strings" utility.

11. **`template(str, values)`** — minimal `{placeholder}` interpolation:
    `template('Hi {name}, you have {count} messages', { name: 'Sam',
    count: 3 })`. Not a templating engine, just string substitution with
    type-checked keys against the `values` object.

## Array utilities

12. **`uniqueBy(arr, keyFn)`** — dedupe by a computed key instead of
    reference equality. This directly closes the gap the `unique()` doc
    comment already calls out: `unique()` only catches identical
    primitives or identical object references, so `unique([{id:1},
    {id:1}])` keeps both. `uniqueBy(arr, x => x.id)` would dedupe by
    value without needing a full deep-equality implementation.

13. **`partition(arr, predicate)`** — split one array into two based on a
    predicate: `[matching, nonMatching]`. Common alternative to filtering
    twice.

14. **`countBy(arr, keyFn)`** — like `groupBy`, but returns counts per
    key instead of the full grouped arrays. Cheaper when you only need
    "how many," not "which ones."

15. **`sumBy(arr, keyFn)` / `maxBy(arr, keyFn)` / `minBy(arr, keyFn)`** —
    numeric aggregation by a computed field, the natural next step after
    `sortByFields`, which already sorts by arbitrary fields.

16. **`zip(...arrays)`** — pair up elements at matching indices across
    multiple arrays into an array of tuples, stopping at the shortest
    input. Standard building block once `chunk` and `flatten` already
    exist.

17. **`compact(arr)`** — drop falsy values (`false`, `0`, `''`, `null`,
    `undefined`, `NaN`) from an array. One-liner, comes up constantly
    after a `.map()` that can produce nullish results.

18. **`shuffle(arr)`** — Fisher-Yates shuffle, returns a new array (same
    non-destructive convention as `sortByFields`, which already copies
    before sorting instead of mutating in place).

19. **`range(start, end, step?)`** — generate `[start, start+step, ...,
    end)`. Small, has no dependency on anything else in the library, and
    is one of the most-reached-for array helpers in any utility
    collection.

20. **`moveItem(arr, fromIndex, toIndex)`** — return a new array with one
    element relocated. Useful for drag-and-drop reordering UIs, a
    non-mutating version of `Array.prototype.splice` gymnastics.

## Worth a look, but bigger than a single function

- **Type-level utilities.** The package is named `type-utils` but
  everything in it so far is runtime logic with type annotations, there
  are no actual TypeScript utility *types* (`DeepPartial<T>`,
  `DeepReadonly<T>`, `Nullable<T>`, and similar). A `src/type-utils.ts`
  module with a handful of these would make the package name literally
  true and is a natural third pillar next to strings and arrays. Keep it
  separate from this list's scope since it's zero-runtime-cost (compiles
  away entirely) and would need its own small test/`tsd`-style
  verification approach, not the `assertEqual` pattern used for the rest
  of the suite.
