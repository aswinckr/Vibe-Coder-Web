---
name: pr-code-review-fixer
description: Systematically fetch, analyze, and fix code review issues from GitHub Pull Requests. Use when the user asks to review and fix code issues from AI code reviewers (like Gemini Code Assist, GitHub Copilot, CodeRabbit) or any PR review comments. Fetches all review comments using gh CLI, attempts to fix all reported issues, commits changes to the PR branch, and generates a comprehensive fix report. Triggers on requests like "fix PR review issues", "address code review feedback", "apply review suggestions", or when given a GitHub PR URL with review comments to address.
---

# PR Code Review Fixer

Systematically address all code review issues from GitHub Pull Requests by fetching reviews, fixing issues, and generating a comprehensive report.

## Workflow

Follow these steps in order to ensure all review issues are properly addressed.

### Step 1: Get PR URL from User

If the user hasn't provided a GitHub PR URL, ask them for it interactively.

**Required format**: `https://github.com/owner/repo/pull/NUMBER`

**Example prompt**: "Please provide the GitHub PR URL you'd like me to review and fix issues for."

If the URL is malformed or missing, explain the required format and ask again.

### Step 2: Fetch Complete PR Review Data

Use the `scripts/fetch_pr_data.py` script to retrieve all PR information including reviews and comments.

```bash
python3 scripts/fetch_pr_data.py "<PR_URL>"
```

The script returns comprehensive JSON data including:
- PR title, body, and metadata
- All review bodies (top-level feedback)
- All review comments (inline code comments with file paths and line numbers)
- Regular PR comments
- Commit information

**Important**: The script fetches up to 100 reviews and 100 comments per review. If truncated, notify the user that some data may be missing.

Store the output in a variable for parsing in the next step.

### Step 3: Parse and Extract All Issues

Analyze the fetched data to extract actionable code review issues. Look in these locations:

**Review Bodies** (`reviews[].body`):
- High-level feedback about the PR
- Summary of issues found
- General recommendations

**Review Comments** (`reviews[].comments[]`):
- Inline code suggestions with specific file paths and line numbers
- Most actionable for fixes
- Contains `path`, `body`, `diffHunk` fields

**PR Comments** (`comments[]`):
- General discussion
- May contain additional suggestions

**Extraction Strategy**:
1. Start with inline review comments (highest priority - these have file/line context)
2. Parse review body for specific issues mentioned
3. Cross-reference with PR comments for additional context

**Categorize each issue**:
- **Critical**: Runtime errors, type safety violations, security issues
- **High**: Performance problems, API design issues, missing error handling
- **Medium**: Code organization, hardcoded values, naming conventions
- **Low**: Style preferences, minor optimizations

For each issue, extract:
- File path (if available)
- Line number/range (if available)
- Issue description
- Suggested fix (if provided)
- Category/priority

Create a structured list of all issues to fix.

### Step 4: Checkout PR Branch

Before making any changes, checkout the PR branch locally:

```bash
# Fetch the PR branch
gh pr checkout <PR_NUMBER>

# Verify you're on the correct branch
git branch --show-current
```

### Step 5: Fix All Issues

For each issue in your extracted list, attempt to fix it:

**Fixing Process**:
1. Read the relevant file(s) mentioned in the issue
2. Understand the current code and the suggested change
3. Apply the fix following the reviewer's suggestion
4. If the reviewer didn't provide a specific fix, apply the appropriate fix based on the issue description
5. Verify the fix makes sense in context

**Common Fix Patterns** (refer to `references/common_issues.md` for detailed patterns):
- Type safety: Add explicit types, fix type assertions
- React/Next.js: Fix key usage, add cleanup functions, update async params
- Performance: Add debouncing, memoization
- Hardcoded values: Extract to constants, use environment variables
- API/Database: Optimize queries, add validation

**Track Fix Status**:
- ✅ Fixed: Successfully applied the fix
- ⚠️ Needs Review: Issue requires human judgment or architectural decision
- ❌ Could Not Fix: Technical limitation or insufficient information

**For issues that can't be auto-fixed**:
- Note the reason why (ambiguous requirement, architectural decision needed, etc.)
- Include in the report with clear explanation

### Step 6: Commit and Push Changes

After fixing all issues, commit the changes with a clear message:

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "fix: address code review feedback

- Fixed [brief summary of major issues]
- Applied reviewer suggestions across [N] files
- See detailed fix report for complete list

Co-authored-by: Claude <noreply@anthropic.com>"

