"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Can I really build an app in 2 hours?",
    answer: "Yes. Our average user completes all 10 steps in about 2 hours. Some finish faster. The key is the guided process — you're never stuck figuring out what to do next.",
  },
  {
    question: "Do I need any coding experience?",
    answer: "None. Zero. The guide is designed for complete beginners. Each step includes plain-English explanations, and the AI does the actual coding. You just copy and paste prompts.",
  },
  {
    question: "What's the 10-step process?",
    answer: "Setup → Database → Core UI → Authentication → State Management → API Routes → Data Fetching → Error Handling → Polish → Deployment. Each step builds on the last, in the exact order professional developers follow.",
  },
  {
    question: "Which AI coding tools does this work with?",
    answer: "Our prompts work with Cursor, Bolt.new, Windsurf, Claude, ChatGPT, and any AI assistant that can write code. Use whatever you're comfortable with.",
  },
  {
    question: "What kind of apps can I build?",
    answer: "Full-stack web applications — dashboards, SaaS tools, client portals, booking systems, habit trackers, marketplaces. If it runs in a browser and needs a database, you can build it.",
  },
  {
    question: "What if I get stuck on a step?",
    answer: "Each step includes detailed prerequisites and troubleshooting tips. You can also regenerate prompts with more context. The guide is designed so you don't get stuck.",
  },
];

const FAQItem = ({ faq, isOpen, onClick }: { faq: typeof faqs[0]; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="border-b border-base-content/5 last:border-b-0">
      <button
        className="w-full py-6 flex items-center justify-between gap-4 text-left group"
        onClick={onClick}
      >
        <span className={`font-medium transition-colors ${isOpen ? 'text-primary' : 'text-base-content/90 group-hover:text-primary/80'}`}>
          {faq.question}
        </span>
        <div className={`shrink-0 w-8 h-8 rounded-lg bg-base-content/5 flex items-center justify-center transition-all ${isOpen ? 'bg-primary/10 rotate-45' : 'group-hover:bg-primary/5'}`}>
          <svg className={`w-4 h-4 transition-colors ${isOpen ? 'text-primary' : 'text-base-content/50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48 pb-6' : 'max-h-0'}`}>
        <p className="text-base-content/60 leading-relaxed pr-12">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-base-200/30" id="faq">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left: Header */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-info/50 to-transparent" />
              <span className="text-xs font-mono text-info/70 uppercase tracking-widest">FAQ</span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.1] mb-6">
              <span className="text-base-content/90">Questions about</span>
              <br />
              <span className="text-gradient">the process?</span>
            </h2>

            <p className="text-base-content/50 leading-relaxed mb-8">
              Everything you need to know about building your first app in 2 hours.
            </p>

            <a href="mailto:support@vibecodeguide.com" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
              <span>Still have questions? Contact us</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Right: FAQ list */}
          <div className="glass-card rounded-2xl p-6 md:p-8">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
