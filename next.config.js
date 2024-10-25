/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
