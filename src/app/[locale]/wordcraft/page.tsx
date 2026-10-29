import type { Metadata } from 'next'
import Link from 'next/link'
import { Apple, ArrowUpRight, Check, Minus, Monitor, Terminal } from 'lucide-react'
import { PageIntro } from '@/components/site-shell'
import { getLang, pageMetadata, SITE_URL } from '@/lib/content'
import { craftAppLinks, getCraftAppFullRelease, LAUNCHER, type DownloadFile, type Platform } from '@/lib/releases'

/**
 * /en/wordcraft — WordCraft download, how to use it, and how it compares with Microsoft Word.
 *
 * Sources, checked on WORDCRAFT_CHECKED_AT:
 *  - github.com/storytold/wordcraft README (features, formats, downloads, Windows troubleshooting)
 *  - docs/target-app-parity.md and ROADMAP.md (readiness ~60%, breadth ~80%, measured against
 *    Microsoft Word for Mac 16.113.4) and docs/gaps.md (what's missing)
 *  - getartcraft.com/apps/wordcraft (official status label "In development")
 *  - the installers themselves: Windows MSI signed by Learning Machines Inc (Microsoft ID Verified),
 *    macOS DMG and app signed and notarized (Developer ID Learning Machines LLC)
 *  - source: the desktop app checks GitHub for updates at every start (crates/ui-egui/src/updates_ui.rs)
 * Versions and file links update automatically from the latest GitHub release.
 */
const WORDCRAFT_CHECKED_AT = '2026-10-29'
const PATH = '/wordcraft'
const TITLE = 'WordCraft: Download, How to Use & vs Microsoft Word (2026)'
const DESCRIPTION = 'Download WordCraft, the free open-source Microsoft Word alternative from the ArtCraft team, for Windows, macOS and Linux. How to install and use it, and a feature-by-feature comparison with Word.'

const WORD_VERSION = 'Microsoft Word for Mac 16.113 (Microsoft 365)'
const GH = 'https://github.com/storytold/wordcraft'
const PARITY = `${GH}/blob/main/docs/target-app-parity.md`
const GAPS = `${GH}/blob/main/docs/gaps.md`

type Row = { area: string; wordcraft: string; status: 'yes' | 'partial' | 'no'; word: string; parity?: number }

/** Feature-by-feature comparison. "status" describes WordCraft relative to Word. */
const compare: Row[] = [
  { area: 'Interface', wordcraft: 'Ribbon, Quick Access Toolbar, keytips, command search; Word-style shortcuts (about 160 of Word’s ~250 on Windows and Linux)', status: 'partial', word: 'Full ribbon and ~250 shortcuts' },
  { area: 'Writing and editing', wordcraft: 'Smart quotes, AutoCorrect, list autoformat, find and replace with regex, Format Painter, undo and redo', status: 'partial', word: 'Same, plus a Clipboard pane', parity: 85 },
  { area: 'Styles and themes', wordcraft: 'Live Styles gallery, Styles pane, create and modify styles, style sets, themes', status: 'partial', word: 'More built-in style sets and themes; Manage Styles', parity: 74 },
  { area: 'Tables', wordcraft: 'Merge and split, table styles, repeating header rows, sort, formulas, Draw Table', status: 'partial', word: 'Same', parity: 76 },
  { area: 'Page layout', wordcraft: 'Margins, columns, section breaks, headers and footers, page numbers, watermark, drop caps, hyphenation', status: 'partial', word: 'Same; WordCraft’s page breaks don’t always match Word’s, and columns don’t balance', parity: 70 },
  { area: 'References', wordcraft: 'Table of contents, footnotes, citations in APA, MLA, Chicago and IEEE, bibliography, captions, index, Zotero integration', status: 'partial', word: 'More citation styles; EndNote and Mendeley integration', parity: 65 },
  { area: 'Review', wordcraft: 'Track changes, comments, accept and reject, Compare documents, Restrict Editing, accessibility checker', status: 'partial', word: 'Same', parity: 72 },
  { area: 'Spelling and grammar', wordcraft: 'Offline, in 10 languages: English, Spanish, Portuguese, Italian, Polish, Czech, Croatian, Turkish, Russian, Indonesian', status: 'partial', word: 'About 50 languages, plus Microsoft Editor online', parity: 44 },
  { area: 'Mail merge', wordcraft: 'From CSV, typed lists or Excel/OpenDocument sheets; envelopes and labels', status: 'partial', word: 'Also Outlook contacts, Access databases and email merge', parity: 70 },
  { area: 'Pictures, shapes, equations', wordcraft: 'Crop, recolour, background removal, text wrapping, text boxes, WordArt, equation editor', status: 'partial', word: 'Same, with more mature object handling', parity: 60 },
  { area: 'Charts and SmartArt', wordcraft: 'Its own charts are editable; charts and SmartArt from Word files can’t be edited', status: 'no', word: 'Full chart and SmartArt editing', parity: 3 },
  { area: 'File formats', wordcraft: 'Opens and saves .docx, .odt, .rtf, .html, .md, .tex, .txt; opens old .doc; exports PDF', status: 'partial', word: 'Writes .doc too; opens PDFs for editing (Windows). WordCraft’s .docx support hasn’t been tested on real-world files yet', parity: 60 },
  { area: 'Macros and add-ins', wordcraft: 'Keeps macros in .docm files but can’t run them; no add-ins', status: 'no', word: 'VBA macros and Office add-ins' },
  { area: 'Cloud and collaboration', wordcraft: 'Local files only', status: 'no', word: 'OneDrive, SharePoint, real-time co-authoring' },
  { area: 'AI assistant', wordcraft: 'None', status: 'no', word: 'Copilot (in Microsoft 365 plans that include it)' },
  { area: 'Price and platforms', wordcraft: 'Free and open source (MIT or Apache-2.0); Windows, macOS, Linux, FreeBSD and the web', status: 'yes', word: 'Microsoft 365 subscription or one-time purchase; Windows, macOS, web, mobile — no Linux' },
  { area: 'Automation', wordcraft: 'Every action is a command, usable from a command-line tool and an MCP server for AI agents', status: 'yes', word: 'VBA and Office.js' },
]

