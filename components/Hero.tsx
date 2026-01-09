"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppIdea } from "@/hooks/useAppIdea";

const Hero = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { appIdea: savedAppIdea, setAppIdea, hasAppIdea, isLoaded, clearAppIdea } = useAppIdea();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsLoading(true);
    setAppIdea(inputValue.trim());
    router.push("/guide");
  };

  const handleContinue = () => {
    setIsLoading(true);
    router.push("/guide");
  };

  const handleStartFresh = () => {
    clearAppIdea();
    setInputValue("");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-mesh grid-pattern noise-overlay overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-primary/5 blur-3xl floating" />
        <div className="absolute bottom-32 right-[15%] w-96 h-96 rounded-full bg-secondary/5 blur-3xl floating-delayed" />
        <div className="absolute top-1/3 right-[25%] w-48 h-48 rounded-full bg-accent/5 blur-2xl floating" />

        {/* Code-like floating elements */}
        <div className="absolute top-32 right-[20%] font-mono text-xs text-primary/20 rotate-12 hidden lg:block">
          {`const app = await build(yourIdea);`}
        </div>
        <div className="absolute bottom-40 left-[15%] font-mono text-xs text-secondary/20 -rotate-6 hidden lg:block">
          {`// Step 4 of 10 complete ✓`}
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-32">
        {/* Badge */}
        <div
          className={`flex justify-center mb-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-flex items-center gap-3 glass-card rounded-full px-5 py-2.5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-mono text-success">LIVE</span>
            </div>
            <div className="w-px h-4 bg-base-content/10" />
            <span className="text-sm text-base-content/70">
              <span className="text-primary font-semibold">2,400+</span> apps built this month
            </span>
          </div>
        </div>

        {/* Main headline */}
        <div className="text-center mb-8">
          <h1
            className={`font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.95] mb-6 transition-all duration-700 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-gradient-subtle">Build full stack apps</span>
            <br />
            <span className="text-gradient">in 2 hours</span>
          </h1>

          <p
            className={`text-lg md:text-xl text-base-content/60 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            A <span className="text-primary font-medium">10-step guided process</span> that tells you exactly what to prompt, in the right order.
            Go from idea to deployed app — no coding experience needed.
          </p>
        </div>

        {/* Input form or Continue prompt */}
        <div
          className={`max-w-2xl mx-auto mb-6 transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {isLoaded && hasAppIdea ? (
            /* Continue where you left off */
            <div className="gradient-border p-1 rounded-2xl">
              <div className="bg-base-100 rounded-xl p-6 text-center">
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Project in progress
                  </div>
                  <p className="text-sm text-base-content/60 mb-2">Continue building:</p>
                  <p className="text-lg font-medium text-base-content line-clamp-2">{savedAppIdea}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleContinue}
                    className="btn btn-primary btn-lg px-8 btn-glow"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner loading-sm" />
                    ) : (
                      <>
                        <span>Continue Building</span>
                        <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleStartFresh}
                    className="btn btn-ghost btn-lg"
                    disabled={isLoading}
                  >
                    Start Fresh
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* New project input */
            <form onSubmit={handleSubmit}>
              <div className="gradient-border p-1 rounded-2xl">
                <div className="flex flex-col sm:flex-row gap-3 bg-base-100 rounded-xl p-2">
                  <input
                    type="text"
                    placeholder="What app do you want to build?"
                    className="input input-lg flex-1 bg-transparent border-0 focus:outline-none text-base placeholder:text-base-content/30"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg px-8 btn-glow"
                    disabled={isLoading || !inputValue.trim()}
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner loading-sm" />
                    ) : (
                      <>
                        <span>Start Building</span>
                        <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Subtext */}
        <p
          className={`text-center text-sm text-base-content/40 mb-16 transition-all duration-700 delay-400 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          Free forever — No account required — Works with Cursor, Bolt, Windsurf
        </p>

        {/* Visual: The 10-step journey */}
        <div
          className={`relative transition-all duration-1000 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="glass-card rounded-2xl p-6 md:p-8 lg:p-10">
            {/* Journey visualization */}
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-4">
              {/* Start: Your Idea */}
              <div className="flex-shrink-0 text-center md:text-left">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mx-auto md:mx-0 mb-3">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="font-mono text-xs text-primary/70 uppercase tracking-wider">Your Idea</div>
              </div>

              {/* Arrow + Steps */}
              <div className="flex-1 flex items-center gap-2 py-4">
                <div className="hidden md:block w-8 h-px bg-gradient-to-r from-primary/30 to-primary/10" />

                {/* Steps visualization */}
                <div className="flex-1 flex items-center justify-center gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step) => (
                    <div
                      key={step}
                      className="group relative"
                    >
                      <div
                        className={`w-6 h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-[10px] md:text-xs font-mono transition-all
                          ${step <= 3 ? 'bg-success/20 text-success border border-success/30' :
                            step <= 6 ? 'bg-primary/10 text-primary/70 border border-primary/20' :
                            'bg-base-content/5 text-base-content/30 border border-base-content/10'}`}
                      >
                        {step <= 3 ? '✓' : step}
                      </div>
                      {/* Connector line */}
                      {step < 10 && (
                        <div className={`absolute top-1/2 -right-1 w-2 h-px ${step < 3 ? 'bg-success/30' : 'bg-base-content/10'}`} />
                      )}
                    </div>
                  ))}
                </div>

                <div className="hidden md:block w-8 h-px bg-gradient-to-l from-success/30 to-success/10" />
              </div>

              {/* End: Working App */}
              <div className="flex-shrink-0 text-center md:text-right">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-success/20 to-success/5 border border-success/20 flex items-center justify-center mx-auto md:mx-0 mb-3">
                  <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="font-mono text-xs text-success/70 uppercase tracking-wider">Working App</div>
              </div>
            </div>

            {/* Bottom caption */}
            <div className="mt-6 pt-6 border-t border-base-content/5 text-center">
              <p className="text-sm text-base-content/40">
                <span className="text-primary font-medium">10 guided steps</span> · Setup → Database → UI → Auth → API → Deploy
              </p>
            </div>
          </div>

          {/* Decorative gradient blur behind the card */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-secondary/5 to-success/10 rounded-3xl blur-3xl -z-10 opacity-50" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
