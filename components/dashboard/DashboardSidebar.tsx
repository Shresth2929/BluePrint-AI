"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Sparkles,
  FolderOpen,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Crown,
} from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Generate", href: "/dashboard/generate", icon: Sparkles },
  { label: "Projects", href: "/dashboard/projects", icon: FolderOpen },
  { label: "Community", href: "/community", icon: Users },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
const toggleSidebar = useUIStore((s) => s.toggleSidebar);

const mobileOpen = useUIStore((s) => s.mobileSidebarOpen);
const setMobileOpen = useUIStore((s) => s.setMobileSidebarOpen);
  const pathname = usePathname();
  const { user } = useUser();

  // Combine desktop and mobile states for visual classes
  const isCompact = collapsed && !mobileOpen;

  return (
    <motion.aside
      className={cn(
        "fixed top-0 bottom-0 z-30 flex flex-col border-r border-white/5 bg-[#0a0f1e]/95 md:bg-[#0a0f1e]/80 backdrop-blur-xl transition-all duration-300 ease-in-out",
        "md:left-0", // Always left-0 on desktop
        mobileOpen ? "left-0 w-64" : "-left-64 md:left-0", // Off-canvas on mobile
        isCompact ? "md:w-[72px]" : "md:w-60"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center gap-2.5 h-16 px-4 border-b border-white/5 flex-shrink-0",
        isCompact && "md:justify-center md:px-0"
      )}>
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20 flex-shrink-0">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span
            className={cn(
              "text-white font-semibold text-base whitespace-nowrap overflow-hidden transition-all duration-300",
              isCompact ? "md:w-0 md:opacity-0" : "w-auto opacity-100"
            )}
          >
            Blueprint AI
          </span>
        </Link>
        <button 
          className="ml-auto md:hidden p-1 text-slate-400 hover:text-white"
          onClick={() => setMobileOpen(false)}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCompact ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group relative",
                isCompact && "md:justify-center md:px-0",
                isActive
                  ? "bg-violet-600/20 text-violet-300 border border-violet-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn(
                "w-4.5 h-4.5 flex-shrink-0 transition-colors",
                isActive ? "text-violet-400" : "text-slate-500 group-hover:text-slate-300"
              )} />
              <span
                className={cn(
                  "whitespace-nowrap overflow-hidden transition-all duration-300",
                  isCompact ? "md:w-0 md:opacity-0" : "w-auto opacity-100"
                )}
              >
                {item.label}
              </span>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute right-2 w-1.5 h-1.5 rounded-full bg-violet-400"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Generate CTA */}
      <div className={cn(
        "mx-3 mb-3 transition-all duration-300",
        isCompact ? "md:h-0 md:opacity-0 md:overflow-hidden md:m-0" : "h-auto opacity-100"
      )}>
        <Link
          href="/dashboard/generate"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/35"
        >
          <Sparkles className="w-4 h-4" />
          New Render
        </Link>
      </div>

      {/* User section */}
      <div className={cn(
        "flex items-center gap-3 p-3 border-t border-white/5 flex-shrink-0",
        isCompact && "md:justify-center"
      )}>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-8 h-8 ring-2 ring-violet-500/20",
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
        <div
          className={cn(
            "flex-1 min-w-0 transition-all duration-300",
            isCompact ? "md:w-0 md:opacity-0 md:overflow-hidden" : "w-auto opacity-100"
          )}
        >
          <p className="text-white text-sm font-medium truncate">
            {user?.fullName ?? user?.firstName ?? "Architect"}
          </p>
          <div className="flex items-center gap-1">
            <Crown className="w-3 h-3 text-amber-400" />
            <p className="text-slate-500 text-xs">Free Plan</p>
          </div>
        </div>
      </div>

      {/* Collapse toggle (Desktop only) */}
      <button
        onClick={toggleSidebar}
        className="hidden md:flex absolute -right-3 top-20 w-6 h-6 rounded-full glass border border-white/10 items-center justify-center text-slate-400 hover:text-white transition-colors z-40"
      >
        {collapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>
    </motion.aside>
  );
}
