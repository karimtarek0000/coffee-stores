/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
