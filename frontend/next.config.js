/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};

module.exports = nextConfig
