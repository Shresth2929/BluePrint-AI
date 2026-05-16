"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { toast } from "sonner";
import {
  Upload, Sparkles, ChevronRight, ChevronLeft, Download,
  Share2, Check, Loader2, AlertCircle, RefreshCw, ImageIcon
} from "lucide-react";
import { useGenerationStore } from "@/store/useGenerationStore";
import { RENDER_STYLES } from "@/lib/utils";
import type { RenderStyle } from "@/types";

const STEPS = ["Upload", "Style", "Customize", "Generate", "Result"];

// ── Step 1: Upload ────────────────────────────────────────────────
function UploadStep({ onNext }: { onNext: () => void }) {
  const setInputImage = useGenerationStore((s) => s.setInputImage);
  const inputImageUrl = useGenerationStore((s) => s.inputImageUrl);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG, PNG, WebP)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be under 10MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const base64 = dataUrl.split(",")[1];
      setInputImage(dataUrl, base64, file.type);
    };
    reader.readAsDataURL(file);
  }, [setInputImage]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-display font-semibold text-white mb-1">Upload your floor plan</h2>
        <p className="text-slate-400 text-sm">JPG, PNG, WebP, or PDF — hand-drawn sketches or CAD exports work great</p>
      </div>

      <div
        className={`relative rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-200 cursor-pointer ${
          isDragging
            ? "border-violet-400 bg-violet-500/10"
            : inputImageUrl
              ? "border-emerald-500/40 bg-emerald-500/5"
              : "border-white/10 hover:border-violet-500/30 hover:bg-violet-500/5"
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !inputImageUrl && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
        />

        {inputImageUrl ? (
          <div className="space-y-4">
            <div className="relative mx-auto max-w-xs rounded-xl overflow-hidden">
              <Image
                src={inputImageUrl}
                alt="Uploaded floor plan"
                width={320}
                height={240}
                className="object-contain w-full"
                unoptimized
              />
            </div>
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-medium">
              <Check className="w-4 h-4" />
              Floor plan uploaded successfully
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Click to replace
            </button>
          </div>
        ) : (
          <div>
            <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-violet-400" />
            </div>
            <p className="text-white font-medium mb-1">
              {isDragging ? "Drop it here!" : "Drag & drop your floor plan"}
            </p>
            <p className="text-slate-500 text-sm mb-4">or click to browse files</p>
            <div className="flex items-center justify-center gap-3 text-xs text-slate-600">
              <span>JPG</span><span>•</span><span>PNG</span><span>•</span><span>WebP</span><span>•</span><span>Max 10MB</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!inputImageUrl}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-500/20"
        >
          Continue <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ── Step 2: Style Selection ───────────────────────────────────────
function StyleStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const selectedStyle = useGenerationStore((s) => s.selectedStyle);
  const setSelectedStyle = useGenerationStore((s) => s.setSelectedStyle);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-display font-semibold text-white mb-1">Choose your render style</h2>
        <p className="text-slate-400 text-sm">Select the architectural aesthetic for your visualization</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {RENDER_STYLES.map((style) => (
          <motion.button
            key={style.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedStyle(style.id as RenderStyle)}
            className={`relative p-4 rounded-xl text-left border transition-all duration-200 ${
              selectedStyle === style.id
                ? "border-violet-500/60 bg-violet-500/15 shadow-lg shadow-violet-950/30"
                : "border-white/5 glass hover:border-white/15"
            }`}
          >
            {selectedStyle === style.id && (
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-violet-500 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-white" />
              </div>
            )}
            <div className={`text-2xl mb-3`}>{style.emoji}</div>
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${style.gradient} opacity-60 -z-10`} />
            <p className="text-white text-xs font-semibold mb-1">{style.label}</p>
            <p className="text-slate-500 text-[10px] leading-relaxed">{style.description}</p>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="inline-flex items-center gap-2 px-4 py-2.5 text-sm text-slate-400 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/20"
        >
          Continue <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ── Step 3: Customize ─────────────────────────────────────────────
function CustomizeStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const prompt = useGenerationStore((s) => s.prompt);
  const setPrompt = useGenerationStore((s) => s.setPrompt);

  const SUGGESTIONS = [
    "Open plan living with floor-to-ceiling windows",
    "Warm ambient lighting, evening mood",
    "Include a chef's kitchen with island",
    "Add a rooftop terrace with city views",
    "Integrate natural wood and stone elements",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-display font-semibold text-white mb-1">Customize your render</h2>
        <p className="text-slate-400 text-sm">Add specific details to guide the AI (optional but recommended)</p>
      </div>

      <div>
        <label className="block text-sm text-slate-300 font-medium mb-2">Custom prompt</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe specific features, materials, lighting conditions, or atmosphere you want..."
          className="w-full h-28 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 resize-none transition-colors"
        />
        <p className="text-xs text-slate-600 mt-1">{prompt.length}/500 characters</p>
      </div>

      <div>
        <p className="text-xs text-slate-500 font-medium mb-3 uppercase tracking-wider">Quick suggestions</p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setPrompt(prompt ? `${prompt}, ${s}` : s)}
              className="px-3 py-1.5 text-xs rounded-lg glass border border-white/10 text-slate-400 hover:text-white hover:border-violet-500/30 transition-all"
            >
              + {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="inline-flex items-center gap-2 px-4 py-2.5 text-sm text-slate-400 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/20"
        >
          Generate Render <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ── Step 4: Generating ────────────────────────────────────────────
const GENERATION_STAGES = [
  { label: "Uploading floor plan...", progress: 20, duration: 1500 },
  { label: "Analyzing spatial layout...", progress: 40, duration: 2000 },
  { label: "Crafting render prompt...", progress: 60, duration: 1500 },
  { label: "Generating architectural render...", progress: 85, duration: 4000 },
  { label: "Finalizing high-resolution output...", progress: 95, duration: 1500 },
];

function GeneratingStep({ onComplete, onError }: { onComplete: (url: string) => void; onError: () => void }) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const { inputImageBase64, inputMimeType, selectedStyle, prompt } = useGenerationStore((s) => s);

  const runGeneration = useCallback(async () => {
    if (started) return;
    setStarted(true);

    // Animate through stages slowly
    const stageIntervals = [1500, 2000, 1500, 4000, 1500];
    
    // Non-blocking stage progression
    (async () => {
      for (let i = 0; i < GENERATION_STAGES.length; i++) {
        setStage(i);
        setProgress(GENERATION_STAGES[i].progress);
        await new Promise((r) => setTimeout(r, stageIntervals[i]));
      }
    })();

    // Call the API
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: inputImageBase64,
          mimeType: inputMimeType,
          style: selectedStyle,
          prompt,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Generation failed");
      }
      const data = await response.json();
      setProgress(100);
      setStage(GENERATION_STAGES.length - 1);
      await new Promise((r) => setTimeout(r, 800)); // allow progress bar to hit 100%
      onComplete(data.outputImageUrl ?? data.demoUrl);
    } catch (err: any) {
      toast.error(err.message || "Generation failed. Please try again.");
      onError();
    }
  }, [started, inputImageBase64, inputMimeType, selectedStyle, prompt, onComplete, onError]);

  // Start on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { runGeneration(); }, []);

  return (
    <div className="py-16 text-center space-y-10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Cinematic Radar/Scan animation */}
      <div className="relative w-32 h-32 mx-auto">
        {/* Radar circles */}
        <div className="absolute inset-0 rounded-full border border-violet-500/10" />
        <div className="absolute inset-4 rounded-full border border-violet-500/20" />
        <div className="absolute inset-8 rounded-full border border-violet-500/30" />
        
        {/* Pulsing rings */}
        <div className="absolute inset-0 rounded-full border border-violet-400/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
        <div className="absolute inset-2 rounded-full border border-indigo-400/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" style={{ animationDelay: "1s" }} />
        
        {/* Scanner sweep */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-violet-500/40 to-transparent origin-right animate-[spin_3s_linear_infinite]" />
        </div>

        {/* Center core */}
        <div className="absolute inset-10 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.5)] z-10">
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
        </div>
      </div>

      <div className="relative z-10">
        <motion.h3 
          key={stage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white font-display font-semibold text-2xl mb-2"
        >
          {GENERATION_STAGES[stage]?.label ?? "Finalizing..."}
        </motion.h3>
        <p className="text-violet-300/70 text-sm animate-pulse">Processing via Blueprint AI Engine</p>
      </div>

      {/* Progress bar */}
      <div className="max-w-md mx-auto relative z-10">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-mono">
          <span>{progress.toFixed(0)}%</span>
          <span>{stage + 1}/{GENERATION_STAGES.length}</span>
        </div>
        <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5 p-0.5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 relative"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] w-1/2 -translate-x-full animate-[shimmer_1.5s_infinite]" />
          </motion.div>
        </div>
      </div>

      <p className="text-slate-600 text-xs font-mono relative z-10 mt-8 opacity-60">ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
    </div>
  );
}

// ── Step 5: Result ────────────────────────────────────────────────
function ResultStep({ outputUrl, onReset }: { outputUrl: string; onReset: () => void }) {
  const { inputImageUrl, selectedStyle } = useGenerationStore((s) => s);
  const style = RENDER_STYLES.find((s) => s.id === selectedStyle);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = outputUrl;
    link.download = `blueprint-ai-render-${Date.now()}.jpg`;
    link.click();
    toast.success("Downloading your render...");
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: "Blueprint AI Render", url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <Check className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-lg font-display font-semibold text-white">Your render is ready!</h2>
          <p className="text-slate-400 text-sm">Style: {style?.label} {style?.emoji}</p>
        </div>
      </div>

      {/* Before/After */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wider">📐 Original Floor Plan</p>
          <div className="rounded-xl overflow-hidden border border-white/10">
            {inputImageUrl && (
              <Image
                src={inputImageUrl}
                alt="Floor plan"
                width={400}
                height={300}
                className="w-full object-contain"
                unoptimized
              />
            )}
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wider">✨ AI Architectural Render</p>
          <div className="rounded-xl overflow-hidden border border-violet-500/20 shadow-lg shadow-violet-950/30">
            <Image
              src={outputUrl}
              alt="AI Render"
              width={400}
              height={300}
              className="w-full object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/20"
        >
          <Download className="w-4 h-4" />
          Download HD
        </button>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white glass border border-white/10 hover:border-violet-500/30 transition-all"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          New Render
        </button>
      </div>
    </div>
  );
}

// ── Main Generate Page ─────────────────────────────────────────────
export default function GeneratePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const reset = useGenerationStore((s) => s.reset);

  const handleComplete = (url: string) => {
    setOutputUrl(url);
    setCurrentStep(4);
  };

  const handleError = () => setCurrentStep(2);

  const handleReset = () => {
    reset();
    setOutputUrl(null);
    setCurrentStep(0);
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">AI Render Generation</h1>
        <p className="text-slate-400 text-sm">Transform your floor plan into a photorealistic architectural render</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-0 mb-10 overflow-x-auto pb-2">
        {STEPS.map((step, i) => (
          <div key={step} className="flex items-center flex-shrink-0">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              i === currentStep
                ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                : i < currentStep
                  ? "text-emerald-400"
                  : "text-slate-600"
            }`}>
              {i < currentStep ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">{i + 1}</span>
              )}
              {step}
            </div>
            {i < STEPS.length - 1 && (
              <ChevronRight className="w-4 h-4 text-slate-700 mx-1" />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {currentStep === 0 && <UploadStep onNext={() => setCurrentStep(1)} />}
            {currentStep === 1 && <StyleStep onNext={() => setCurrentStep(2)} onBack={() => setCurrentStep(0)} />}
            {currentStep === 2 && <CustomizeStep onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />}
            {currentStep === 3 && <GeneratingStep onComplete={handleComplete} onError={handleError} />}
            {currentStep === 4 && outputUrl && <ResultStep outputUrl={outputUrl} onReset={handleReset} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
