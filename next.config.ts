import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false, //for the cron
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
