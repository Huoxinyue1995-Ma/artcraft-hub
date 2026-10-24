import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      // The site is English-only for now. Send the root and every old Chinese URL to its English page.
      { source: '/', destination: '/en', permanent: true },
      { source: '/zh', destination: '/en', permanent: true },
      { source: '/zh/:path*', destination: '/en/:path*', permanent: true },
    ]
  },
}

export default nextConfig
