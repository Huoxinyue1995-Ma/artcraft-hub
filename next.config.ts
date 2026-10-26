import type { NextConfig } from 'next'

const CANONICAL_ORIGIN = 'https://artcraftphotocraft.space'
const WWW_HOST = { type: 'host' as const, value: 'www.artcraftphotocraft.space' }

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      // www → apex, landing directly on the final English URL (one hop, never two).
      { source: '/', has: [WWW_HOST], destination: `${CANONICAL_ORIGIN}/en`, permanent: true },
      { source: '/zh', has: [WWW_HOST], destination: `${CANONICAL_ORIGIN}/en`, permanent: true },
      { source: '/zh/:path*', has: [WWW_HOST], destination: `${CANONICAL_ORIGIN}/en/:path*`, permanent: true },
      { source: '/:path*', has: [WWW_HOST], destination: `${CANONICAL_ORIGIN}/:path*`, permanent: true },

      // The site is English-only for now. Send the root and every old Chinese URL to its English page.
      { source: '/', destination: '/en', permanent: true },
      { source: '/zh', destination: '/en', permanent: true },
      { source: '/zh/:path*', destination: '/en/:path*', permanent: true },
    ]
  },
}

export default nextConfig
