import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";
import { Zap } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up — Blueprint AI",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Aurora blobs */}
      <div className="aurora-blob-1 w-96 h-96 bg-cyan-600/10 -top-20 -right-20 pointer-events-none" />
      <div className="aurora-blob-2 w-80 h-80 bg-violet-600/12 bottom-10 left-10 pointer-events-none" />

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-8">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-semibold text-xl">Blueprint AI</span>
      </Link>

      <div className="w-full max-w-sm">
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-slate-900/80 backdrop-blur-xl border border-violet-500/20 shadow-2xl shadow-indigo-950/50 rounded-2xl",
              headerTitle: "text-white font-display",
              formButtonPrimary: "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/25",
              socialButtonsBlockButton: "border-slate-700/50 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300",
              dividerLine: "bg-slate-700/50",
              dividerText: "text-slate-500",
              formFieldLabel: "text-slate-300",
              formFieldInput: "bg-slate-800/50 border-slate-700/50 text-white focus:border-violet-500/50",
              footerActionLink: "text-violet-400 hover:text-violet-300",
            },
          }}
        />
      </div>
    </div>
  );
}
