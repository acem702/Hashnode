/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  async rewrites() {
    return [
      {
        source: "/@:username",
        destination: "/:username",
      },
    ];
  },
};

// module.exports = {
// };

export default nextConfig;
