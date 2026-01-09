// TypeScript interfaces for the Step-by-Step Guide System

export interface Tool {
  name: string;
  description?: string;
  icon?: string;
}

export interface Prerequisite {
  id: string;
  text: string;
  link?: string;
}

export interface Step {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  phaseId: string;
  order: number;
  prerequisites: Prerequisite[];
  tools: Tool[];
  instructions: string; // Markdown content
  systemPrompt: string; // Template for AI prompt generation
  estimatedTime?: string;
}

export interface Phase {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  order: number;
  icon?: string;
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  version: string;
  phases: Phase[];
  steps: Step[];
}

// Helper type for navigation
export interface StepNavigation {
  current: Step;
  previous: Step | null;
  next: Step | null;
  phase: Phase;
  totalSteps: number;
  currentIndex: number;
}

// Progress tracking types
export interface StepProgress {
  stepId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  visitedAt?: Date;
  completedAt?: Date;
  generatedPrompt?: string;
}

export interface GuideProgress {
  appIdea: string;
  currentStepId: string;
  steps: Record<string, StepProgress>;
  startedAt: Date;
  lastVisitedAt: Date;
}
