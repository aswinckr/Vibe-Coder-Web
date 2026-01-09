const Problem = () => {
  const painPoints = [
    {
      code: "???",
      title: "What do I even prompt first?",
      description:
        "You open Cursor or Bolt, type something vague, and get a mess of disconnected code. Hours wasted going in circles.",
      color: "text-error",
    },
    {
      code: "ERR",
      title: "It worked... then you broke everything",
      description:
        "Without knowing the technical sequence, each new feature creates chaos. It's like building a house starting with the roof.",
      color: "text-warning",
    },
    {
      code: "///",
      title: "Weeks of trial and error",
      description:
        "YouTube tutorials. Documentation rabbit holes. Stack Overflow. You're spending weeks on something that should take hours.",
      color: "text-secondary",
    },
    {
      code: "...",
      title: "You just want it to work",
      description:
        "You have the idea. You know what it should look like. You just need someone to tell you exactly what to do, step by step.",
      color: "text-primary",
    },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-base-100 via-base-200/50 to-base-100" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-error/50 to-transparent" />
            <span className="text-xs font-mono text-error/70 uppercase tracking-widest">The Problem</span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6">
            <span className="text-base-content/90">AI can build apps.</span>
            <br />
            <span className="text-gradient">But where do you start?</span>
          </h2>

          <p className="text-lg text-base-content/50 leading-relaxed max-w-xl">
            The tools exist. But without a roadmap, you&apos;re just prompting in the dark.
          </p>
        </div>

        {/* Pain points grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="group relative glass-card glass-card-hover rounded-2xl p-6 md:p-8"
            >
              {/* Code badge */}
              <div className={`inline-flex items-center gap-2 mb-4 font-mono text-xs ${point.color}/70`}>
                <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                <span>{point.code}</span>
              </div>

              <h3 className="text-xl md:text-2xl font-semibold text-base-content/90 mb-3 leading-tight">
                &ldquo;{point.title}&rdquo;
              </h3>

              <p className="text-base-content/50 leading-relaxed">
                {point.description}
              </p>

              {/* Hover gradient */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}>
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${point.color}/5 to-transparent`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
