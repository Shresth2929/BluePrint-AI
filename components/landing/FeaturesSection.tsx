"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Zap, Image, Globe, Users, RefreshCw, Cloud,
  Layers, Monitor
} from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "AI Render Generation",
    description: "Transform any floor plan sketch into photorealistic 3D architectural renders in under 30 seconds using Gemini AI.",
    gradient: "from-violet-500/20 to-indigo-500/10",
    iconColor: "text-violet-400",
    size: "large",
  },
  {
    icon: Image,
    title: "Interior AI Design",
    description: "Generate stunning interior visualizations with furniture, lighting, and material suggestions.",
    gradient: "from-cyan-500/20 to-blue-500/10",
    iconColor: "text-cyan-400",
    size: "small",
  },
  {
    icon: Globe,
    title: "Exterior Visualization",
    description: "Create photorealistic exterior renders with landscaping, lighting conditions, and architectural detail.",
    gradient: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
    size: "small",
  },
  {
    icon: Users,
    title: "Community Showcase",
    description: "Share your renders with 12,000+ architects. Get inspired by the global design community.",
    gradient: "from-pink-500/20 to-rose-500/10",
    iconColor: "text-pink-400",
    size: "small",
  },
  {
    icon: RefreshCw,
    title: "Real-Time Processing",
    description: "Watch your renders come to life with real-time generation states and progress indicators.",
    gradient: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-400",
    size: "small",
  },
  {
    icon: Cloud,
    title: "Cloud Project Storage",
    description: "Store unlimited projects in the cloud. Access from anywhere, share with clients instantly.",
    gradient: "from-indigo-500/20 to-purple-500/10",
    iconColor: "text-indigo-400",
    size: "small",
  },
  {
    icon: Layers,
    title: "Multi-Style Rendering",
    description: "8 curated architectural styles from Modern Luxury to Japanese Zen — one click to switch.",
    gradient: "from-purple-500/20 to-violet-500/10",
    iconColor: "text-purple-400",
    size: "small",
  },
  {
    icon: Monitor,
    title: "HD Export & Sharing",
    description: "Download renders in ultra-high resolution. Generate shareable links for clients and portfolios.",
    gradient: "from-teal-500/20 to-cyan-500/10",
    iconColor: "text-teal-400",
    size: "small",
  },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" ref={ref} className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/5 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-violet-500/20 text-xs text-violet-300 font-medium mb-4 uppercase tracking-widest">
            Features
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4 leading-tight">
            Everything you need to{" "}
            <span className="gradient-text">visualize</span>
            <br />architecture at scale
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From sketch to photorealistic render in seconds. Blueprint AI handles the entire visualization workflow.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Large feature card (spans 2 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0 }}
            className="lg:col-span-2 glass-card rounded-2xl p-8 group relative overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${FEATURES[0].gradient} opacity-60`} />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {(() => {
                  const Icon0 = FEATURES[0].icon;
                  return <Icon0 className={`w-6 h-6 ${FEATURES[0].iconColor}`} />;
                })()}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{FEATURES[0].title}</h3>
              <p className="text-slate-400 leading-relaxed">{FEATURES[0].description}</p>

              {/* Mini demo preview */}
              <div className="mt-6 flex gap-2">
                {["⚡ 29s", "🎨 8 styles", "📐 Any format"].map((badge) => (
                  <span key={badge} className="px-2.5 py-1 text-xs rounded-lg glass border border-white/10 text-slate-300">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Regular feature cards */}
          {FEATURES.slice(1, 7).map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: (i + 1) * 0.07 }}
                className="glass-card rounded-2xl p-6 group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-40`} />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className={`w-5 h-5 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}

          {/* Last card full width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.56 }}
            className="lg:col-span-2 glass-card rounded-2xl p-6 group relative overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${FEATURES[7].gradient} opacity-40`} />
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                {(() => {
                  const Icon7 = FEATURES[7].icon;
                  return <Icon7 className={`w-6 h-6 ${FEATURES[7].iconColor}`} />;
                })()}
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-1">{FEATURES[7].title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{FEATURES[7].description}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
