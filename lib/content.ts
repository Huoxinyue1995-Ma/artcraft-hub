export type Lang = 'zh' | 'en'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://artcraftphotocraft.space'
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@example.com'

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

export const currentRelease = {
  version: 'v0.41.0',
  releasedAt: '2026-09-26',
  source: 'https://github.com/storytold/artcraft/releases/tag/artcraft-v0.41.0',
}

export const releaseAssets = [
  { platform: 'Windows 10 64-bit+', file: 'ArtCraft_0.41.0_x64-setup.exe', sha256: 'cb15da474ae36a7a7f930a6e9916be2794e7cc84c3340b531c38eabc82f4363e', url: 'https://github.com/storytold/artcraft/releases/download/artcraft-v0.41.0/ArtCraft_0.41.0_x64-setup.exe' },
  { platform: 'Windows 10 64-bit+', file: 'ArtCraft_0.41.0_x64_en-US.msi', sha256: '255f963ba8acb799b231ac23a5ef04ca157a8d26f9b9b279b3e55a59db29be77', url: 'https://github.com/storytold/artcraft/releases/download/artcraft-v0.41.0/ArtCraft_0.41.0_x64_en-US.msi' },
  { platform: 'macOS 12+', file: 'ArtCraft_0.41.0_universal.dmg', sha256: '3cf1df2e56345e603c5d0180e5b563dd5eca25d9e3c3959d9554012f510916c', url: 'https://github.com/storytold/artcraft/releases/download/artcraft-v0.41.0/ArtCraft_0.41.0_universal.dmg' },
  { platform: 'macOS 12+', file: 'ArtCraft_universal.app.tar.gz', sha256: '812d7b4e570df95dee769761b6afc53d82cbb1e4911aed360d9bd23fc830d673', url: 'https://github.com/storytold/artcraft/releases/download/artcraft-v0.41.0/ArtCraft_universal.app.tar.gz' },
] as const

