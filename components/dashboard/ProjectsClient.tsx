"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FolderOpen, Plus, Search, Sparkles } from "lucide-react";

export default function ProjectsClient() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">My Projects</h1>
          <p className="text-slate-400 text-sm">Manage and organize your architectural render projects</p>
        </div>
        <Link
          href="/dashboard/generate"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/20 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Link>
      </motion.div>

      {/* Search & Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6"
      >
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-colors"
          />
        </div>
        <select className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-sm focus:outline-none focus:border-violet-500/50 cursor-pointer">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="renders">Most renders</option>
        </select>
      </motion.div>

      {/* Empty state */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card rounded-2xl p-16 text-center border-dashed border-2 border-white/5 bg-gradient-to-b from-white/5 to-transparent relative overflow-hidden"
      >
        <div className="aurora-blob-2 w-64 h-64 bg-violet-600/10 -top-10 left-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-5 float-1">
            <FolderOpen className="w-8 h-8 text-violet-400" />
          </div>
          <h3 className="text-white font-display font-semibold text-xl mb-3">No projects yet</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
            Create your first project by uploading a floor plan. Each project can contain multiple renders in different styles.
          </p>
          <Link
            href="/dashboard/generate"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/20 btn-glow"
          >
            <Sparkles className="w-4 h-4" />
            Create First Project
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
