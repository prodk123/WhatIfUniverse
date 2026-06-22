import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Ensure strict trailing slash policy for SEO consistency
  trailingSlash: false,
  // Disable powered by header for security
  poweredByHeader: false,
};

export default nextConfig;
