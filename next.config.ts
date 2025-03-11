import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators:false,
  //distDir: "out",
  output:"export",
  trailingSlash: true,
  images: {
    unoptimized: true, // ✅ Fixes image loading issue in Capacitor
  },
};

export default nextConfig;
