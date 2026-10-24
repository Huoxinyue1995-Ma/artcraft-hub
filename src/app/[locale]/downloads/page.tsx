import type { Metadata } from 'next'
import { Apple, ArrowUpRight, Github, Globe, Monitor, Terminal } from 'lucide-react'
import { Callout } from '@/components/callout'
import { PageIntro, SourceLine } from '@/components/site-shell'
import { getLang, OFFICIAL, pageMetadata } from '@/lib/content'
import {
  ARTCRAFT_APP, LAUNCHER, RELEASES_CHECKED_AT, craftAppLinks,
  getArtcraftRelease, getCraftAppReleases, getLauncherRelease,
  type DownloadFile, type Platform,
} from '@/lib/releases'

// Refresh release data from GitHub every 6 hours (must be a literal; see lib/releases.ts).
export const revalidate = 21600

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const lang = getLang((await params).locale)
  return pageMetadata(
    lang,
    '/downloads',
    'Artcraft Download for Windows, macOS & Linux (Official Links)',
    'Download the ArtCraft AI app, the ArtCraft Launcher, and every Craft app (PhotoCraft, VectorCraft, FilmCraft and more) from official GitHub and getartcraft.com links, with current versions.',
  )
}

const platformMeta: Record<Platform, { name: string; icon: React.ReactNode }> = {
  windows: { name: 'Windows', icon: <Monitor size={15} /> },
  macos: { name: 'macOS', icon: <Apple size={15} /> },
  linux: { name: 'Linux', icon: <Terminal size={15} /> },
}