export function pageMetadata(lang: Lang, path: string, title: string, description: string) {
  const clean = path === '' || path === '/' ? '' : (path.startsWith('/') ? path : `/${path}`)
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}${clean}`,
      languages: { 'zh-CN': `/zh${clean}`, en: `/en${clean}` },
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
    title: 'Artcraft Hub | Downloads, Setup & Adobe Comparison',
    description: 'A beginner-friendly guide to official Artcraft downloads, setup, features, and a simple Adobe comparison. Independent resource site.',
  },
} as const

export const sourceNote = (lang: Lang) =>
  lang === 'zh'
    ? '资料来源：Artcraft 官方 GitHub、Releases、getartcraft.com 与 Adobe 官方页面。最后检查：2026-10-20。本站与 Artcraft 团队、Adobe 均无隶属关系。'
    : 'Sources: the official Artcraft GitHub, Releases, getartcraft.com, and Adobe pages. Last checked: 2026-10-20. This site is independent from Artcraft and Adobe.'

export function withLang(lang: Lang, path: string) {
  const clean = path.startsWith('/') ? path : `/${path}`
  return `/${lang}${clean}`
}

export const featureData = {
  zh: [
    { icon: '✦', title: '2D 合成', body: '把图像、文字和效果放在同一个画布里，适合快速做视觉草稿。' },
    { icon: '◇', title: '3D 合成', body: '把 3D 内容和画面组合起来，探索更立体的创作方式。' },
    { icon: '◌', title: '角色姿态与身份', body: '调整角色姿态，也可以用参考角色帮助保持身份和画面方向。' },
    { icon: '◎', title: '场景搭建', body: '在同一场景里安排背景、前景、道具和镜头位置，再继续创作。' },
    { icon: '▧', title: '背景移除与画布编辑', body: '移除背景，用绘画、蒙版和局部修改引导图像变化。' },
    { icon: '↗', title: '图像转 3D 网格', body: '尝试把一张图变成立体网格，方便继续做 3D 实验。' },
    { icon: '✺', title: '文生图与提示词编辑', body: '用文字描述想法，也可以继续调整已有画面。' },
    { icon: '▶', title: '图生视频', body: '用视频模型把一张图做成动态片段，并继续控制创作方向。' },
  ],
  en: [
    { icon: '✦', title: '2D compositing', body: 'Bring images, text, and effects together on one canvas for quick visual drafts.' },
    { icon: '◇', title: '3D compositing', body: 'Mix 3D content with your scene and explore a more dimensional workflow.' },
    { icon: '◌', title: 'Character pose & identity', body: 'Pose a character and use references to guide identity and shot direction.' },
    { icon: '◎', title: 'Scene blocking', body: 'Arrange backdrops, foregrounds, props, and camera placement before generating.' },
    { icon: '▧', title: 'Background & canvas editing', body: 'Remove backgrounds and use drawing, masks, and local edits to guide changes.' },
    { icon: '↗', title: 'Image to 3D mesh', body: 'Experiment with turning a picture into a 3D mesh for further exploration.' },
    { icon: '✺', title: 'Text-to-image editing', body: 'Describe an idea in words, then keep refining an existing image with prompts.' },
    { icon: '▶', title: 'Image to video', body: 'Animate an image with video models while keeping control over the creative direction.' },
  ],
} as const

export const adobeRows = {
  zh: [
    ['Artcraft', '桌面与浏览器 AI 创作工具', '官方页面显示可免费开始；价格以官方页面为准', '中等：先看教程再试', '想把 AI、2D、3D 放在一起尝试的人'],
    ['Photoshop', '图片编辑与合成', '订阅制（Adobe 官方价格会变动）', '中等到较高', '修图、精修、合成和设计从业者'],
    ['Illustrator', '矢量图形与插画', '订阅制（Adobe 官方价格会变动）', '中等到较高', 'Logo、图标、插画和印刷设计'],
    ['Premiere Pro', '视频剪辑', '订阅制（Adobe 官方价格会变动）', '中等', '剪辑长视频、短视频和课程'],
    ['After Effects', '动态图形与视觉特效', '订阅制（Adobe 官方价格会变动）', '较高', '动画、特效和动态图形'],
  ],
  en: [
    ['Artcraft', 'Desktop and browser AI creative tool', 'Free to start; check the official pricing page', 'Medium: follow a guide first', 'People who want to explore AI, 2D, and 3D together'],
    ['Photoshop', 'Image editing & compositing', 'Subscription (Adobe pricing changes)', 'Medium to high', 'Retouching, compositing, and design work'],
    ['Illustrator', 'Vector graphics & illustration', 'Subscription (Adobe pricing changes)', 'Medium to high', 'Logos, icons, illustration, and print design'],
    ['Premiere Pro', 'Video editing', 'Subscription (Adobe pricing changes)', 'Medium', 'Long-form, short-form, and course videos'],
    ['After Effects', 'Motion graphics & VFX', 'Subscription (Adobe pricing changes)', 'High', 'Animation, effects, and motion design'],
  ],
} as const

export const adobeLinks = {
  Photoshop: 'https://www.adobe.com/products/photoshop.html',
  Illustrator: 'https://www.adobe.com/products/illustrator.html',
  'Premiere Pro': 'https://www.adobe.com/products/premiere.html',
  'After Effects': 'https://www.adobe.com/products/aftereffects.html',
} as const

export const faqData = {
  zh: [
    ['Artcraft 是什么？', 'Artcraft 是 storytold 发布的桌面与浏览器 AI 创作工具。本站只整理官方公开资料，不是官方产品页。'],
    ['应该从哪里下载？', '优先打开官方 getartcraft.com 或 GitHub Releases。请确认系统和版本后再安装。'],
    ['Windows、macOS、Linux 都能用吗？', '当前官方下载页列出 Windows 10 64-bit+ 和 macOS 12+；Linux 主要参考源码构建说明，不能把它当成现成安装包。安装后可能需要免费注册或登录。'],
    ['为什么没有备用镜像？', '镜像需要逐个核对来源、版本和 SHA-256。确认前，页面只展示官方入口，避免用户下载到未知文件。'],
    ['安装时被系统拦截怎么办？', '先确认文件来自官方链接，再阅读系统提示。不要关闭安全软件去运行不明文件。'],
    ['Artcraft 和 Adobe 是替代关系吗？', '不一定。Artcraft 更适合探索 AI 创作流程，Adobe 套件各自专注修图、矢量、剪辑或特效。'],
  ],
  en: [
    ['What is Artcraft?', 'Artcraft is a desktop and browser AI creative tool published by storytold. This site only organizes public official material.'],
    ['Where should I download it?', 'Start with the official getartcraft.com page or GitHub Releases. Check your system and version first.'],
    ['Does it support Windows, macOS, and Linux?', 'The current download page lists Windows 10 64-bit+ and macOS 12+. For Linux, use the source setup guide rather than assuming a ready-made package. A free sign-in may be required after installation.'],
    ['Why is there no mirror download yet?', 'A mirror must be checked for its source, version, and SHA-256. Until then, this site shows official links only.'],
    ['What if my system blocks the installer?', 'Confirm the file came from an official link and read the system warning. Do not run unknown files or disable security tools.'],
    ['Is Artcraft a replacement for Adobe?', 'Not always. Artcraft is for exploring AI creative workflows, while Adobe apps focus on editing, vectors, video, or effects.'],
  ],
} as const
