"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Principal Architect",
    company: "Studio Morphe",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786",
    content: "Blueprint AI has completely transformed how I present concepts to clients. What used to take 3 days in CAD now takes 30 seconds. The quality is indistinguishable from traditional renders.",
    rating: 5,
  },
  {
    name: "Marcus Williams",
    role: "Interior Designer",
    company: "Luxe Interiors NYC",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    content: "The Japanese Zen and Scandinavian styles are absolutely breathtaking. My clients are blown away every time. Blueprint AI pays for itself on the first project.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Real Estate Developer",
    company: "Horizon Properties",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
    content: "We use Blueprint AI for all our pre-sale marketing. The photorealistic renders help buyers visualize the finished product. Sales have increased 40% since we started using it.",
    rating: 5,
  },
  {
    name: "Tom Eriksson",
    role: "Architectural Student",
    company: "KTH Stockholm",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    content: "As a student with no budget for rendering software, Blueprint AI is a game-changer. I can iterate on designs in real-time and my professors are always impressed.",
    rating: 5,
  },
  {
    name: "Amara Osei",
    role: "Design Director",
    company: "Osei & Partners",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    content: "The community showcase alone is worth the subscription. Getting inspired by global architectural trends and sharing our work has opened doors to international clients.",
    rating: 5,
  },
  {
    name: "James Nakamura",
    role: "Urban Planner",
    company: "Tokyo Metropolitan",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    content: "Blueprint AI understands architectural context in a way no other tool does. The Futuristic style renders our smart city concepts perfectly for stakeholder presentations.",
    rating: 5,
  },
  {
    name: "Elena Rossi",
    role: "Landscape Architect",
    company: "Verde Studio Milano",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    content: "The Mediterranean style captures the essence of our Italian villa projects beautifully. It's like having a world-class render artist available 24/7.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Founder",
    company: "Park Architecture Seoul",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    content: "We've replaced our entire rendering pipeline with Blueprint AI. 10x faster, 5x cheaper, and the quality is honestly better than what we were getting from traditional artists.",
    rating: 5,
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="glass-card rounded-2xl p-6 w-80 flex-shrink-0 mx-2">
      <Quote className="w-6 h-6 text-violet-400/40 mb-4" />
      <p className="text-slate-300 text-sm leading-relaxed mb-5">"{t.content}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 relative">
          <Image src={t.avatar} alt={t.name} fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate">{t.name}</p>
          <p className="text-slate-500 text-xs truncate">{t.role}, {t.company}</p>
        </div>
        <div className="flex gap-0.5">
          {[...Array(t.rating)].map((_, i) => (
            <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const doubledTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-amber-500/20 text-xs text-amber-300 font-medium mb-4 uppercase tracking-widest">
            Testimonials
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Loved by{" "}
            <span className="gradient-text">architects</span>
            <br />worldwide
          </h2>
        </motion.div>
      </div>

      {/* Marquee row 1 */}
      <div className="marquee-container mb-4">
        <div className="marquee-track">
          {doubledTestimonials.slice(0, 8).map((t, i) => (
            <TestimonialCard key={`r1-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 (reversed) */}
      <div className="marquee-container">
        <div className="marquee-track" style={{ animationDirection: "reverse" }}>
          {doubledTestimonials.slice(8, 16).map((t, i) => (
            <TestimonialCard key={`r2-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050816] to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050816] to-transparent pointer-events-none z-10" />
    </section>
  );
}
