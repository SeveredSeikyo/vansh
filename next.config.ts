/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Still needed for static export (Capacitor compatibility)
  trailingSlash: true, // Good for static exports
  images: {
    unoptimized: true, // Required for Capacitor static export
  },
  devIndicators: false, // Optional: hides dev indicators
  // Add PWA-specific configuration
  experimental: {
    pwa: {
      dest: "public", // Where PWA assets will be generated
      disable: process.env.NODE_ENV === "development", // Disable PWA in dev to avoid conflicts
    },
  },
};

module.exports = nextConfig;