import Link from 'next/link'
import { ArrowUpRight, Download, Layers3, Play, Scale, Sparkles } from 'lucide-react'
import { OfficialCallout } from '@/components/callout'
import { InfoCard } from '@/components/info-card'
import { getLang, OFFICIAL, pageMeta, pageMetadata, sourceNote } from '@/lib/content'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const lang = getLang((await params).locale)
  // Absolute title: the home page skips the "· Artcraft Hub" suffix so the keyword-led title stays short.
  return { ...pageMetadata(lang, '', pageMeta[lang].title, pageMeta[lang].description), title: { absolute: pageMeta[lang].title } }
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const lang = getLang((await params).locale)
  const zh = lang === 'zh'
  const cards = zh ? [
    { icon: <Download size={22} />, title: '找到正确下载', body: '按系统查看官方入口、版本和备用镜像状态。', href: `/${lang}/downloads`, label: '查看下载' },
    { icon: <Layers3 size={22} />, title: '一步一步安装', body: 'Windows、macOS 和 Linux 都有新手能看懂的说明。', href: `/${lang}/install/windows`, label: '开始安装' },
    { icon: <Sparkles size={22} />, title: '先看能做什么', body: '用简单的话了解 AI、2D、3D 和视频创作能力。', href: `/${lang}/features`, label: '浏览功能' },
    { icon: <Scale size={22} />, title: '和 Adobe 对比', body: '看清 Artcraft、Photoshop、Illustrator、Premiere 和 After Effects 的用途差别。', href: `/${lang}/compare/adobe`, label: '打开对比' },
  ] : [
    { icon: <Download size={22} />, title: 'Find the right download', body: 'Check official links, versions, and mirror status by platform.', href: `/${lang}/downloads`, label: 'View downloads' },
    { icon: <Layers3 size={22} />, title: 'Follow a clear setup', body: 'Beginner steps for Windows, macOS, and Linux source builds.', href: `/${lang}/install/windows`, label: 'Start setup' },
    { icon: <Sparkles size={22} />, title: 'See what it can do', body: 'A plain-language look at AI, 2D, 3D, and video workflows.', href: `/${lang}/features`, label: 'Explore features' },
    { icon: <Scale size={22} />, title: 'Compare it with Adobe', body: 'Understand the difference between Artcraft and four familiar Adobe apps.', href: `/${lang}/compare/adobe`, label: 'Open comparison' },
  ]
  return <div className="container page-space">
    <div className="hero-grid">
      <section className="hero-copy">
        <p className="eyebrow">ARTCRAFT / INDEPENDENT GUIDE</p>
        <h1>Artcraft Download <span>&amp; Launcher</span></h1>
        <p className="lead">Official links for Windows, macOS and Linux — the ArtCraft AI app and the ArtCraft Launcher, in one place.</p>
        <div className="button-row"><Link className="button button-dark" href={`/${lang}/downloads`}>{zh ? '查看官方下载' : 'See official downloads'} <ArrowUpRight size={16} /></Link><a className="text-link" href={OFFICIAL.github} target="_blank" rel="noreferrer">{zh ? '打开官方 GitHub' : 'Open official GitHub'} <ArrowUpRight size={15} /></a></div>
        <p className="tiny-note">{sourceNote(lang)}</p>
      </section>
      <aside className="hero-card"><div className="orb"><Download size={30} /></div><p className="eyebrow">QUICK DOWNLOAD</p><h2>Two official downloads, one page.</h2><div className="hero-list"><span><Play size={14} /> ArtCraft AI app · Windows &amp; macOS</span><span><Play size={14} /> ArtCraft Launcher · Windows, macOS, Linux</span><span><Play size={14} /> Links to getartcraft.com &amp; GitHub</span></div></aside>
    </div>
    <OfficialCallout lang={lang} />
    <section className="section-block"><div className="section-heading"><div><p className="eyebrow">{zh ? '从这里开始' : 'START HERE'}</p><h2>{zh ? '你现在最需要哪一步？' : 'What do you need first?'}</h2></div><span className="section-index">01 — 04</span></div><div className="card-grid">{cards.map((card) => <InfoCard key={card.title} {...card} />)}</div></section>
    <section className="split-panel"><div><p className="eyebrow">{zh ? '为什么做这个站' : 'WHY THIS SITE'}</p><h2>{zh ? '不替你做决定，只把信息整理到能用。' : 'No hard sell. Just information you can use.'}</h2></div><p>{zh ? 'Artcraft 更新很快，下载页面、源码说明和实际功能可能会变。本网站标注来源和检查日期，帮助你从官方入口开始，少走弯路。' : 'Artcraft moves quickly. Downloads, source setup, and features can change. We label sources and check dates so you can start from the official path with fewer wrong turns.'}</p></section>
  </div>
}