const faq: Array<{ q: string; a: string }> = [
  { q: 'Is WordCraft free?', a: 'Yes. WordCraft is free and open source under the MIT or Apache-2.0 license, with no account, subscription or ads.' },
  { q: 'Is WordCraft made by Microsoft?', a: 'No. WordCraft is made by the ArtCraft team (published by Learning Machines). It is a clean-room reimplementation, built from public specifications and observation, with no Microsoft code.' },
  { q: 'Can WordCraft open Word documents?', a: 'Yes. It opens and saves .docx files and can open older .doc files. Simple documents work well, but its .docx support hasn’t been tested on real-world files yet, and charts and SmartArt from Word can’t be edited. Keep a copy of important files.' },
  { q: 'Does WordCraft work offline?', a: 'Yes. Editing, spelling and grammar all run on your computer, and documents are never uploaded. The desktop app does contact GitHub when it starts to check for a newer version.' },
  { q: 'Can WordCraft replace Microsoft Word?', a: 'For simple documents, letters and notes, often yes. For professional work it is not ready yet: WordCraft is in alpha, and its own estimate of readiness for real work is about 60%. Keep Word for documents you exchange with others or can’t afford to lose.' },
  { q: 'Is WordCraft safe?', a: 'The Windows installer is signed by Learning Machines Inc and the macOS app is signed and notarized by Apple. Download it only from GitHub or getartcraft.com, and check the SHA-256 checksum.' },
]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const lang = getLang((await params).locale)
  return { ...pageMetadata(lang, PATH, TITLE, DESCRIPTION), title: { absolute: TITLE }, openGraph: { type: 'article', title: TITLE, description: DESCRIPTION, url: `/${lang}${PATH}` } }
}

export const revalidate = 21600

const platformMeta: Record<Platform, { name: string; icon: React.ReactNode }> = {
  windows: { name: 'Windows', icon: <Monitor size={15} /> },
  macos: { name: 'macOS', icon: <Apple size={15} /> },
  linux: { name: 'Linux', icon: <Terminal size={15} /> },
}

const Ext = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer">{children} <ArrowUpRight size={12} /></a>
)
const Cmd = ({ children }: { children: string }) => (
  <div className="code-block linux-cmd"><Terminal size={14} /><code>{children}</code></div>
)

