import type { NextConfig } from "next";

// Only allow optimization of images served from our own origin.
// next/image is not currently used, but lock this down to avoid an open proxy.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://whatifuniverse.com';
let siteHost = 'localhost';
try {
  siteHost = new URL(siteUrl).host;
} catch {
  siteHost = 'localhost';
}

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: siteHost,
      },
    ],
  },
  // Ensure strict trailing slash policy for SEO consistency
  trailingSlash: false,
  // Disable powered by header for security
  poweredByHeader: false,
};

export default nextConfig;
