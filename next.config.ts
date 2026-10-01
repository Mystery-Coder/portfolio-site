import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
			// The portrait is served locally, so no remotePatterns are required.
  },
};

export default nextConfig;
