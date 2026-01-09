"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CTA = () => {
  const [appIdea, setAppIdea] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appIdea.trim()) return;

    setIsLoading(true);
    localStorage.setItem("appIdea", appIdea.trim());
    router.push("/guide");
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Animated mesh background */}
      <div className="absolute inset-0 bg-mesh opacity-30" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '-2s' }} />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Main content card */}
        <div className="gradient-border rounded-3xl">
          <div className="bg-base-100/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/20 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-secondary/20 rounded-br-3xl" />

            {/* Section label */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
              <span className="text-xs font-mono text-primary/70 uppercase tracking-widest">Ready?</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
            </div>

            {/* Headline */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6">
              <span className="text-base-content/90">Build your app</span>
              <br />
              <span className="text-gradient">in the next 2 hours</span>
            </h2>

            {/* Subhead */}
            <p className="text-lg md:text-xl text-base-content/50 max-w-2xl mx-auto mb-10 leading-relaxed">
              10 steps. Guided prompts. No coding experience needed.
              <br className="hidden md:block" />
              Enter your idea and let&apos;s build something real.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
              <div className={`relative transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
                <div className={`absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl blur-xl transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />

                <div className="relative glass-card rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="What do you want to build?"
                      className="w-full px-6 py-4 bg-base-200/50 rounded-xl text-base-content placeholder:text-base-content/30 focus:outline-none focus:bg-base-200/80 transition-colors"
                      value={appIdea}
                      onChange={(e) => setAppIdea(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      required
                    />
                    {/* Typing cursor indicator */}
                    {isFocused && !appIdea && (
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary animate-pulse" />
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg px-8 btn-glow group"
                    disabled={isLoading || !appIdea.trim()}
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <>
                        <span>Start Building</span>
                        <svg
                          className="w-5 h-5 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-base-content/40">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No Account Required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>10-Step Guided Process</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
