"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Check, Zap } from "lucide-react";
import type { PricingTier } from "@/types";

const PRICING_TIERS: PricingTier[] = [
  {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    description: "Perfect for architects exploring AI visualization",
    features: [
      "5 AI renders per month",
      "All 8 architectural styles",
      "HD export (1080p)",
      "Community showcase access",
      "Basic project storage",
      "Email support",
    ],
    cta: "Start for free",
    highlighted: false,
    plan: "FREE",
  },
  {
    name: "Pro",
    price: { monthly: 29, annual: 23 },
    description: "For professional architects and design studios",
    features: [
      "150 AI renders per month",
      "All 8 architectural styles",
      "4K Ultra HD export",
      "Priority generation queue",
      "Unlimited project storage",
      "Before/after comparisons",
      "Client sharing links",
      "Priority support",
    ],
    cta: "Start Pro trial",
    highlighted: true,
    plan: "PRO",
  },
  {
    name: "Enterprise",
    price: { monthly: 99, annual: 79 },
    description: "For architectural firms and real estate companies",
    features: [
      "Unlimited AI renders",
      "Custom render styles",
      "8K maximum resolution",
      "Dedicated generation server",
      "Team collaboration tools",
      "API access",
      "White-label options",
      "Dedicated account manager",
    ],
    cta: "Contact sales",
    highlighted: false,
    plan: "ENTERPRISE",
  },
];

export default function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" ref={ref} className="py-24 relative overflow-hidden">
      <div className="aurora-blob-1 w-[500px] h-[500px] bg-violet-600/8 -bottom-40 left-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-violet-500/20 text-xs text-violet-300 font-medium mb-4 uppercase tracking-widest">
            Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Simple, transparent{" "}
            <span className="gradient-text">pricing</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
            Start free. Scale as you grow. No hidden fees.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 glass rounded-full p-1 border border-white/10">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                !isAnnual ? "bg-violet-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                isAnnual ? "bg-violet-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
              }`}
            >
              Annual
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold">
                -20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRICING_TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-7 ${
                tier.highlighted
                  ? "animated-border-subtle bg-gradient-to-b from-violet-950/60 to-indigo-950/40"
                  : "glass-card"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-xs text-white font-semibold shadow-lg">
                  <Zap className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-1">{tier.name}</h3>
                <p className="text-slate-400 text-sm">{tier.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-display font-bold text-white">
                    ${isAnnual ? tier.price.annual : tier.price.monthly}
                  </span>
                  {tier.price.monthly > 0 && (
                    <span className="text-slate-500 text-sm mb-1">/month</span>
                  )}
                </div>
                {isAnnual && tier.price.monthly > 0 && (
                  <p className="text-xs text-emerald-400 mt-1">
                    Billed annually — save ${(tier.price.monthly - tier.price.annual) * 12}/year
                  </p>
                )}
              </div>

              <Link
                href={tier.plan === "ENTERPRISE" ? "/contact" : "/sign-up"}
                className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 mb-6 ${
                  tier.highlighted
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                    : "glass border border-white/10 text-white hover:border-violet-500/30 hover:bg-violet-500/10"
                }`}
              >
                {tier.cta}
              </Link>

              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <Check className={`w-4 h-4 flex-shrink-0 ${tier.highlighted ? "text-violet-400" : "text-emerald-400"}`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-slate-500 text-sm mt-8"
        >
          All plans include 14-day money-back guarantee. No credit card required for Free.
        </motion.p>
      </div>
    </section>
  );
}
