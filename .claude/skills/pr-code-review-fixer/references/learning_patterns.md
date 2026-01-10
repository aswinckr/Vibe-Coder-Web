# Learning Extraction Patterns

This reference helps identify which issues should be extracted as learnings and how to format them.

## What Makes a Good Learning

### ✅ Extract as Learning

**Repeatable patterns** - Issues that could happen again:
- Framework-specific gotchas (Next.js async params, React key warnings)
- Common anti-patterns (index as key, missing cleanup, hardcoded values)
- Project-specific conventions (validation patterns, naming, imports)
- Type safety issues that are easy to overlook
- Performance patterns (debouncing, memoization)

**Systemic issues** - Multiple occurrences in the same PR:
- Same mistake in 3+ files → Definitely extract
- Same category of mistake (e.g., all hardcoded values) → Extract the pattern

**Non-obvious problems** - Things that are:
- Not immediately clear from error messages
- Framework version-specific (e.g., Next.js 15 changes)
- Subtle bugs that reviewers commonly catch

### ❌ Don't Extract as Learning

**One-off mistakes**:
- Typos in variable names
- Logic errors specific to this feature
- Issues that won't recur

**Well-documented in official docs**:
- Basic TypeScript syntax
- Standard React hooks usage (if not project-specific)
- Common framework patterns already in official docs

**Too context-specific**:
- Business logic errors
- Feature-specific edge cases
- One-time refactoring issues

## Learning Format Examples

### Example 1: Framework Gotcha

```markdown
### ❌ Don't: Access Next.js route params synchronously (Next.js 15+)

**Issue**: In Next.js 15+, route params are async Promises and must be awaited

**Example (Wrong)**:
```tsx
export default function Page({ params }: { params: { id: string } }) {
  const id = params.id // ❌ TypeScript error!
}
```

**✅ Do**:
```tsx
export default async function Page({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params // ✅ Correct
}
```

**Learned from**: PR #4 - Code review feedback on 2025-12-27
```

### Example 2: React Anti-Pattern

```markdown
### ❌ Don't: Use array index as React keys

**Issue**: Using array indices as keys causes rendering bugs when list order changes or items are added/removed

**Example (Wrong)**:
```tsx
{questions.map((q, index) => (
  <Question key={index} {...q} />  // ❌ Bad!
))}
```

**✅ Do**: Use unique IDs or content-based hashes
```tsx
{questions.map((q) => (
  <Question key={q.id} {...q} />  // ✅ Good
))}

// Or if no ID exists, use content hash:
import { createHash } from 'crypto';
const hash = (str: string) => createHash('md5').update(str).digest('hex');

{questions.map((q) => (
  <Question key={hash(q.text)} {...q} />  // ✅ Also good
))}
```

**Learned from**: PR #4 - Code review feedback on 2025-12-27
```

### Example 3: Memory Leak Pattern

```markdown
### ❌ Don't: Forget cleanup in useEffect with timers

**Issue**: Timers created in useEffect continue running after component unmounts, causing memory leaks

**Example (Wrong)**:
```tsx
useEffect(() => {
  const timer = setTimeout(() => setShow(false), 3000);
  // ❌ No cleanup!
}, []);
```

**✅ Do**: Always return cleanup function
```tsx
useEffect(() => {
  const timer = setTimeout(() => setShow(false), 3000);
  return () => clearTimeout(timer); // ✅ Cleanup
}, []);
```

**Learned from**: PR #4 - Code review feedback on 2025-12-27
```

### Example 4: Project Convention

```markdown
### ❌ Don't: Hardcode base URLs in API calls

**Issue**: Base URLs change between environments (dev, staging, prod)

**Example (Wrong)**:
```tsx
const response = await fetch('https://example.com/api/data');
// ❌ Hardcoded domain
```

**✅ Do**: Use environment variable
```tsx
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
const response = await fetch(`${baseUrl}/api/data`);
// ✅ Uses env var
```

**Project convention**: Always use `NEXT_PUBLIC_SITE_URL` for base URLs

**Learned from**: PR #4 - Code review feedback on 2025-12-27
```

### Example 5: Type Safety Pattern

```markdown
### ❌ Don't: Use implicit any for setTimeout timer type

**Issue**: TypeScript can't infer the correct timer type, leading to type errors

**Example (Wrong)**:
```tsx
const [timer, setTimer] = useState(null);
// Later: clearTimeout(timer) // ❌ Type error!
```

**✅ Do**: Use ReturnType<typeof setTimeout>
```tsx
const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
// ✅ Correct type
```

**Learned from**: PR #4 - Code review feedback on 2025-12-27
```

## Category Organization

Group learnings by logical categories:

### React/Next.js Patterns
- Component patterns
- Hooks usage
- App Router specifics
- Client/Server component boundaries

### TypeScript
- Type safety patterns
- Generic usage
- Type inference
- Avoiding `any`

### API Design
- Validation patterns
- Error handling
- Request/Response types
- Database queries

### Performance
- Memoization
- Debouncing
- Lazy loading
- Bundle size

### Code Quality
- DRY principles
- Naming conventions
- Constants vs magic numbers
- Error messages

### Project-Specific
- Internal conventions
- Custom patterns
- Team preferences
- Architecture decisions

## Detection Heuristics

**High-value learnings** (definitely extract):
- ✅ Mentioned by reviewer as "common mistake"
- ✅ Same issue appears 3+ times in PR
- ✅ Causes runtime errors or bugs
- ✅ Framework-version specific (e.g., "in Next.js 15+")
- ✅ Reviewer says "always do X" or "never do Y"

**Medium-value learnings** (probably extract):
- ⚠️ Issue appears 2 times in PR
- ⚠️ Non-obvious solution (not in basic docs)
- ⚠️ Performance-related
- ⚠️ Type safety improvement

**Low-value learnings** (skip):
- ❌ One-off occurrence
- ❌ Very specific to this feature
- ❌ Already in official framework docs
- ❌ Subjective preference

## Updating Existing Learnings

When a similar pattern already exists:

**If new example is clearer**:
```markdown
### ❌ Don't: Use array index as React keys

[Previous example]

**Better example** (updated 2025-12-28):
```tsx
[Clearer code example]
```
```

**If adding new variant**:
```markdown
### ❌ Don't: Use array index as React keys

[Original example for simple lists]

**For dynamic lists**:
```tsx
[Additional example for dynamic case]
```
```

**If consolidating similar patterns**:
- Merge two similar learnings under one heading
- Keep the better examples from each
- Update "Learned from" to list both PRs

## LEARNINGS.md Maintenance

**Best practices**:
- Keep examples short (2-5 lines max)
- Use clear ❌/✅ indicators
- Include context ("Next.js 15+", "TypeScript 5+")
- Link to official docs when relevant
- Date each learning
- Update "Last Updated" at top of file

**File size management**:
- If > 50 learnings, split into multiple files by category
- Keep most common/critical patterns in main LEARNINGS.md
- Move advanced patterns to category-specific files
