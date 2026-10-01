import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // /public/me.webp is served locally, so no remotePatterns are required.
  },
};

export default nextConfig;
