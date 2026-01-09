const Solution = () => {
  const benefits = [
    {
      icon: "①",
      title: "Know exactly what to prompt",
      description: "Every step comes with a ready-to-use prompt. Just click, copy, and paste into your AI coder.",
    },
    {
      icon: "→",
      title: "Build in the right order",
      description: "Setup → Database → UI → Auth → API → Deploy. The same sequence professional developers follow.",
    },
    {
      icon: "◈",
      title: "Get clean, working code",
      description: "Our prompts are engineered to produce organized, production-ready code — not a tangled mess.",
    },
    {
      icon: "⚡",
      title: "Ship in 2 hours, not 2 months",
      description: "Stop wasting weeks figuring it out. Follow the guide and have a deployed app by this afternoon.",
    },
  ];

  const steps = [
    "Project Setup",
    "Database Schema",
    "Core UI",
    "Authentication",
    "State Management",
    "API Routes",
    "Data Fetching",
    "Error Handling",
    "Polish & Testing",
    "Deployment",
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-mesh">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-primary/50 to-transparent" />
              <span className="text-xs font-mono text-primary/70 uppercase tracking-widest">The Solution</span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6">
              <span className="text-base-content/90">A step-by-step guide</span>
              <br />
              <span className="text-gradient">that actually works</span>
            </h2>

            <p className="text-lg text-base-content/50 leading-relaxed mb-12 max-w-lg">
              10 steps. In order. With prompts generated for YOUR specific app idea.
              Just follow along and watch your app come to life.
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary transition-all group-hover:bg-primary/20 group-hover:scale-110">
                    <span className="text-sm">{benefit.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base-content/90 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-base-content/50 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 10-step roadmap visualization */}
          <div className="relative">
            <div className="gradient-border rounded-2xl">
              <div className="bg-base-100 rounded-2xl p-6 md:p-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-base-content/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-error/50" />
                    <div className="w-3 h-3 rounded-full bg-warning/50" />
                    <div className="w-3 h-3 rounded-full bg-success/50" />
                  </div>
                  <span className="text-xs text-base-content/30 font-mono">The 10-Step Roadmap</span>
                </div>

                {/* Steps list */}
                <div className="space-y-2">
                  {steps.map((step, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                        i < 3
                          ? 'bg-success/10 border border-success/20'
                          : i === 3
                            ? 'bg-primary/10 border border-primary/30 scale-[1.02]'
                            : 'bg-base-content/5 border border-transparent'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono ${
                        i < 3
                          ? 'bg-success/20 text-success'
                          : i === 3
                            ? 'bg-primary/20 text-primary'
                            : 'bg-base-content/10 text-base-content/40'
                      }`}>
                        {i < 3 ? '✓' : i + 1}
                      </div>
                      <span className={`text-sm font-medium ${
                        i < 3
                          ? 'text-success/80'
                          : i === 3
                            ? 'text-primary'
                            : 'text-base-content/50'
                      }`}>
                        {step}
                      </span>
                      {i === 3 && (
                        <span className="ml-auto text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                          CURRENT
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mt-6 pt-4 border-t border-base-content/5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-base-content/40">Progress</span>
                    <span className="font-mono text-primary">4/10 steps</span>
                  </div>
                  <div className="h-2 bg-base-content/10 rounded-full overflow-hidden">
                    <div className="h-full w-[40%] bg-gradient-to-r from-success via-primary to-primary/50 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-success/10 rounded-full blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
