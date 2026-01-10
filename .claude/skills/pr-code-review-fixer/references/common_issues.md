# Common Code Review Issues and Fix Patterns

This reference provides patterns for identifying and fixing common code review issues across different languages and frameworks.

## Issue Categories

### Type Safety Issues

**Pattern**: Missing type annotations, incorrect type assertions, implicit any types

**JavaScript/TypeScript Examples**:
- `const timer = setTimeout(...)` → `const timer: ReturnType<typeof setTimeout> = setTimeout(...)`
- Type assertions (`as Type`) → Proper type guards or explicit typing
- `any` types → Specific types or generics

**Fix Strategy**: Add explicit types, use proper type inference, avoid type assertions

### React/Next.js Specific

**Pattern**: Incorrect key usage, missing cleanup, improper hooks usage

**Common Issues**:
- Using array index as key → Use unique IDs or content-based hashes
- Missing cleanup in useEffect → Add return function to cleanup
- Accessing route params incorrectly in App Router → Use proper async param access

**Fix Strategy**: 
- Replace index keys with unique identifiers
- Add cleanup functions to effects with subscriptions/timers
- Update to use `const params = await props.params` in Next.js App Router

### API/Database Issues

**Pattern**: N+1 queries, missing validation, improper error handling

**Common Issues**:
- Multiple sequential database queries → Combine into single query with joins
- Missing request validation → Add Zod schema validation
- Unhandled promise rejections → Wrap in try/catch or use proper error boundaries

**Fix Strategy**: Optimize queries, add validation schemas, implement error handling

### Performance Issues

**Pattern**: Unnecessary re-renders, missing memoization, synchronous storage access

**Common Issues**:
- Saving to localStorage on every keystroke → Debounce the save operation
- Creating new functions in render → Use useCallback
- Large computations in render → Use useMemo

**Fix Strategy**: Add debouncing, memoization, move heavy computation outside render

### Hardcoded Values

**Pattern**: Magic numbers, environment-dependent URLs, fixed limits

**Common Issues**:
- Hardcoded URLs → Use environment variables
- Magic numbers → Extract to named constants
- Fixed array sizes → Make dynamic based on configuration

**Fix Strategy**: Extract to constants, use environment variables, make values configurable

### Code Quality

**Pattern**: Duplicate code, missing error messages, unclear variable names

**Common Issues**:
- Repeated validation logic → Extract to shared utility functions
- Generic error messages → Add specific, actionable error messages
- Single-letter variables → Use descriptive names

**Fix Strategy**: DRY principle, improve error messaging, enhance readability

## Language-Specific Patterns

### TypeScript/JavaScript

```typescript
// Issue: Implicit any on event handlers
onChange={(e) => setValue(e.target.value)}

// Fix: Explicit typing
onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
```

### Python

```python
# Issue: Mutable default argument
def append_to(element, to=[]):
    to.append(element)
    return to

# Fix: Use None and create new list
def append_to(element, to=None):
    if to is None:
        to = []
    to.append(element)
    return to
```

### Next.js App Router

```typescript
// Issue: Synchronous params access
export default function Page({ params }: { params: { id: string } }) {
  const id = params.id // Error in Next.js 15+
}

// Fix: Async params
export default async function Page({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
}
```

## Issue Priority Levels

**Critical** (Must fix):
- Runtime errors
- Type safety violations that will cause crashes
- Security vulnerabilities
- Data loss risks

**High** (Should fix):
- Performance issues affecting UX
- API design problems
- Missing error handling
- Accessibility issues

**Medium** (Good to fix):
- Code organization
- Naming conventions
- Missing tests
- Hardcoded values

**Low** (Optional):
- Code style preferences
- Minor optimizations
- Documentation improvements
