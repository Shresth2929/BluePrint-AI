"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Eye, Search, SlidersHorizontal, TrendingUp, Clock, Sparkles } from "lucide-react";
import { DEMO_RENDERS, RENDER_STYLES } from "@/lib/utils";

const FILTERS = [
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "newest", label: "Newest", icon: Clock },
  { id: "featured", label: "Featured", icon: Sparkles },
];

export default function CommunityClient() {
  const [activeFilter, setActiveFilter] = useState("trending");
  const [activeStyle, setActiveStyle] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRenders = DEMO_RENDERS.filter(render => {
    const matchesSearch = render.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          render.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStyle = activeStyle ? render.style === activeStyle : true;
    return matchesSearch && matchesStyle;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#050816]/80 backdrop-blur-xl sticky top-0 z-20 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-display font-semibold text-white">Community Showcase</h1>
              <p className="text-slate-500 text-sm">Explore AI architectural renders from architects worldwide</p>
            </div>

            {/* Search */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search renders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-colors"
                />
              </div>
              <button className="p-2 rounded-xl glass border border-white/10 text-slate-400 hover:text-white transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                      : "text-slate-500 hover:text-slate-300 glass border border-white/5"
                  }`}
                >
                  <filter.icon className="w-3 h-3" />
                  {filter.label}
                  {isActive && (
                    <motion.div layoutId="filter-active" className="absolute inset-0 rounded-lg border border-violet-500/30 -z-10" />
                  )}
                </button>
              );
            })}

            <div className="w-px h-4 bg-white/10 mx-2 flex-shrink-0" />

            {/* Style filters */}
            {RENDER_STYLES.slice(0, 4).map((style) => {
              const isActive = activeStyle === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => setActiveStyle(isActive ? null : style.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-cyan-600/20 text-cyan-300 border border-cyan-500/30"
                      : "text-slate-500 hover:text-slate-300 glass border border-white/5"
                  }`}
                >
                  {style.emoji} {style.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="popLayout">
          {filteredRenders.length > 0 ? (
            <motion.div 
              layout
              className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-0"
            >
              {filteredRenders.map((render, i) => (
                <motion.div
                  key={render.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="block break-inside-avoid mb-4 group"
                >
                  <Link href={`/community/${render.id}`}>
                    <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-white/5 group-hover:border-violet-500/30 transition-colors">
                      <Image
                        src={render.imageUrl}
                        alt={render.title}
                        width={400}
                        height={i % 3 === 0 ? 500 : 320}
                        className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwZjE3MmEiLz48L3N2Zz4="
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex justify-end">
                          <button className="w-8 h-8 rounded-full glass flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors">
                            <Heart className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div>
                          <p className="text-white font-semibold text-sm mb-1">{render.title}</p>
                          <p className="text-slate-400 text-xs mb-2">@{render.author}</p>
                          <div className="flex items-center gap-3 text-xs text-white/60">
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3 text-pink-400" />
                              {render.likes.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3 text-cyan-400" />
                              {(render.likes * 2.3 | 0).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Below card info (always visible) */}
                    <div className="px-1 py-2">
                      <p className="text-white text-xs font-medium truncate group-hover:text-violet-300 transition-colors">{render.title}</p>
                      <p className="text-slate-600 text-[10px]">@{render.author}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="py-20 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
                <Search className="w-6 h-6 text-slate-500" />
              </div>
              <h3 className="text-white font-semibold mb-2">No renders found</h3>
              <p className="text-slate-500 text-sm">Try adjusting your filters or search term</p>
              <button 
                onClick={() => { setSearchQuery(""); setActiveStyle(null); }}
                className="mt-4 px-4 py-2 rounded-lg text-sm bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load more */}
        {filteredRenders.length > 0 && (
          <div className="text-center mt-10">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white glass border border-white/10 hover:border-violet-500/30 hover:bg-violet-500/10 transition-all btn-glow">
              <Sparkles className="w-4 h-4 text-violet-400" />
              Load More Renders
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
