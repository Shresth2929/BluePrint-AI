import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, Eye, Download, Share2, ArrowLeft, Calendar } from "lucide-react";
import { DEMO_RENDERS, getRenderStyleConfig, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Render Detail — Blueprint AI",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CommunityDetailPage({ params }: Props) {
  const { id } = await params;
  const render = DEMO_RENDERS.find((r) => r.id === id);

  if (!render) notFound();

  const styleConfig = getRenderStyleConfig(render.style);
  const relatedRenders = DEMO_RENDERS.filter((r) => r.id !== id && r.style === render.style).slice(0, 4);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/community"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Community
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Image */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden border border-violet-500/10 shadow-2xl shadow-indigo-950/40">
              <Image
                src={render.imageUrl}
                alt={render.title}
                width={800}
                height={600}
                className="w-full object-cover"
                unoptimized
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-4">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/20">
                <Download className="w-4 h-4" />
                Download HD
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white glass border border-white/10 hover:border-violet-500/30 transition-all">
                <Heart className="w-4 h-4" />
                {render.likes.toLocaleString()}
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white glass border border-white/10 hover:border-violet-500/30 transition-all">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h1 className="text-xl font-display font-bold text-white mb-2">{render.title}</h1>
              <p className="text-slate-400 text-sm mb-4">A stunning {styleConfig.label.toLowerCase()} render generated with Blueprint AI.</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Style</span>
                  <span className="text-white font-medium">{styleConfig.emoji} {styleConfig.label}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Author</span>
                  <span className="text-white font-medium">@{render.author}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Likes</span>
                  <span className="flex items-center gap-1 text-white font-medium">
                    <Heart className="w-3.5 h-3.5 text-pink-400" />
                    {render.likes.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Views</span>
                  <span className="flex items-center gap-1 text-white font-medium">
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    {(render.likes * 2.3 | 0).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {styleConfig.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-full glass border border-white/10 text-xs text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="glass-card rounded-2xl p-6 border border-violet-500/15">
              <p className="text-white font-medium mb-2">Create similar renders</p>
              <p className="text-slate-400 text-sm mb-4">Upload your floor plan and generate architectural renders like this.</p>
              <Link
                href="/sign-up"
                className="block w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/20"
              >
                Start Free — 5 renders
              </Link>
            </div>
          </div>
        </div>

        {/* Related renders */}
        {relatedRenders.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-display font-semibold text-white mb-4">
              More {styleConfig.label} renders
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedRenders.map((r) => (
                <Link key={r.id} href={`/community/${r.id}`} className="block group">
                  <div className="rounded-xl overflow-hidden">
                    <Image
                      src={r.imageUrl}
                      alt={r.title}
                      width={300}
                      height={200}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <p className="text-white text-xs font-medium mt-2 truncate">{r.title}</p>
                  <p className="text-slate-600 text-xs">@{r.author}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
