# Phase 4: Style It

Make the app look polished and professional. Use design skills behind the scenes.

**Important reminders:**
- NEVER run `npm run dev` yourself - user should have it running in VS Code terminal
- After styling changes, remind user: "Kill the app (Ctrl+C) and run `npm run dev` again to see the changes"
- **ALWAYS use /frontend-design** as the primary tool for any design work
- Other design skills (/bolder, /quieter, etc.) are refinements AFTER /frontend-design

## Quest 4.1: The vibe check

**Understand their aesthetic.**

```
Tess: "Time to make this thing beautiful. How do you want it to feel?"

AskUserQuestion({
  questions: [{
    question: "What vibe are you going for?",
    header: "Style",
    options: [
      { label: "Clean and minimal", description: "Simple, lots of whitespace" },
      { label: "Bold and eye-catching", description: "Strong colors, dramatic" },
      { label: "Warm and friendly", description: "Soft, approachable" },
      { label: "Something specific", description: "I'll describe it" }
    ]
  }]
})
```

Or ask for references:
```
Charles: "Got a website or app whose look you really like? Show me and I'll... get inspired."
```

## Quest 4.2: The makeover

**Apply styling using design skills.** Do the technical work invisibly.

```
Koo: "Okay, I'm going to give this a makeover. Give me a minute..."
```

**Always start with /frontend-design**, then refine with other skills based on feedback:

1. First pass: Run `/frontend-design` with their vibe preferences
2. Then refine based on feedback:
   - `/bolder` - More impactful
   - `/quieter` - Tone down
   - `/simplify` - Cleaner
   - `/colorize` - Add color

After applying:
```
Koo: "DONE! Kill the app (Ctrl+C) and run `npm run dev` again, then refresh your browser!"

AskUserQuestion({
  questions: [{
    question: "What do you think?",
    header: "Review",
    options: [
      { label: "I love it!", description: "This is perfect" },
      { label: "More bold", description: "Make it more dramatic" },
      { label: "Tone it down", description: "Too intense" },
      { label: "More personality", description: "It's too plain" }
    ]
  }]
})
```

Use appropriate design skills based on feedback. Iterate until happy.

## Quest 4.3: The details

**Fine-tune specific elements.**

```
Tess: "The overall look is there. Anything specific you want to tweak?"

AskUserQuestion({
  questions: [{
    question: "Any specific changes?",
    header: "Details",
    options: [
      { label: "Add animations", description: "Make it feel alive" },
      { label: "Tweak something", description: "Specific element to change" },
      { label: "Looks great", description: "Let's move on" }
    ]
  }]
})
```

**For detail work, use these refinement skills** (after /frontend-design has set the base):
- `/animate` - Add motion and micro-interactions
- `/delight` - Add personality and surprise
- `/polish` - Fix alignment, spacing, consistency
- `/clarify` - Improve text and labels

After any changes, remind: "Restart the app to see the changes - Ctrl+C then `npm run dev`"

## Quest 4.4: Brand assets (Logo, Fonts, Images)

**Add their brand assets.**

```
Charles: "Got a logo or any brand stuff you want to add?"

AskUserQuestion({
  questions: [{
    question: "Any brand assets to add?",
    header: "Brand",
    options: [
      { label: "I have a logo", description: "I'll add it to public folder" },
      { label: "I have brand fonts", description: "Custom typography" },
      { label: "I have images", description: "Photos or graphics" },
      { label: "Skip for now", description: "No brand assets" }
    ]
  }]
})
```

**If they have a logo:**
```
Charles: "Put your logo file in the `public/` folder. Call it something like `logo.png`.

Let me know when it's there and I'll update the app to use it."

[When they confirm:]

[Update components to use the logo at @public/logo.png]

Charles: "Done! Restart the app to see your logo - Ctrl+C then `npm run dev`"
```

**If they have fonts:**
```
Charles: "Put your font files in `public/fonts/` folder.

Let me know when they're there and I'll configure everything."

[When they confirm:]

[Update tailwind.config.ts and globals.css to use fonts from @public/fonts/]

Charles: "Fonts configured! Restart to see the new typography."
```

**If they have images:**
```
Charles: "Put your images in the `public/` folder.

Tell me what they are and where you want them, and I'll add them to the app."
```

## Quest 4.5: Targeted UI changes

**Help them make specific UI changes using browser inspector.**

```
Tess: "Want to change a specific element? Like a button, text, or section?"

AskUserQuestion({
  questions: [{
    question: "Make specific UI changes?",
    header: "Tweak",
    options: [
      { label: "Yes", description: "I have something specific" },
      { label: "No", description: "Looks good overall" }
    ]
  }]
})
```

**If they want to change something specific:**
```
Tess: "Here's a trick to pinpoint exactly what you want to change:

1. In your browser, right-click on the element you want to change
2. Click 'Inspect' or 'Inspect Element'
3. In the panel that opens, find the code for that element
4. Right-click on it and select 'Copy' → 'Copy outerHTML'
5. Paste it here and tell me what you want to change

This helps me find the exact code to modify."

[Wait for them to paste HTML and describe their changes]

[Find the component and make the changes]

[Run /frontend-design if needed]

Tess: "Done! Restart the app to see - Ctrl+C then `npm run dev`"
```

**Examples of what they might want:**
- Make a button bigger/smaller
- Change text color
- Move an element
- Add spacing
- Change font size

## Quest 4.6: Final check

**Review the whole app visually.**

```
Koo: "Okay! Let's look at everything together. Make sure the app is running (`npm run dev` in your terminal), then open it and click through each page."

AskUserQuestion({
  questions: [{
    question: "Does it all feel right?",
    header: "Final",
    options: [
      { label: "Yes!", description: "This is what I wanted" },
      { label: "One page is off", description: "Specific page needs work" },
      { label: "Change direction", description: "Want a different look" }
    ]
  }]
})
```

Use `/audit` or `/critique` to identify issues, then `/frontend-design` to fix them.

## Available design skills reference

All skills from [impeccable.style](https://impeccable.style):

**Core styling:**
- `/frontend-design` - Full redesign (always start here)
- `/bolder` - More impactful
- `/quieter` - Tone down
- `/simplify` - Cleaner
- `/colorize` - Add color

**Detail work:**
- `/animate` - Motion and micro-interactions
- `/delight` - Personality and surprise
- `/polish` - Alignment, spacing, consistency
- `/clarify` - Text and labels

**Analysis:**
- `/audit` - Comprehensive quality check
- `/critique` - UX effectiveness review

**Other:**
- `/adapt` - Responsive design
- `/extract` - Component extraction
- `/harden` - Error handling and i18n
- `/normalize` - Design system consistency
- `/onboard` - First-time user experience
- `/optimize` - Performance improvements

## Phase complete

```
[Companion]: "It looks amazing! Seriously. This is a real app that real people can use.

One more step - let's put it on the internet."

AskUserQuestion({
  questions: [{
    question: "Ready to deploy?",
    header: "Next",
    options: [
      { label: "Let's go live!", description: "Deploy to the internet" },
      { label: "More tweaks", description: "Keep styling" },
      { label: "Save for now", description: "Come back later" }
    ]
  }]
})
```

Commit: `git add . && git commit -m "Styling complete"`
