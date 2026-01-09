const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Designer",
    company: "Stripe",
    text: "I built a client portal in 2 hours. TWO HOURS. I've been wanting to make this for months but didn't know where to start. The step-by-step process made it feel almost too easy.",
    initial: "S",
    color: "primary",
  },
  {
    name: "Marcus Johnson",
    role: "Freelance Designer",
    company: "Self-employed",
    text: "Tried Cursor before but always got stuck after 'npm install'. Vibe Code Guide told me exactly what to prompt at each step. Shipped my first SaaS MVP on a Saturday afternoon.",
    initial: "M",
    color: "secondary",
  },
  {
    name: "Priya Sharma",
    role: "UX Designer",
    company: "Notion",
    text: "The 10-step roadmap is genius. Instead of random YouTube tutorials, I followed the guide in order. Database before UI. Auth before API. It just... worked. First time ever.",
    initial: "P",
    color: "accent",
  },
];

const stats = [
  { value: "2 hrs", label: "average build time" },
  { value: "94%", label: "completion rate" },
  { value: "2,400+", label: "apps deployed" },
];

const Testimonials3 = () => {
  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden bg-base-200/30">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-secondary/50" />
            <span className="text-xs font-mono text-secondary/70 uppercase tracking-widest">Testimonials</span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-secondary/50" />
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6">
            <span className="text-base-content/90">From idea to deployed</span>
            <br />
            <span className="text-gradient">in one session</span>
          </h2>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gradient font-mono">{stat.value}</div>
              <div className="text-xs text-base-content/40 uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative glass-card rounded-2xl p-6 md:p-8 transition-all duration-500 hover:translate-y-[-4px]"
            >
              {/* Quote mark */}
              <div className={`absolute top-6 right-6 text-4xl text-${testimonial.color}/10 font-serif`}>
                &ldquo;
              </div>

              {/* Content */}
              <div className="relative">
                <p className="text-base-content/70 leading-relaxed mb-8">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-base-content/5">
                  <div className={`w-12 h-12 rounded-full bg-${testimonial.color}/10 border border-${testimonial.color}/20 flex items-center justify-center`}>
                    <span className={`text-${testimonial.color} font-bold`}>{testimonial.initial}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-base-content/90">{testimonial.name}</div>
                    <div className="text-xs text-base-content/40">
                      {testimonial.role} <span className="text-base-content/20">@</span> {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials3;
