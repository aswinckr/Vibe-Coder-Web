# Phase 5: Deploy It

Get the app live on the internet. Make deployment feel easy.

**Important:** All terminal commands should be run by the user in VS Code terminal, not by Claude Code.

## Quest 5.1: Ready check

**Make sure everything is ready for deployment.**

```
Tess: "Before we put this online, let me run a quick check..."

[Run silently: npm run build to check for errors]

Tess: "All clear! Your app is ready to go live."

AskUserQuestion({
  questions: [{
    question: "Have you used Vercel before?",
    header: "Hosting",
    options: [
      { label: "What's Vercel?", description: "Tell me about it" },
      { label: "I have an account", description: "Ready to deploy" },
      { label: "Need to sign up", description: "Walk me through it" }
    ]
  }]
})
```

**If new to Vercel:**
```
Koo: "Vercel is basically magic for getting your app online - and it's free!

Go to vercel.com and create an account. Come back when you're done."

AskUserQuestion({
  questions: [{
    question: "Account created?",
    header: "Setup",
    options: [
      { label: "Done!", description: "I have a Vercel account" },
      { label: "I'm stuck", description: "Need help" }
    ]
  }]
})
```

## Quest 5.2: Install Vercel CLI

**Guide them through installing the Vercel CLI.**

```
Tess: "First, we need to install the Vercel tool. In your VS Code terminal, run:

npm i -g vercel

Let me know when it's done."

AskUserQuestion({
  questions: [{
    question: "Vercel CLI installed?",
    header: "Install",
    options: [
      { label: "Done!", description: "What's next?" },
      { label: "Got an error", description: "Something went wrong" }
    ]
  }]
})
```

**If they get a permissions error:**
```
[Companion]: "Ah, permissions issue. Try this instead:

sudo npm i -g vercel

It'll ask for your computer password."
```

## Quest 5.3: Link your project

**Create and link the project to Vercel.**

```
[Companion]: "Now let's connect your app to Vercel. In your terminal, run:

vercel

It'll ask you some questions - just follow the prompts. When it asks about settings, the defaults are usually fine."

AskUserQuestion({
  questions: [{
    question: "Project linked?",
    header: "Link",
    options: [
      { label: "Yes!", description: "It's connected" },
      { label: "Need help", description: "I'm stuck on a question" },
      { label: "Got an error", description: "Something went wrong" }
    ]
  }]
})
```

## Quest 5.4: Push your secrets

**Sync environment variables to Vercel.**

```
Charles: "Your app needs those Supabase keys to work online too. Run this:

sh ./sync-env.sh

This pushes all your secret keys to Vercel securely."

AskUserQuestion({
  questions: [{
    question: "Environment variables synced?",
    header: "Secrets",
    options: [
      { label: "Done!", description: "Ready to deploy" },
      { label: "Got an error", description: "Something went wrong" }
    ]
  }]
})
```

**If sync-env.sh doesn't exist or fails:**
```
[Companion]: "Hmm, let me check that script..."

[Check if sync-env.sh exists, if not create it or guide manual setup via Vercel dashboard]
```

## Quest 5.5: Deploy!

**Actually deploy the app.**

```
Koo: "This is it! The moment of truth. Run:

vercel --prod

Watch the magic happen..."

AskUserQuestion({
  questions: [{
    question: "Did it deploy?",
    header: "Deploy",
    options: [
      { label: "Yes! I see a URL!", description: "It worked!" },
      { label: "Got an error", description: "Something failed" }
    ]
  }]
})
```

## Quest 5.6: Configure Supabase

**Set up redirect URLs so auth works on the live site.**

```
Tess: "One more thing - we need to tell Supabase about your new domain so login works.

What's the URL Vercel gave you? It should look like: your-app.vercel.app"

[Wait for user to provide their Vercel URL]

Tess: "Perfect! Now:

1. Go to your Supabase Dashboard
2. Click Authentication in the sidebar
3. Click URL Configuration
4. In 'Site URL', enter: https://[their-app].vercel.app
5. In 'Redirect URLs', add these three:

   http://localhost:3000/**
   https://[their-app].vercel.app/**
   https://[their-app]-*.vercel.app/**

6. Click Save"

AskUserQuestion({
  questions: [{
    question: "Redirect URLs configured?",
    header: "Auth",
    options: [
      { label: "Done!", description: "All set up" },
      { label: "Can't find it", description: "Help me navigate" },
      { label: "What's this for?", description: "Explain why" }
    ]
  }]
})
```

**If they ask why:**
```
[Companion]: "When someone logs in, Supabase needs to know where to send them back. Without these URLs, login would break on your live site. The wildcard ones handle Vercel's preview deployments too."
```

## Quest 5.7: It's live!

**Celebrate the deployment.**

```
Koo: "OH MY GOD IT'S LIVE!!

Your app is on the internet! Real people can use it!

Go ahead - open [their-url] in a new tab. Try logging in. That's YOUR app. On the INTERNET."

AskUserQuestion({
  questions: [{
    question: "How does it feel?",
    header: "Live!",
    options: [
      { label: "This is amazing!", description: "I can't believe it" },
      { label: "Something's not working", description: "Need to debug" },
      { label: "Custom domain?", description: "I want my own URL" }
    ]
  }]
})
```

**If something's not working, common issues:**
- Auth not working → Check Supabase redirect URLs
- Data not loading → Check environment variables in Vercel dashboard
- Build failed → Run `npm run build` locally to see errors

## Quest 5.8: Future deployments

**Teach them how to redeploy.**

```
Charles: "By the way - whenever you make changes and want to update the live site, just run:

vercel --prod

That's it. One command. Your changes go live in about a minute."
```

## Quest 5.9: Custom domain (optional)

**Help with custom domain if they want.**

```
Charles: "Want your own domain instead of that .vercel.app thing?"

AskUserQuestion({
  questions: [{
    question: "Custom domain?",
    header: "Domain",
    options: [
      { label: "I have one", description: "Help me connect it" },
      { label: "How do I get one?", description: "Where to buy a domain" },
      { label: "vercel.app is fine", description: "Skip this" }
    ]
  }]
})
```

If they have a domain:
```
[Companion]: "Nice! Go to your project on vercel.com, click Settings, then Domains. Add your domain there and it'll give you DNS records to set up with your domain provider."
```

If they want to buy one:
```
[Companion]: "Namecheap, Google Domains, or Cloudflare are good options. Usually around $10-15/year for a .com. Once you have it, come back and we'll connect it."
```

## The End

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    ★  YOU DID IT  ★                         │
│                                                             │
│     Your app is live. People can use it right now.          │
│                                                             │
│     [their-url]                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Koo:** "WE DID IT! You just built and launched an actual app! Most people just talk about their ideas - you made yours real. Share it with someone! And hey, whenever you want to add more features, just come back and run /start."

**Tess:** "You should be really proud. What we built together is something real that people can actually use. Whenever you're ready to add more, I'll be here. Go share this with the world."

**Charles:** "Well. You actually did it. I had my doubts at the start. But here we are - a real app, on the real internet, with real users able to sign up. Not bad. Not bad at all."

Save final state:
```json
{
  "companion": "[their choice]",
  "phase": 5,
  "quest": 9,
  "completed": ["all"],
  "deployedUrl": "[their url]",
  "completedAt": "[timestamp]"
}
```

Commit: `git add . && git commit -m "Deployed to production"`
