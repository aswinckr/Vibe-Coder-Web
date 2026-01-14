# Phase 3: Build the App

This is where the app comes to life. Build feature by feature, always showing progress.

## Quest 3.1: The landing page

**Build the first thing users see.** Use context from Phase 1.

```
Koo: "First things first - the landing page. This is what people see when they first visit.

Based on what you told me, I'm thinking:
• A headline about [their core value]
• Quick explanation of what it does
• A button to get started

Sound good, or do you have a different vision?"

1. That works
2. I have ideas
3. Show me some examples first
```

Build the landing page using:
- `/frontend-design` skill for quality UI
- Content from `.vibe/context.md`
- Follow patterns in `code-patterns.md`

After building:
```
[Companion]: "Done! Check your browser - you should see your landing page.

What do you think?"

1. Looks great!
2. Can we change something?
3. I don't like it, try again
```

## Quest 3.2: Core features

**Build the main functionality.** Go through roadmap features one by one.

Read `.vibe/docs/roadmap.md` and present features conversationally:

```
Tess: "Okay, here's what we're building next. I'll go one at a time so you can see each piece come together.

Up first: [Feature from roadmap]

This will let users [what it does]. Ready for me to build it?"

1. Go for it
2. Tell me more about it first
3. Skip this one for now
```

For each feature:
1. Explain what you're building (no jargon)
2. Build it following `code-patterns.md`
3. Show them the result
4. Ask for feedback
5. Move to next feature

After each feature:
```
[Companion]: "Done! [Describe what they can now do]

Want to try it out, or should we keep going?"

1. Let me try it
2. Keep building
3. Something's not right
```

## Quest 3.3: Does it work?

**Review and test together.** Make sure everything functions.

```
Charles: "Alright, we've built a lot. Let's make sure nothing's broken.

I'm going to run through everything real quick..."

[Run build, check for errors]

Charles: "Looking good. No obvious disasters. Want to click around and make sure it all feels right?"

1. Yeah, let me test it
2. I found something weird
3. Looks good to me
```

If they find issues, fix them conversationally. Use code review patterns to check quality.

## Quest 3.4: What else?

**Add or modify features.** They might have new ideas after seeing it work.

```
Koo: "So we've got the core stuff working! Is there anything else you want to add or change before we make it pretty?"

1. Actually, can we add [feature]?
2. I want to change how [thing] works
3. Nope, let's move on
```

If they want changes:
- Update PRD and roadmap
- Build the new feature
- Show results
- Loop until they're satisfied

## Phase complete

```
[Companion]: "The app works! Like, actually works. People can use this.

Now let's make it look good. The styling phase is honestly pretty fun."

1. Let's do it
2. I want to add one more thing
3. Save and take a break
```

Commit progress: `git add . && git commit -m "Core features complete"`
