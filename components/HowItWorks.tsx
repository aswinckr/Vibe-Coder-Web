const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Describe Your Idea",
      description: "Tell us what you want to build in plain English. A habit tracker, a booking app, a dashboard — anything.",
      color: "primary",
    },
    {
      number: "02",
      title: "Get Your Roadmap",
      description: "We generate a personalized 10-step plan based on your app. Each step builds on the last.",
      color: "secondary",
    },
    {
      number: "03",
      title: "Copy & Paste Prompts",
      description: "At each step, click 'Generate Prompt' and paste it into Cursor, Bolt, or any AI coder. Watch the magic happen.",
      color: "accent",
    },
    {
      number: "04",
      title: "Deploy in 2 Hours",
      description: "By step 10, you'll hit deploy. Real URL. Real app. Real users can access your creation.",
      color: "success",
    },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-base-200/30">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-accent/50" />
            <span className="text-xs font-mono text-accent/70 uppercase tracking-widest">How It Works</span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-accent/50" />
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6">
            <span className="text-base-content/90">Idea to deployed app</span>
            <br />
            <span className="text-gradient">in 4 simple steps</span>
          </h2>

          <p className="text-lg text-base-content/50">
            No guesswork. No tutorials. Just follow the guide.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-base-content/10 to-transparent hidden lg:block" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step card */}
                <div className="glass-card glass-card-hover rounded-2xl p-6 h-full">
                  {/* Number */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${step.color}/10 border border-${step.color}/20 mb-6`}>
                    <span className={`font-mono text-sm font-bold text-${step.color}`}>
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-base-content/90 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-base-content/50 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector (desktop) */}
                {index < steps.length - 1 && (
                  <div className="absolute top-24 -right-3 hidden lg:block z-10">
                    <div className={`w-6 h-6 rounded-full bg-base-200 border border-base-content/10 flex items-center justify-center`}>
                      <svg className="w-3 h-3 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA hint */}
        <div className="mt-16 text-center">
          <p className="text-sm text-base-content/40">
            That&apos;s it. <span className="text-primary">10 guided steps</span> and you have a working full-stack app.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
