import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static optimization
  output: "standalone",

  // Set output file tracing root to fix workspace warning
  outputFileTracingRoot: process.cwd(),

  // Optimize images
  images: {
    domains: ["randomuser.me"],
    formats: ["image/webp", "image/avif"],
  },

  // Enable compression
  compress: true,

  // Optimize bundle
  experimental: {
    // optimizeCss: true, // Disabled due to critters module issues
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
