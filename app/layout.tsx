import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Blueprint AI — Transform Floor Plans Into Cinematic Architectural Renders",
    template: "%s | Blueprint AI",
  },
  description:
    "Blueprint AI uses generative AI to transform 2D floor plans and architectural sketches into photorealistic 3D renders, interior visualizations, and cinematic architectural imagery.",
  keywords: [
    "architectural visualization",
    "AI renders",
    "floor plan to 3D",
    "architectural AI",
    "interior design AI",
    "generative architecture",
  ],
  authors: [{ name: "Blueprint AI" }],
  creator: "Blueprint AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blueprint-ai.vercel.app",
    title: "Blueprint AI — AI-Powered Architectural Visualization",
    description: "Transform 2D floor plans into photorealistic 3D architectural renders using generative AI.",
    siteName: "Blueprint AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blueprint AI",
    description: "Transform 2D floor plans into cinematic AI-powered architectural renders.",
    creator: "@blueprintai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorBackground: "#0f172a",
          colorPrimary: "#8b5cf6",
          colorText: "#e2e8f0",
          colorTextSecondary: "#94a3b8",
          colorInputBackground: "#1e293b",
          colorInputText: "#e2e8f0",
          borderRadius: "0.75rem",
        },
        elements: {
          card: "shadow-xl border border-violet-500/20 bg-slate-900",
          headerTitle: "text-white font-semibold",
          headerSubtitle: "text-slate-400",
          socialButtonsBlockButton: "bg-slate-800 border-slate-700 hover:bg-slate-700",
          formButtonPrimary: "bg-violet-600 hover:bg-violet-700",
          footerActionLink: "text-violet-400 hover:text-violet-300",
          identityPreviewEditButton: "text-violet-400",
        },
      }}
    >
      <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <meta name="theme-color" content="#050816" />
        </head>
        <body className="font-sans antialiased">
          {children}
          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              className: "backdrop-blur-xl border border-white/10 bg-[#0a0f1e]/80 text-white shadow-xl shadow-violet-900/20",
              style: {
                borderRadius: "1rem",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
