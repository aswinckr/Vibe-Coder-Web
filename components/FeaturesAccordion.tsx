const features = [
  {
    icon: "①",
    title: "10 Steps, Perfect Order",
    description: "We've mapped out the exact sequence: setup, database, UI, auth, API, deploy. No more guessing what comes next.",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: "⎘",
    title: "One-Click Prompts",
    description: "Each step generates a detailed prompt customized to your app. Copy, paste into Cursor or Bolt, done.",
    gradient: "from-secondary/20 to-secondary/5",
  },
  {
    icon: "◈",
    title: "Works With Any AI Coder",
    description: "Cursor, Bolt.new, Windsurf, Claude, ChatGPT — our prompts work everywhere. Use what you're comfortable with.",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: "≡",
    title: "Track Your Progress",
    description: "A persistent sidebar shows exactly where you are. Jump between steps, see what's done, know what's next.",
    gradient: "from-info/20 to-info/5",
  },
  {
    icon: "◉",
    title: "Zero Assumed Knowledge",
    description: "Every step includes prerequisites and plain-English explanations. Built for people who've never written code.",
    gradient: "from-success/20 to-success/5",
  },
  {
    icon: "⚡",
    title: "2-Hour Build Time",
    description: "Most users finish their first app in a single session. Some have deployed in under 90 minutes.",
    gradient: "from-warning/20 to-warning/5",
  },
];

const FeaturesAccordion = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" id="features">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-success/50" />
            <span className="text-xs font-mono text-success/70 uppercase tracking-widest">Features</span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-success/50" />
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6">
            <span className="text-base-content/90">Everything you need to</span>
            <br />
            <span className="text-gradient">ship your first app</span>
          </h2>

          <p className="text-lg text-base-content/50">
            A guided process designed for non-coders who want to build real, working applications.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative glass-card glass-card-hover rounded-2xl p-6 md:p-8 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Content */}
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-base-content/5 border border-base-content/10 flex items-center justify-center mb-6 group-hover:border-base-content/20 transition-colors">
                  <span className="text-lg">{feature.icon}</span>
                </div>

                <h3 className="text-lg font-semibold text-base-content/90 mb-3">
                  {feature.title}
                </h3>

                <p className="text-sm text-base-content/50 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-base-content/5 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesAccordion;
