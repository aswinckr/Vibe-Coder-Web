## 1. FEATURE OVERVIEW

**Feature Name**: Vibe Code Guide (MVP)
**Feature Category**: Core Product / Educational Tool
**Priority Level**: Must-Have
**Target Release**: v1.0 (MVP)

**Problem Statement**: Designers often struggle to build functional products because they don't know the "technical sequence" of operations or how to write prompts that result in clean, modular code. They suffer from "blank page syndrome" when using tools like Bolt or Cursor.
**Success Criteria**:

- High completion rate of the step-by-step guide.
- Low latency (< 2s) for AI-generated prompts.
- Positive qualitative feedback on prompt effectiveness.
  **User Impact**: Empowers non-technical designers to transition from high-fidelity mockups to functional React/Next.js applications without learning syntax.

---

## 2. USER PERSONAS & USE CASES

**Primary Persona**: "Design-First Dan"

- **Demographics**: 25–40, UI/UX Designer, comfortable with Figma, 0–10% coding knowledge.
- **Goals**: To see his designs "live" without hiring a developer.
- **Pain Points**: Gets "lost" after the first prompt; doesn't know how to structure a database or handle state.
- **Context**: Using a desktop browser with a code editor (Cursor/Bolt) open in a split screen.

**Secondary Persona**: "The Rapid Prototyper"

- **Goals**: Quickly spin up an MVP to validate a business idea.
- **Use Case**: Needs the architectural "order of operations" to ensure the AI doesn't create a "spaghetti code" monolith.

**Edge Cases**:

- **Vague App Ideas**: User enters "A cool app." System must still provide a baseline structure.
- **Refresh/Data Loss**: User refreshes the browser and loses their "App Idea" (mitigated by LocalStorage).

---

## 3. DETAILED USER STORIES

**Epic**: Interactive AI Roadmap for Building Apps

**Story 1: Project Initialization**

- **As a** designer, **I want** to enter my app idea once **so that** the entire guide is personalized to my specific project.
- **Acceptance Criteria**:
- **Given** I am on the landing page, **when** I type my idea and click "Start Building," **then** I am redirected to Step 1 of the guide with my idea saved.

**Story 2: Contextual Prompt Generation**

- **As a** user, **I want** a button that generates a specific prompt for my current step **so that** I don't have to guess what to tell the AI.
- **Acceptance Criteria**:
- **Given** I am on a specific step (e.g., "Database Schema"), **when** I click "Generate Prompt," **then** the app calls the Claude API and displays a tailored prompt including my app idea.

**Story 3: Guided Navigation**

- **As a** user, **I want** a persistent sidebar **so that** I can see the total roadmap and jump between steps if needed.
- **Acceptance Criteria**:
- **Given** I am deep in the guide, **when** I look at the sidebar, **then** I see a "GitBook-style" list of all phases (Setup, UI, Logic, Deployment).

---

## 4. FUNCTIONAL REQUIREMENTS

**Core Functionality**:

- **Idea Persistence**: The app must store the "App Idea" in `localStorage`.
- **Step Content Engine**: A JSON-based configuration file that defines:
- Step Title
- Prerequisites
- Detailed Instructions
- Tools needed
- System Message (for Claude)

**Business Rules**:

- The "Generate Prompt" button remains disabled until the App Idea is present.
- Prompts must be formatted for "Copy to Clipboard" with one click.

**Integration Requirements**:

- **Claude API (Anthropic)**: Used to transform the [App Idea] + [Step Instructions] into a high-quality coding prompt.

---

## 5. TECHNICAL SPECIFICATIONS

**Frontend Requirements**:

- **Framework**: Next.js 14+ (App Router).
- **Styling**: Tailwind CSS (clean, minimalist "developer doc" aesthetic).
- **State Management**: `React Context` or simple `useState` with `useEffect` for `localStorage` sync.

**Backend Requirements (API Routes)**:

- **POST `/api/generate-prompt**`:
- **Input**: `{ appIdea: string, stepId: string, stepContext: string }`
- **Processing**: Send a system prompt to Claude (e.g., "You are an expert React Architect. Write a prompt for a user to give to an AI coder for the following step...")
- **Output**: `{ prompt: string }`

**Technical Constraints**:

- **No Database**: All guide content is static; user data is client-side only (MVP requirement).
- **No Auth**: Access is open for the 8-hour build scope.

---

## 6. USER INTERFACE SPECIFICATIONS

**Layout Structure**:

1. **Landing Page**: Single hero input field for the "App Idea."
2. **Guide Page**:

- **Left Sidebar**: Navigation tree (Fixed width: 280px).
- **Main Content**: Centered prose area (Max-width: 800px).
- **Prompt Widget**: A highlighted "card" containing the "Generate" button and the output area.

**Design System**:

- **Typography**: Inter or System Sans-serif.
- **Colors**: Neutral (Slate/Zinc) with a single accent color (Indigo) for primary actions.

---

## 7. IMPLEMENTATION PLAN (8-HOUR SPRINT)

| Phase             | Task                                                             | Duration  |
| ----------------- | ---------------------------------------------------------------- | --------- |
| **1: Setup**      | Next.js boilerplate, Tailwind config, and JSON Step Structure.   | 1 Hour    |
| **2: Navigation** | Build the GitBook-style sidebar and Step routing.                | 1.5 Hours |
| **3: Logic**      | API Route for Claude integration and `localStorage` hook.        | 2 Hours   |
| **4: UI/UX**      | Build the Step Template (Prereqs, Tools, Prompt Card).           | 2 Hours   |
| **5: Polishing**  | Copy-to-clipboard functionality, loading states, and deployment. | 1.5 Hours |

---

## 8. SUCCESS METRICS & MONITORING

- **Vercel Analytics**: Track page views on the final step ("Deployment") to calculate funnel conversion.
- **Error Logging**: Implement simple `console.error` tracking or Sentry for API failures.
- **Feedback**: A "Was this prompt helpful? 👍/👎" footer on each prompt output.
