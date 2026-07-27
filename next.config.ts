import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "**" },
    ],
  },
  async rewrites() {
    const bakrMeetUrl = process.env.BAKR_MEET_URL || "https://bakr-meet-bakr0007.vercel.app";
    return [
      { source: "/AImeet", destination: `${bakrMeetUrl}/` },
      { source: "/AImeet/:path*", destination: `${bakrMeetUrl}/:path*` },
    ];
  },
};

export default nextConfig;
