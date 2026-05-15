"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const STATS = [
  { value: 50000, label: "AI Renders Generated", suffix: "+", prefix: "" },
  { value: 12000, label: "Architects & Designers", suffix: "+", prefix: "" },
  { value: 8, label: "Architectural Styles", suffix: "", prefix: "" },
  { value: 98, label: "Satisfaction Rate", suffix: "%", prefix: "" },
];

function StatCard({ value, label, suffix, prefix, inView }: {
  value: number; label: string; suffix: string; prefix: string; inView: boolean;
}) {
  const count = useCountUp(value, inView, 2000);

  return (
    <div className="glass-card rounded-2xl p-6 text-center group cursor-default">
      <div className="text-4xl sm:text-5xl font-bold font-display mb-2">
        <span className="gradient-text">
          {prefix}{count.toLocaleString()}{suffix}
        </span>
      </div>
      <p className="text-slate-400 text-sm font-medium">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-slate-500 text-sm uppercase tracking-widest font-medium">
            Trusted by architects worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <StatCard {...stat} inView={inView} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
