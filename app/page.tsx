import Hero from "@/components/Hero";
import TrustIndicators from "@/components/TrustIndicators";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import FeaturesAccordion from "@/components/FeaturesAccordion";
import Testimonials3 from "@/components/Testimonials3";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <main>
        {/* Hero Section with App Idea Input */}
        <div id="hero">
          <Hero />
        </div>

        {/* Trust Indicators Strip */}
        <TrustIndicators />

        {/* Problem/Pain Points Section */}
        <Problem />

        {/* Solution Overview */}
        <Solution />

        {/* How It Works (Process) */}
        <HowItWorks />

        {/* Features Grid */}
        <FeaturesAccordion />

        {/* Social Proof / Testimonials */}
        <Testimonials3 />

        {/* Pricing */}
        <Pricing />

        {/* FAQ */}
        <FAQ />

        {/* Final CTA */}
        <CTA />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
