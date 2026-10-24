import Link from 'next/link'
import { ArrowUpRight, Download, Layers3, Play, Rocket, Scale, Sparkles } from 'lucide-react'
import { InfoCard } from '@/components/info-card'
import { getLang, OFFICIAL, pageMeta, pageMetadata, sourceNote } from '@/lib/content'
import { getArtcraftRelease, getLauncherRelease, LAUNCHER } from '@/lib/releases'

// Versions shown in the download block are refreshed from GitHub every 6 hours.
export const revalidate = 21600

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const lang = getLang((await params).locale)
  // Absolute title: the home page skips the "· Artcraft Hub" suffix so the keyword-led title stays short.
  return { ...pageMetadata(lang, '', pageMeta[lang].title, pageMeta[lang].description), title: { absolute: pageMeta[lang].title } }
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const lang = getLang((await params).locale)
  const [artcraft, launcher] = await Promise.all([getArtcraftRelease(), getLauncherRelease()])
  const cards = [
    { icon: <Download size={22} />, title: 'Download Artcraft', body: 'Official links for the AI app, the Launcher, and all 13 Craft apps, with current versions.', href: `/${lang}/downloads`, label: 'View downloads' },
    { icon: <Layers3 size={22} />, title: 'Follow a clear setup', body: 'Beginner steps for Windows, macOS, and Linux source builds.', href: `/${lang}/install/windows`, label: 'Start setup' },
    { icon: <Sparkles size={22} />, title: 'See what it can do', body: 'A plain-language look at AI, 2D, 3D, and video workflows.', href: `/${lang}/features`, label: 'Explore features' },
    { icon: <Scale size={22} />, title: 'Compare it with Adobe', body: 'Artcraft and the Craft apps next to Photoshop, Illustrator, Premiere Pro, and After Effects.', href: `/${lang}/compare/adobe`, label: 'Open comparison' },
  ]
  return <div className="container page-space">
    <div className="hero-grid">
      <section className="hero-copy">
        <p className="eyebrow">ARTCRAFT / INDEPENDENT GUIDE</p>
        <h1>Artcraft Download <span>&amp; Launcher</span></h1>
        <p className="lead">Official links for Windows, macOS and Linux — the ArtCraft AI app and the ArtCraft Launcher, in one place.</p>
        <div className="button-row"><Link className="button button-dark" href={`/${lang}/downloads`}>See all downloads <ArrowUpRight size={16} /></Link><a className="text-link" href={OFFICIAL.github} target="_blank" rel="noreferrer">Open official GitHub <ArrowUpRight size={15} /></a></div>
        <p className="tiny-note">{sourceNote(lang)}</p>
      </section>
      <aside className="hero-card"><div className="orb"><Download size={30} /></div><p className="eyebrow">QUICK DOWNLOAD</p><h2>Two official downloads, one page.</h2><div className="hero-list"><span><Play size={14} /> ArtCraft AI app · Windows &amp; macOS</span><span><Play size={14} /> ArtCraft Launcher · Windows, macOS, Linux</span><span><Play size={14} /> Links to getartcraft.com &amp; GitHub</span></div></aside>
    </div>

    <section className="home-dl" aria-label="Artcraft downloads">
      <Link className="home-dl-card" href={`/${lang}/downloads#artcraft-app`}>
        <span className="pill pill-blue">Part 1</span>
        <h2>ArtCraft AI app <span>v{artcraft.version}</span></h2>
        <p>The AI image and video studio with a 2D canvas and 3D stage. Windows &amp; macOS. Released {artcraft.publishedAt}.</p>
        <span className="text-link">Download the AI app <ArrowUpRight size={14} /></span>
      </Link>
      <Link className="home-dl-card" href={`/${lang}/downloads#launcher`}>
        <span className="pill pill-blue">Part 2 · {LAUNCHER.status}</span>
        <h2>ArtCraft Launcher <span>v{launcher.version}</span></h2>
        <p>Install, update and open all 13 Craft apps — PhotoCraft, VectorCraft, FilmCraft and more. Windows, macOS &amp; Linux. Released {launcher.publishedAt}.</p>
        <span className="text-link"><Rocket size={14} /> Get the Launcher &amp; Craft apps <ArrowUpRight size={14} /></span>
      </Link>
    </section>
    <p className="tiny-note home-dl-note">The Launcher manages the Craft apps only. Update the ArtCraft AI app from its own download link.</p>

    <section className="section-block"><div className="section-heading"><div><p className="eyebrow">START HERE</p><h2>What do you need first?</h2></div><span className="section-index">01 — 04</span></div><div className="card-grid">{cards.map((card) => <InfoCard key={card.title} {...card} />)}</div></section>
    <section className="split-panel"><div><p className="eyebrow">WHY THIS SITE</p><h2>No hard sell. Just information you can use.</h2></div><p>Artcraft moves quickly. Downloads, source setup, and features can change. We label sources and check dates so you can start from the official path with fewer wrong turns.</p></section>
  </div>
}
