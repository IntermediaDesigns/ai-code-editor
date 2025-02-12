// next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Monaco Editor Webpack Configuration
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        crypto: false,
      };
    }

    // Add rule for .ttf files used by Monaco Editor
    config.module.rules.push({
      test: /\.ttf$/,
      type: "asset/resource",
    });

    // Prevent Monaco Editor from being minimized
    config.optimization.minimize = false;

    return config;
  },
  // Enable static file serving for Monaco Editor workers
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
