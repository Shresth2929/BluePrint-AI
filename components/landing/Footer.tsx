import Link from "next/link";
import { Zap, MessageCircle, Mail, Globe, ArrowRight } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Community", href: "/community" },
    { label: "Changelog", href: "/changelog" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/api-docs" },
    { label: "Status", href: "/status" },
    { label: "Affiliates", href: "/affiliates" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "GDPR", href: "/gdpr" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-gradient-to-b from-transparent to-[#030612]">
      {/* Newsletter CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass-card rounded-2xl p-8 md:p-12 mb-16 text-center relative overflow-hidden">
          <div className="aurora-blob-1 w-96 h-96 bg-violet-600/10 -top-20 left-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Ready to transform your{" "}
              <span className="gradient-text">architecture?</span>
            </h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Join 12,000+ architects already using Blueprint AI to create stunning visualizations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-500/50 transition-colors"
              />
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/25 whitespace-nowrap"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-white font-semibold">Blueprint AI</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              AI-powered architectural visualization platform. Transform floor plans into photorealistic renders.
            </p>
            <div className="flex gap-3 mt-4">
              {[
                    { icon: MessageCircle, href: "#" },
                    { icon: Globe, href: "#" },
                    { icon: Mail, href: "#" },
                  ].map(({ icon: Icon, href }, index) => (
                    <a
                      key={`${href}-${index}`}
                      href={href}
                  className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/30 transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white text-sm font-semibold mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-slate-600 text-sm">
            © 2026 Blueprint AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
