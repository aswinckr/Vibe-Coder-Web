const Pricing = () => {
  const freeFeatures = [
    "Full 10-step guide access",
    "Unlimited prompt generation",
    "All phases: Setup → Deploy",
    "Copy-to-clipboard",
    "Local progress tracking",
  ];

  const proFeatures = [
    "Everything in Free",
    "Unlimited projects",
    "Cloud sync across devices",
    "Prompt history",
    "Priority API access",
    "Early access to features",
  ];

  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-warning/50" />
            <span className="text-xs font-mono text-warning/70 uppercase tracking-widest">Pricing</span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-warning/50" />
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6">
            <span className="text-base-content/90">Start building</span>
            <br />
            <span className="text-gradient">for free</span>
          </h2>

          <p className="text-lg text-base-content/50">
            Everything you need to build your first app. No credit card required.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="glass-card rounded-2xl p-8 relative overflow-hidden group">
            <div className="relative">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-base-content/5 text-base-content/50 mb-4">
                  FREE
                </span>
                <h3 className="text-2xl font-bold text-base-content/90 mb-2">Free Forever</h3>
                <p className="text-sm text-base-content/50">Perfect for your first app</p>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-bold text-base-content/90 font-mono">$0</span>
                <span className="text-base-content/40 ml-2">/forever</span>
              </div>

              <ul className="space-y-4 mb-8">
                {freeFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-base-content/70">
                    <span className="text-success">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a href="#hero" className="btn btn-primary w-full btn-glow">
                Start Building Free
              </a>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="gradient-border rounded-2xl relative overflow-hidden">
            <div className="bg-base-100 rounded-2xl p-8 h-full relative">
              {/* Coming soon badge */}
              <div className="absolute -top-px left-1/2 -translate-x-1/2">
                <span className="inline-block px-4 py-1.5 rounded-b-lg text-xs font-mono bg-gradient-to-r from-primary to-secondary text-white">
                  COMING SOON
                </span>
              </div>

              <div className="relative pt-4">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary mb-4">
                    PRO
                  </span>
                  <h3 className="text-2xl font-bold text-base-content/90 mb-2">Pro</h3>
                  <p className="text-sm text-base-content/50">For power users shipping multiple apps</p>
                </div>

                <div className="mb-8">
                  <span className="text-5xl font-bold text-gradient font-mono">$19</span>
                  <span className="text-base-content/40 ml-2">/month</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {proFeatures.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-base-content/70">
                      <span className="text-primary">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="btn btn-outline w-full opacity-50 cursor-not-allowed" disabled>
                  Join Waitlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
