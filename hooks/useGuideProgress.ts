"use client";

import { useState, useEffect, useCallback } from "react";
import { StepProgress, GuideProgress } from "@/types/guide";
import { getFirstStep } from "@/data/guide";

const STORAGE_KEY = "vibe-code-guide-progress";

interface UseGuideProgressReturn {
  progress: GuideProgress | null;
  isLoaded: boolean;
  currentStepId: string;
  getStepProgress: (stepId: string) => StepProgress;
  markStepVisited: (stepId: string) => void;
  markStepCompleted: (stepId: string) => void;
  setCurrentStep: (stepId: string) => void;
  saveGeneratedPrompt: (stepId: string, prompt: string) => void;
  resetProgress: () => void;
  completedStepsCount: number;
  visitedSteps: string[];
}

const defaultStepProgress: StepProgress = {
  stepId: "",
  status: "not_started",
};

/**
 * Custom hook for managing guide progress with localStorage persistence.
 */
export function useGuideProgress(): UseGuideProgressReturn {
  const [progress, setProgress] = useState<GuideProgress | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as GuideProgress;
        // Convert date strings back to Date objects
        parsed.startedAt = new Date(parsed.startedAt);
        parsed.lastVisitedAt = new Date(parsed.lastVisitedAt);
        setProgress(parsed);
      }
    } catch (error) {
      console.error("Failed to load guide progress from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever progress changes
  useEffect(() => {
    if (progress && isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      } catch (error) {
        console.error("Failed to save guide progress to localStorage:", error);
      }
    }
  }, [progress, isLoaded]);

  // Initialize progress if it doesn't exist
  const initializeProgress = useCallback((appIdea: string) => {
    const firstStep = getFirstStep();
    const newProgress: GuideProgress = {
      appIdea,
      currentStepId: firstStep.id,
      steps: {},
      startedAt: new Date(),
      lastVisitedAt: new Date(),
    };
    setProgress(newProgress);
    return newProgress;
  }, []);

  // Get progress for a specific step
  const getStepProgress = useCallback(
    (stepId: string): StepProgress => {
      if (!progress || !progress.steps[stepId]) {
        return { ...defaultStepProgress, stepId };
      }
      return progress.steps[stepId];
    },
    [progress]
  );

  // Mark a step as visited
  const markStepVisited = useCallback((stepId: string) => {
    setProgress((prev) => {
      if (!prev) return prev;

      const existingProgress = prev.steps[stepId];
      if (existingProgress?.status === "completed") {
        // Don't downgrade completed steps
        return {
          ...prev,
          lastVisitedAt: new Date(),
        };
      }

      return {
        ...prev,
        currentStepId: stepId,
        lastVisitedAt: new Date(),
        steps: {
          ...prev.steps,
          [stepId]: {
            stepId,
            status: "in_progress",
            visitedAt: existingProgress?.visitedAt || new Date(),
          },
        },
      };
    });
  }, []);

  // Mark a step as completed
  const markStepCompleted = useCallback((stepId: string) => {
    setProgress((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        lastVisitedAt: new Date(),
        steps: {
          ...prev.steps,
          [stepId]: {
            ...prev.steps[stepId],
            stepId,
            status: "completed",
            completedAt: new Date(),
          },
        },
      };
    });
  }, []);

  // Set current step
  const setCurrentStep = useCallback((stepId: string) => {
    setProgress((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        currentStepId: stepId,
        lastVisitedAt: new Date(),
      };
    });
  }, []);

  // Save a generated prompt for a step
  const saveGeneratedPrompt = useCallback((stepId: string, prompt: string) => {
    setProgress((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        steps: {
          ...prev.steps,
          [stepId]: {
            ...prev.steps[stepId],
            stepId,
            status: prev.steps[stepId]?.status || "in_progress",
            generatedPrompt: prompt,
          },
        },
      };
    });
  }, []);

  // Reset all progress
  const resetProgress = useCallback(() => {
    setProgress(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear guide progress from localStorage:", error);
    }
  }, []);

  // Calculate completed steps count
  const completedStepsCount = progress
    ? Object.values(progress.steps).filter((s) => s.status === "completed").length
    : 0;

  // Get list of visited step IDs
  const visitedSteps = progress
    ? Object.keys(progress.steps).filter(
        (id) =>
          progress.steps[id].status === "in_progress" ||
          progress.steps[id].status === "completed"
      )
    : [];

  return {
    progress,
    isLoaded,
    currentStepId: progress?.currentStepId || getFirstStep().id,
    getStepProgress,
    markStepVisited,
    markStepCompleted,
    setCurrentStep,
    saveGeneratedPrompt,
    resetProgress,
    completedStepsCount,
    visitedSteps,
  };
}

export default useGuideProgress;
