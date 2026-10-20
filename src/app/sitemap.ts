import type { MetadataRoute } from 'next'

const paths = ['', '/downloads', '/features', '/faq', '/about', '/privacy', '/terms', '/compare/adobe', '/install/windows', '/install/macos', '/install/linux']

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://artcraftphotocraft.space'
  return ['zh', 'en'].flatMap((locale) => paths.map((path) => ({ url: `${base}/${locale}${path}`, lastModified: new Date('2026-10-20'), changeFrequency: 'monthly' as const, priority: path === '' ? 1 : 0.7 })))
}
