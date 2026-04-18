/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      // Add any external image sources if needed
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sni-prod.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/**',
      }
    ],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: false,
  },
  // Configure compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Optimize images
  experimental: {
    optimizeCss: false,
  },
  // Compression
  compress: true,
  // Generate ETags
  generateEtags: true,
  // Enable production optimizations
  productionBrowserSourceMaps: false,
};

export default nextConfig;
