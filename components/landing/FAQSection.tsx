"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "How does Blueprint AI transform floor plans into renders?",
    a: "Blueprint AI uses Google's Gemini AI to analyze your uploaded floor plan or sketch. It identifies room layouts, spatial relationships, and architectural features, then generates a detailed render prompt that produces photorealistic 3D architectural visualizations matching your chosen style.",
  },
  {
    q: "What file formats can I upload?",
    a: "You can upload JPG, PNG, WebP, and PDF files. Our AI works with hand-drawn sketches, CAD exports, scanned blueprints, and even photos of physical plans. The higher the image quality, the more accurate the render.",
  },
  {
    q: "How long does it take to generate a render?",
    a: "Most renders complete in 15-45 seconds depending on complexity and server load. Pro users get priority queue access, reducing wait times to under 10 seconds during peak usage.",
  },
  {
    q: "Can I use the renders for commercial purposes?",
    a: "Yes! All renders generated on Blueprint AI are yours to use commercially. You retain full IP rights to your renders. We only ask that you don't claim the AI as a human artist.",
  },
  {
    q: "What architectural styles are available?",
    a: "We offer 8 curated styles: Modern Luxury, Minimalist, Scandinavian, Cyberpunk, Japanese Zen, Industrial, Futuristic, and Mediterranean. Each style has been carefully engineered with specific materials, lighting conditions, and aesthetic rules.",
  },
  {
    q: "Is my uploaded floor plan kept private?",
    a: "Absolutely. Your floor plans and renders are private by default. You choose what to share publicly on the community showcase. We use Cloudinary with secure, encrypted storage and never use your plans to train AI models without explicit consent.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes, cancel anytime with no penalties. Your Pro access continues until the end of your billing period. Your projects and renders remain accessible on the Free tier after cancellation.",
  },
  {
    q: "Do you offer a team or agency plan?",
    a: "Our Enterprise plan supports teams of any size with collaboration tools, shared project workspaces, and custom render styles. Contact us for custom pricing and a personalized demo.",
  },
];

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-indigo-500/20 text-xs text-indigo-300 font-medium mb-4 uppercase tracking-widest">
            FAQ
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Common{" "}
            <span className="gradient-text">questions</span>
          </h2>
          <p className="text-slate-400">
            Everything you need to know about Blueprint AI.
          </p>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-card rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-white font-medium text-sm pr-8 group-hover:text-violet-200 transition-colors">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <Plus className="w-4 h-4 text-violet-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
