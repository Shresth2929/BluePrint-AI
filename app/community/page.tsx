import { Metadata } from "next";
import CommunityClient from "@/components/community/CommunityClient";

export const metadata: Metadata = {
  title: "Community Showcase — Blueprint AI",
  description: "Explore thousands of AI-generated architectural renders from the Blueprint AI community.",
};

export default function CommunityPage() {
  return <CommunityClient />;
}
