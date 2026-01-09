const TrustIndicators = () => {
  const stats = [
    { value: "2 hrs", label: "average build time", color: "text-primary" },
    { value: "10", label: "guided steps", color: "text-accent" },
    { value: "94%", label: "finish their app", color: "text-success" },
  ];

  const tools = [
    { name: "Cursor", icon: "▶" },
    { name: "Bolt", icon: "⚡" },
    { name: "Windsurf", icon: "◈" },
    { name: "Claude", icon: "◉" },
  ];

  return (
    <section className="relative border-y border-base-content/5 bg-base-200/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className={`text-2xl font-bold ${stat.color} font-mono tracking-tight transition-transform group-hover:scale-105`}>
                  {stat.value}
                </div>
                <div className="text-xs text-base-content/40 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-12 bg-gradient-to-b from-transparent via-base-content/10 to-transparent" />

          {/* Tools */}
          <div className="flex items-center gap-6">
            <span className="text-[10px] text-base-content/30 uppercase tracking-widest font-medium">
              Works with
            </span>
            <div className="flex items-center gap-3">
              {tools.map((tool, i) => (
                <div
                  key={i}
                  className="group relative"
                >
                  <div className="w-9 h-9 rounded-lg bg-base-300/50 border border-base-content/5 flex items-center justify-center text-base-content/50 transition-all group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:text-primary">
                    <span className="text-sm">{tool.icon}</span>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-base-content/50 whitespace-nowrap font-mono">
                      {tool.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
