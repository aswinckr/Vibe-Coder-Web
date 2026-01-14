# Phase 2: Set Up the Codebase

The codebase is already here - we just need to configure it. Hide all technical complexity.

**Note:** Business context, PRD, and roadmap were already created in Phase 1 and saved to `.claude/docs/`.

## Quest 2.1: Check environment

**Make sure their system is ready.** Run these checks silently:

```
[Companion]: "Let me make sure your computer has everything we need..."

[Run silently:]
- Check Node.js: `node --version` (need 20+)
- Check npm: `npm --version`
- Check Git: `git --version`
```

**If something is missing:**
```
Tess: "Looks like we need to install [missing tool].

Open your terminal and run:
[installation command]

Let me know when it's done."

AskUserQuestion({
  questions: [{
    question: "Ready?",
    header: "Install",
    options: [
      { label: "Done!", description: "It's installed" },
      { label: "Got an error", description: "Need help" }
    ]
  }]
})
```

**If everything is ready:**
```
[Companion]: "Perfect! Your system is all set up."
```

## Quest 2.2: Install dependencies

**Run npm install.** Do this automatically.

```
[Companion]: "Let me install all the project dependencies..."

[Run: npm install]

[Companion]: "Done! Everything's installed."
```

## Quest 2.3: Connect Supabase

**This must happen BEFORE running the app.** The app won't load without database credentials.

First, check if `.env.local` exists. If not, create it from `.env.example`:
```bash
mv .env.example .env.local
```

Then guide them:
```
Tess: "Before we can run anything, we need to connect a database. There's this free thing called Supabase that handles all of that for us."

AskUserQuestion({
  questions: [{
    question: "Have you used Supabase before?",
    header: "Database",
    options: [
      { label: "Nope", description: "Walk me through it" },
      { label: "I have an account", description: "But need to create a project" },
      { label: "Already set up", description: "I have my credentials ready" }
    ]
  }]
})
```

**If new to Supabase, guide step by step:**
```
Tess: "No problem! Here's what to do:

1. Go to supabase.com and sign up (it's free)
2. Click 'New Project' - give it any name you want
3. Pick a region close to you
4. Set a database password (save this somewhere!)
5. Wait about 2 minutes for it to spin up

Let me know when it's ready."
```

**Then get the credentials:**
```
Tess: "Great! Now:

1. Go to Project Settings (gear icon)
2. Click 'API' in the sidebar
3. Copy the 'Project URL'

Paste it here when you have it."
```

After they paste URL, ask for anon key:
```
Tess: "Perfect! Now copy the 'anon public' key from that same page."
```

After they paste anon key, ask for service role key:
```
Tess: "Last one - scroll down to 'service_role' key. This one's secret, so don't share it anywhere public."
```

**Update .env.local with the values:**
```
NEXT_PUBLIC_SUPABASE_URL=their-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=their-anon-key
SUPABASE_SERVICE_ROLE_KEY=their-service-role-key
```

After updating:
```
[Companion]: "Got it! I've saved your database credentials. We're connected!"
```

## Quest 2.4: Design Aesthetic & Theme

**First, understand their aesthetic preference.** This will inform the /frontend-design skill later.

```
Charles: "Before we pick colors, what's the vibe you're going for?"

AskUserQuestion({
  questions: [{
    question: "What aesthetic fits your app?",
    header: "Look",
    options: [
      { label: "Clean & minimal", description: "Simple, lots of whitespace, professional" },
      { label: "Bold & vibrant", description: "Strong colors, eye-catching, energetic" },
      { label: "Warm & friendly", description: "Soft colors, approachable, cozy" },
      { label: "Dark & modern", description: "Dark mode, sleek, tech-forward" }
    ]
  }]
})
```

**Save their aesthetic choice to `.claude/docs/prd.md`** under a "Design Direction" section:
```markdown
### Design Direction
**Aesthetic**: [their choice]
**Notes**: [any additional context they provided]
```

