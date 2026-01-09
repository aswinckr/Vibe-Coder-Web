"use client";

import { ReactNode, createContext, useContext } from "react";
import { useAppIdea } from "@/hooks/useAppIdea";
import { useGuideProgress } from "@/hooks/useGuideProgress";
import GuideSidebar from "./GuideSidebar";
import GuideMobileSidebar from "./GuideMobileSidebar";
import { getStepById } from "@/data/guide";

interface GuideContextType {
  appIdea: string;
  setAppIdea: (idea: string) => void;
  hasAppIdea: boolean;
  currentStepId: string;
  completedSteps: string[];
  visitedSteps: string[];
  markStepVisited: (stepId: string) => void;
  markStepCompleted: (stepId: string) => void;
  saveGeneratedPrompt: (stepId: string, prompt: string) => void;
  getStepProgress: (stepId: string) => { generatedPrompt?: string };
  isLoaded: boolean;
}

const GuideContext = createContext<GuideContextType | null>(null);

export function useGuideContext() {
  const context = useContext(GuideContext);
  if (!context) {
    throw new Error("useGuideContext must be used within GuideLayoutClient");
  }
  return context;
}

interface GuideLayoutClientProps {
  children: ReactNode;
  stepId: string;
}

export default function GuideLayoutClient({
  children,
  stepId,
}: GuideLayoutClientProps) {
  const { appIdea, setAppIdea, hasAppIdea, isLoaded: appIdeaLoaded } = useAppIdea();
  const {
    currentStepId,
    completedStepsCount,
    visitedSteps,
    markStepVisited,
    markStepCompleted,
    saveGeneratedPrompt,
    getStepProgress,
    isLoaded: progressLoaded,
  } = useGuideProgress();

  const currentStep = getStepById(stepId);
  const completedSteps = visitedSteps.filter(
    (id) => getStepProgress(id).status === "completed"
  );

  const isLoaded = appIdeaLoaded && progressLoaded;

  const contextValue: GuideContextType = {
    appIdea,
    setAppIdea,
    hasAppIdea,
    currentStepId: stepId,
    completedSteps,
    visitedSteps,
    markStepVisited,
    markStepCompleted,
    saveGeneratedPrompt,
    getStepProgress: (id) => ({
      generatedPrompt: getStepProgress(id).generatedPrompt,
    }),
    isLoaded,
  };

  return (
    <GuideContext.Provider value={contextValue}>
      <div className="min-h-screen bg-base-100">
        {/* Mobile Sidebar */}
        <GuideMobileSidebar
          completedSteps={completedSteps}
          currentStepId={stepId}
          currentStepTitle={currentStep?.shortTitle || "Guide"}
        />

        <div className="flex">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <GuideSidebar
              completedSteps={completedSteps}
              currentStepId={stepId}
            />
          </div>

          {/* Main Content */}
          <main className="flex-1 min-h-screen lg:ml-0">
            <div className="pt-14 lg:pt-0">{children}</div>
          </main>
        </div>
      </div>
    </GuideContext.Provider>
  );
}
