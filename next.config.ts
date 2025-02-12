/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Monaco Editor config
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        "crypto": false
      };
    }
    return config;
  },
};

module.exports = nextConfig;