function Files({ files }: { files: DownloadFile[] }) {
  return (
    <div className="dl-files">
      {(['windows', 'macos', 'linux'] as Platform[]).map((p) => {
        const list = files.filter((f) => f.platform === p)
        if (!list.length) return null
        return (
          <div className="dl-platform" key={p}>
            <span className="dl-platform-name">{platformMeta[p].icon} {platformMeta[p].name}</span>
            <div className="dl-platform-links">{list.map((f) => (
              <a key={f.file} href={f.url} rel="noreferrer" data-ga-event="wordcraft_download" title={f.sha256 ? `${f.file}\nSHA-256: ${f.sha256}` : f.file}>{f.label} <ArrowUpRight size={13} /></a>
            ))}</div>
          </div>
        )
      })}
    </div>
  )
}

export default async function WordCraftPage({ params }: { params: Promise<{ locale: string }> }) {
  const lang = getLang((await params).locale)
  const release = await getCraftAppFullRelease('wordcraft')
  const links = craftAppLinks('wordcraft')
  const v = release.version
  const url = `${SITE_URL}/${lang}${PATH}`
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'WordCraft',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Word processor',
      operatingSystem: 'Windows, macOS, Linux, FreeBSD',
      softwareVersion: v,
      downloadUrl: links.releases,
      license: 'https://github.com/storytold/wordcraft/blob/main/LICENSE-MIT',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@type': 'Organization', name: 'Learning Machines' },
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Artcraft Hub', item: `${SITE_URL}/${lang}` },
      { '@type': 'ListItem', position: 2, name: 'WordCraft', item: url },
    ] },
  ]

  return (
    <div className="container page-space">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link href={`/${lang}`}>Artcraft Hub</Link> <span>/</span> <span>WordCraft</span></nav>
      <PageIntro
        lang={lang}
        eyebrow="WORDCRAFT · WORD PROCESSOR"
        title="WordCraft: the free, open-source Word alternative"
        description={`A word processor with the familiar ribbon, styles, track changes and .docx support, from the ArtCraft team. Free for Windows, macOS and Linux. Current version v${v} (released ${release.publishedAt}). Last checked ${WORDCRAFT_CHECKED_AT}.`}
      />
      <nav className="dl-jump" aria-label="On this page">
        <a href="#download">Download <span>v{v}</span></a>
        <a href="#how-to-use">How to use it</a>
        <a href="#vs-word">WordCraft vs Word</a>
      </nav>

      {/* ---------- Download ---------- */}
      <section className="section-block dl-part" id="download">
        <div className="section-heading"><div><p className="eyebrow">DOWNLOAD</p><h2>Download WordCraft</h2></div></div>
        <div className="dl-hero">
          <div>
            <p className="dl-version">v{v} <span>Released {release.publishedAt} · alpha</span></p>
            <p className="muted">Free and open source. Windows 10 and 11, macOS (Apple silicon and Intel) and Linux. Pick your system below. All files come from the official GitHub release.</p>
            <Files files={release.files} />
          </div>
          <div className="dl-side">
            <a className="button button-dark" href={links.releases} target="_blank" rel="noreferrer" data-ga-event="wordcraft_release_click">All WordCraft files <ArrowUpRight size={15} /></a>
            <a className="dl-side-link" href={links.website} target="_blank" rel="noreferrer">WordCraft on getartcraft.com <ArrowUpRight size={13} /></a>
            <a className="dl-side-link" href={links.github} target="_blank" rel="noreferrer">Source code (storytold/wordcraft) <ArrowUpRight size={13} /></a>
            <p className="tiny-note">Also on the release page: Windows 32-bit and Arm portable builds, Linux .tar.gz and RISC-V, FreeBSD, a command-line tool for macOS, and a web build to host yourself.</p>
          </div>
        </div>
        <p className="tiny-note">Prefer to manage all ArtCraft apps in one place? <Link href={`/${lang}/downloads#launcher`}>ArtCraft Launcher</Link> ({LAUNCHER.status}) installs WordCraft and keeps it updated. On Linux, see our <Link href={`/${lang}/install/linux`}>Linux install guide</Link> for AppImage, .deb, .rpm and Flatpak.</p>
      </section>

      <article className="prose safe-article">
        {/* ---------- Install ---------- */}
        <h2 id="install">How to install WordCraft</h2>
        <h3>Windows</h3>
        <p>Run the <code>.msi</code> installer. By default it installs for your account only and doesn’t need administrator rights. Choose “Everyone on this computer” on the first screen to install it for all users. The installer is signed by Learning Machines Inc. If you can’t install software, use the portable <code>.zip</code>: unzip it and run <code>wordcraft.exe</code>.</p>
        <h3>macOS</h3>
        <p>Open the <code>.dmg</code> and drag WordCraft into Applications. The app is signed and notarized by Apple, so it opens without security warnings. One universal build runs on both Apple silicon and Intel Macs.</p>
        <h3>Linux</h3>
        <p>The AppImage runs on most distributions without installing:</p>
        <Cmd>{`chmod +x wordcraft-${v}-linux-x86_64.AppImage\n./wordcraft-${v}-linux-x86_64.AppImage`}</Cmd>
        <p>Or install the <code>.deb</code> with <code>sudo apt install ./wordcraft-{v}-linux-x86_64.deb</code>, or the <code>.rpm</code> with <code>sudo dnf install ./wordcraft-{v}-linux-x86_64.rpm</code>. On Arch Linux, community-maintained AUR packages are available (for example <code>wordcraft-bin</code>).</p>
        <p>To check a download, get <code>SHA256SUMS.txt</code> from the same release and run <code>sha256sum --check --ignore-missing SHA256SUMS.txt</code>.</p>

        {/* ---------- How to use ---------- */}
        <h2 id="how-to-use">How to use WordCraft</h2>
        <p>If you have used Word, WordCraft will feel familiar: the same ribbon tabs (Home, Insert, Draw, Design, Layout, References, Mailings, Review, View, Help) and most of the same shortcuts. Five things to know as you start:</p>
        <ol className="linux-issues">
          <li><strong>Open your Word files directly.</strong> Use File › Open, or drag a <code>.docx</code> onto the window. WordCraft saves back to <code>.docx</code>, so you can send files to Word users. It also opens old <code>.doc</code> files, OpenDocument (<code>.odt</code>), RTF, HTML and Markdown.</li>
          <li><strong>Format with styles.</strong> Pick headings and body text from the live Styles gallery on the Home tab. Enter continues a list and Tab indents it. Headings also build the Navigation pane and your table of contents.</li>
          <li><strong>Review with track changes.</strong> On the Review tab, turn on Track Changes, add comments in the margin, then accept or reject changes. Compare shows the differences between two versions of a document.</li>
          <li><strong>Add references.</strong> The References tab inserts a table of contents, footnotes and citations in APA, MLA, Chicago or IEEE style, and builds the bibliography. If you use Zotero, keep the Zotero app running and use the Zotero tab, which works the way Word’s Zotero plugin does.</li>
          <li><strong>Export a PDF.</strong> File › Export creates a PDF with real, selectable text, links and bookmarks.</li>
        </ol>
        <p>To try it without your own files, go to File › New and pick “Studio handbook (sample)”, a ready-made document that shows off styles, tables, references and review. Letter, Résumé and Report templates are there too.</p>
        <h3>Tips and troubleshooting</h3>
        <ul>
          <li><strong>Keep backups.</strong> WordCraft is alpha software. Keep a copy of important documents until you’ve checked how they open in WordCraft. It regularly keeps a local copy of unsaved work, and after a crash File › Recover lets you restore it.</li>
          <li><strong>The app doesn’t open on Windows.</strong> WordCraft uses DirectX 12 by default, and some graphics drivers (notably some AMD ones) crash with it. In PowerShell, from the folder with <code>wordcraft.exe</code>, run <code>$env:WGPU_BACKEND = &quot;vulkan&quot;</code> and start it again.</li>
          <li><strong>Blurry text or no drag-and-drop on Linux.</strong> On Wayland, WordCraft runs through XWayland by default so that dragging files into the window works. Start it with <code>WORDCRAFT_WAYLAND=1</code> for sharper text with fractional scaling, at the cost of drag-and-drop.</li>
          <li><strong>Automate it.</strong> The <code>wordcraft-cli</code> tool converts documents (for example <code>wordcraft-cli convert report.docx report.pdf</code>), and an MCP server lets AI agents edit documents.</li>
        </ul>
        <p><strong>About privacy:</strong> your documents stay on your computer. Spelling, grammar and everything else run offline. WordCraft has no account and no telemetry, but the desktop app checks GitHub for a newer version each time it starts. Read more in our <Link href={`/${lang}/is-artcraft-safe`}>guide to whether ArtCraft apps are safe</Link>.</p>

        {/* ---------- vs Word ---------- */}
        <h2 id="vs-word">WordCraft vs Microsoft Word</h2>
        <p>WordCraft aims to match Word feature for feature. Its developers measure it against <strong>{WORD_VERSION}</strong>, and by their own estimate it covers about <strong>80%</strong> of Word’s features and is about <strong>60%</strong> of the way to being ready for real work. Here is where it stands, area by area:</p>
      </article>

      <div className="table-wrap compare-table wc-table">
        <table>
          <thead><tr><th>Area</th><th>WordCraft v{v}</th><th>vs Word</th><th>Microsoft Word</th></tr></thead>
          <tbody>{compare.map((r) => (
            <tr key={r.area}>
              <td>{r.area}</td>
              <td>{r.wordcraft}</td>
              <td className="wc-status">{r.status === 'yes' ? <span className="safe-ok"><Check size={13} /> {r.area === 'Automation' || r.area === 'Price and platforms' ? 'WordCraft ahead' : 'On par'}</span> : r.status === 'partial' ? <span className="wc-partial">Partial{r.parity ? ` · ${r.parity}%` : ''}</span> : <span className="safe-warn"><Minus size={13} /> Missing{r.parity ? ` · ${r.parity}%` : ''}</span>}</td>
              <td>{r.word}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <p className="tiny-note">Percentages are how close each area is to Word in depth and fidelity, from WordCraft’s own <Ext href={PARITY}>parity report</Ext> (last re-measured 2026-10-10); the <Ext href={GAPS}>list of gaps</Ext> shows what is still missing. They are the developers’ estimates, not an independent test.</p>

      <article className="prose safe-article">
        <h3>Where WordCraft is ahead</h3>
        <ul>
          <li><strong>Free and open</strong>: no subscription, no account, and the source code is public.</li>
          <li><strong>Runs on Linux</strong>, which Word doesn’t, plus Windows, macOS, FreeBSD and the browser.</li>
          <li><strong>Fast</strong>: in a 188-page document, typing re-lays out the page in about 1.4 ms.</li>
          <li><strong>Built for automation</strong>: every action is a command you can run from the command line or from an AI agent.</li>
        </ul>
        <h3>Where Word is still ahead</h3>
        <ul>
          <li><strong>File fidelity</strong>: complex Word documents may not look the same. WordCraft’s own developers list “.docx never tested on real-world files” as their top gap.</li>
          <li><strong>Charts and SmartArt</strong> from Word documents can’t be edited.</li>
          <li><strong>Collaboration</strong>: no cloud storage, real-time co-authoring, macros or add-ins.</li>
          <li><strong>Stability</strong>: there are open reports of crashes and freezes on some machines.</li>
        </ul>
        <h3>Should you switch?</h3>
        <p><strong>Try WordCraft</strong> for personal writing, notes, letters, school papers with citations, or if you’re on Linux. <strong>Keep Word</strong> for documents you exchange with others and need to look exactly right, for files with charts, SmartArt or macros, and for team work in the cloud. You can install both and open the same <code>.docx</code> in either. For the other Craft apps compared with Photoshop, Illustrator and Premiere Pro, see <Link href={`/${lang}/compare/adobe`}>ArtCraft vs Adobe</Link>.</p>

        <h2 id="faq">FAQ</h2>
      </article>
      <div className="faq-list linux-faq">{faq.map(({ q, a }) => (
        <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>
      ))}</div>

      <div className="source-box comparison-sources">
        <div>
          <strong>Sources</strong>
          <p><Ext href={GH}>WordCraft on GitHub</Ext> · <Ext href={links.releases}>WordCraft releases</Ext> · <Ext href={links.website}>getartcraft.com/apps/wordcraft</Ext> · <Ext href={PARITY}>Parity with Microsoft Word</Ext> · <Ext href={GAPS}>Known gaps</Ext></p>
          <p className="tiny-note">The version and download links update automatically from the latest GitHub release. Features, comparison and installer signatures (Windows Authenticode and macOS notarization, checked on the downloaded files) were verified on {WORDCRAFT_CHECKED_AT}. Readiness percentages are WordCraft’s own estimates. Microsoft Word is a trademark of Microsoft. This site is independent from ArtCraft and Microsoft.</p>
        </div>
      </div>
    </div>
  )
}
