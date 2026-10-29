import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageIntro, SourceLine } from '@/components/site-shell'
import { getLang, OFFICIAL, pageMetadata } from '@/lib/content'
import { CRAFT_APPS, craftAppLinks } from '@/lib/releases'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const lang = getLang((await params).locale)
  return pageMetadata(
    lang,
    '/features',
    'Artcraft Features: the AI App and the 13 Craft Apps Explained',
    'What the ArtCraft AI app can do (2D canvas, 3D stage, image, video and 3D models) and what each Craft app is for — PhotoCraft, VectorCraft, FilmCraft, EffectCraft and more.',
  )
}

/** ArtCraft AI app features, from the official README of artcraft-v0.41.0. */
const aiFeatures = [
  { icon: '✦', title: '2D compositing', body: 'Compose a scene with image layers, background removal and drawing tools on one canvas.' },
  { icon: '◇', title: '3D compositing', body: 'Layer backdrops, foregrounds and props in 3D to build compositions with depth.' },
  { icon: '◌', title: 'Character posing & identity', body: 'Pose characters and set the camera before generating; use a posed mannequin to guide a character’s pose.' },
  { icon: '◎', title: 'Scene blocking', body: 'Combine 3D asset kits to control camera angles, object placement and depth, then generate.' },
  { icon: '▧', title: 'Background & canvas editing', body: 'Remove backgrounds and use drawing, masks and inpainting to choose exactly where an image changes.' },
  { icon: '↗', title: 'Image to 3D mesh', body: 'Turn an image into a 3D object you can position, rotate and frame, or into an explorable 3D world.' },
  { icon: '✺', title: 'Text-to-image & prompted editing', body: 'Explore ideas across 16 image models, or describe changes to an image with models such as Nano Banana Pro and GPT Image.' },
  { icon: '▶', title: 'Image to video', body: 'Animate an image with your choice of 25 video models and generation controls.' },
]

export default async function FeaturesPage({ params }: { params: Promise<{ locale: string }> }) {
  const lang = getLang((await params).locale)
  return (
    <div className="container page-space">
      <PageIntro
        lang={lang}
        eyebrow="FEATURES"
        title="What Artcraft can do."
        description="Two kinds of software from the same team: the ArtCraft AI app for AI image and video, and the Craft apps — free, open-source desktop tools for editing, design and office work. Descriptions come from each official README."
      />
      <nav className="dl-jump" aria-label="On this page">
        <a href="#ai-app">1 · ArtCraft AI app <span>8 features</span></a>
        <a href="#craft-apps">2 · Craft apps <span>13 apps</span></a>
      </nav>

      <section className="section-block dl-part" id="ai-app">
        <div className="section-heading"><div>
          <p className="eyebrow">PART 1 · THE ARTCRAFT AI APP</p>
          <h2>AI image and video, with real control.</h2>
        </div></div>
        <div className="feature-grid">{aiFeatures.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <span className="feature-icon">{feature.icon}</span>
            <h2>{feature.title}</h2>
            <p>{feature.body}</p>
          </article>
        ))}</div>
        <a className="source-box source-box-link" href={OFFICIAL.github} target="_blank" rel="noreferrer"><span>Read the feature details in the official ArtCraft README</span><ArrowUpRight size={16} /></a>
      </section>

      <section className="section-block dl-part" id="craft-apps">
        <div className="section-heading"><div>
          <p className="eyebrow">PART 2 · THE CRAFT APP SUITE</p>
          <h2>Thirteen open-source desktop apps.</h2>
        </div></div>
        <p className="lead dl-lead">Each Craft app is written from scratch in Rust, works offline, and runs on Windows, macOS, Linux, FreeBSD and the web. They are separate from the AI app, free, and young — check each app’s stage before relying on it for real work.</p>
        <div className="craft-grid">{CRAFT_APPS.map((app) => {
          const links = craftAppLinks(app.id)
          return (
            <article className="craft-card" key={app.id}>
              <div className="craft-card-top">
                <h3>{app.name}</h3>
                <span className="pill pill-blue">{app.stage}</span>
              </div>
              <p>{app.purpose}</p>
              <p className="craft-like">Similar job to {app.similarTo}</p>
              <footer>
                {app.id === 'wordcraft' ? <Link href={`/${lang}/wordcraft`}>Guide</Link> : null}
                <Link href={`/${lang}/downloads#${app.id}`}>Download</Link>
                <a href={links.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={12} /></a>
                <a href={links.website} target="_blank" rel="noreferrer">Website <ArrowUpRight size={12} /></a>
              </footer>
            </article>
          )
        })}</div>
        <p className="tiny-note">Stages are quoted from each app’s README and change often. “Similar job to …” is only an orientation, not a claim of compatibility. For a detailed look at PhotoCraft, VectorCraft, FilmCraft and EffectCraft, see <Link href={`/${lang}/compare/adobe`}>Artcraft vs Adobe</Link>.</p>
      </section>

      <section className="split-panel">
        <div><p className="eyebrow">HOW TO READ THIS</p><h2>One team, two kinds of tools.</h2></div>
        <p>The ArtCraft AI app brings prompts, a canvas, 2D/3D scenes and many AI models into one tool. The Craft apps aim to replace familiar desktop software, without AI generation. Having a feature is not the same as replacing a full professional suite — most of these apps are still in alpha.</p>
      </section>
      <SourceLine lang={lang} />
    </div>
  )
}
