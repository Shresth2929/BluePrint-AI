import { Metadata } from "next";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserProfile } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Settings — Blueprint AI",
};

export default async function SettingsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">Settings</h1>
        <p className="text-slate-400 text-sm">Manage your account and preferences</p>
      </div>

      <div className="flex justify-center md:justify-start">
        <UserProfile
          routing="path"
          path="/dashboard/settings"
          appearance={{
            elements: {
              rootBox: "w-full max-w-full",
              cardBox: "w-full shadow-none",
              card: "bg-[#050816]/80 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl w-full",
              headerTitle: "text-white font-display text-xl",
              headerSubtitle: "text-slate-400",
              profileSectionTitle: "text-white font-semibold text-lg border-b border-white/10 pb-4 mb-4",
              profileSectionPrimaryButton: "text-violet-400 hover:text-violet-300 transition-colors",
              formButtonPrimary: "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/25",
              navbarButton: "text-slate-400 hover:text-white transition-colors",
              navbarButtonActive: "text-violet-400 bg-violet-500/10",
              formFieldInput: "bg-slate-900/50 border-white/10 text-white focus:ring-2 focus:ring-violet-500/50",
              formFieldLabel: "text-slate-300 font-medium",
              profileSectionContent: "space-y-4",
              dividerLine: "bg-white/10",
              badge: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
            },
          }}
        />
      </div>
    </div>
  );
}
