/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produce a self-contained build for Hostinger's Node app
  output: "standalone",

  // Keep these if you prefer “don’t block deploy on lint/TS” while finishing changes
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: {
    // We installed `sharp`, so let Next optimize images in production
    unoptimized: false,
    // Nice defaults for responsive images
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256],
    // If you ever load remote images, whitelist them:
    // remotePatterns: [{ protocol: "https", hostname: "example.com" }]
  },
};

export default nextConfig;
