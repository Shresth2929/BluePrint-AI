"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Upload, Cpu, Image as ImageIcon, CheckCircle2, ArrowRight } from "lucide-react";

const STEPS = [
  { icon: Upload, label: "Upload Floor Plan", desc: "Drag & drop your sketch or blueprint", color: "text-violet-400", bg: "bg-violet-500/20" },
  { icon: Cpu, label: "AI Analysis", desc: "Gemini AI analyzes your floor plan", color: "text-cyan-400", bg: "bg-cyan-500/20" },
  { icon: ImageIcon, label: "Render Generation", desc: "Photorealistic 3D render created", color: "text-emerald-400", bg: "bg-emerald-500/20" },
  { icon: CheckCircle2, label: "Download & Share", desc: "Export in HD, share instantly", color: "text-amber-400", bg: "bg-amber-500/20" },
];

const BEFORE_AFTER = {
  before: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
  after: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80",
};

export default function InteractiveDemoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [sliderPos, setSliderPos] = useState(50);
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSliderMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(pos, 5), 95));
  };

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="aurora-blob-1 w-96 h-96 bg-indigo-600/8 -top-20 left-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-cyan-500/20 text-xs text-cyan-300 font-medium mb-4 uppercase tracking-widest">
            See It In Action
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            From sketch to{" "}
            <span className="gradient-text-cyan">masterpiece</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Drag the slider to see how Blueprint AI transforms a rough sketch into a cinematic architectural render.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Before/After Slider */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              ref={containerRef}
              className="relative rounded-2xl overflow-hidden border border-violet-500/20 shadow-2xl cursor-ew-resize select-none"
              style={{ aspectRatio: "4/3" }}
              onMouseMove={handleSliderMove}
              onTouchMove={handleSliderMove}
            >
              {/* After image (base) */}
              <Image
                src={BEFORE_AFTER.after}
                alt="AI Render"
                fill
                className="object-cover"
                unoptimized
              />

              {/* Before image (overlay) */}
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
                <Image
                  src={BEFORE_AFTER.before}
                  alt="Floor Plan"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-slate-900/10" />
              </div>

              {/* Slider line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-slate-800 -translate-x-0.5" />
                  <ArrowRight className="w-3 h-3 text-slate-800 rotate-180 translate-x-0.5" />
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 glass px-2.5 py-1 rounded-lg text-xs text-slate-300 font-medium border border-white/10">
                📐 Floor Plan
              </div>
              <div className="absolute top-4 right-4 glass px-2.5 py-1 rounded-lg text-xs text-emerald-300 font-medium border border-emerald-500/20">
                ✨ AI Render
              </div>
            </div>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-display font-semibold text-white mb-6">
              How Blueprint AI works
            </h3>

            {STEPS.map((step, i) => (
              <motion.button
                key={step.label}
                className={`w-full flex items-start gap-4 p-5 rounded-xl text-left transition-all duration-300 ${
                  activeStep === i
                    ? "glass-card border border-violet-500/30 shadow-lg shadow-violet-950/30"
                    : "glass border border-white/5 hover:border-white/10"
                }`}
                onClick={() => setActiveStep(i)}
                whileHover={{ x: 4 }}
              >
                <div className={`w-10 h-10 rounded-lg ${step.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <step.icon className={`w-5 h-5 ${step.color}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-slate-500 font-mono">0{i + 1}</span>
                    <h4 className="text-sm font-semibold text-white">{step.label}</h4>
                  </div>
                  <p className="text-sm text-slate-400">{step.desc}</p>
                </div>
                {activeStep === i && (
                  <motion.div
                    layoutId="step-indicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0"
                  />
                )}
              </motion.button>
            ))}

            <div className="pt-4">
              <a
                href="/sign-up"
                className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors"
              >
                Try it yourself — it's free
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
