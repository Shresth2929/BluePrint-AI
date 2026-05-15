"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, TrendingUp, Layers, Heart, ArrowRight, Plus } from "lucide-react";
import { DEMO_RENDERS } from "@/lib/utils";

const ANALYTICS = [
  { label: "Total Renders", value: "0", icon: Layers, color: "text-violet-400", bg: "bg-violet-500/10", trend: "+0%" },
  { label: "Projects", value: "0", icon: TrendingUp, color: "text-cyan-400", bg: "bg-cyan-500/10", trend: "+0%" },
  { label: "Credits Left", value: "5", icon: Sparkles, color: "text-amber-400", bg: "bg-amber-500/10", trend: "Free tier" },
  { label: "Community Likes", value: "0", icon: Heart, color: "text-pink-400", bg: "bg-pink-500/10", trend: "+0%" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

interface DashboardClientProps {
  firstName: string;
  dateStr: string;
}

export default function DashboardClient({ firstName, dateStr }: DashboardClientProps) {
  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">
          Welcome back, {firstName} 👋
        </h1>
        <p className="text-slate-400 text-sm">{dateStr}</p>
      </motion.div>

      {/* Quick Generate CTA */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-card rounded-2xl p-6 mb-8 relative overflow-hidden border border-violet-500/20 card-hover-lift"
      >
        <div className="aurora-blob-1 w-64 h-64 bg-violet-600/15 -top-10 -right-10 pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-violet-400" />
              <h2 className="text-white font-semibold text-lg">Generate Your First Render</h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md">
              Upload a floor plan and let Blueprint AI transform it into a photorealistic architectural render in under 30 seconds.
            </p>
          </div>
          <Link
            href="/dashboard/generate"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/25"
          >
            <Plus className="w-4 h-4" />
            New Render
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* Analytics Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {ANALYTICS.map((stat) => (
          <motion.div key={stat.label} variants={itemVariants} className="glass-card rounded-xl p-5 card-hover-lift">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-4.5 h-4.5 ${stat.color}`} />
              </div>
              <span className="text-xs text-slate-500 font-medium">{stat.trend}</span>
            </div>
            <p className="text-2xl font-display font-bold text-white mb-0.5">{stat.value}</p>
            <p className="text-slate-500 text-xs">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Renders */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Recent Renders</h3>
            <Link href="/dashboard/projects" className="text-xs text-slate-500 hover:text-violet-400 transition-colors flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Empty state */}
          <div className="glass-card rounded-xl p-12 text-center border-dashed border-2 border-white/5 bg-gradient-to-b from-white/5 to-transparent">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4 float-1">
              <Sparkles className="w-7 h-7 text-violet-400" />
            </div>
            <h4 className="text-white font-medium mb-2">No renders yet</h4>
            <p className="text-slate-500 text-sm mb-5">Upload your first floor plan to get started</p>
            <Link
              href="/dashboard/generate"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-300 text-sm hover:bg-violet-600/30 transition-colors btn-glow"
            >
              <Sparkles className="w-4 h-4" />
              Generate a Render
            </Link>
          </div>
        </motion.div>

        {/* Trending from community */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Trending</h3>
            <Link href="/community" className="text-xs text-slate-500 hover:text-violet-400 transition-colors flex items-center gap-1">
              Community <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-3">
            {DEMO_RENDERS.slice(0, 4).map((render) => (
              <motion.div key={render.id} variants={itemVariants} className="flex items-center gap-3 glass-card rounded-xl p-3 group cursor-pointer hover:bg-white/5 transition-all">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={render.imageUrl}
                    alt={render.title}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-medium truncate group-hover:text-violet-300 transition-colors">{render.title}</p>
                  <p className="text-slate-500 text-xs">@{render.author}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Heart className="w-3 h-3 text-pink-400" />
                  {render.likes.toLocaleString()}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
