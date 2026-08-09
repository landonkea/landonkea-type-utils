# landonkea-type-utils — Design & Workflow

## High-Level Overview

```mermaid
graph TB
    subgraph "landonkea-type-utils"
        A[package.json] --> B[npm run build]
        A --> C[npm test]
        A --> D[npm run dev]
    end

    subgraph "src/"
        E[index.ts] --> F[string-utils.ts]
        E --> G[array-utils.ts]
        E --> H[test.ts]
    end

    B --> I[dist/]
    C --> I
    D --> B
    D --> C
```

## Module Structure

```mermaid
graph LR
    subgraph "string-utils.ts"
        A[capitalize] --> B[camelCase]
        B --> C[snakeCase]
        C --> D[truncate]
        D --> E[isPalindrome]
        E --> F[countOccurrences]
        F --> G[extractEmails]
    end

    subgraph "array-utils.ts"
        H[unique] --> I[chunk]
        I --> J[flatten]
        J --> K[groupBy]
        K --> L[sortByFields]
        L --> M[difference]
        M --> N[intersection]
    end
```

## Development Workflow

```mermaid
flowchart TD
    A[Write TypeScript] --> B[npm run build]
    B --> C[Compile to JS]
    C --> D[npm test]
    D --> E{Tests pass?}
    E -->|Yes| F[Ready to commit]
    E -->|No| G[Fix code]
    G --> B
```

## File Relationships

| File | Purpose | Used By |
|------|---------|---------|
| `package.json` | Project config | npm |
| `tsconfig.json` | TypeScript config | tsc |
| `src/index.ts` | Entry point | Importers |
| `src/string-utils.ts` | String helpers | `index.ts` |
| `src/array-utils.ts` | Array helpers | `index.ts` |
| `src/test.ts` | Tests | `npm test` |
| `dist/` | Compiled output | Consumers |

## draw.io

[Open in draw.io](https://app.diagrams.net/#RTypeScript%20utility%20library)
