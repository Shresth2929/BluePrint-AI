import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        mono: ["monospace"],
      },
      colors: {
        blueprint: {
          void: "#050816",
          slate: "#0f172a",
          indigo: "#6366f1",
          violet: "#8b5cf6",
          purple: "#a855f7",
          cyan: "#06b6d4",
        },
      },
    },
  },
  plugins: [],
};

export default config;
