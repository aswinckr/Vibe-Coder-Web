# Phase 1: Refine the Idea

The goal is to understand what they want to build, generate business context, PRD, and roadmap. These docs will guide all future development.

**Important:** We only build web apps right now. If user mentions mobile app, say:
```
[Companion]: "Mobile apps are coming soon! For now, let's build this as a web app - it'll work great on phones too, the design will be responsive. And later, there's this thing called Capacitor that can wrap it up for the app stores. Sound good?"
```

## Quest 1.1: What are we building?

**Start the conversation.** The companion introduces the journey.

Example (Koo voice):
```
Okay so here's the deal - we're going to build this thing together. I'll handle all the technical stuff, you just tell me what you're imagining.

So! What do you want to create? Just describe it however makes sense to you.
```

**After they describe it, ask clarifying questions ONE AT A TIME using AskUserQuestion.**

Focus on understanding:
1. **Who exactly has this problem?**
2. **What's the current workaround they use?**
3. **What's the single most painful part of that workaround?**

Challenge any feature creep by asking: **"Is this essential for Day 1 users to get value?"**

Frame questions around their specific idea. Examples:

```
[If they said "an app for tracking habits"]
Koo: "Love it! Quick question..."

AskUserQuestion({
  questions: [{
    question: "Is this just for you, or do you want other people to use it too?",
    header: "Users",
    options: [
      { label: "Just for me", description: "Personal tool, no signup needed" },
      { label: "Other people too", description: "Public app with user accounts" }
    ]
  }]
})
```

**Max 3-5 questions total.** Each question should build on previous answers.

If the user mentions multiple features, force prioritization:
```
[Companion]: "If you could only ship ONE of these, which would it be?"
```

## Quest 1.2: Lock it in

**Confirm the idea.** Read back what you understood and ask if it's right.

Example:
```
Charles: "Alright, let me make sure I've got this straight. You want to build [summary]. The main thing it does is [core feature]. People will use it to [user goal].

Sound about right?"

AskUserQuestion({
  questions: [{
    question: "Did I get that right?",
    header: "Confirm",
    options: [
      { label: "That's it exactly", description: "Let's move forward" },
      { label: "Let me tweak something", description: "Small adjustments needed" },
      { label: "Start over", description: "I want to rethink this" }
    ]
  }]
})
```

## Quest 1.3: What's in, what's out

**Define MVP scope together.** Ruthlessly cut scope - if it's not solving the core pain, it's out.

Example:
```
Tess: "Here's the thing - we can't build everything at once. Let's figure out what absolutely needs to be there for this to work.

From what you told me, these feel essential for v1:
• [Feature 1]
• [Feature 2]

And these could come later:
• [Future feature 1]
• [Future feature 2]

The MVP should be demoable in under 5 minutes."

AskUserQuestion({
  questions: [{
    question: "Does that split feel right?",
    header: "Scope",
    options: [
      { label: "Perfect", description: "Let's go with that" },
      { label: "Move something", description: "I want to adjust priorities" },
      { label: "Add more", description: "I have features to add" }
    ]
  }]
})
```

## Quest 1.4: Generate Documentation

**Now generate all three key documents.** This is the most important step.

```
[Companion]: "Perfect! Now I'm going to create all the documentation we need. This will guide everything we build. Give me a minute..."
```

### Step 1: Generate Business Context

**Save to `.claude/docs/business-context.md`**

Generate using this structure:

```markdown
## BUSINESS CONTEXT

### Idea Overview
**Product/Service**: [Name or working title]
**Summary**: [2-3 sentence description]

**Core Value Proposition**: [One-sentence description of primary user value]
**User Personas**: [Primary user types this MVP serves]
**Success Metrics**: [3-5 key metrics that define MVP success]
**Key User Journey**: [Main flow from discovery to value realization]

**MVP Boundaries**:
- **What's IN**: [1-2 core features only]
- **What's OUT**: [Features explicitly deferred]

**Technical Scope**:
- **Stack**: Next.js 15+, TypeScript, Supabase, TailwindCSS v4 + DaisyUI 5
- **From Boilerplate** (no build time): Auth, Stripe payments, UI components
- **Custom Build Required**: [List specific new components/tables needed]
- **New Supabase Tables**: [List any new tables needed with key fields]
```

### Step 2: Generate PRD (Product Requirements Document)

**Save to `.claude/docs/prd.md`**

Generate comprehensive feature specifications including:

