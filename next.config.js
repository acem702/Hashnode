/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = {
  async rewrites() {
    return [
      {
        source: "/@:username",
        destination: "/:username",
      },
    ];
  },
};

module.exports = nextConfig;