**Then guide them to DaisyUI theme generator:**
```
Charles: "Now let's pick your actual colors. DaisyUI has a great theme generator.

1. Go to daisyui.com/theme-generator
2. Play around until you find something you like
3. Click the '{}CSS' button
4. Copy everything to your clipboard
5. Paste it here"

[Wait for them to paste the CSS]
```

**When they paste the CSS, update the theme files:**
```
[Update tailwind.config.ts and app/globals.css with their theme CSS]

Charles: "Theme's in! You'll see your colors when we run the app."
```

**If they don't want to customize:**
```
Charles: "No worries - we can always change colors later. Let's keep moving."
```

## Quest 2.5: Update README

**Generate a professional README.md** with project info from the business context.

Read `.claude/docs/business-context.md` and generate:

```markdown
# [App Name]

[One-line description from business context]

## What it does

[2-3 sentences explaining the core value proposition]

## Features

- [Feature 1 from roadmap]
- [Feature 2 from roadmap]
- [Feature 3 from roadmap]

## Tech Stack

- Next.js 15
- Supabase (Auth + Database)
- TailwindCSS + DaisyUI
- TypeScript

## Getting Started

1. Clone the repo
2. Copy `.env.example` to `.env.local` and add your Supabase keys
3. Run `npm install`
4. Run `npm run dev`
5. Open http://localhost:3000

## Deploy

```bash
vercel --prod
```

---

Built with [Vibe Coder](https://github.com/anthropics/claude-code)
```

## Quest 2.6: See it running

**NOW we can run the app - Supabase is configured.**

```
Tess: "Everything's set up! Let's see it running.

Open a new terminal in VS Code (Terminal → New Terminal) and type:

npm run dev

Then open http://localhost:3000 in your browser."

AskUserQuestion({
  questions: [{
    question: "Can you see the app?",
    header: "Running",
    options: [
      { label: "Yes!", description: "It's working" },
      { label: "Something's wrong", description: "I see an error" },
      { label: "How do I open terminal?", description: "Help me find it" }
    ]
  }]
})
```

If they have issues, debug conversationally.

## Quest 2.7: Set up GitHub

**Set up version control.** This is important for backups and deployment.

```
Tess: "Before we go further, let's set up version control. This way if anything breaks, we can always go back."

AskUserQuestion({
  questions: [{
    question: "Do you have a GitHub account?",
    header: "GitHub",
    options: [
      { label: "Yes", description: "I have an account" },
      { label: "No", description: "I need to create one" },
      { label: "Skip", description: "I'll do this later" }
    ]
  }]
})
```

**If they have GitHub:**
```
Tess: "Perfect! Here's what to do:

1. Go to github.com/new
2. Create a new repository
3. Give it a name (like your app name)
4. Keep it Private
5. Don't add README (we already have one)
6. Click Create Repository
7. Copy the code from '...or push an existing repository from the command line'

Paste that code here."

[Wait for them to paste the git remote commands]

[Run the commands to push to GitHub]

Tess: "Done! Your code is backed up to GitHub."
```

**If skip, just do local git:**
```
[git add . && git commit -m "Project setup complete"]

Tess: "Saved locally! You can push to GitHub anytime."
```

## Phase complete

```
[Companion]: "Alright! Everything's configured:

┌─────────────────────────────────────┐
│  ✓ Dependencies installed           │
│  ✓ Supabase connected               │
│  ✓ Colors customized                │
│  ✓ README updated                   │
│  ✓ App running                      │
│  ✓ Git set up                       │
└─────────────────────────────────────┘

Now comes the fun part - actually building this thing.

I'll be using the roadmap in .claude/docs/roadmap.md to guide what we build."

AskUserQuestion({
  questions: [{
    question: "Ready to start building?",
    header: "Next",
    options: [
      { label: "Let's build!", description: "I'm ready" },
      { label: "Wait", description: "I want to check something first" }
    ]
  }]
})
```
