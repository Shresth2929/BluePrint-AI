import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProjectsClient from "@/components/dashboard/ProjectsClient";

export const metadata: Metadata = {
  title: "Projects — Blueprint AI",
};

export default async function ProjectsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return <ProjectsClient />;
}
