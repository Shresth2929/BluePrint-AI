import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { RenderStyle, RenderStyleConfig } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diff = now.getTime() - then.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export const RENDER_STYLES: RenderStyleConfig[] = [
  {
    id: "MODERN_LUXURY",
    label: "Modern Luxury",
    description: "High-end finishes, clean lines, premium materials",
    emoji: "✨",
    gradient: "from-amber-500/20 to-yellow-600/20",
    tags: ["marble", "glass", "gold accents", "open plan"],
  },
  {
    id: "MINIMALIST",
    label: "Minimalist",
    description: "Clean, uncluttered spaces with natural light",
    emoji: "◻️",
    gradient: "from-slate-400/20 to-gray-500/20",
    tags: ["white walls", "clean lines", "neutral tones"],
  },
  {
    id: "SCANDINAVIAN",
    label: "Scandinavian",
    description: "Warm woods, cozy textures, functional beauty",
    emoji: "🌿",
    gradient: "from-green-500/20 to-emerald-600/20",
    tags: ["wood", "hygge", "neutral palette", "plants"],
  },
  {
    id: "CYBERPUNK",
    label: "Cyberpunk",
    description: "Neon lights, tech aesthetics, urban futurism",
    emoji: "⚡",
    gradient: "from-cyan-500/20 to-purple-600/20",
    tags: ["neon", "dark", "tech", "urban"],
  },
  {
    id: "JAPANESE_ZEN",
    label: "Japanese Zen",
    description: "Wabi-sabi, natural materials, peaceful harmony",
    emoji: "🏯",
    gradient: "from-red-500/20 to-orange-600/20",
    tags: ["bamboo", "stone", "water features", "zen garden"],
  },
  {
    id: "INDUSTRIAL",
    label: "Industrial",
    description: "Raw concrete, exposed steel, urban warehouse feel",
    emoji: "🏭",
    gradient: "from-zinc-500/20 to-stone-600/20",
    tags: ["concrete", "steel", "brick", "exposed pipes"],
  },
  {
    id: "FUTURISTIC",
    label: "Futuristic",
    description: "Sleek surfaces, smart tech, tomorrow's living",
    emoji: "🚀",
    gradient: "from-indigo-500/20 to-violet-600/20",
    tags: ["smart home", "LED strips", "curved walls", "floating"],
  },
  {
    id: "MEDITERRANEAN",
    label: "Mediterranean",
    description: "Terracotta, arches, warm colors, outdoor living",
    emoji: "🌊",
    gradient: "from-blue-500/20 to-teal-600/20",
    tags: ["terracotta", "arches", "warm tones", "courtyard"],
  },
];

export function getRenderStyleConfig(style: RenderStyle): RenderStyleConfig {
  return RENDER_STYLES.find((s) => s.id === style) ?? RENDER_STYLES[0];
}

export function generateShareUrl(renderId: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return `${baseUrl}/community/${renderId}`;
}

export function formatCredits(credits: number): string {
  if (credits === 0) return "No credits";
  if (credits === 1) return "1 credit";
  return `${credits} credits`;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const DEMO_RENDERS = [
  {
    id: "demo-1",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    style: "MODERN_LUXURY" as RenderStyle,
    title: "Luxury Penthouse Suite",
    author: "architect_maya",
    likes: 2847,
  },
  {
    id: "demo-2",
    imageUrl: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    style: "MINIMALIST" as RenderStyle,
    title: "Zen Living Space",
    author: "studio_blanc",
    likes: 1923,
  },
  {
    id: "demo-3",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    style: "SCANDINAVIAN" as RenderStyle,
    title: "Nordic Cozy Retreat",
    author: "fjord_design",
    likes: 3102,
  },
  {
    id: "demo-4",
    imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    style: "FUTURISTIC" as RenderStyle,
    title: "Smart Home 2040",
    author: "future_arch",
    likes: 4211,
  },
  {
    id: "demo-5",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    style: "JAPANESE_ZEN" as RenderStyle,
    title: "Kyoto Garden House",
    author: "zen_studio",
    likes: 2654,
  },
  {
    id: "demo-6",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    style: "INDUSTRIAL" as RenderStyle,
    title: "Brooklyn Loft",
    author: "urban_makers",
    likes: 1876,
  },
  {
    id: "demo-7",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    style: "MEDITERRANEAN" as RenderStyle,
    title: "Santorini Villa",
    author: "greek_arch",
    likes: 5438,
  },
  {
    id: "demo-8",
    imageUrl: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    style: "CYBERPUNK" as RenderStyle,
    title: "Neo-Tokyo Apartment",
    author: "cyber_spaces",
    likes: 3891,
  },
  {
    id: "demo-9",
    imageUrl: "https://images.unsplash.com/photo-1600573472556-e636c2acda88?w=800&q=80",
    style: "MODERN_LUXURY" as RenderStyle,
    title: "Glass Cube Residence",
    author: "clear_vision",
    likes: 2199,
  },
  {
    id: "demo-10",
    imageUrl: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80",
    style: "MINIMALIST" as RenderStyle,
    title: "White Cube Gallery Home",
    author: "pure_form",
    likes: 1654,
  },
  {
    id: "demo-11",
    imageUrl: "https://images.unsplash.com/photo-1630699144867-37acec97df5a?w=800&q=80",
    style: "SCANDINAVIAN" as RenderStyle,
    title: "Forest Cabin Retreat",
    author: "nature_arch",
    likes: 3765,
  },
  {
    id: "demo-12",
    imageUrl: "https://images.unsplash.com/photo-1600210491892-03d54741d176?w=800&q=80",
    style: "MEDITERRANEAN" as RenderStyle,
    title: "Amalfi Coast Villa",
    author: "bella_design",
    likes: 4892,
  },
];
