"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { useUIStore } from "@/store/useUIStore";

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
const collapsed = useUIStore((s) => s.sidebarCollapsed);
const mobileOpen = useUIStore((s) => s.mobileSidebarOpen);
const setMobileOpen = useUIStore((s) => s.setMobileSidebarOpen);
  const pathname = usePathname();

  // Close mobile sidebar on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setMobileOpen]);

  return (
    <div className="min-h-screen bg-[#050816] flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between h-16 px-4 border-b border-white/5 bg-[#0a0f1e]/80 backdrop-blur-xl sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-base">Blueprint AI</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <DashboardSidebar />

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.main
        className="flex-1 min-h-screen overflow-x-hidden pt-0"
        style={{
          // Use CSS media query logic for margin: only apply margin on md+ screens
          marginLeft: "var(--main-ml, 0)",
        }}
      >
        <style>{`
          @media (min-width: 768px) {
            main { --main-ml: ${collapsed ? "72px" : "240px"}; transition: margin-left 0.3s ease-in-out; }
          }
        `}</style>
        <div className="relative h-full min-h-[calc(100vh-64px)] md:min-h-screen">
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
          <div className="relative z-10 h-full">{children}</div>
        </div>
      </motion.main>
    </div>
  );
}
