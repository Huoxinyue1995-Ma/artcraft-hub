import type { MetadataRoute } from 'next'

const DEFAULT_UPDATED = '2026-10-20'

// Update the date here when a page's content changes meaningfully.
const pages: Array<{ path: string; updated?: string }> = [
  { path: '', updated: '2026-10-24' },
  { path: '/downloads', updated: '2026-10-24' },
  { path: '/features' },
  { path: '/faq' },
  { path: '/about' },
  { path: '/contact' },
  { path: '/privacy' },
  { path: '/terms' },
  { path: '/compare/adobe', updated: '2026-10-23' },
  { path: '/install/windows' },
  { path: '/install/macos' },
  { path: '/install/linux' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://artcraftphotocraft.space'
  return ['en'].flatMap((locale) => pages.map(({ path, updated }) => ({
    url: `${base}/${locale}${path}`,
    lastModified: new Date(updated || DEFAULT_UPDATED),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.7,
  })))
}
