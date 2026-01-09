# Feature Roadmap: Vibe Code Guide (MVP)

## Phase 1: Frontend Prototype (No Backend)

### F001: Project Setup & Configuration
**Description:** Initialize Next.js 15 project with Tailwind CSS v4, DaisyUI 5, and establish the base design system (typography, colors, spacing).
**Dependencies:** None
**Acceptance Criteria:**
- [ ] Next.js 15.4+ project with App Router configured
- [ ] Tailwind CSS v4 with CSS-first `@theme` configuration in `globals.css`
- [ ] DaisyUI 5 installed and configured with neutral/slate theme
- [ ] Design tokens defined: Inter font, Slate/Zinc neutrals, Indigo accent
- [ ] Project builds without errors (`npm run build`)

### F002: Step Content Data Structure
**Description:** Create the JSON-based step configuration that defines all guide content including titles, prerequisites, instructions, tools, and system prompts.
**Dependencies:** F001
**Acceptance Criteria:**
- [ ] TypeScript interfaces defined for Step, Phase, and Guide structures
- [ ] JSON configuration file with all 4 phases: Setup, UI, Logic, Deployment
- [ ] Each step contains: title, prerequisites, instructions, tools needed, system message
- [ ] Mock data covers minimum 8-10 steps across all phases

### F003: Landing Page with App Idea Input
**Description:** Build the hero landing page with a single prominent input field for users to enter their app idea.
**Dependencies:** F001
**Acceptance Criteria:**
- [ ] Full-viewport hero section with centered content
- [ ] Large text input field (or textarea) for app idea entry
- [ ] "Start Building" primary button with Indigo accent styling
- [ ] Compelling headline and subtext explaining the tool's value
- [ ] Responsive design works on mobile and desktop

### F004: localStorage Hook for App Idea Persistence
**Description:** Create a custom React hook that syncs the app idea to localStorage and persists across page refreshes.
**Dependencies:** F003
**Acceptance Criteria:**
- [ ] `useAppIdea` hook manages get/set operations
- [ ] App idea persists when user refreshes browser
- [ ] Hook handles SSR correctly (no hydration mismatch)
- [ ] Blank/empty state handled gracefully

### F005: Guide Layout with GitBook-Style Sidebar
**Description:** Build the main guide page layout with a fixed-width sidebar (280px) for navigation and centered main content area (max-width 800px).
**Dependencies:** F001, F002
**Acceptance Criteria:**
- [ ] Two-column layout: fixed sidebar + scrollable main content
- [ ] Sidebar shows all phases as collapsible sections
- [ ] Steps listed under each phase with visual hierarchy
- [ ] Current step highlighted in sidebar
- [ ] Sidebar collapses on mobile with hamburger menu
- [ ] Main content area centered with comfortable reading width

### F006: Step Page Template
**Description:** Create the reusable step page component that displays prerequisites, tools needed, detailed instructions, and the prompt generation widget.
**Dependencies:** F005, F002
**Acceptance Criteria:**
- [ ] Step title rendered as H1
- [ ] Prerequisites section with checklist format
- [ ] Tools needed displayed as badges/chips
- [ ] Instructions rendered as formatted prose (markdown support)
- [ ] Prompt Widget card positioned prominently below instructions
- [ ] Previous/Next navigation buttons at bottom

### F007: Prompt Widget (Static/Mock)
**Description:** Build the prompt generation widget card with generate button and output display area, using mock/placeholder prompts initially.
**Dependencies:** F006, F004
**Acceptance Criteria:**
- [ ] Card component with distinct visual styling (elevated, bordered)
- [ ] "Generate Prompt" button disabled when no app idea exists
- [ ] Button shows loading state (spinner) when clicked
- [ ] Output area displays mock prompt text after 1s delay
- [ ] Prompt text area with monospace font styling

### F008: Copy-to-Clipboard Functionality
**Description:** Add one-click copy functionality to the generated prompt with visual feedback.
**Dependencies:** F007
**Acceptance Criteria:**
- [ ] Copy button/icon adjacent to prompt output
- [ ] Clicking copies prompt text to system clipboard
- [ ] Visual feedback on copy (toast notification or button state change)
- [ ] Accessible: keyboard navigable, screen reader friendly

