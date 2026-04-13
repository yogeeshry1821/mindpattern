"use client";

import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div id="landing-scroll" className="h-screen overflow-y-auto bg-surface-soft">

      <section className="min-h-screen">
        <Hero />
      </section>

      <Features />

      <section className="min-h-screen">
        <HowItWorks />
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
}
