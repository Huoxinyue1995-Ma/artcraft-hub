import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Check, Minus } from 'lucide-react'
import { PageIntro, SourceLine } from '@/components/site-shell'
import { adobeLinks, getLang, pageMetadata } from '@/lib/content'
import {
  ADOBE_VERSIONS, ARTCRAFT_VERSION, COMPARE_CHECKED_AT,
  adobeLeads, artcraftLeads, craftMatches, parityLink,
} from '@/lib/compare-adobe'
import { craftAppLinks } from '@/lib/releases'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const lang = getLang((await params).locale)
  return pageMetadata(
    lang,
    '/compare/adobe',
    'Artcraft vs Adobe: PhotoCraft, VectorCraft, FilmCraft & EffectCraft Compared',
    'Artcraft vs Photoshop, Illustrator, Premiere Pro and After Effects: what the ArtCraft AI app and the Craft apps (PhotoCraft, VectorCraft, FilmCraft, EffectCraft) can and cannot do today, with versions and readiness.',
  )
}

export default async function ComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const lang = getLang((await params).locale)

  return (
    <div className="container page-space">
      <PageIntro
        lang={lang}
        eyebrow="ARTCRAFT × ADOBE"
        title={<>Generate with Artcraft.<br />Polish with Adobe.</>}
        description={`Artcraft is now two things: the ArtCraft AI app (${ARTCRAFT_VERSION.version}) for AI image and video, and the Craft apps — open-source rebuilds of Photoshop, Illustrator, Premiere Pro and After Effects. The Craft apps already cover a lot, but they are alpha. Adobe still leads for daily professional work.`}
      />

      {/* ---- At a glance ---- */}
      <div className="table-wrap compare-table">
        <table>
          <thead><tr>
            <th>Adobe app (version)</th><th>Artcraft equivalent</th><th>Stage</th><th>Feature breadth</th><th>Ready for real work</th><th>ArtCraft AI app adds</th>
          </tr></thead>
          <tbody>{craftMatches.map((m) => (
            <tr key={m.adobe}>
              <td>{m.adobe}<span className="compare-sub">{ADOBE_VERSIONS[m.adobe].version}</span></td>
              <td className="compare-app"><a href={`#${m.repo}`}>{m.craft}</a></td>
              <td><span className="pill pill-blue">{m.stage}</span></td>
              <td className="compare-num">{m.breadth}</td>
              <td className="compare-num">{m.ready}</td>
              <td>{m.aiApp}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <p className="tiny-note">Breadth = how many of the Adobe app’s features exist in some form. Ready for real work = whether a professional could replace the Adobe app today. Both numbers are each project’s own estimate, published in its parity document.</p>

      {/* ---- Per app ---- */}
      <section className="section-block">
        <div className="section-heading"><div>
          <p className="eyebrow">APP BY APP</p>
          <h2>What each Craft app can and can’t do yet.</h2>
        </div></div>
        <div className="compare-cards">{craftMatches.map((m) => {
          const links = craftAppLinks(m.repo)
          return (
            <article className="compare-card" id={m.repo} key={m.repo}>
              <header>
                <p className="eyebrow">{m.adobe.toUpperCase()} {ADOBE_VERSIONS[m.adobe].version}</p>
                <h3>{m.craft} vs {m.adobe}</h3>
                <p className="compare-meta"><span className="pill pill-blue">{m.stage}</span> Breadth {m.breadth} · Ready {m.ready}</p>
              </header>
              <div className="compare-lists">
                <div><h4>Already in {m.craft}</h4><ul>{m.has.map((t) => <li key={t}><Check size={14} /> {t}</li>)}</ul></div>
                <div><h4>Still missing</h4><ul>{m.missing.map((t) => <li key={t}><Minus size={14} /> {t}</li>)}</ul></div>
              </div>
              <p className="compare-ai"><strong>ArtCraft AI app {ARTCRAFT_VERSION.version}:</strong> {m.aiApp}</p>
              <footer>
                <Link href={`/${lang}/downloads#${m.repo}`}>Download {m.craft}</Link>
                <a href={links.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={12} /></a>
                <a href={parityLink(m.repo)} target="_blank" rel="noreferrer">Parity report <ArrowUpRight size={12} /></a>
              </footer>
            </article>
          )
        })}</div>
      </section>

      {/* ---- Where Artcraft leads ---- */}
      <section className="section-block">
        <div className="section-heading"><div>
          <p className="eyebrow">WHERE ARTCRAFT LEADS</p>
          <h2>What Adobe doesn’t offer.</h2>
        </div></div>
        <div className="feature-grid">{artcraftLeads.map((lead) => (
          <div className="feature-card" key={lead.title}>
            <h2>{lead.title}</h2>
            <p>{lead.body}</p>
            <p className="compare-vs">{lead.vs}</p>
          </div>
        ))}</div>
      </section>

      {/* ---- Where Adobe leads ---- */}
      <section className="section-block">
        <div className="section-heading"><div>
          <p className="eyebrow">WHERE ADOBE LEADS</p>
          <h2>What Artcraft doesn’t provide yet.</h2>
        </div></div>
        <div className="table-wrap compare-table">
          <table>
            <thead><tr><th>Task</th><th>Adobe app</th><th>Artcraft today</th></tr></thead>
            <tbody>{adobeLeads.map((row) => (
              <tr key={row.task}>
                <td>{row.task}</td>
                <td className="compare-app">{row.app} {ADOBE_VERSIONS[row.app].version}</td>
                <td>{row.note}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading"><div><p className="eyebrow">A SIMPLE CHOICE</p><h2>A practical way to start.</h2></div></div>
        <div className="choice-grid">
          <div><strong>01</strong><p>Want AI images, video and 3D staging? Start with the ArtCraft AI app.</p></div>
          <div><strong>02</strong><p>Curious about free, open-source Photoshop or Premiere alternatives? Try the Craft apps — expect alpha rough edges.</p></div>
          <div><strong>03</strong><p>Delivering client work on a deadline? Stay with Adobe for now, and revisit as the Craft apps mature.</p></div>
        </div>
      </section>

      <div className="source-box comparison-sources">
        <div>
          <strong>Versions and sources</strong>
          <p>
            <a href={ARTCRAFT_VERSION.readme} target="_blank" rel="noreferrer">ArtCraft AI app {ARTCRAFT_VERSION.version}</a> ({ARTCRAFT_VERSION.releasedAt}) ·{' '}
            {craftMatches.map((m, i) => <span key={m.repo}>{i > 0 ? ' · ' : ''}<a href={parityLink(m.repo)} target="_blank" rel="noreferrer">{m.craft} parity report</a></span>)}
          </p>
          <p>
            {(Object.keys(ADOBE_VERSIONS) as Array<keyof typeof ADOBE_VERSIONS>).map((app, i) => <span key={app}>{i > 0 ? ' · ' : ''}<a href={ADOBE_VERSIONS[app].notes} target="_blank" rel="noreferrer">{app} {ADOBE_VERSIONS[app].version}</a></span>)}
            {' · '}{Object.entries(adobeLinks).map(([name, url], i) => <span key={name}>{i > 0 ? ' · ' : ''}<a href={url} target="_blank" rel="noreferrer">Adobe {name}</a></span>)}
          </p>
          <p className="tiny-note">Craft app numbers are the projects’ own estimates from their parity reports (Photoshop 27.11.0, Premiere Pro 26.5.2 and After Effects 26.5 were the versions measured against; VectorCraft targets Illustrator 30.x). The Craft apps update almost daily, so details change quickly. Last checked: {COMPARE_CHECKED_AT}.</p>
        </div>
      </div>

      <SourceLine lang={lang} />
    </div>
  )
}
