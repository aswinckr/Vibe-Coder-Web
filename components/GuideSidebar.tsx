"use client";

import { useState } from "react";
import Link from "next/link";
import { phases, getStepsByPhase, steps } from "@/data/guide";
import { Phase, Step } from "@/types/guide";

interface GuideSidebarProps {
  completedSteps?: string[];
  currentStepId?: string;
}

interface PhaseItemProps {
  phase: Phase;
  steps: Step[];
  completedSteps: string[];
  currentStepId: string;
  isExpanded: boolean;
  onToggle: () => void;
}

function PhaseItem({
  phase,
  steps,
  completedSteps,
  currentStepId,
  isExpanded,
  onToggle,
}: PhaseItemProps) {
  const phaseCompletedCount = steps.filter((s) =>
    completedSteps.includes(s.id)
  ).length;
  const isPhaseComplete = phaseCompletedCount === steps.length;
  const hasCurrentStep = steps.some((s) => s.id === currentStepId);

  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
          hasCurrentStep
            ? "bg-primary/10 text-primary"
            : "hover:bg-base-300/50 text-base-content/70 hover:text-base-content"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
              isPhaseComplete
                ? "bg-success text-success-content"
                : hasCurrentStep
                ? "bg-primary text-primary-content"
                : "bg-base-300 text-base-content/60"
            }`}
          >
            {isPhaseComplete ? (
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              phase.order
            )}
          </div>
          <span className="font-medium text-sm">{phase.shortTitle}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-base-content/50">
            {phaseCompletedCount}/{steps.length}
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-4 mt-1 space-y-0.5">
          {steps.map((step) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = step.id === currentStepId;

            return (
              <Link
                key={step.id}
                href={`/guide/${step.id}`}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  isCurrent
                    ? "bg-primary/15 text-primary font-medium"
                    : isCompleted
                    ? "text-success/80 hover:bg-base-300/50"
                    : "text-base-content/60 hover:bg-base-300/50 hover:text-base-content"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCompleted
                      ? "bg-success/20"
                      : isCurrent
                      ? "bg-primary/20"
                      : "bg-base-300/50"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-3 h-3 text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : isCurrent ? (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-base-content/30" />
                  )}
                </div>
                <span className="truncate">{step.shortTitle}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function GuideSidebar({
  completedSteps = [],
  currentStepId = "",
}: GuideSidebarProps) {
  // Determine which phase to expand based on current step
  const currentStep = steps.find((s) => s.id === currentStepId);
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    if (currentStep) {
      initial.add(currentStep.phaseId);
    } else {
      // Expand the first phase by default
      initial.add(phases[0].id);
    }
    return initial;
  });

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) => {
      const next = new Set(prev);
      if (next.has(phaseId)) {
        next.delete(phaseId);
      } else {
        next.add(phaseId);
      }
      return next;
    });
  };

  const totalSteps = steps.length;
  const completedCount = completedSteps.length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  return (
    <aside className="w-[280px] h-screen sticky top-0 flex flex-col bg-base-200/50 border-r border-base-300/50">
      {/* Header */}
      <div className="p-4 border-b border-base-300/50">
        <Link href="/" className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <svg
              className="w-5 h-5 text-primary-content"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <span className="font-semibold text-base-content">Vibe Code Guide</span>
        </Link>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-base-content/60">Progress</span>
            <span className="text-primary font-medium">{progressPercent}%</span>
          </div>
          <div className="h-2 bg-base-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-base-content/50">
            {completedCount} of {totalSteps} steps completed
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        {phases.map((phase) => (
          <PhaseItem
            key={phase.id}
            phase={phase}
            steps={getStepsByPhase(phase.id)}
            completedSteps={completedSteps}
            currentStepId={currentStepId}
            isExpanded={expandedPhases.has(phase.id)}
            onToggle={() => togglePhase(phase.id)}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-base-300/50">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content transition-colors"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </aside>
  );
}
