# Phase 3: Build the App

This is where the app comes to life. Build feature by feature, always showing progress.

**Important reminders:**
- NEVER run `npm run dev` yourself - ask user to do it in VS Code terminal
- After EVERY code change, remind user: "Kill the app (Ctrl+C) and run `npm run dev` again to see the changes"
- If app needs AI features, use Claude API but mention OpenAI as alternative
- **ALWAYS run /frontend-design** after building ANY UI component or page
- Track progress through roadmap items - show "X of Y complete" after each feature
- After completing features, offer code review before moving on

## Progress Tracking

At the start of Phase 3, read `.claude/docs/roadmap.md` and count total features. Store in `.vibe/progress.json`:

```json
{
  "companion": "koo",
  "phase": 3,
  "quest": 1,
  "roadmap": {
    "total": 5,
    "completed": 0,
    "items": [
      { "name": "Landing page", "status": "pending" },
      { "name": "Feature 1", "status": "pending" },
      ...
    ]
  }
}
```

**After completing each feature, show progress:**
```
┌────────────────────────────────────┐
│  PROGRESS: ██████░░░░  3/5 done   │
└────────────────────────────────────┘
```

## Quest 3.1: The landing page

**First, generate the landing page copy.** This ensures compelling content before building.

```
Koo: "First things first - the landing page. Let me write up some killer copy based on what we discussed..."
```

**Generate landing page content including:**
- Hero section: Headline, subheadline, CTA button
- Problem/pain section: What frustrations your users have
- Solution overview: How your app solves it
- How it works: 3-4 simple steps
- Features/benefits: What they gain
- Social proof section: Testimonials (can be placeholder)
- FAQ section: Common questions
- Final CTA section

```
Koo: "Here's what I'm thinking for the landing page:

**Headline**: [Powerful headline]
**Subheadline**: [Supporting text]

**Key sections**:
• Problem: [Pain points]
• Solution: [How you help]
• How it works: [3 steps]
• Features: [Benefits]
• FAQ: [Common questions]

AskUserQuestion({
  questions: [{
    question: "Sound good?",
    header: "Landing",
    options: [
      { label: "That works", description: "Build it" },
      { label: "I have ideas", description: "Let me tell you more" }
    ]
  }]
})
```

**Build the landing page**, then **automatically run /frontend-design** to make it look good:

```
[Companion]: "Let me build this out..."

[Build the landing page following code-patterns.md]

[Companion]: "Got the structure! Now let me make it look nice..."

[Run /frontend-design skill to polish the design]

[Update progress.json: mark "Landing page" as completed]

[Companion]: "Done! Kill the app (Ctrl+C in your terminal) and run `npm run dev` again to see your landing page.

┌────────────────────────────────────┐
│  PROGRESS: ██░░░░░░░░  1/5 done   │
└────────────────────────────────────┘

Nice start!"

AskUserQuestion({
  questions: [{
    question: "What do you think?",
    header: "Review",
    options: [
      { label: "Looks great!", description: "Move on" },
      { label: "Change something", description: "Adjust the design" },
      { label: "Try again", description: "Different approach" }
    ]
  }]
})
```

**If they want design changes:**
```
[Companion]: "Let me tweak that..."

[Run /frontend-design with their feedback]

[Companion]: "How about now? Restart the app to see - Ctrl+C then `npm run dev`"
```

## Quest 3.2: Core features

**Build the main functionality.** Go through roadmap features one by one.

Read `.claude/docs/roadmap.md` and present the FULL list:

```
Tess: "Here's our roadmap - everything we planned to build:

┌─────────────────────────────────────┐
│  YOUR APP ROADMAP                   │
├─────────────────────────────────────┤
│  ✓ Landing page                     │
│  ○ [Feature 1 name]                 │
│  ○ [Feature 2 name]                 │
│  ○ [Feature 3 name]                 │
│  ○ [Feature 4 name]                 │
└─────────────────────────────────────┘

I'll build these one at a time. You'll see each piece come together.

Up first: [Next feature from roadmap]

This will let users [what it does]."

AskUserQuestion({
  questions: [{
    question: "Ready for me to build it?",
    header: "Feature",
    options: [
      { label: "Go for it", description: "Build this feature" },
      { label: "Tell me more", description: "Explain what it involves" },
      { label: "Skip this one", description: "Remove from roadmap" }
    ]
  }]
})
```

**If they skip a feature:**
```
[Companion]: "No problem! I'll remove that from the list."

[Update roadmap.md and progress.json to remove the feature]
[Recalculate total]

[Companion]: "Roadmap updated - now we have [X] features to build."
```

**If the feature needs AI:**
```
[Companion]: "This feature needs some AI smarts. I'm setting it up with Claude - it's really good at [what it does]. If you'd rather use OpenAI or something else, just let me know and I can swap it."
```

**For each feature:**
1. Explain what you're building (no jargon)
2. Build it following `code-patterns.md`
3. **Run /frontend-design** to polish any UI
4. Update progress.json
5. Show progress bar
6. Remind to restart
7. Ask for feedback
8. Move to next feature

**After each feature:**
```
[Companion]: "Done! [Describe what they can now do]

Restart the app to see it - Ctrl+C then `npm run dev`

┌────────────────────────────────────┐
│  PROGRESS: ████████░░  4/5 done   │
└────────────────────────────────────┘

[X] more to go!"

AskUserQuestion({
  questions: [{
    question: "What's next?",
    header: "Continue",
    options: [
      { label: "Try it out", description: "Let me test this" },
      { label: "Next feature!", description: "Keep the momentum" },
      { label: "Something's off", description: "This needs fixing" }
    ]
  }]
})
```

## Quest 3.3: Code Review (after major features)

**After building 2-3 features, offer a code review.** This catches issues early.

