"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Step } from "@/types/guide";
import { useGuideContext } from "./GuideLayoutClient";
import toast from "react-hot-toast";

interface PromptWidgetProps {
  step: Step;
}

export default function PromptWidget({ step }: PromptWidgetProps) {
  const { appIdea, hasAppIdea, saveGeneratedPrompt, getStepProgress } =
    useGuideContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(() => {
    // Check if we have a previously generated prompt
    return getStepProgress(step.id).generatedPrompt || null;
  });
  const [copied, setCopied] = useState(false);

  const generatePrompt = useCallback(async () => {
    if (!hasAppIdea) return;

    setIsGenerating(true);

    // Simulate API delay (MVP mock generation)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Replace the {{APP_IDEA}} placeholder with the actual app idea
    const systemPromptWithIdea = step.systemPrompt.replace(
      /\{\{APP_IDEA\}\}/g,
      appIdea
    );

    // Generate a mock prompt based on the system prompt
    const mockPrompt = generateMockPrompt(step, appIdea, systemPromptWithIdea);

    setGeneratedPrompt(mockPrompt);
    saveGeneratedPrompt(step.id, mockPrompt);
    setIsGenerating(false);
  }, [appIdea, hasAppIdea, step, saveGeneratedPrompt]);

  const copyToClipboard = useCallback(async () => {
    if (!generatedPrompt) return;

    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      toast.success("Prompt copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy prompt");
    }
  }, [generatedPrompt]);

  return (
    <div className="gradient-border">
      <div className="bg-base-200 rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-base-content">
                Generate Your Prompt
              </h3>
              <p className="text-sm text-base-content/60">
                Click to create a customized prompt for this step
              </p>
            </div>
          </div>
        </div>

        {/* App Idea Display */}
        {hasAppIdea ? (
          <div className="mb-4 p-3 rounded-lg bg-base-300/30 border border-base-300/50">
            <p className="text-xs text-base-content/50 mb-1">Your app idea:</p>
            <p className="text-sm text-base-content/80 line-clamp-2">{appIdea}</p>
          </div>
        ) : (
          <div className="mb-4 p-4 rounded-lg bg-warning/10 border border-warning/20">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-warning flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-warning">
                  No app idea found
                </p>
                <p className="text-xs text-base-content/60 mt-1">
                  Go back to the{" "}
                  <Link href="/" className="text-primary hover:underline">
                    home page
                  </Link>{" "}
                  to enter your app idea first.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Generate Button */}
        {!generatedPrompt && (
          <button
            onClick={generatePrompt}
            disabled={!hasAppIdea || isGenerating}
            className="w-full btn btn-primary btn-lg gap-2"
          >
            {isGenerating ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Generating...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Generate Prompt
              </>
            )}
          </button>
        )}

        {/* Generated Prompt Output */}
        {generatedPrompt && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-success flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Prompt Generated
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={generatePrompt}
                  disabled={isGenerating}
                  className="btn btn-ghost btn-sm gap-1"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Regenerate
                </button>
                <button
                  onClick={copyToClipboard}
                  className={`btn btn-sm gap-1 ${
                    copied ? "btn-success" : "btn-primary"
                  }`}
                >
                  {copied ? (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Prompt Content */}
            <div className="code-block p-4 max-h-[400px] overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-base-content/90 font-mono leading-relaxed">
                {generatedPrompt}
              </pre>
            </div>

            {/* Usage Tip */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-info/10 border border-info/20">
              <svg
                className="w-5 h-5 text-info flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="text-sm text-base-content/80">
                  <strong>How to use:</strong> Copy this prompt and paste it into your
                  AI coding tool (Cursor, Bolt, or Windsurf). Follow the AI&apos;s
                  instructions to complete this step.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to generate mock prompts based on step content
function generateMockPrompt(
  step: Step,
  appIdea: string,
  systemPrompt: string
): string {
  const prompts: Record<string, (appIdea: string) => string> = {
    "project-init": (idea) => `I want to build: ${idea}

Please help me set up a new Next.js 15 project with the following specifications:

## Project Setup Requirements:
1. Create a new Next.js 15 project using the App Router
2. Configure TypeScript with strict mode
3. Set up Tailwind CSS with a clean, minimal design system
4. Create the following folder structure:
   - /app (for pages and routes)
   - /components (for reusable UI components)
   - /lib (for utilities and helpers)
   - /types (for TypeScript interfaces)

## Initial Configuration:
- Configure a base color scheme using Tailwind (primary: indigo, neutral: slate)
- Set up Inter as the default font
- Create a basic layout.tsx with metadata
- Add a simple landing page placeholder

## Expected Output:
Please provide the terminal commands to run and the initial file contents for:
- package.json dependencies
- tailwind.config.ts
- app/layout.tsx
- app/page.tsx
- app/globals.css

Start with the terminal commands, then show me each file.`,

    "database-schema": (idea) => `I'm building: ${idea}

Please help me design a database schema for this application using Supabase (PostgreSQL).

## Requirements:
1. Analyze the app idea and identify the main entities/data types needed
2. For each entity, define:
   - Table name
   - Column names with appropriate data types
   - Primary keys and foreign keys
   - Relationships between tables

## Please provide:
1. An entity-relationship summary (what tables and how they connect)
2. SQL migration scripts to create each table
3. Row Level Security (RLS) policies for each table
4. Any necessary indexes for performance

## Format:
- Start with a brief explanation of the data model
- Then provide the complete SQL migration code
- Include comments explaining each table's purpose

Focus on keeping the schema simple but complete for an MVP.`,

    "component-structure": (idea) => `I'm building: ${idea}

Please help me create the React component architecture for this application.

## Requirements:
1. Analyze the app and identify all necessary UI components
2. Organize components into categories:
   - Layout components (Header, Footer, Sidebar, etc.)
   - Feature components (specific to app functionality)
   - UI components (reusable buttons, inputs, cards, etc.)

## For each component, provide:
- The file path and name
- The complete TypeScript/React code
- Proper typing with TypeScript interfaces
- Tailwind CSS styling

## Component Guidelines:
- Use Server Components by default
- Only add "use client" where interactivity is needed
- Follow atomic design principles
- Make components composable and reusable

Start with the folder structure overview, then create each component file.`,

    "page-layouts": (idea) => `I'm building: ${idea}

Please help me set up the page layouts and routing using Next.js App Router.

## Requirements:
1. Identify all pages needed for this application
2. Set up the file-based routing structure
3. Create layouts that wrap related pages
4. Implement proper navigation between pages

## For each page, provide:
- The file path (e.g., app/dashboard/page.tsx)
- The complete page component code
- Loading states (loading.tsx) where appropriate
- Error boundaries (error.tsx) where needed

## Layout Requirements:
- Create a root layout with global navigation
- Add nested layouts for grouped pages
- Implement a consistent header/footer structure
- Handle metadata for SEO

Please show the complete folder structure first, then provide the code for each file.`,

    "responsive-design": (idea) => `I'm building: ${idea}

Please help me implement responsive design and polish the styling across all components.

## Requirements:
1. Review all existing components for responsive issues
2. Add proper Tailwind responsive classes
3. Implement a mobile-first approach
4. Ensure consistent spacing and typography

## Specific Tasks:
1. Create a mobile navigation (hamburger menu)
2. Make all grids responsive (1 col mobile, 2+ cols desktop)
3. Ensure touch-friendly tap targets (min 44px)
4. Add hover and focus states to interactive elements
5. Implement proper text scaling

## For each file that needs changes:
- Show the file path
- Show the before/after changes
- Explain what responsive improvements were made

Test breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)`,

    "state-management": (idea) => `I'm building: ${idea}

Please help me implement proper state management for this application.

## Requirements:
1. Identify all state needs in the application:
   - Local state (single component)
   - Shared state (multiple components)
   - Server state (data from database)

## Implementation Tasks:
1. Create custom hooks for reusable state logic
2. Set up React Context for global state (if needed)
3. Implement proper loading and error states
4. Handle form state management

## For each state implementation:
- Explain what state is being managed and why
- Provide the complete hook or context code
- Show how to use it in components

## Guidelines:
- Start simple with useState
- Only add Context when truly needed
- Use server components for data fetching where possible
- Type all state with TypeScript`,

    "api-integration": (idea) => `I'm building: ${idea}

Please help me connect the frontend to the database and implement API routes.

## Requirements:
1. Set up Supabase client utilities
2. Implement data fetching in Server Components
3. Create API routes for mutations (create, update, delete)
4. Add Server Actions for form submissions

## Implementation Tasks:

### 1. Supabase Setup
- Create lib/supabase/client.ts for browser-side
- Create lib/supabase/server.ts for server-side
- Configure environment variables

### 2. Data Fetching
- Update Server Components to fetch real data
- Implement proper error handling
- Add loading states

### 3. Mutations
- Create API routes for each write operation
- Implement Server Actions for forms
- Add validation and error handling

## For each implementation:
- Show the file path
- Provide complete, typed code
- Include error handling
- Show usage examples`,

    "authentication": (idea) => `I'm building: ${idea}

Please help me implement user authentication using Supabase Auth.

## Requirements:
1. Set up email/password authentication
2. Add Google OAuth (optional but recommended)
3. Create protected routes
4. Implement session management

## Implementation Tasks:

### 1. Auth UI
- Create a sign-in page (app/signin/page.tsx)
- Create a sign-up page (app/signup/page.tsx)
- Add form validation

### 2. Auth Callback
- Set up the OAuth callback route (app/auth/callback/route.ts)
- Handle token exchange

### 3. Middleware
- Create middleware.ts to protect routes
- Define which routes require auth

### 4. User Session
- Create utilities to get current user
- Add user info to layouts where needed

## For each file:
- Provide the complete implementation
- Follow Supabase SSR patterns for Next.js 15
- Include proper error handling
- Show how to update RLS policies for user-specific data`,

    "testing-polish": (idea) => `I'm building: ${idea}

Please help me test and polish the application before deployment.

## Testing Checklist:
1. Review all pages for console errors
2. Run TypeScript build and fix type errors
3. Check responsive design on all breakpoints
4. Verify all forms and interactions work

## Tasks:

### 1. Error Review
- Check browser console on each page
- Fix any runtime errors
- Add error boundaries where missing

### 2. TypeScript Check
- Run \`npm run build\` and fix errors
- Ensure all components are properly typed
- Fix any "any" types

### 3. Performance
- Optimize images (use next/image)
- Check bundle size
- Implement lazy loading where appropriate

### 4. Accessibility
- Add proper ARIA labels
- Ensure keyboard navigation works
- Check color contrast

## For each issue found:
- Describe the problem
- Show the fix
- Explain why it matters`,

    "deploy-vercel": (idea) => `I'm building: ${idea}

Please help me deploy this application to Vercel.

## Pre-Deployment Checklist:
1. Verify the build succeeds locally
2. Document all required environment variables
3. Ensure database is production-ready
4. Test all features one final time

## Environment Variables Needed:
Based on this app, list all required env vars:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY (if using admin features)
- [Add any app-specific variables]

## Deployment Steps:
1. Push code to GitHub
2. Connect repo to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy and verify

## Post-Deployment Verification:
- Test authentication flow
- Verify database connections
- Check all pages load correctly
- Test forms and interactions

## Please provide:
1. A deployment checklist I can follow
2. The exact env vars I need to configure
3. Any Supabase production settings to update
4. A list of URLs to test after deployment`,
  };

  const generator = prompts[step.id];
  if (generator) {
    return generator(appIdea);
  }

  // Default fallback prompt
  return `I'm building: ${appIdea}

Please help me with the "${step.title}" step of development.

## Context:
${step.description}

## What I need:
${step.instructions
    .split("\n")
    .filter((line) => line.trim().startsWith("-"))
    .map((line) => line.trim())
    .join("\n")}

## Tools I'm using:
${step.tools.map((t) => `- ${t.name}`).join("\n")}

Please provide step-by-step guidance and any necessary code to complete this step.`;
}
