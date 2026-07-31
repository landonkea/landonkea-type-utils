"use strict";
/**
 * index.ts — Main entry point for type-utils.
 *
 * Re-exports all utility functions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.intersection = exports.difference = exports.sortByFields = exports.groupBy = exports.flatten = exports.chunk = exports.unique = exports.extractEmails = exports.countOccurrences = exports.isPalindrome = exports.truncate = exports.snakeCase = exports.camelCase = exports.capitalize = void 0;
var string_utils_1 = require("./string-utils");
Object.defineProperty(exports, "capitalize", { enumerable: true, get: function () { return string_utils_1.capitalize; } });
Object.defineProperty(exports, "camelCase", { enumerable: true, get: function () { return string_utils_1.camelCase; } });
Object.defineProperty(exports, "snakeCase", { enumerable: true, get: function () { return string_utils_1.snakeCase; } });
Object.defineProperty(exports, "truncate", { enumerable: true, get: function () { return string_utils_1.truncate; } });
Object.defineProperty(exports, "isPalindrome", { enumerable: true, get: function () { return string_utils_1.isPalindrome; } });
Object.defineProperty(exports, "countOccurrences", { enumerable: true, get: function () { return string_utils_1.countOccurrences; } });
Object.defineProperty(exports, "extractEmails", { enumerable: true, get: function () { return string_utils_1.extractEmails; } });
var array_utils_1 = require("./array-utils");
Object.defineProperty(exports, "unique", { enumerable: true, get: function () { return array_utils_1.unique; } });
Object.defineProperty(exports, "chunk", { enumerable: true, get: function () { return array_utils_1.chunk; } });
Object.defineProperty(exports, "flatten", { enumerable: true, get: function () { return array_utils_1.flatten; } });
Object.defineProperty(exports, "groupBy", { enumerable: true, get: function () { return array_utils_1.groupBy; } });
Object.defineProperty(exports, "sortByFields", { enumerable: true, get: function () { return array_utils_1.sortByFields; } });
Object.defineProperty(exports, "difference", { enumerable: true, get: function () { return array_utils_1.difference; } });
Object.defineProperty(exports, "intersection", { enumerable: true, get: function () { return array_utils_1.intersection; } });
//# sourceMappingURL=index.js.map