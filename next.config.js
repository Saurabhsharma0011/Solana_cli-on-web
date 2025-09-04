/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Set the output file tracing root to the current directory
  outputFileTracingRoot: path.join(__dirname),
  // App directory is now the default in Next.js 15
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;

