"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X, ChevronRight } from "lucide-react";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Showcase", href: "/#showcase" },
  { label: "Pricing", href: "/pricing" },
  { label: "Community", href: "/community" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#050816]/80 backdrop-blur-xl border-b border-indigo-500/10 shadow-2xl shadow-indigo-950/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
                <Zap className="w-4 h-4 text-white" />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-white font-semibold text-lg tracking-tight">
                Blueprint <span className="gradient-text-violet">AI</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-3">
              {isLoaded && !userId && (
                <>
                  <Link
                    href="/sign-in"
                    className="text-sm text-slate-400 hover:text-white transition-colors font-medium px-3 py-2"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    className="relative inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                  >
                    Start Free
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </>
              )}
              {isLoaded && userId && (
                <>
                  <Link
                    href="/dashboard"
                    className="text-sm text-slate-400 hover:text-white transition-colors font-medium px-3 py-2"
                  >
                    Dashboard
                  </Link>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8 ring-2 ring-violet-500/30 hover:ring-violet-500/60 transition-all",
                        userButtonPopoverCard: "bg-[#050816]/95 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-xl",
                        userPreviewMainIdentifier: "text-white font-medium",
                        userPreviewSecondaryIdentifier: "text-slate-400",
                        userButtonPopoverActionButton: "hover:bg-white/5 transition-colors",
                        userButtonPopoverActionButtonText: "text-slate-300",
                        userButtonPopoverActionButtonIcon: "text-slate-400",
                        userButtonPopoverFooter: "border-t border-white/10",
                      },
                    }}
                  />
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-16 md:hidden"
          >
            <div
              className="absolute inset-0 bg-[#050816]/95 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative z-10 px-4 pt-6 pb-8 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-lg text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 space-y-3">
                {isLoaded && !userId && (
                  <>
                    <Link
                      href="/sign-in"
                      className="block w-full text-center px-4 py-3 text-white border border-white/10 rounded-xl hover:bg-white/5 transition-all"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/sign-up"
                      className="block w-full text-center px-4 py-3 text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl font-semibold"
                    >
                      Start Free
                    </Link>
                  </>
                )}
                {isLoaded && userId && (
                  <Link
                    href="/dashboard"
                    className="block w-full text-center px-4 py-3 text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl font-semibold"
                  >
                    Go to Dashboard
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
