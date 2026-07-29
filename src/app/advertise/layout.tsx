import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promote Your AI Tool - AIToolsHub",
  description: "Get your AI tool in front of 2M+ monthly users. Sponsor a featured listing, banner ad, or newsletter placement on AIToolsHub.",
};

export default function AdvertiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