### F009: Step Navigation & Routing
**Description:** Implement dynamic routing for steps and navigation between them via sidebar and prev/next buttons.
**Dependencies:** F005, F006
**Acceptance Criteria:**
- [ ] Dynamic route `/guide/[stepId]` renders correct step content
- [ ] Clicking sidebar step navigates to that step
- [ ] Previous/Next buttons navigate sequentially through steps
- [ ] First step hides "Previous", last step hides "Next"
- [ ] URL reflects current step for shareability

### F010: Progress Indicator
**Description:** Add visual progress tracking showing completion status across the guide.
**Dependencies:** F009
**Acceptance Criteria:**
- [ ] Progress bar or step counter in sidebar header
- [ ] Visited steps marked with checkmark or different styling
- [ ] Current step visually distinguished from completed/pending
- [ ] Progress persists via localStorage

---

## Phase 2: Page-by-Page Frontend Polish

### F011: Landing Page Enhancements
**Description:** Polish the landing page with animations, better copy, and edge case handling.
**Dependencies:** F003, F004
**Acceptance Criteria:**
- [ ] Subtle entrance animation on page load
- [ ] Input validation (minimum character length warning)
- [ ] "Continue where you left off" prompt if app idea exists in localStorage
- [ ] Clear/reset option for existing app idea

### F012: Guide Step - Project Initialization
**Description:** First step content teaching users how to set up their project with the AI coder.
**Dependencies:** F006
**Acceptance Criteria:**
- [ ] Complete content for project setup instructions
- [ ] Prerequisites: Cursor/Bolt installed, Node.js ready
- [ ] Tools: Next.js, npm/pnpm
- [ ] Step-specific system prompt template defined

### F013: Guide Step - Database Schema Design
**Description:** Step teaching users how to prompt for database schema creation.
**Dependencies:** F006
**Acceptance Criteria:**
- [ ] Instructions on identifying entities and relationships
- [ ] Prerequisites: Project initialized
- [ ] Tools: Supabase, PostgreSQL concepts
- [ ] System prompt generates schema-focused coding prompt

### F014: Guide Step - UI Component Structure
**Description:** Step teaching users how to prompt for component architecture.
**Dependencies:** F006
**Acceptance Criteria:**
- [ ] Instructions on component hierarchy and atomic design
- [ ] Prerequisites: Schema defined
- [ ] Tools: React, Tailwind, component libraries
- [ ] System prompt generates UI-focused coding prompt

### F015: Guide Step - State Management
**Description:** Step teaching users how to prompt for state and data flow.
**Dependencies:** F006
**Acceptance Criteria:**
- [ ] Instructions on state patterns (local, global, server)
- [ ] Prerequisites: UI components exist
- [ ] Tools: React hooks, Context API
- [ ] System prompt generates state management coding prompt

### F016: Guide Step - API Integration
**Description:** Step teaching users how to prompt for API routes and data fetching.
**Dependencies:** F006
**Acceptance Criteria:**
- [ ] Instructions on REST/API design patterns
- [ ] Prerequisites: State management in place
- [ ] Tools: Next.js API routes, fetch
- [ ] System prompt generates API-focused coding prompt

### F017: Guide Step - Deployment
**Description:** Final step teaching users how to deploy their application.
**Dependencies:** F006
**Acceptance Criteria:**
- [ ] Instructions on Vercel deployment flow
- [ ] Prerequisites: App functional locally
- [ ] Tools: Vercel, environment variables
- [ ] System prompt generates deployment checklist prompt

### F018: Feedback Widget
**Description:** Add thumbs up/down feedback mechanism on each generated prompt.
**Dependencies:** F007
**Acceptance Criteria:**
- [ ] Thumbs up/down buttons below each generated prompt
- [ ] Visual state change when user provides feedback
- [ ] Feedback stored in localStorage (MVP) for later analysis
- [ ] Optional: Brief "Why?" follow-up on negative feedback

### F019: Loading & Error States
**Description:** Comprehensive loading and error handling across the application.
**Dependencies:** F007, F009
**Acceptance Criteria:**
- [ ] Skeleton loaders for step content during navigation
- [ ] Error boundary for graceful failure handling
- [ ] Retry mechanism for failed prompt generation
- [ ] Friendly error messages with recovery actions

