"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Play, Star } from "lucide-react";

const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    label: "Modern Luxury",
    style: "MODERN_LUXURY",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    label: "Scandinavian",
    style: "SCANDINAVIAN",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    label: "Futuristic",
    style: "FUTURISTIC",
  },
];

const FLOATING_CARDS = [
  { label: "Interior Render", time: "2.3s", src: "https://images.unsplash.com/photo-1600210492493-0946911123ea" },
  { label: "Exterior View", time: "1.8s", src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
  { label: "Floor Plan AI", time: "2.1s", src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7" },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  const [activeImage, setActiveImage] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Cycle hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Mouse glow follow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Dynamic mouse glow */}
      <motion.div
        className="pointer-events-none absolute z-0 w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)",
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          filter: "blur(40px)",
        }}
        animate={{ left: mousePos.x - 192, top: mousePos.y - 192 }}
        transition={{ type: "spring", stiffness: 150, damping: 30 }}
      />

      {/* Aurora blobs */}
      <div className="aurora-blob-1 w-[800px] h-[800px] bg-violet-600/10 -top-40 -left-40" />
      <div className="aurora-blob-2 w-[600px] h-[600px] bg-indigo-600/8 top-1/2 -right-20" />
      <div className="aurora-blob-3 w-[400px] h-[400px] bg-cyan-500/6 bottom-0 left-1/4" />

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Radial fade overlay */}
      <div className="absolute inset-0 bg-radial-gradient"
        style={{
          background: "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 0%, #050816 90%)"
        }}
      />

      <motion.div
        style={{ y: springY }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-violet-500/20 text-sm text-violet-300 font-medium mb-8"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Powered by Gemini AI — Now in Beta
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

        {/* Hero Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-[1.05] mb-6"
        >
          Transform 2D{" "}
          <br className="hidden sm:block" />
          <span className="gradient-text">Floor Plans</span>
          <br />
          Into Cinematic
          <br />
          <span className="relative inline-block">
            <span className="gradient-text-cyan">AI Renders</span>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
            />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Upload your architectural sketch or floor plan. Our AI instantly generates
          photorealistic 3D renders, interior visualizations, and cinematic architectural imagery.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/sign-up"
            className="relative group inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-0.5 btn-glow"
          >
            <Sparkles className="w-4 h-4" />
            Start Generating Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/#showcase"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-medium text-slate-300 hover:text-white rounded-xl glass border border-white/10 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 text-violet-400" />
            View Gallery
          </Link>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex items-center justify-center gap-6 mb-16 text-sm text-slate-500"
        >
          <div className="flex -space-x-2">
            {[
              "https://images.unsplash.com/photo-1494790108755-2616b612b786",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
              "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
              "https://images.unsplash.com/photo-1580489944761-15a19d654956",
            ].map((src, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050816] overflow-hidden">
                <Image src={src} alt="user" width={32} height={32} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span>12,000+ architects trust Blueprint AI</span>
          </div>
        </motion.div>

        {/* Hero Image Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Main showcase card */}
          <div className="relative rounded-2xl overflow-hidden border border-violet-500/20 shadow-2xl shadow-indigo-950/50 glass-card">
            {/* Top bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              </div>
              <div className="flex-1 mx-4 py-0.5 px-3 rounded-md bg-white/5 text-xs text-slate-500 text-center">
                blueprint-ai.app/generate
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-400">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Generating...
              </div>
            </div>

            {/* Image display */}
            <div className="relative aspect-[16/9] bg-slate-900">
              {HERO_IMAGES.map((img, i) => (
                <motion.div
                  key={img.src}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: i === activeImage ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className="object-cover"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 glass px-3 py-1.5 rounded-lg text-sm text-white font-medium border border-white/10">
                    ✨ {img.label} Render
                  </div>
                </motion.div>
              ))}

              {/* Image selector dots */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                {HERO_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === activeImage
                        ? "bg-violet-400 w-6"
                        : "bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Floating cards */}
          <div className="hidden lg:block z-20 relative">
            <motion.div
              className="absolute -left-32 top-1/4 w-48 glass-card rounded-xl p-3 border border-violet-500/20 shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-full h-24 rounded-lg overflow-hidden mb-2 relative">
                <Image
                  src={FLOATING_CARDS[0].src}
                  alt="Float 1"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs font-medium text-white">{FLOATING_CARDS[0].label}</p>
              <p className="text-xs text-emerald-400">Generated in {FLOATING_CARDS[0].time}</p>
            </motion.div>

            <motion.div
              className="absolute -right-32 top-1/3 w-48 glass-card rounded-xl p-3 border border-cyan-500/20 shadow-2xl"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="w-full h-24 rounded-lg overflow-hidden mb-2 relative">
                <Image
                  src={FLOATING_CARDS[1].src}
                  alt="Float 2"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs font-medium text-white">{FLOATING_CARDS[1].label}</p>
              <p className="text-xs text-emerald-400">Generated in {FLOATING_CARDS[1].time}</p>
            </motion.div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute -bottom-px left-0 right-0 h-32 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none" />
        </motion.div>
      </motion.div>
    </section>
  );
}
