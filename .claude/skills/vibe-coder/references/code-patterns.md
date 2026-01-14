# Code Patterns

**CRITICAL: Always follow these patterns when writing code.**

## File Structure

```
app/
├── (auth)/              # Auth pages
├── api/                 # API routes
├── page.tsx             # Landing
└── layout.tsx           # Root layout

components/
├── ui/                  # Reusable UI
└── [feature]/           # Feature components

libs/
├── supabase/
│   ├── client.ts        # Browser client
│   └── server.ts        # Server client
└── utils/

.vibe/
├── context.md           # Business context
├── docs/
│   ├── prd.md
│   └── roadmap.md
└── progress.json
```

## API Routes

```typescript
// app/api/[resource]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name required"),
});

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate
    const body = await req.json();
    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors.map(e => e.message).join(", ") },
        { status: 400 }
      );
    }

    // Execute
    const { data, error } = await supabase
      .from("table")
      .insert(result.data)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (e) {
    console.error("API error:", e);
    return NextResponse.json(
      { error: "Unexpected error", retryable: true },
      { status: 500 }
    );
  }
}
```

## React Components

```typescript
"use client";

import React, { useState, useEffect } from "react";

interface Props {
  title: string;
  onAction: () => void;
  variant?: "primary" | "secondary";
}

// Define OUTSIDE parent components
export default function MyComponent({ title, onAction, variant = "primary" }: Props) {
  const [state, setState] = useState("");

  useEffect(() => {
    // Sync props to state
  }, [/* deps */]);

  return (
    <div className="bg-base-100 rounded-lg p-4">
      {/* DaisyUI classes */}
    </div>
  );
}
```

## DaisyUI Design System

**Colors:**
```
bg-base-100          # Primary bg
bg-base-200          # Secondary bg
bg-base-300          # Tertiary
text-base-content    # Primary text
text-base-content/60 # Secondary text
border-base-300/50   # Borders
bg-primary           # Primary action
bg-primary/10        # Primary subtle
```

**Patterns:**
```tsx
// Card
<div className="bg-base-200 rounded-2xl border border-base-300/50 p-6">

// Header
<header className="bg-base-100/80 backdrop-blur-md border-b border-base-300/50 sticky top-0 z-40">

// Button
<button className="btn btn-primary">

// Input
<input className="input input-bordered w-full">

// Hover
className="transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
```

## Supabase

**Browser:**
```typescript
import { createClient } from "@/libs/supabase/client";
const supabase = createClient();
```

**Server:**
```typescript
import { createClient } from "@/libs/supabase/server";
const supabase = await createClient();
```

**Query:**
```typescript
const { data, error } = await supabase
  .from("table")
  .select(`*, related (*)`)
  .eq("user_id", user.id)
  .order("updated_at", { ascending: false });
```

## Critical Rules

1. **Use `uuid` library, NOT `crypto.randomUUID()`**
```typescript
import { v4 as uuidv4 } from 'uuid';
const id = uuidv4();
```

2. **Validate external data with Zod**
```typescript
const stored = localStorage.getItem(KEY);
if (stored) {
  const result = schema.safeParse(JSON.parse(stored));
  if (result.success) setData(result.data);
}
```

3. **Include `retryable: true` in 500 responses**

4. **Spread existing first when updating**
```typescript
const updated = { ...existing, newValue };
```

5. **Define components outside parents**

6. **Use `useEffect` to sync props to state**

7. **Add `WITH CHECK` to Supabase UPDATE policies**

8. **Keyboard handlers for clickable divs**
```typescript
<div
  role="button"
  tabIndex={0}
  onClick={handler}
  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handler()}
>
```