### F020: Mobile Responsiveness Polish
**Description:** Ensure excellent mobile experience across all pages.
**Dependencies:** F003, F005, F006
**Acceptance Criteria:**
- [ ] Landing page fully responsive
- [ ] Sidebar becomes slide-out drawer on mobile
- [ ] Prompt widget scales appropriately
- [ ] Touch-friendly tap targets (min 44px)
- [ ] Tested on iOS Safari and Chrome Android

---

## Phase 3: Database Setup (Post-MVP Enhancement)

### F021: Supabase Project Configuration
**Description:** Set up Supabase project with authentication and initial database configuration.
**Dependencies:** F001
**Acceptance Criteria:**
- [ ] Supabase project created and linked
- [ ] Environment variables configured (`.env.local`)
- [ ] Supabase client libs installed (`@supabase/supabase-js`, `@supabase/ssr`)
- [ ] Server and client Supabase utilities created in `/libs/supabase/`

**Migration Script:**
```sql
-- No tables yet, just project initialization
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### F022: Users Table & Auth
**Description:** Create users table and configure Supabase Auth for user accounts.
**Dependencies:** F021
**Acceptance Criteria:**
- [ ] Users can sign up via email/password or OAuth (Google)
- [ ] User profile data synced to custom `profiles` table
- [ ] Auth callback route configured at `/api/auth/callback`
- [ ] Protected routes redirect unauthenticated users

**Migration Script:**
```sql
-- Create profiles table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read/update their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### F023: Projects Table
**Description:** Create table to store user projects (app ideas) with metadata.
**Dependencies:** F022
**Acceptance Criteria:**
- [ ] Users can create multiple projects
- [ ] Each project stores app idea, name, and timestamps
- [ ] RLS ensures users only access their own projects

**Migration Script:**
```sql
-- Create projects table
CREATE TABLE public.projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  app_idea TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Users can CRUD their own projects
CREATE POLICY "Users can view own projects"
  ON public.projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
  ON public.projects FOR DELETE
  USING (auth.uid() = user_id);

-- Index for faster user project lookups
CREATE INDEX idx_projects_user_id ON public.projects(user_id);
```

### F024: Progress Tracking Table
**Description:** Create table to store user progress through the guide steps.
**Dependencies:** F023
**Acceptance Criteria:**
- [ ] Track which steps user has completed per project
- [ ] Store generated prompts for history/reuse
- [ ] Enable analytics on completion rates

**Migration Script:**
```sql
-- Create step_progress table
CREATE TABLE public.step_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  step_id TEXT NOT NULL,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  generated_prompt TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, step_id)
);

-- Enable RLS
ALTER TABLE public.step_progress ENABLE ROW LEVEL SECURITY;

-- Users can access progress for their own projects
CREATE POLICY "Users can view own progress"
  ON public.step_progress FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = step_progress.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create progress"
  ON public.step_progress FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = step_progress.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own progress"
  ON public.step_progress FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = step_progress.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Index for faster progress lookups
CREATE INDEX idx_step_progress_project_id ON public.step_progress(project_id);
```

### F025: Feedback Table
**Description:** Create table to store user feedback on generated prompts.
**Dependencies:** F024
**Acceptance Criteria:**
- [ ] Store thumbs up/down feedback per prompt
- [ ] Optional text feedback for negative ratings
- [ ] Enable product improvement analytics

**Migration Script:**
```sql
-- Create feedback table
CREATE TABLE public.prompt_feedback (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  step_progress_id UUID REFERENCES public.step_progress(id) ON DELETE CASCADE NOT NULL,
  rating TEXT NOT NULL CHECK (rating IN ('positive', 'negative')),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.prompt_feedback ENABLE ROW LEVEL SECURITY;

-- Users can create feedback for their own progress
CREATE POLICY "Users can create feedback"
  ON public.prompt_feedback FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.step_progress sp
      JOIN public.projects p ON p.id = sp.project_id
      WHERE sp.id = step_progress_id
      AND p.user_id = auth.uid()
    )
  );

-- Users can view their own feedback
CREATE POLICY "Users can view own feedback"
  ON public.prompt_feedback FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.step_progress sp
      JOIN public.projects p ON p.id = sp.project_id
      WHERE sp.id = step_progress_id
      AND p.user_id = auth.uid()
    )
  );
```

