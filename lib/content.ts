export type Lang = 'zh' | 'en'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://artcraftphotocraft.space'
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'huoxinyue1995@gmail.com'

export const OFFICIAL = {
  github: 'https://github.com/storytold/artcraft',
  releases: 'https://github.com/storytold/artcraft/releases',
  docs: 'https://github.com/storytold/artcraft/tree/main/_docs',
  setup: 'https://github.com/storytold/artcraft/blob/main/_docs/dev_setup.md',
  download: 'https://getartcraft.com/download',
  homepage: 'https://getartcraft.com/',
  browser: 'https://app.getartcraft.com/',
  pricing: 'https://getartcraft.com/pricing',
  license: 'https://github.com/storytold/artcraft/blob/main/NOTICE',
  licenseMit: 'https://github.com/storytold/artcraft/blob/main/LICENSE-MIT',
  licenseApache: 'https://github.com/storytold/artcraft/blob/main/LICENSE-APACHE',
}

export function pageMetadata(lang: Lang, path: string, title: string, description: string) {
  const clean = path === '' || path === '/' ? '' : (path.startsWith('/') ? path : `/${path}`)
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}${clean}`,
    },
  }
}

export function getLang(value: string): Lang {
  return value === 'en' ? 'en' : 'zh'
}

export function otherLang(lang: Lang): Lang {
  return lang === 'zh' ? 'en' : 'zh'
}

export const navItems = (lang: Lang) =>
  lang === 'zh'
    ? [
        { href: '/zh/downloads', label: '下载', short: '下载' },
        { href: '/zh/install/windows', label: '安装教程', short: '安装' },
        { href: '/zh/features', label: '能做什么', short: '功能' },
        { href: '/zh/compare/adobe', label: '对比 Adobe', short: '对比' },
        { href: '/zh/faq', label: '常见问题', short: 'FAQ' },
      ]
    : [
        { href: '/en/downloads', label: 'Downloads', short: 'Download' },
        { href: '/en/install/windows', label: 'Install', short: 'Install' },
        { href: '/en/features', label: 'Features', short: 'Features' },
        { href: '/en/compare/adobe', label: 'vs Adobe', short: 'Compare' },
        { href: '/en/faq', label: 'FAQ', short: 'FAQ' },
      ]

export const pageMeta = {
  zh: {
    title: 'Artcraft 新手资料站｜下载、安装与 Adobe 对比',
    description: '整理 Artcraft 官方下载、安装教程、功能说明，以及与 Adobe 套件的简单对比。非官方资料站。',
  },
  en: {
    title: 'Artcraft Download & Launcher for Windows, macOS and Linux',
    description: 'Official Artcraft download links for Windows, macOS and Linux: the ArtCraft AI app, the ArtCraft Launcher, and every Craft app, with versions and GitHub links. Independent guide.',
  },
} as const

/** Site-wide "last checked" date. Bump it whenever the facts on the site are re-verified. */
export const SITE_CHECKED_AT = '2026-10-24'

export const sourceNote = (_lang: Lang) =>
  `Sources: the official ArtCraft and Craft app repositories on GitHub (github.com/storytold), their releases, getartcraft.com, and Adobe pages. Last checked: ${SITE_CHECKED_AT}. This site is independent from ArtCraft and Adobe.`

export function withLang(lang: Lang, path: string) {
  const clean = path.startsWith('/') ? path : `/${path}`
  return `/${lang}${clean}`
}

export const adobeLinks = {
  Photoshop: 'https://www.adobe.com/products/photoshop.html',
  Illustrator: 'https://www.adobe.com/products/illustrator.html',
  'Premiere Pro': 'https://www.adobe.com/products/premiere.html',
  'After Effects': 'https://www.adobe.com/products/aftereffects.html',
} as const

/** FAQ shown on /en/faq (English only). Keep answers consistent with the downloads, safety and Linux pages. */
export const faqItems: Array<[string, string]> = [
  ['What is ArtCraft?', 'ArtCraft is two things from the same team: the ArtCraft AI app, a desktop and browser studio for AI images, video and 3D, and the Craft apps, 13 free open-source desktop tools such as PhotoCraft, VectorCraft and FilmCraft. Artcraft Hub is an independent guide to both, not the official site.'],
  ['Is ArtCraft free?', 'The 13 Craft apps are free and open source. The ArtCraft AI app is free to download, but AI generations use credits. Paid plans are optional, and the official pricing page says you can bring your own compute or third-party subscriptions instead.'],
  ['Where should I download it?', 'Only from getartcraft.com or GitHub Releases under github.com/storytold. Our downloads page lists both, with current versions and SHA-256 checksums. Avoid third-party download portals.'],
  ['Does it work on Windows, macOS and Linux?', 'The ArtCraft AI app has installers for Windows 10 64-bit+ and macOS 12+; on Linux you build it from source. The Craft apps and the ArtCraft Launcher run on Windows, macOS and Linux, and most Craft apps also run in a browser.'],
  ['What is the ArtCraft Launcher?', 'An official app that installs, updates and opens all 13 Craft apps. It does not manage the ArtCraft AI app, which you update from its own download page.'],
  ['How do I install it on Linux?', 'Use the ArtCraft Launcher. The AppImage is the easiest; .deb and .rpm packages and a Flatpak are also available for x86_64 and aarch64, and .deb, .rpm and .tar.gz for RISC-V. Our Linux guide covers each one.'],
  ['Is ArtCraft safe?', 'The software is not malicious. The Craft apps run locally on your files, while the AI app sends prompts and images to remote models and needs an account. The main risk is that most apps are still alpha, so keep backups. Our safety guide covers this in detail.'],
  ['What if my system blocks the installer?', 'First confirm the file came from an official link and matches its checksum. The ArtCraft AI app installer for Windows is not code-signed, so SmartScreen may warn about an unknown publisher. Never disable security tools to run a file you are unsure about.'],
  ['Can ArtCraft replace Adobe?', 'Not yet for most professional work. PhotoCraft, VectorCraft, FilmCraft and EffectCraft cover much of Photoshop, Illustrator, Premiere Pro and After Effects, but they are alpha. Our comparison page shows what each one can and cannot do today.'],
  ['Why is there no mirror download?', 'A mirror would need its source, version and checksum verified for every release. Until we can do that reliably, this site links only to official files.'],
]
