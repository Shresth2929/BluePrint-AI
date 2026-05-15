import { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import InteractiveDemoSection from "@/components/landing/InteractiveDemoSection";
import CommunityShowcase from "@/components/landing/CommunityShowcase";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Blueprint AI — Transform Floor Plans Into Cinematic AI Architectural Renders",
  description:
    "Blueprint AI transforms 2D floor plans and architectural sketches into photorealistic 3D renders using Gemini AI. Join 12,000+ architects. Start free.",
};

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <InteractiveDemoSection />
      <CommunityShowcase />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
