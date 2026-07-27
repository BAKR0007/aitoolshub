import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Hostinger subpath deployment at https://bakrr.net/AIToolsHub/
  basePath: "/AIToolsHub",
  assetPrefix: "/AIToolsHub/",

  // Standalone output for easier server deployment
  output: "standalone",

  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
