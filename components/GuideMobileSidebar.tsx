"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { phases, getStepsByPhase, steps } from "@/data/guide";

interface GuideMobileSidebarProps {
  completedSteps?: string[];
  currentStepId?: string;
  currentStepTitle?: string;
}

export default function GuideMobileSidebar({
  completedSteps = [],
  currentStepId = "",
  currentStepTitle = "Guide",
}: GuideMobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const totalSteps = steps.length;
  const completedCount = completedSteps.length;
  const currentStep = steps.find((s) => s.id === currentStepId);
  const currentStepIndex = currentStep
    ? steps.findIndex((s) => s.id === currentStepId) + 1
    : 0;

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-base-200/95 backdrop-blur-lg border-b border-base-300/50">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 text-base-content"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <div className="text-left">
              <p className="text-sm font-medium truncate max-w-[200px]">
                {currentStepTitle}
              </p>
              <p className="text-xs text-base-content/50">
                Step {currentStepIndex} of {totalSteps}
              </p>
            </div>
          </button>

          <Link href="/" className="p-2">
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
          </Link>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 w-[300px] max-w-[85vw] bg-base-200 shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-base-300/50">
          <Link href="/" className="flex items-center gap-2">
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
            <span className="font-semibold text-base-content">
              Vibe Code Guide
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-base-300 transition-colors"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Progress */}
        <div className="p-4 border-b border-base-300/50">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-base-content/60">Progress</span>
            <span className="text-primary font-medium">
              {Math.round((completedCount / totalSteps) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-base-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out rounded-full"
              style={{ width: `${(completedCount / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 max-h-[calc(100vh-200px)]">
          {phases.map((phase) => {
            const phaseSteps = getStepsByPhase(phase.id);
            const phaseCompletedCount = phaseSteps.filter((s) =>
              completedSteps.includes(s.id)
            ).length;

            return (
              <div key={phase.id} className="mb-4">
                <div className="flex items-center gap-2 px-2 mb-2">
                  <span className="text-xs font-semibold text-base-content/50 uppercase tracking-wider">
                    {phase.shortTitle}
                  </span>
                  <span className="text-xs text-base-content/30">
                    {phaseCompletedCount}/{phaseSteps.length}
                  </span>
                </div>
                <div className="space-y-0.5">
                  {phaseSteps.map((step) => {
                    const isCompleted = completedSteps.includes(step.id);
                    const isCurrent = step.id === currentStepId;

                    return (
                      <Link
                        key={step.id}
                        href={`/guide/${step.id}`}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
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
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-base-300/50 bg-base-200">
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
      </div>
    </>
  );
}
