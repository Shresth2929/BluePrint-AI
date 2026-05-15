export type Plan = "FREE" | "PRO" | "ENTERPRISE";

export type RenderStyle =
  | "MODERN_LUXURY"
  | "MINIMALIST"
  | "SCANDINAVIAN"
  | "CYBERPUNK"
  | "JAPANESE_ZEN"
  | "INDUSTRIAL"
  | "FUTURISTIC"
  | "MEDITERRANEAN";

export type RenderStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string | null;
  imageUrl: string | null;
  credits: number;
  plan: Plan;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  inputImageUrl: string;
  style: RenderStyle;
  prompt: string | null;
  renders?: Render[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Render {
  id: string;
  projectId: string;
  userId: string;
  outputImageUrl: string;
  inputImageUrl: string;
  status: RenderStatus;
  style: RenderStyle;
  prompt: string | null;
  metadata?: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommunityPost {
  id: string;
  userId: string;
  user?: {
    name: string | null;
    imageUrl: string | null;
  };
  renderId: string;
  render?: Render;
  title: string;
  description: string | null;
  tags: string[];
  likes: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RenderStyleConfig {
  id: RenderStyle;
  label: string;
  description: string;
  emoji: string;
  gradient: string;
  tags: string[];
}

export interface GenerationState {
  status: "idle" | "uploading" | "analyzing" | "generating" | "saving" | "complete" | "error";
  progress: number;
  message: string;
  inputImageUrl?: string;
  outputImageUrl?: string;
  error?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface PricingTier {
  name: string;
  price: { monthly: number; annual: number };
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  plan: Plan;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}
