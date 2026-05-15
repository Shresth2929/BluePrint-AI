"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ArrowRight } from "lucide-react";
import { DEMO_RENDERS } from "@/lib/utils";

export default function CommunityShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Split into columns for masonry effect
  const col1 = DEMO_RENDERS.filter((_, i) => i % 3 === 0);
  const col2 = DEMO_RENDERS.filter((_, i) => i % 3 === 1);
  const col3 = DEMO_RENDERS.filter((_, i) => i % 3 === 2);

  const RenderCard = ({ render, delay }: { render: typeof DEMO_RENDERS[0]; delay: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="relative rounded-xl overflow-hidden group cursor-pointer mb-4"
      onMouseEnter={() => setHoveredId(render.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <div className="relative">
        <Image
          src={render.imageUrl}
          alt={render.title}
          width={400}
          height={300}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ height: "auto" }}
          unoptimized
        />

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: hoveredId === render.id ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />

        {/* Content overlay */}
        <motion.div
          className="absolute inset-0 p-4 flex flex-col justify-end"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: hoveredId === render.id ? 1 : 0, y: hoveredId === render.id ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-white font-semibold text-sm mb-1">{render.title}</p>
          <p className="text-slate-400 text-xs mb-3">@{render.author}</p>
          <div className="flex items-center gap-3 text-xs text-white/70">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-pink-400" />
              {render.likes.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3 text-cyan-400" />
              {Math.floor(render.likes * 2.3).toLocaleString()}
            </span>
            <span className="ml-auto px-2 py-0.5 rounded-full glass text-[10px] border border-white/10">
              {render.style.replace(/_/g, " ")}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <section id="showcase" ref={ref} className="py-24 relative overflow-hidden">
      <div className="aurora-blob-2 w-96 h-96 bg-purple-600/8 top-1/4 -right-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-pink-500/20 text-xs text-pink-300 font-medium mb-4 uppercase tracking-widest">
            Community
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Built by{" "}
            <span className="gradient-text">the community</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Explore thousands of AI-generated architectural renders from designers worldwide.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>{col1.map((r, i) => <RenderCard key={r.id} render={r} delay={i * 0.07} />)}</div>
          <div className="mt-8">{col2.map((r, i) => <RenderCard key={r.id} render={r} delay={i * 0.07 + 0.1} />)}</div>
          <div className="hidden lg:block mt-4">{col3.map((r, i) => <RenderCard key={r.id} render={r} delay={i * 0.07 + 0.2} />)}</div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/community"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-xl glass border border-violet-500/20 hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-200"
          >
            Explore all renders
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
