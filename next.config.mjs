/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'cloudinary.com',
      'placeholder.svg',
    ],
    unoptimized: true,
  },
  // This ensures Node.js modules like 'fs' are only used server-side
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs' module on the client to prevent this error
      config.resolve.fallback = {
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        os: false,
        http: false,
        https: false,
        zlib: false,
      }
    }
    return config
  },
  // Explicitly mark which packages are external and should not be bundled
  experimental: {
    serverComponentsExternalPackages: ['cloudinary'],
  },
}

export default nextConfig
