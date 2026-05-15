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

      <UserProfile
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl",
            headerTitle: "text-white",
            headerSubtitle: "text-slate-400",
            profileSectionTitle: "text-slate-300",
            formButtonPrimary: "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500",
            navbarButton: "text-slate-400 hover:text-white",
            navbarButtonActive: "text-violet-400 border-violet-400",
            formFieldInput: "bg-slate-800/50 border-slate-700/50 text-white",
          },
        }}
      />
    </div>
  );
}
