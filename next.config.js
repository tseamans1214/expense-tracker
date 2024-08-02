/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
      ignoreBuildErrors: true,
    },
      // Allows program to render mongoose actions
      experimental: {
        serverComponentsExternalPackages: ["mongoose"],
      },
      eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
      // Allows images to come for specified hostnames
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "img.clerk.com",
          },
          {
            protocol: "https",
            hostname: "images.clerk.dev",
          },
          {
            protocol: "https",
            hostname: "uploadthing.com",
          },
          {
            protocol: "https",
            hostname: "placehold.co",
          },
        ],
      },
    };
    
    module.exports = nextConfig;