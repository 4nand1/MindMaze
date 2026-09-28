import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // app/global-not-found.tsx: needed because (en) and (mn) each have their own root layout.
  experimental: { globalNotFound: true },
  images: {
    // ponytail: only for the Unsplash placeholders in app/content.ts — remove once photos live in /public.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**", search: "?w=2400&q=80&fm=jpg" },
    ],
  },
};

export default nextConfig;
