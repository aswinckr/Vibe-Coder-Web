"use client";

import Link from "next/link";
import { JSX } from "react";
import { Step, Phase, StepNavigation } from "@/types/guide";
import PromptWidget from "./PromptWidget";

interface StepContentProps {
  step: Step;
  phase: Phase;
  navigation: StepNavigation;
}

export default function StepContent({ step, phase, navigation }: StepContentProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-base-content/50 mb-6">
        <Link href="/" className="hover:text-base-content transition-colors">
          Home
        </Link>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-primary">{phase.shortTitle}</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-base-content/70">{step.shortTitle}</span>
      </nav>

      {/* Step Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            Step {navigation.currentIndex} of {navigation.totalSteps}
          </span>
          {step.estimatedTime && (
            <span className="inline-flex items-center gap-1 text-xs text-base-content/50">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {step.estimatedTime}
            </span>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-base-content mb-3">
          {step.title}
        </h1>
        <p className="text-lg text-base-content/70">{step.description}</p>
      </header>

      {/* Prerequisites */}
      {step.prerequisites.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-base-content mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Prerequisites
          </h2>
          <div className="glass-card rounded-xl p-4 space-y-3">
            {step.prerequisites.map((prereq) => (
              <div key={prereq.id} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-5 h-5 rounded border-2 border-base-content/20" />
                </div>
                <div>
                  <span className="text-base-content/80">{prereq.text}</span>
                  {prereq.link && (
                    <a
                      href={prereq.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-primary hover:underline text-sm"
                    >
                      Learn more
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tools Needed */}
      {step.tools.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-base-content mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Tools You&apos;ll Use
          </h2>
          <div className="flex flex-wrap gap-2">
            {step.tools.map((tool) => (
              <div
                key={tool.name}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-base-300/50 text-sm"
              >
                <span className="w-2 h-2 rounded-full bg-info" />
                <span className="font-medium text-base-content/80">{tool.name}</span>
                {tool.description && (
                  <span className="text-base-content/50 hidden sm:inline">
                    - {tool.description}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Instructions */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-base-content mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Instructions
        </h2>
        <div className="prose prose-invert prose-lg max-w-none">
          <StepInstructions content={step.instructions} />
        </div>
      </section>

      {/* Prompt Widget */}
      <section className="mb-12">
        <PromptWidget step={step} />
      </section>

      {/* Navigation */}
      <nav className="flex items-center justify-between pt-8 border-t border-base-300/50">
        {navigation.previous ? (
          <Link
            href={`/guide/${navigation.previous.id}`}
            className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-base-300/30 transition-colors"
          >
            <svg
              className="w-5 h-5 text-base-content/50 group-hover:text-primary transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <div className="text-left">
              <p className="text-xs text-base-content/50">Previous</p>
              <p className="text-sm font-medium text-base-content group-hover:text-primary transition-colors">
                {navigation.previous.shortTitle}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {navigation.next ? (
          <Link
            href={`/guide/${navigation.next.id}`}
            className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-base-300/30 transition-colors"
          >
            <div className="text-right">
              <p className="text-xs text-base-content/50">Next</p>
              <p className="text-sm font-medium text-base-content group-hover:text-primary transition-colors">
                {navigation.next.shortTitle}
              </p>
            </div>
            <svg
              className="w-5 h-5 text-base-content/50 group-hover:text-primary transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ) : (
          <Link
            href="/"
            className="btn btn-primary"
          >
            Complete Guide
          </Link>
        )}
      </nav>
    </div>
  );
}

// Simple markdown-like renderer for instructions
function StepInstructions({ content }: { content: string }) {
  const lines = content.trim().split("\n");
  const elements: JSX.Element[] = [];
  let currentList: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLang = "";

  const flushList = () => {
    if (currentList.length > 0) {
      if (listType === "ul") {
        elements.push(
          <ul key={elements.length} className="list-disc list-inside space-y-1 my-4">
            {currentList.map((item, i) => (
              <li key={i} className="text-base-content/80">
                {item}
              </li>
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={elements.length} className="list-decimal list-inside space-y-1 my-4">
            {currentList.map((item, i) => (
              <li key={i} className="text-base-content/80">
                {item}
              </li>
            ))}
          </ol>
        );
      }
      currentList = [];
      listType = null;
    }
  };

  const flushCodeBlock = () => {
    if (codeBlockContent.length > 0) {
      elements.push(
        <pre
          key={elements.length}
          className="code-block p-4 my-4 overflow-x-auto text-sm"
        >
          <code className="text-base-content/90 font-mono">
            {codeBlockContent.join("\n")}
          </code>
        </pre>
      );
      codeBlockContent = [];
      codeBlockLang = "";
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block handling
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        flushList();
        inCodeBlock = true;
        codeBlockLang = line.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Empty line
    if (!line.trim()) {
      flushList();
      continue;
    }

    // Headers
    if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={elements.length} className="text-xl font-semibold text-base-content mt-8 mb-4">
          {line.slice(4)}
        </h3>
      );
      continue;
    }

    if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={elements.length} className="text-2xl font-bold text-base-content mt-10 mb-4">
          {line.slice(3)}
        </h2>
      );
      continue;
    }

    // Unordered list
    if (line.startsWith("- ") || line.startsWith("* ")) {
      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }
      currentList.push(line.slice(2));
      continue;
    }

    // Ordered list
    const orderedMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (orderedMatch) {
      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }
      currentList.push(orderedMatch[2]);
      continue;
    }

    // Checkbox
    if (line.startsWith("- [ ] ") || line.startsWith("- [x] ")) {
      flushList();
      const checked = line.startsWith("- [x] ");
      const text = line.slice(6);
      elements.push(
        <div key={elements.length} className="flex items-center gap-3 my-2">
          <input
            type="checkbox"
            checked={checked}
            readOnly
            className="checkbox checkbox-sm checkbox-primary"
          />
          <span className="text-base-content/80">{text}</span>
        </div>
      );
      continue;
    }

    // Regular paragraph
    flushList();

    // Handle inline code and bold
    const processedLine = line
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-base-300/50 text-primary text-sm font-mono">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

    elements.push(
      <p
        key={elements.length}
        className="text-base-content/80 my-4 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: processedLine }}
      />
    );
  }

  flushList();
  flushCodeBlock();

  return <>{elements}</>;
}
