import { Guide, Phase, Step } from "@/types/guide";

// Phase definitions
export const phases: Phase[] = [
  {
    id: "setup",
    title: "Project Setup",
    shortTitle: "Setup",
    description: "Initialize your project with the right foundation",
    order: 1,
    icon: "folder",
  },
  {
    id: "ui",
    title: "User Interface",
    shortTitle: "UI",
    description: "Build the visual structure of your application",
    order: 2,
    icon: "layout",
  },
  {
    id: "logic",
    title: "Application Logic",
    shortTitle: "Logic",
    description: "Add functionality and data management",
    order: 3,
    icon: "code",
  },
  {
    id: "deployment",
    title: "Deployment",
    shortTitle: "Deploy",
    description: "Launch your application to the world",
    order: 4,
    icon: "rocket",
  },
];

// Step definitions
export const steps: Step[] = [
  // Phase 1: Setup
  {
    id: "project-init",
    title: "Project Initialization",
    shortTitle: "Initialize",
    description: "Set up your Next.js project with all the essential tools",
    phaseId: "setup",
    order: 1,
    estimatedTime: "10-15 min",
    prerequisites: [
      {
        id: "prereq-node",
        text: "Node.js 18+ installed on your computer",
        link: "https://nodejs.org/",
      },
      {
        id: "prereq-editor",
        text: "AI coding tool ready (Cursor, Bolt, or Windsurf)",
      },
      {
        id: "prereq-terminal",
        text: "Basic familiarity with terminal/command line",
      },
    ],
    tools: [
      { name: "Next.js", description: "React framework for production" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework" },
      { name: "TypeScript", description: "Type-safe JavaScript" },
    ],
    instructions: `
## Getting Started

In this first step, you'll create a brand new Next.js project with all the modern tools you need to build a professional web application.

### What You'll Set Up

1. **Next.js 15** - The React framework that powers production-grade web apps
2. **Tailwind CSS** - For rapid, beautiful styling
3. **TypeScript** - For catching errors before they happen

### How to Use the Prompt

1. Click "Generate Prompt" below to get your customized prompt
2. Copy the prompt and paste it into your AI coding tool
3. Follow the AI's instructions to create your project
4. Come back here when your project is running locally

### Pro Tips

- Let the AI handle the full setup - don't interrupt it
- If you get errors, paste them back to the AI
- Make sure you can see your app at \`localhost:3000\` before continuing
    `,
    systemPrompt: `You are helping a user build: {{APP_IDEA}}

Generate a comprehensive prompt for initializing a Next.js 15 project with:
- TypeScript configuration
- Tailwind CSS with a clean, minimal design system
- App Router structure
- Basic folder organization (components, lib, types)

The prompt should be written for an AI coding assistant (like Cursor or Bolt) and should result in a working starter project. Include specific file structures and initial configurations.`,
  },
  {
    id: "database-schema",
    title: "Database Schema Design",
    shortTitle: "Database",
    description: "Design the data structure for your application",
    phaseId: "setup",
    order: 2,
    estimatedTime: "15-20 min",
    prerequisites: [
      {
        id: "prereq-project",
        text: "Project initialized from Step 1",
      },
      {
        id: "prereq-supabase",
        text: "Supabase account created (free tier is fine)",
        link: "https://supabase.com/",
      },
    ],
    tools: [
      { name: "Supabase", description: "Open-source Firebase alternative" },
      { name: "PostgreSQL", description: "Powerful relational database" },
    ],
    instructions: `
## Designing Your Data

Every app needs to store data. In this step, you'll define what data your app needs and how it's organized.

### What is a Schema?

Think of a database schema like a spreadsheet structure:
- **Tables** are like individual sheets
- **Columns** define what information each row contains
- **Relationships** connect data across tables

### How to Think About Your Data

Ask yourself:
- What are the main "things" in my app? (users, posts, products, etc.)
- What information does each thing need? (name, email, price, etc.)
- How do these things relate to each other?

### Using the Prompt

The generated prompt will help your AI understand your app's data needs and create the appropriate database tables in Supabase.
    `,
    systemPrompt: `You are helping a user build: {{APP_IDEA}}

Generate a prompt for designing a Supabase PostgreSQL database schema. The prompt should ask the AI to:
1. Identify the main entities/tables needed for this app
2. Define columns with appropriate data types
3. Set up relationships between tables
4. Include Row Level Security (RLS) policies
5. Create any necessary indexes

Format the prompt so it can be directly used with an AI coding assistant.`,
  },
  // Phase 2: UI
  {
    id: "component-structure",
    title: "Component Architecture",
    shortTitle: "Components",
    description: "Plan and create your UI component hierarchy",
    phaseId: "ui",
    order: 3,
    estimatedTime: "20-30 min",
    prerequisites: [
      {
        id: "prereq-schema",
        text: "Database schema designed from Step 2",
      },
    ],
    tools: [
      { name: "React", description: "UI component library" },
      { name: "Tailwind CSS", description: "Utility-first styling" },
      { name: "DaisyUI", description: "Component library (optional)" },
    ],
    instructions: `
## Building Your UI Foundation

Components are the building blocks of your user interface. In this step, you'll create a component structure that's organized, reusable, and scalable.

### Component Hierarchy

Good apps organize components in layers:
- **Layout Components** - Header, Footer, Sidebar, Page wrappers
- **Feature Components** - Login form, Product card, Dashboard
- **UI Components** - Buttons, Inputs, Cards, Modals

### Thinking in Components

Look at your app idea and identify:
1. What are the main pages/screens?
2. What elements repeat across pages?
3. What interactive elements do you need?

### The Prompt

Your generated prompt will guide the AI to create a clean component structure with proper file organization and basic styling.
    `,
    systemPrompt: `You are helping a user build: {{APP_IDEA}}

Generate a prompt for creating the React component architecture. The prompt should ask the AI to:
1. Create a component folder structure following best practices
2. Build layout components (Header, Footer, Layout wrapper)
3. Create placeholder feature components for main functionality
4. Set up basic Tailwind styling with consistent design tokens
5. Ensure components are properly typed with TypeScript

The components should be server components by default, with "use client" only where needed.`,
  },
  {
    id: "page-layouts",
    title: "Page Layouts & Routing",
    shortTitle: "Pages",
    description: "Set up your application pages and navigation",
    phaseId: "ui",
    order: 4,
    estimatedTime: "15-20 min",
    prerequisites: [
      {
        id: "prereq-components",
        text: "Basic components created from Step 3",
      },
    ],
    tools: [
      { name: "Next.js App Router", description: "File-based routing" },
      { name: "React", description: "UI components" },
    ],
    instructions: `
## Creating Your Pages

Next.js uses a file-based routing system. Each file in the \`app\` folder becomes a route in your application.

### Understanding App Router

- \`app/page.tsx\` → \`/\` (homepage)
- \`app/about/page.tsx\` → \`/about\`
- \`app/products/[id]/page.tsx\` → \`/products/123\` (dynamic)

### Layout System

Layouts wrap pages and persist across navigation:
- \`layout.tsx\` wraps all pages in its folder
- Great for headers, sidebars, and footers
- Nested layouts for different sections

### Your Pages

Think about what pages your app needs:
- Landing/Home page
- Dashboard or main app page
- Detail pages (product, profile, etc.)
- Authentication pages (if needed)
    `,
    systemPrompt: `You are helping a user build: {{APP_IDEA}}

Generate a prompt for setting up Next.js App Router pages and layouts. The prompt should ask the AI to:
1. Create the main pages needed for this application
2. Set up layouts with consistent navigation
3. Implement dynamic routes where appropriate
4. Add loading and error states
5. Ensure proper metadata for SEO

Use Next.js 15 conventions with async params handling.`,
  },
  {
    id: "responsive-design",
    title: "Responsive Design & Styling",
    shortTitle: "Styling",
    description: "Make your app look great on all devices",
    phaseId: "ui",
    order: 5,
    estimatedTime: "20-25 min",
    prerequisites: [
      {
        id: "prereq-pages",
        text: "Pages and layouts created from Step 4",
      },
    ],
    tools: [
      { name: "Tailwind CSS", description: "Responsive utilities" },
      { name: "CSS", description: "Custom styling" },
    ],
    instructions: `
## Making It Beautiful

A great app works on phones, tablets, and desktops. Tailwind makes responsive design straightforward.

### Responsive Breakpoints

Tailwind uses mobile-first breakpoints:
- Default styles apply to mobile
- \`sm:\` - 640px and up (large phones)
- \`md:\` - 768px and up (tablets)
- \`lg:\` - 1024px and up (laptops)
- \`xl:\` - 1280px and up (desktops)

### Example

\`\`\`jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>
\`\`\`

### Design Checklist

- [ ] Text is readable on all screen sizes
- [ ] Buttons are tap-friendly on mobile (min 44px)
- [ ] Navigation adapts (hamburger menu on mobile)
- [ ] Images scale appropriately
- [ ] Forms are usable on touch devices
    `,
    systemPrompt: `You are helping a user build: {{APP_IDEA}}

Generate a prompt for implementing responsive design and polished styling. The prompt should ask the AI to:
1. Review all components and add responsive Tailwind classes
2. Create a mobile-friendly navigation (hamburger menu)
3. Ensure proper spacing and typography across breakpoints
4. Add hover and focus states for interactive elements
5. Implement a consistent color scheme and design language

Focus on mobile-first design principles.`,
  },
  // Phase 3: Logic
  {
    id: "state-management",
    title: "State Management",
    shortTitle: "State",
    description: "Manage data flow and application state",
    phaseId: "logic",
    order: 6,
    estimatedTime: "20-30 min",
    prerequisites: [
      {
        id: "prereq-ui",
        text: "UI components and pages completed",
      },
    ],
    tools: [
      { name: "React Hooks", description: "useState, useEffect, useContext" },
      { name: "React Context", description: "Global state management" },
    ],
    instructions: `
## Managing Application State

State is the data that changes over time in your app - form inputs, user sessions, loaded data, UI toggles.

### Types of State

1. **Local State** - Single component (form inputs, toggles)
   - Use \`useState\`

2. **Shared State** - Multiple components need access
   - Use React Context or lift state up

3. **Server State** - Data from your database
   - Fetch in Server Components or use \`useEffect\`

### When to Use What

| Scenario | Solution |
|----------|----------|
| Form input | \`useState\` |
| Modal open/close | \`useState\` |
| User session | Context |
| Theme preference | Context |
| Database data | Server Component fetch |

### Keep It Simple

Don't over-engineer state. Start with \`useState\` and only add complexity when you actually need it.
    `,
    systemPrompt: `You are helping a user build: {{APP_IDEA}}

Generate a prompt for implementing state management. The prompt should ask the AI to:
1. Identify what state the application needs
2. Create appropriate React hooks for local state
3. Set up Context providers for shared state (if needed)
4. Implement proper state initialization and updates
5. Handle loading and error states

Use React 19 patterns and keep the solution as simple as possible.`,
  },
  {
    id: "api-integration",
    title: "API Routes & Data Fetching",
    shortTitle: "API",
    description: "Connect your frontend to the database",
    phaseId: "logic",
    order: 7,
    estimatedTime: "25-35 min",
    prerequisites: [
      {
        id: "prereq-state",
        text: "State management set up from Step 6",
      },
      {
        id: "prereq-db",
        text: "Database schema from Step 2",
      },
    ],
    tools: [
      { name: "Next.js API Routes", description: "Backend endpoints" },
      { name: "Supabase Client", description: "Database queries" },
      { name: "Server Actions", description: "Form handling" },
    ],
    instructions: `
## Connecting to Your Data

Now it's time to make your app actually do things - read and write data to your database.

### Two Approaches

**1. Server Components (Recommended for reads)**
\`\`\`tsx
// app/products/page.tsx
export default async function ProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from('products').select();
  return <ProductList products={products} />;
}
\`\`\`

**2. API Routes (For complex operations)**
\`\`\`tsx
// app/api/products/route.ts
export async function POST(request: Request) {
  const body = await request.json();
  // Create product logic
}
\`\`\`

### Server Actions

For forms, use Server Actions - they're simpler than API routes:
\`\`\`tsx
async function createProduct(formData: FormData) {
  'use server';
  // Direct database operation
}
\`\`\`
    `,
    systemPrompt: `You are helping a user build: {{APP_IDEA}}

Generate a prompt for implementing API routes and data fetching. The prompt should ask the AI to:
1. Set up Supabase client utilities (server and client)
2. Create Server Components that fetch data
3. Implement API routes for mutations (create, update, delete)
4. Add Server Actions for form submissions
5. Handle errors and loading states properly

Follow Next.js 15 patterns with async Supabase client.`,
  },
  {
    id: "authentication",
    title: "User Authentication",
    shortTitle: "Auth",
    description: "Add user sign-up, login, and sessions",
    phaseId: "logic",
    order: 8,
    estimatedTime: "20-30 min",
    prerequisites: [
      {
        id: "prereq-api",
        text: "API integration working from Step 7",
      },
      {
        id: "prereq-supabase",
        text: "Supabase project configured",
      },
    ],
    tools: [
      { name: "Supabase Auth", description: "Authentication service" },
      { name: "Next.js Middleware", description: "Route protection" },
    ],
    instructions: `
## Adding User Accounts

Authentication lets users create accounts, log in, and have personalized experiences.

### Supabase Auth Features

- Email/Password signup
- OAuth providers (Google, GitHub, etc.)
- Magic link (passwordless)
- Session management

### Implementation Steps

1. **Auth UI** - Login and signup forms
2. **Auth Callback** - Handle OAuth redirects
3. **Middleware** - Protect routes that require login
4. **Session Check** - Get current user in components

### Protected Routes

Use Next.js middleware to redirect unauthenticated users:
\`\`\`tsx
// middleware.ts
if (!session && protectedRoutes.includes(pathname)) {
  return redirect('/login');
}
\`\`\`

### User-Specific Data

Once auth works, you can filter data by user:
\`\`\`sql
-- Row Level Security
CREATE POLICY "Users see own data"
ON todos FOR SELECT
USING (auth.uid() = user_id);
\`\`\`
    `,
    systemPrompt: `You are helping a user build: {{APP_IDEA}}

Generate a prompt for implementing user authentication. The prompt should ask the AI to:
1. Create login and signup pages with Supabase Auth
2. Set up OAuth callback route
3. Implement middleware for protected routes
4. Add session management utilities
5. Update RLS policies for user-specific data access

Use Supabase SSR patterns for Next.js 15.`,
  },
  // Phase 4: Deployment
  {
    id: "testing-polish",
    title: "Testing & Polish",
    shortTitle: "Testing",
    description: "Test your app and fix any issues",
    phaseId: "deployment",
    order: 9,
    estimatedTime: "30-45 min",
    prerequisites: [
      {
        id: "prereq-auth",
        text: "Authentication working from Step 8",
      },
      {
        id: "prereq-features",
        text: "Core features implemented",
      },
    ],
    tools: [
      { name: "Browser DevTools", description: "Testing and debugging" },
      { name: "Lighthouse", description: "Performance auditing" },
    ],
    instructions: `
## Final Quality Check

Before deploying, let's make sure everything works properly.

### Testing Checklist

**Functionality**
- [ ] All pages load without errors
- [ ] Forms submit correctly
- [ ] Data saves and loads properly
- [ ] Authentication flow works end-to-end

**Responsive Design**
- [ ] Looks good on mobile (test with DevTools)
- [ ] Looks good on tablet
- [ ] Looks good on desktop
- [ ] No horizontal scroll issues

**Performance**
- [ ] Pages load quickly
- [ ] Images are optimized
- [ ] No console errors
- [ ] Run Lighthouse audit

### Common Issues to Check

1. **Console errors** - Open DevTools and check for red errors
2. **TypeScript errors** - Run \`npm run build\` locally
3. **Missing env vars** - All required variables set
4. **Broken links** - Click through all navigation
    `,
    systemPrompt: `You are helping a user build: {{APP_IDEA}}

Generate a prompt for testing and polishing the application. The prompt should ask the AI to:
1. Review all pages for console errors and fix them
2. Run TypeScript build and fix any type errors
3. Check responsive design and fix layout issues
4. Optimize images and assets
5. Add proper error boundaries and fallbacks
6. Ensure all environment variables are documented

Focus on production readiness.`,
  },
  {
    id: "deploy-vercel",
    title: "Deploy to Vercel",
    shortTitle: "Deploy",
    description: "Launch your application to the world",
    phaseId: "deployment",
    order: 10,
    estimatedTime: "15-20 min",
    prerequisites: [
      {
        id: "prereq-testing",
        text: "Testing completed from Step 9",
      },
      {
        id: "prereq-github",
        text: "Code pushed to GitHub repository",
      },
      {
        id: "prereq-vercel",
        text: "Vercel account created",
        link: "https://vercel.com/",
      },
    ],
    tools: [
      { name: "Vercel", description: "Deployment platform" },
      { name: "GitHub", description: "Code repository" },
    ],
    instructions: `
## Going Live!

This is it - time to share your creation with the world.

### Deployment Steps

1. **Push to GitHub**
   - Create a new repository
   - Push your code

2. **Connect to Vercel**
   - Go to vercel.com/new
   - Import your GitHub repo
   - Vercel auto-detects Next.js

3. **Configure Environment Variables**
   - Add all your \`.env.local\` variables
   - Supabase URL and keys
   - Any API keys

4. **Deploy**
   - Click Deploy
   - Wait 1-2 minutes
   - Your app is live!

### Post-Deploy Checklist

- [ ] Visit your live URL
- [ ] Test authentication on production
- [ ] Verify database connections work
- [ ] Check all features function correctly
- [ ] Set up a custom domain (optional)

### Congratulations!

You've built and deployed a full-stack web application. Share your URL and celebrate!
    `,
    systemPrompt: `You are helping a user build: {{APP_IDEA}}

Generate a deployment checklist prompt. The prompt should ask the AI to:
1. Ensure the project builds without errors locally
2. Create a comprehensive list of required environment variables
3. Document any Supabase configuration needed for production
4. Provide Vercel deployment steps
5. Include post-deployment verification steps

Focus on a smooth deployment experience.`,
  },
];

// Complete guide object
export const guide: Guide = {
  id: "vibe-code-guide-v1",
  title: "Vibe Code Guide",
  description:
    "Your step-by-step companion to building full-stack web applications with AI",
  version: "1.0.0",
  phases,
  steps,
};

// Helper functions
export function getPhaseById(phaseId: string): Phase | undefined {
  return phases.find((p) => p.id === phaseId);
}

export function getStepById(stepId: string): Step | undefined {
  return steps.find((s) => s.id === stepId);
}

export function getStepsByPhase(phaseId: string): Step[] {
  return steps.filter((s) => s.phaseId === phaseId).sort((a, b) => a.order - b.order);
}

export function getStepNavigation(stepId: string): {
  current: Step;
  previous: Step | null;
  next: Step | null;
  phase: Phase;
  totalSteps: number;
  currentIndex: number;
} | null {
  const sortedSteps = [...steps].sort((a, b) => a.order - b.order);
  const currentIndex = sortedSteps.findIndex((s) => s.id === stepId);

  if (currentIndex === -1) return null;

  const current = sortedSteps[currentIndex];
  const phase = phases.find((p) => p.id === current.phaseId);

  if (!phase) return null;

  return {
    current,
    previous: currentIndex > 0 ? sortedSteps[currentIndex - 1] : null,
    next: currentIndex < sortedSteps.length - 1 ? sortedSteps[currentIndex + 1] : null,
    phase,
    totalSteps: sortedSteps.length,
    currentIndex: currentIndex + 1, // 1-based for display
  };
}

export function getFirstStep(): Step {
  return steps.sort((a, b) => a.order - b.order)[0];
}

export function getLastStep(): Step {
  const sortedSteps = steps.sort((a, b) => a.order - b.order);
  return sortedSteps[sortedSteps.length - 1];
}
