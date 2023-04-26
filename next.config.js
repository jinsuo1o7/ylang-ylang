/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dicdyetebblmqjwiespn.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