# Push to the PR branch
git push
```

**Note**: All fixes should be in a single commit as requested by the user.

### Step 7: Generate Comprehensive Report

Create a detailed report in markdown table format showing all issues and their resolution status.

**Report Format**:

```markdown
# Code Review Fix Report

**PR**: [PR Title]
**URL**: [PR URL]
**Fixes Applied**: [Date/Time]

## Summary

- Total Issues Found: X
- Issues Fixed: Y
- Issues Needing Review: Z
- Issues Could Not Fix: W

## Detailed Fix Report

| Category | File | Issue | Status | Details |
|----------|------|-------|--------|---------|
| Critical | path/to/file.ts | Accessing route params incorrectly | ✅ Fixed | Updated to use async params pattern |
| High | components/Quiz.tsx | Hardcoded question limit | ✅ Fixed | Made dynamic based on question_count |
| Medium | api/route.ts | Missing Zod validation | ✅ Fixed | Added schema validation for request body |
| Low | utils/helper.ts | Variable naming | ⚠️ Needs Review | Requires context about domain naming conventions |

## Issues Requiring Manual Review

[List any issues that couldn't be automatically fixed with explanations]

1. **[Issue Title]**
   - **File**: path/to/file
   - **Reason**: [Why it needs human review]
   - **Suggestion**: [What the reviewer or AI recommends]

## Extracted Learnings

Added [N] new patterns to `.claude/LEARNINGS.md`:
- Don't use array index as React keys → Use unique IDs
- Don't access Next.js params synchronously → Await params  
- Don't hardcode URLs → Use NEXT_PUBLIC_SITE_URL env var
- Don't forget useEffect cleanup → Add return function for timers/subscriptions

These learnings have been committed and will help prevent similar issues in future code.

Updated Claude instructions in `.claude/CLAUDE.md` to always reference learnings before writing code.

## Next Steps

[If there are unresolved issues, provide guidance on what the user should do next]
```

**Important**: 
- Do NOT include code snippets in the report (table only)
- Categorize issues by priority level
- Be concise but informative in the "Details" column
- Clearly highlight issues that need manual attention

### Step 8: Present Report to User

Display the report to the user and inform them:
- How many issues were fixed
- That changes have been pushed to the PR branch
- What (if anything) still needs their attention
- They can review the commit on GitHub

If there are issues requiring manual review, ask the user what they'd like to do next.

### Step 9: Extract Learnings and Update Project Documentation

After fixing issues, extract common patterns and best practices to prevent future occurrences.

#### 9.1: Analyze Issues for Learning Patterns

Review all fixed issues and identify **repeatable patterns** that indicate systemic problems or common mistakes.

**Reference**: See `references/learning_patterns.md` for detailed guidance on what makes a good learning and formatting examples.

**Look for**:
- **Recurring anti-patterns**: Same type of issue across multiple files (e.g., missing "use client", incorrect key usage)
- **Framework-specific gotchas**: Next.js async params, React hooks rules, TypeScript quirks
- **Project-specific patterns**: Specific validation patterns, API conventions, state management approaches
- **Common oversights**: Missing error handling, hardcoded values, performance issues

**Examples of learnable patterns**:
- ❌ "Always forgot to add 'use client' directive for client components with hooks"
- ❌ "Repeatedly used array index as React keys instead of unique IDs"
- ❌ "Keep accessing Next.js route params synchronously instead of async"
- ❌ "Missing cleanup in useEffect for timers/subscriptions"
- ❌ "Hardcoding URLs instead of using NEXT_PUBLIC_SITE_URL env var"

**Skip patterns that are**:
- One-off mistakes
- Very specific to this particular PR's context
- Already well-documented in standard framework docs

#### 9.2: Create/Update .claude/LEARNINGS.md

Create the `.claude` directory and `LEARNINGS.md` file if they don't exist:

```bash
# Create .claude directory in project root
mkdir -p .claude

# Create or update LEARNINGS.md
# File location: .claude/LEARNINGS.md
```

**LEARNINGS.md Structure**:

```markdown
# Project-Specific Code Learnings

This file contains common issues and patterns discovered through code reviews. Always refer to these learnings when writing new code to avoid repeating mistakes.

**Last Updated**: [Current Date]

---

## React/Next.js Patterns

### ❌ Don't: Use array index as React keys
**Issue**: Using array indices as keys causes bugs when list order changes
**Example**:
```tsx
{items.map((item, index) => <div key={index}>...</div>)}
```
**✅ Do**: Use unique IDs or content-based hashes
```tsx
{items.map((item) => <div key={item.id}>...</div>)}
```
**Learned from**: PR #[N] - Code review feedback on [Date]

---

### ❌ Don't: Access Next.js route params synchronously (Next.js 15+)
**Issue**: Params are now async in App Router
**Example**:
```tsx
export default function Page({ params }) {
  const id = params.id // ❌ Error!
}
```
**✅ Do**: Await params
```tsx
export default async function Page({ params }) {
  const { id } = await params
}
```
**Learned from**: PR #[N] - Code review feedback on [Date]

---

[Continue with other patterns...]
```

**Important Formatting Rules**:
- Each learning should be a standalone section
- Include ❌ Don't / ✅ Do pattern with code examples
- Keep examples minimal (2-5 lines of code)
- Include source (PR number and date)
- Use clear, searchable headings
- Group by category (React/Next.js, TypeScript, API Design, etc.)

**When updating existing file**:
- Check if similar pattern already exists (avoid duplicates)
- If similar pattern exists, update it with new example if more clear
- Otherwise, add new section at the appropriate category
- Update "Last Updated" date

#### 9.3: Ensure LEARNINGS.md is Referenced in Claude Instructions

Check for and update project documentation files that guide Claude's behavior:

**Files to check** (in order of preference):
1. `.claude/CLAUDE.md`
2. `.claude/CLAUDE-INSTRUCTIONS.md`
3. `CLAUDE.md` (root)
4. `CLAUDE-INSTRUCTIONS.md` (root)

**If none exist**: Create `.claude/CLAUDE.md`

**Add/Update Reference Section**:

Add this section near the top of the file (after any overview/introduction):

```markdown
## Code Quality and Best Practices

**CRITICAL**: Before writing any code, always review `.claude/LEARNINGS.md` for project-specific patterns and common mistakes to avoid. This file contains real issues discovered through code reviews and must be followed to maintain code quality.

Key learnings to always check:
- React/Next.js patterns (keys, hooks, async params)
- TypeScript type safety practices
- API validation and error handling
- Performance optimization patterns
- Project-specific conventions

[Link to LEARNINGS.md](.claude/LEARNINGS.md)
```

**If the section already exists**:
- Verify it mentions LEARNINGS.md
- Update if the reference is weak or unclear
- Ensure it emphasizes checking before writing code

**Verification**:
After updating, read the file to ensure:
- The reference is prominent (early in the file)
- It emphasizes the importance (use words like "CRITICAL", "ALWAYS", "MUST")
- It links to the correct path

#### 9.4: Commit the Learning Updates

After creating/updating the learning files:

```bash
# Stage the new/updated files
git add .claude/LEARNINGS.md
git add .claude/CLAUDE.md  # or whichever file was updated

# Commit separately from the fixes (for clarity)
git commit -m "docs: update code learnings from PR review

- Added [N] new learnings to .claude/LEARNINGS.md
- Updated Claude instructions to reference learnings
- Patterns extracted from PR #[N] code review

Co-authored-by: Claude <noreply@anthropic.com>"

# Push to the PR branch
git push
```

#### 9.5: Inform User of Learning Extraction

Add a section to the report:

```markdown
## Extracted Learnings

Added [N] new patterns to `.claude/LEARNINGS.md`:
- [Pattern 1 title]
- [Pattern 2 title]
- [Pattern 3 title]

These learnings have been committed to the repository and will help prevent similar issues in future code.
```

## Common Scenarios

### Multiple Reviewers

If multiple reviewers (e.g., Gemini Code Assist + human reviewers) have provided feedback:
- Consolidate all issues into a single list
- Note the source of each issue in the report if helpful
- Prioritize critical issues regardless of source

### Conflicting Suggestions

If different reviewers suggest conflicting fixes:
- Note the conflict in the report
- Mark as "Needs Review"
- Explain both suggestions
- Let the user decide

### Missing Context

If a review comment references something not in the code:
- Note it in the report as "Could Not Fix - Missing Context"
- Provide what information is available
- Suggest the user clarify with the reviewer

## Troubleshooting

**gh CLI not authenticated**: Run `gh auth login` to authenticate

**Permission denied on push**: Ensure you have write access to the repository

**Merge conflicts**: If the PR branch has conflicts with the base branch, alert the user and ask how to proceed

**Rate limiting**: If you hit GitHub API rate limits, notify the user and suggest waiting or using a different approach