---

## Phase 4: Backend Integration

### F026: Claude API Route Implementation
**Description:** Create the `/api/generate-prompt` endpoint that calls Claude API to generate contextual prompts.
**Dependencies:** F007, F002
**Acceptance Criteria:**
- [ ] POST endpoint accepts `{ appIdea, stepId, stepContext }`
- [ ] Constructs system prompt from step configuration
- [ ] Calls Claude API with proper error handling
- [ ] Returns `{ prompt: string }` with generated content
- [ ] Rate limiting to prevent abuse
- [ ] Response time < 2 seconds

### F027: Connect Prompt Widget to API
**Description:** Replace mock prompt generation with actual Claude API calls.
**Dependencies:** F026, F007
**Acceptance Criteria:**
- [ ] "Generate Prompt" button triggers API call
- [ ] Loading state shown during API request
- [ ] Generated prompt displayed on success
- [ ] Error message shown on failure with retry option
- [ ] Works for all guide steps

### F028: Authentication Integration
**Description:** Add sign-in/sign-up flows and protect the guide behind authentication.
**Dependencies:** F022, F003, F005
**Acceptance Criteria:**
- [ ] Sign-in page with email/password and Google OAuth
- [ ] Sign-up flow with email verification
- [ ] Guide pages require authentication
- [ ] User menu in header with sign-out option
- [ ] Redirect to sign-in when accessing protected routes

### F029: Project CRUD Operations
**Description:** Replace localStorage with Supabase for project (app idea) persistence.
**Dependencies:** F023, F028, F004
**Acceptance Criteria:**
- [ ] Create project when user submits app idea
- [ ] List user's projects on dashboard/landing
- [ ] Update project name/app idea
- [ ] Delete project with confirmation
- [ ] Migrate existing localStorage data on first auth

### F030: Progress Sync to Database
**Description:** Replace localStorage progress tracking with Supabase persistence.
**Dependencies:** F024, F029, F010
**Acceptance Criteria:**
- [ ] Step completion saved to database
- [ ] Generated prompts stored for history
- [ ] Progress syncs across devices for same user
- [ ] Dashboard shows project completion percentage

### F031: Feedback Submission to Database
**Description:** Replace localStorage feedback with Supabase persistence.
**Dependencies:** F025, F030, F018
**Acceptance Criteria:**
- [ ] Thumbs up/down saved to database
- [ ] Optional comment on negative feedback stored
- [ ] Feedback analytics available in Supabase dashboard
- [ ] Prevents duplicate feedback submissions

### F032: Analytics Dashboard (Admin)
**Description:** Create admin view to monitor usage and feedback metrics.
**Dependencies:** F030, F031
**Acceptance Criteria:**
- [ ] View total users, projects, completions
- [ ] Funnel visualization: Landing -> Step 1 -> Final Step
- [ ] Feedback sentiment breakdown per step
- [ ] Protected with admin role check

### F033: Deployment & Production Readiness
**Description:** Final deployment configuration and production optimizations.
**Dependencies:** F026, F028, F030
**Acceptance Criteria:**
- [ ] Environment variables configured in Vercel
- [ ] Error tracking with Sentry or similar
- [ ] Vercel Analytics enabled
- [ ] Performance audit passes (Core Web Vitals)
- [ ] SEO metadata configured for all pages
- [ ] Production build tested and deployed

---

## Summary

| Phase | Features | Description |
|-------|----------|-------------|
| **Phase 1** | F001-F010 | Static frontend with mock data, full UI functional |
| **Phase 2** | F011-F020 | Page polish, all step content, mobile UX |
| **Phase 3** | F021-F025 | Supabase tables and migrations |
| **Phase 4** | F026-F033 | API integration, auth, data persistence |

**Total Features:** 33

**MVP Scope (8-hour build):** F001-F010 (Phase 1) provides a fully functional frontend prototype that can be demonstrated and tested without backend dependencies.