```
Tess: "We've built a few things now. Want me to do a quick code review? It helps catch any issues before they pile up."

AskUserQuestion({
  questions: [{
    question: "Run a code review?",
    header: "Review",
    options: [
      { label: "Yes please", description: "Check the code quality" },
      { label: "Keep building", description: "I'll review later" }
    ]
  }]
})
```

**If they want a code review:**

```
Tess: "I'll create a pull request and run some checks. This helps catch repeated code, security issues, and performance problems.

First, do you have Gemini Code Assist installed on GitHub?"

AskUserQuestion({
  questions: [{
    question: "Have Gemini Code Assist?",
    header: "Setup",
    options: [
      { label: "Yes", description: "It's installed" },
      { label: "No", description: "How do I get it?" },
      { label: "Skip", description: "Just commit without review" }
    ]
  }]
})
```

**If they need to install:**
```
Tess: "Go to github.com/apps/gemini-code-assist and install it to your repo. It's free and catches issues AI tends to create.

Let me know when it's done."
```

**Running the code review:**
```
[Companion]: "Creating a branch and pull request..."

[Run: git checkout -b feature-[name] && git add . && git commit -m "Add [feature]" && git push -u origin feature-[name]]
[Create PR using gh pr create]

[Companion]: "PR created! Give Gemini a minute to review it..."

[Wait for user confirmation]

[Companion]: "Now let me fix any issues it found..."

[Use pr-code-review-fixer skill to address review comments]

[Companion]: "Done! Merge the PR on GitHub when you're ready, then we'll continue."
```

## Handling Digressions

**If user wants to work on design, styling, or something off-roadmap:**

```
[Companion]: "Sure! Let's do that."

[Do what they ask - if it's design work, use /frontend-design]

[After completing the digression:]

[Companion]: "Okay! Back to the roadmap - we still have [X] features left:

┌─────────────────────────────────────┐
│  REMAINING                          │
├─────────────────────────────────────┤
│  ○ [Remaining feature 1]            │
│  ○ [Remaining feature 2]            │
└─────────────────────────────────────┘

Want to keep building, or is there something else?"

AskUserQuestion({
  questions: [{
    question: "Continue with roadmap?",
    header: "Next",
    options: [
      { label: "Yes, next feature", description: "Back to building" },
      { label: "Actually, remove one", description: "Trim the roadmap" },
      { label: "Something else", description: "Different task" }
    ]
  }]
})
```

**Always gently return to the roadmap.** The goal is to complete ALL planned features.

## Quest 3.4: Adding New Features

**If user wants to add something not in the roadmap:**

```
Koo: "New feature? I love it! Tell me what you're thinking."

[Listen to their description]

Koo: "Got it! Let me add that to our roadmap and update the docs."

[Update .claude/docs/roadmap.md with new feature]
[Update .claude/docs/prd.md if needed]
[Add any Supabase migrations if database changes needed]

Koo: "Added to the roadmap! Here's the updated plan:

┌─────────────────────────────────────┐
│  UPDATED ROADMAP                    │
├─────────────────────────────────────┤
│  ✓ [Completed features]             │
│  ○ [New feature] ← NEW              │
│  ○ [Remaining features]             │
└─────────────────────────────────────┘

Want me to build it now?"
```

## Quest 3.5: Does it work?

**Review and test together.** Make sure everything functions.

```
Charles: "Alright, we've built a lot. Let's make sure nothing's broken.

┌────────────────────────────────────┐
│  PROGRESS: ██████████  5/5 done!  │
└────────────────────────────────────┘

All features complete! Make sure the app is running, then click around and test everything."

AskUserQuestion({
  questions: [{
    question: "How's it looking?",
    header: "Test",
    options: [
      { label: "Works great", description: "Everything's good" },
      { label: "Found a bug", description: "Something's broken" },
      { label: "Looks good", description: "Let's move on" }
    ]
  }]
})
```

If they find issues, fix them, run /frontend-design if it's UI-related, and remind to restart the app.

## Quest 3.6: Final Review

**Offer one last code review before moving on.**

```
Tess: "Before we move to styling, want to do one more code review? Good time to catch anything we missed."

AskUserQuestion({
  questions: [{
    question: "Final code review?",
    header: "Review",
    options: [
      { label: "Yes", description: "Run PR review" },
      { label: "No", description: "Let's style it" }
    ]
  }]
})
```

## Nudging Completion

**If user tries to move to Phase 4 with incomplete roadmap:**

```
[Companion]: "Hold up - we still have [X] features on the roadmap:

○ [Remaining feature 1]
○ [Remaining feature 2]

Do you want to:
1. Build them now (recommended!)
2. Remove them from the roadmap
3. Save them for later

I just don't want you to forget about them!"

AskUserQuestion({
  questions: [{
    question: "What should we do with the remaining features?",
    header: "Roadmap",
    options: [
      { label: "Build them now", description: "Let's finish what we started" },
      { label: "Remove them", description: "They're not essential" },
      { label: "Save for v2", description: "I'll add them later" }
    ]
  }]
})
```

**Only proceed to Phase 4 when roadmap is complete or consciously trimmed.**

## Phase complete

```
[Companion]: "The app works! Like, actually works. People can use this.

┌────────────────────────────────────┐
│  ★ ALL FEATURES COMPLETE ★        │
│                                    │
│  You built a real app!             │
└────────────────────────────────────┘

Now let's make it look even better."

AskUserQuestion({
  questions: [{
    question: "Ready to style it?",
    header: "Next",
    options: [
      { label: "Let's do it", description: "Make it pretty" },
      { label: "One more thing", description: "Add another feature" },
      { label: "Take a break", description: "Save and come back" }
    ]
  }]
})
```

Commit progress: `git add . && git commit -m "Core features complete - roadmap done"`