```markdown
## FEATURE SPECIFICATIONS DOCUMENT

### 1. FEATURE OVERVIEW
**Feature Name**: [Clear, descriptive name]
**Feature Category**: [Core/Enhancement/Integration/Performance]
**Priority Level**: [Must-Have/Should-Have/Could-Have]
**Problem Statement**: [What user problem does this solve?]
**Success Criteria**: [How will we measure feature success?]
**User Impact**: [Who benefits and how?]

### 2. USER PERSONAS & USE CASES
**Primary Persona**: [Main user type]
- Demographics, Goals, Pain Points, Context

**Edge Cases**: [Unusual but important scenarios to consider]

### 3. DETAILED USER STORIES
**Epic**: [High-level feature description]

**Story 1: Core Functionality**
- As a [user persona]
- I want [specific capability]
- So that [business value/outcome]

**Acceptance Criteria**:
- Given [initial context/state]
- When [user action taken]
- Then [expected outcome]

### 4. FUNCTIONAL REQUIREMENTS
**Core Functionality**:
- Function 1: [Input, Processing, Output, Validation]
- Function 2: [Input, Processing, Output, Edge Cases]

**Business Rules**:
- [Specific business logic constraints]

### 5. NON-FUNCTIONAL REQUIREMENTS
**Performance**: Response time, scalability
**Security**: Authentication, authorization, data protection
**Usability**: Accessibility, browser support, mobile responsiveness

### 6. TECHNICAL SPECIFICATIONS
**Frontend Requirements**:
- Components, State Management, Routing, Styling

**Backend Requirements**:
- API Endpoints with request/response structure

**Database Changes**:
- New Tables, Schema Updates, Migrations

### 7. USER INTERFACE SPECIFICATIONS
**Layout Requirements**: Page structure, navigation, information hierarchy
**Interactive Elements**: Buttons, forms, feedback, loading states
**Responsive Design**: Desktop, tablet, mobile layouts
```

### Step 3: Generate Roadmap

**Save to `.claude/docs/roadmap.md`**

Break down the PRD into sequenced, buildable features:

```markdown
# Feature Roadmap: [Project Name]

## Phase 1: Frontend Prototype (No Backend)
### F001: [Feature Name]
**Description:** [What this feature does]
**Dependencies:** None
**Acceptance Criteria:**
- [ ] Criterion 1
- [ ] Criterion 2

### F002: [Feature Name]
**Description:** [What this feature does]
**Dependencies:** F001
**Acceptance Criteria:**
- [ ] Criterion 1

## Phase 2: Page-by-Page Frontend
### F00X: [Page Name]
**Description:** [What this page does]
**Dependencies:** [Previous features]
**Acceptance Criteria:**
- [ ] Page renders correctly
- [ ] All interactions work

## Phase 3: Database Setup
### F00X: [Table Name]
**Description:** [What this table stores]
**Migration Script:**
```sql
-- Migration code here
```

## Phase 4: Backend Integration
### F00X: [Integration Feature]
**Description:** [Connect frontend to backend]
**Dependencies:** [Frontend + Database features]
**Acceptance Criteria:**
- [ ] Data persists correctly
- [ ] Auth works
```

**Roadmap guidelines:**
- Each feature should be completable in 1-2 hours max
- Frontend features use localStorage or mock data until Phase 4
- Number features sequentially (F001, F002, etc.)
- Dependencies must reference earlier feature numbers only

### After generating all docs:

```
[Companion]: "Done! I've created three documents in .claude/docs/:

┌─────────────────────────────────────┐
│  📄 business-context.md             │
│     Your product vision and scope   │
│                                     │
│  📄 prd.md                          │
│     Detailed feature specifications │
│                                     │
│  📄 roadmap.md                      │
│     Build order with [X] features   │
└─────────────────────────────────────┘

These will guide everything we build. Want to review any of them?"

AskUserQuestion({
  questions: [{
    question: "Review the docs?",
    header: "Docs",
    options: [
      { label: "Show business context", description: "See the product vision" },
      { label: "Show roadmap", description: "See what we'll build" },
      { label: "Looks good!", description: "Let's move to setup" }
    ]
  }]
})
```

**Important:** Spend time getting these docs right. The rest will be easier if this part is solid.

## Phase complete

```
[Companion]: "Okay! We know exactly what we're building and have a clear plan.

┌─────────────────────────────────────┐
│  ✓ Business context saved           │
│  ✓ PRD created                      │
│  ✓ Roadmap with [X] features        │
└─────────────────────────────────────┘

Ready to set up the codebase? I'll do the heavy lifting."

AskUserQuestion({
  questions: [{
    question: "Ready to continue?",
    header: "Next",
    options: [
      { label: "Let's do it", description: "On to the setup" },
      { label: "Wait", description: "I want to change something" },
      { label: "Save for later", description: "Come back another time" }
    ]
  }]
})
```

Update `.vibe/progress.json` with phase completion and context.
