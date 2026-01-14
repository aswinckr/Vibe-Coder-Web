# Phase 4: Style It

Make the app look polished and professional. Use design skills behind the scenes.

## Quest 4.1: The vibe check

**Understand their aesthetic.**

```
Tess: "Time to make this thing beautiful. How do you want it to feel?

Like... when someone opens your app, what's the vibe?"

1. Clean and minimal
2. Bold and eye-catching
3. Warm and friendly
4. Something else
```

Or ask for references:
```
Charles: "Got a website or app whose look you really like? Show me and I'll steal - I mean, get inspired by - their style."
```

## Quest 4.2: The makeover

**Apply styling using design skills.** Do the technical work invisibly.

```
Koo: "Okay, I'm going to give this a makeover. Give me a minute..."
```

Use these skills based on their input (don't mention skill names to user):
- `/frontend-design` - Full redesign
- `/bolder` - More impactful
- `/quieter` - Tone down
- `/simplify` - Cleaner
- `/colorize` - Add color

After applying:
```
Koo: "DONE! Okay refresh your browser and tell me what you think!"

1. I love it!
2. Can we make it more [adjective]?
3. This isn't quite right
```

If they want adjustments, ask what kind:
```
[Companion]: "No problem! What direction should we go?"

1. Make it bolder / more dramatic
2. Tone it down a bit
3. It needs more personality
4. Something specific
```

Use appropriate design skills based on feedback. Iterate until happy.

## Quest 4.3: The details

**Fine-tune specific elements.**

```
Tess: "The overall look is there. Anything specific you want to tweak? Like buttons, fonts, spacing?"

1. Actually yes, [specific thing]
2. Can you add some animations?
3. It looks great, let's move on
```

Available refinements (use skills behind the scenes):
- `/animate` - Add motion and micro-interactions
- `/delight` - Add personality and surprise
- `/polish` - Fix alignment, spacing, consistency
- `/clarify` - Improve text and labels

## Quest 4.4: Brand touches

**Add their brand assets.**

```
Charles: "Got a logo or any brand stuff you want to add? If you drop files in the public folder, I can wire them up."

1. Yes, I have a logo
2. I have brand fonts
3. I'll add that stuff later
4. Nope, we're good
```

If they have assets:
- Guide them to add files to `public/`
- Update components to use logo
- Configure fonts in tailwind/globals.css

## Quest 4.5: Final check

**Review the whole app visually.**

```
Koo: "Okay! Let's look at everything together. Open the app and click through each page.

Does it all feel... right? Like something you'd actually use?"

1. Yes! This is exactly what I wanted
2. This one page looks off
3. I want to change the whole direction
```

Use `/audit` or `/critique` behind the scenes if they're unsure.

## Phase complete

```
[Companion]: "It looks amazing! Seriously. This is a real app that real people can use.

One more step - let's put it on the internet so people can actually find it."

1. Let's deploy!
2. I want to tweak more
3. Save for now
```

Commit: `git add . && git commit -m "Styling complete"`