function FileLinks({ files, event, compact = false }: { files: DownloadFile[]; event: string; compact?: boolean }) {
  const platforms: Platform[] = ['windows', 'macos', 'linux']
  return (
    <div className={compact ? 'dl-files dl-files-compact' : 'dl-files'}>
      {platforms.map((p) => {
        const list = files.filter((f) => f.platform === p)
        if (list.length === 0) return null
        return (
          <div className="dl-platform" key={p}>
            <span className="dl-platform-name">{platformMeta[p].icon} {platformMeta[p].name}</span>
            <div className="dl-platform-links">
              {list.map((f) => (
                <a key={f.file} href={f.url} rel="noreferrer" data-ga-event={event} title={f.sha256 ? `${f.file}\nSHA-256: ${f.sha256}` : f.file}>
                  {compact ? f.label.replace(/^(Windows|macOS|Linux) /, '') : f.label} <ArrowUpRight size={13} />
                </a>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default async function DownloadsPage({ params }: { params: Promise<{ locale: string }> }) {
  const lang = getLang((await params).locale)
  const [artcraft, launcher, craftApps] = await Promise.all([getArtcraftRelease(), getLauncherRelease(), getCraftAppReleases()])
  const checkedNote = artcraft.live && launcher.live && craftApps.every((c) => c.release.live)
    ? 'Versions are read from each official GitHub release and refreshed every few hours.'
    : `Some versions could not be refreshed from GitHub and show the last manual check (${RELEASES_CHECKED_AT}).`
  // Checksums come from GitHub's own digest of each release asset, so they update with each new version.
  const artcraftSha = artcraft.files.filter((f) => f.sha256)

  return (
    <div className="container page-space">
      <PageIntro
        lang={lang}
        eyebrow="ARTCRAFT DOWNLOAD"
        title="Download Artcraft."
        description="Official links only. Part 1 is the ArtCraft AI app. Part 2 is the Craft App Suite — PhotoCraft, VectorCraft, FilmCraft and ten more — with the ArtCraft Launcher to install and update them."
      />
      <nav className="dl-jump" aria-label="On this page">
        <a href="#artcraft-app">1 · ArtCraft AI app <span>v{artcraft.version}</span></a>
        <a href="#craft-apps">2 · Craft apps &amp; Launcher <span>13 apps</span></a>
      </nav>

      {/* ---------------- Part 1: ArtCraft AI app ---------------- */}
      <section className="section-block dl-part" id="artcraft-app">
        <div className="section-heading"><div>
          <p className="eyebrow">PART 1 · THE ARTCRAFT AI APP</p>
          <h2>ArtCraft AI app download</h2>
        </div></div>
        <div className="dl-hero">
          <div>
            <p className="dl-version">v{artcraft.version} <span>Released {artcraft.publishedAt}</span></p>
            <p className="muted">The AI image and video studio: 2D canvas, 3D stage, and 60+ image, video, audio and 3D models. Windows 10 64-bit+ and macOS 12+. A free sign-in may be required after install.</p>
            <FileLinks files={artcraft.files} event="official_asset_download" />
          </div>
          <div className="dl-side">
            <a className="button button-dark" href={ARTCRAFT_APP.website} target="_blank" rel="noreferrer" data-ga-event="official_download_click">getartcraft.com/download <ArrowUpRight size={15} /></a>
            <a className="dl-side-link" href={artcraft.releaseUrl} target="_blank" rel="noreferrer" data-ga-event="release_notes_click"><Github size={15} /> Release notes on GitHub</a>
            <a className="dl-side-link" href={ARTCRAFT_APP.github} target="_blank" rel="noreferrer" data-ga-event="official_github_click"><Github size={15} /> Source code (storytold/artcraft)</a>
            <a className="dl-side-link" href={ARTCRAFT_APP.browser} target="_blank" rel="noreferrer" data-ga-event="browser_launch_click"><Globe size={15} /> Use it in the browser</a>
            <a className="dl-side-link" href={OFFICIAL.setup} target="_blank" rel="noreferrer" data-ga-event="source_setup_click"><Terminal size={15} /> Linux: build from source</a>
          </div>
        </div>
        {artcraftSha.length > 0 ? (
          <details className="dl-checksums">
            <summary>SHA-256 checksums for v{artcraft.version}</summary>
            <div className="asset-list">{artcraftSha.map((a) => <div className="asset-row" key={a.file}><div><strong>{a.file}</strong><span>{a.label}</span></div><code>{a.sha256}</code></div>)}</div>
            <p className="tiny-note">SHA-256 digests are published by GitHub for each release file. On macOS or Linux, check a download with <code>shasum -a 256 &lt;file&gt;</code>; on Windows, <code>certutil -hashfile &lt;file&gt; SHA256</code>.</p>
          </details>
        ) : null}
        <p className="tiny-note">The ArtCraft AI app has no built-in updater in v{artcraft.version}. To update, download the new version from the links above. The ArtCraft Launcher below does not manage this app.</p>
      </section>

      {/* ---------------- Part 2: Craft App Suite ---------------- */}
      <section className="section-block dl-part" id="craft-apps">
        <div className="section-heading"><div>
          <p className="eyebrow">PART 2 · THE CRAFT APP SUITE</p>
          <h2>Craft apps download</h2>
        </div></div>
        <p className="lead dl-lead">Thirteen free, open-source desktop apps from the ArtCraft team, each written from scratch in Rust. They are separate from the AI app and young — most are in alpha.</p>

        <div className="dl-launcher" id="launcher">
          <div>
            <span className="pill pill-blue">Easiest way · {LAUNCHER.status}</span>
            <h3>ArtCraft Launcher <span>v{launcher.version}</span></h3>
            <p>One app to install, update and open all 13 Craft apps. It picks the right build for your system, checks every download against its SHA-256 checksum, and tells you when an update is out. Released {launcher.publishedAt}.</p>
            <FileLinks files={launcher.files} event="launcher_download" />
            {launcher.files.some((f) => f.sha256) ? (
              <details className="dl-checksums">
                <summary>SHA-256 checksums for v{launcher.version}</summary>
                <div className="asset-list">{launcher.files.filter((f) => f.sha256).map((f) => <div className="asset-row" key={f.file}><div><strong>{f.file}</strong><span>{f.label}</span></div><code>{f.sha256}</code></div>)}</div>
              </details>
            ) : null}
          </div>
          <div className="dl-side">
            <a className="button button-dark" href={LAUNCHER.releases} target="_blank" rel="noreferrer" data-ga-event="launcher_release_click">All Launcher files <ArrowUpRight size={15} /></a>
            <a className="dl-side-link" href={LAUNCHER.github} target="_blank" rel="noreferrer" data-ga-event="launcher_github_click"><Github size={15} /> storytold/craft-launcher</a>
            <p className="tiny-note">Also available for Windows 32-bit, Linux Arm/RISC-V, FreeBSD, Flatpak and the web on the release page.</p>
          </div>
        </div>

        <div className="table-wrap dl-table">
          <table>
            <thead><tr><th>App</th><th>What it is for</th><th>Version</th><th>Direct download</th><th>Links</th></tr></thead>
            <tbody>
              {craftApps.map(({ app, release }) => {
                const links = craftAppLinks(app.id)
                return (
                  <tr key={app.id} id={app.id}>
                    <td>{app.name}<span className="dl-similar">like {app.similarTo}</span></td>
                    <td className="dl-purpose">{app.purpose}</td>
                    <td className="dl-ver"><a href={release.releaseUrl} target="_blank" rel="noreferrer">v{release.version}</a><span>{release.publishedAt}</span></td>
                    <td><FileLinks files={release.files.filter((f) => !/Arm|\.rpm/.test(f.label))} event="craft_app_download" compact /></td>
                    <td className="dl-links">
                      <a href={links.github} target="_blank" rel="noreferrer" data-ga-event="craft_app_github_click">GitHub</a>
                      <a href={links.website} target="_blank" rel="noreferrer" data-ga-event="craft_app_website_click">Website</a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="tiny-note">{checkedNote} Each release page lists more builds (Windows Arm, Linux .rpm/Arm, portable zip) and a SHA256SUMS.txt file. “Like …” is only a rough orientation, not a claim of compatibility.</p>
      </section>

      <Callout lang={lang} title="Download only from official sources" body="Every link on this page goes to github.com/storytold or getartcraft.com. If you got an Artcraft installer anywhere else, delete it and download it again here." />
      <SourceLine lang={lang} />
    </div>
  )
}
