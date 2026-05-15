import { create } from "zustand";
import type { GenerationState, RenderStyle } from "@/types";

interface GenerationStore {
  state: GenerationState;
  selectedStyle: RenderStyle;
  prompt: string;
  inputImageUrl: string | null;
  inputImageBase64: string | null;
  inputMimeType: string;

  setSelectedStyle: (style: RenderStyle) => void;
  setPrompt: (prompt: string) => void;
  setInputImage: (url: string, base64: string, mimeType: string) => void;
  setState: (state: Partial<GenerationState>) => void;
  reset: () => void;
}

const initialGenerationState: GenerationState = {
  status: "idle",
  progress: 0,
  message: "",
};

export const useGenerationStore = create<GenerationStore>((set) => ({
  state: initialGenerationState,
  selectedStyle: "MODERN_LUXURY",
  prompt: "",
  inputImageUrl: null,
  inputImageBase64: null,
  inputMimeType: "image/jpeg",

  setSelectedStyle: (style) => set({ selectedStyle: style }),
  setPrompt: (prompt) => set({ prompt }),
  setInputImage: (url, base64, mimeType) =>
    set({ inputImageUrl: url, inputImageBase64: base64, inputMimeType: mimeType }),
  setState: (newState) =>
    set((store) => ({ state: { ...store.state, ...newState } })),
  reset: () =>
    set({
      state: initialGenerationState,
      prompt: "",
      inputImageUrl: null,
      inputImageBase64: null,
      inputMimeType: "image/jpeg",
    }),
}));
