"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "vibe-code-app-idea";

interface UseAppIdeaReturn {
  appIdea: string;
  setAppIdea: (idea: string) => void;
  clearAppIdea: () => void;
  isLoaded: boolean;
  hasAppIdea: boolean;
}

/**
 * Custom hook for managing the app idea with localStorage persistence.
 * Handles SSR correctly by only accessing localStorage after hydration.
 */
export function useAppIdea(): UseAppIdeaReturn {
  const [appIdea, setAppIdeaState] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setAppIdeaState(stored);
      }
    } catch (error) {
      console.error("Failed to load app idea from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever the value changes
  const setAppIdea = useCallback((idea: string) => {
    setAppIdeaState(idea);
    try {
      if (idea.trim()) {
        localStorage.setItem(STORAGE_KEY, idea);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error("Failed to save app idea to localStorage:", error);
    }
  }, []);

  // Clear the app idea
  const clearAppIdea = useCallback(() => {
    setAppIdeaState("");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear app idea from localStorage:", error);
    }
  }, []);

  return {
    appIdea,
    setAppIdea,
    clearAppIdea,
    isLoaded,
    hasAppIdea: appIdea.trim().length > 0,
  };
}

export default useAppIdea;
