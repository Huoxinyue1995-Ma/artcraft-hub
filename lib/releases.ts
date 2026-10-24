/**
 * Official download data for the ArtCraft AI app, the ArtCraft Launcher, and the Craft App Suite.
 *
 * Every Craft app ships new releases almost daily, so versions are fetched from the GitHub
 * Releases API at build time and refreshed every few hours (ISR). If GitHub is unreachable or
 * rate-limited, the FALLBACK data below (checked by hand) is used instead.
 *
 * All links point to official sources only: github.com/storytold/* and getartcraft.com.
 */

export const RELEASES_CHECKED_AT = '2026-10-24'

/** Seconds between background refreshes of release data. Keep in sync with `revalidate` on the page. */
export const RELEASE_REVALIDATE_SECONDS = 21600

const GH = 'https://github.com/storytold'

export type Platform = 'windows' | 'macos' | 'linux'

export type DownloadFile = { platform: Platform; label: string; file: string; url: string }

export type ReleaseInfo = {
  version: string
  publishedAt: string
  releaseUrl: string
  files: DownloadFile[]
  live: boolean
}

export type CraftApp = {
  id: string
  name: string
  purpose: string
  /** Closest familiar app, for orientation only. */
  similarTo: string
  /** Development stage as stated in the app's own README (checked RELEASES_CHECKED_AT). */
  stage: 'pre-alpha' | 'early development' | 'early alpha' | 'alpha'
}

/** The Craft App Suite, in the order used by getartcraft.com/apps and the official launcher. */
export const CRAFT_APPS: CraftApp[] = [
  { id: 'photocraft', name: 'PhotoCraft', purpose: 'Image editing with layers, masks, type and PSD files', similarTo: 'Photoshop', stage: 'early alpha' },
  { id: 'vectorcraft', name: 'VectorCraft', purpose: 'Vector illustration', similarTo: 'Illustrator', stage: 'alpha' },
  { id: 'filmcraft', name: 'FilmCraft', purpose: 'Video editing, color and sound', similarTo: 'Premiere Pro', stage: 'alpha' },
  { id: 'lightcraft', name: 'LightCraft', purpose: 'Photo library and raw development', similarTo: 'Lightroom', stage: 'alpha' },
  { id: 'pdfcraft', name: 'PdfCraft', purpose: 'Reading, organizing and protecting PDFs', similarTo: 'Acrobat', stage: 'alpha' },
  { id: 'effectcraft', name: 'EffectCraft', purpose: 'Motion graphics and visual effects', similarTo: 'After Effects', stage: 'alpha' },
  { id: 'designcraft', name: 'DesignCraft', purpose: 'Page layout and publishing', similarTo: 'InDesign', stage: 'pre-alpha' },
  { id: 'figcraft', name: 'FigCraft', purpose: 'Interface design and prototyping', similarTo: 'Figma', stage: 'early alpha' },
  { id: 'wordcraft', name: 'WordCraft', purpose: 'Word processing and documents', similarTo: 'Microsoft Word', stage: 'alpha' },
  { id: 'soundcraft', name: 'SoundCraft', purpose: 'Audio recording and editing', similarTo: 'Pro Tools', stage: 'pre-alpha' },
  { id: 'deckcraft', name: 'DeckCraft', purpose: 'Presentations and slide decks', similarTo: 'PowerPoint', stage: 'early development' },
  { id: 'cadcraft', name: 'CADCraft', purpose: 'Computer-aided design and drafting', similarTo: 'AutoCAD', stage: 'early development' },
  { id: 'gridcraft', name: 'GridCraft', purpose: 'Spreadsheets and data', similarTo: 'Excel', stage: 'alpha' },
]

export const craftAppLinks = (id: string) => ({
  github: `${GH}/${id}`,
  releases: `${GH}/${id}/releases/latest`,
  website: `https://getartcraft.com/apps/${id}`,
})

export const LAUNCHER = {
  repo: 'craft-launcher',
  github: `${GH}/craft-launcher`,
  releases: `${GH}/craft-launcher/releases/latest`,
  status: 'early alpha',
}

export const ARTCRAFT_APP = {
  repo: 'artcraft',
  github: `${GH}/artcraft`,
  releases: `${GH}/artcraft/releases`,
  website: 'https://getartcraft.com/download',
  browser: 'https://app.getartcraft.com/',
}

/* ---------------- Fallback data (verified by hand on RELEASES_CHECKED_AT) ---------------- */

const FALLBACK_VERSIONS: Record<string, { version: string; publishedAt: string }> = {
  artcraft: { version: '0.41.0', publishedAt: '2026-09-26' },
  'craft-launcher': { version: '0.7.0', publishedAt: '2026-10-23' },
  photocraft: { version: '0.15.1', publishedAt: '2026-10-23' },
  vectorcraft: { version: '0.16.0', publishedAt: '2026-10-23' },
  filmcraft: { version: '0.12.0', publishedAt: '2026-10-23' },
  lightcraft: { version: '0.13.0', publishedAt: '2026-10-23' },
  pdfcraft: { version: '0.13.0', publishedAt: '2026-10-23' },
  effectcraft: { version: '0.16.0', publishedAt: '2026-10-23' },
  designcraft: { version: '0.12.0', publishedAt: '2026-10-22' },
  figcraft: { version: '0.10.0', publishedAt: '2026-10-22' },
  wordcraft: { version: '0.10.0', publishedAt: '2026-10-22' },
  soundcraft: { version: '0.12.1', publishedAt: '2026-10-22' },
  deckcraft: { version: '0.10.0', publishedAt: '2026-10-22' },
  cadcraft: { version: '0.12.0', publishedAt: '2026-10-23' },
  gridcraft: { version: '0.11.1', publishedAt: '2026-10-22' },
}

/* ---------------- File selection ---------------- */

type Rule = { platform: Platform; label: string; match: RegExp }

/** The ArtCraft AI app publishes Windows and macOS builds only (Linux is source-only). */
const ARTCRAFT_RULES: Rule[] = [
  { platform: 'windows', label: 'Windows installer (.exe)', match: /_x64-setup\.exe$/ },
  { platform: 'windows', label: 'Windows installer (.msi)', match: /_x64_en-US\.msi$/ },
  { platform: 'macos', label: 'macOS universal (.dmg)', match: /_universal\.dmg$/ },
]

/** Launcher and Craft apps share one naming scheme: <id>-<ver>-<os>-<arch>.<ext>. */
const suiteRules = (id: string): Rule[] => [
  { platform: 'windows', label: 'Windows x64 (.msi)', match: new RegExp(`^${id}-[\\d.]+-windows-x64\\.msi$`) },
  { platform: 'windows', label: 'Windows Arm (.msi)', match: new RegExp(`^${id}-[\\d.]+-windows-arm64\\.msi$`) },
  { platform: 'macos', label: 'macOS universal (.dmg)', match: new RegExp(`^${id}-[\\d.]+-macos-universal\\.dmg$`) },
  { platform: 'linux', label: 'Linux AppImage', match: new RegExp(`^${id}-[\\d.]+-linux-x86_64\\.AppImage$`) },
  { platform: 'linux', label: 'Linux .deb', match: new RegExp(`^${id}-[\\d.]+-linux-x86_64\\.deb$`) },
  { platform: 'linux', label: 'Linux .rpm', match: new RegExp(`^${id}-[\\d.]+-linux-x86_64\\.rpm$`) },
]

function fallbackFiles(repo: string, assetStem: string, version: string, tag: string): DownloadFile[] {
  const base = `${GH}/${repo}/releases/download/${tag}`
  if (repo === 'artcraft') {
    return [
      { platform: 'windows', label: 'Windows installer (.exe)', file: `ArtCraft_${version}_x64-setup.exe` },
      { platform: 'windows', label: 'Windows installer (.msi)', file: `ArtCraft_${version}_x64_en-US.msi` },
      { platform: 'macos', label: 'macOS universal (.dmg)', file: `ArtCraft_${version}_universal.dmg` },
    ].map((f) => ({ ...f, platform: f.platform as Platform, url: `${base}/${f.file}` }))
  }
  const files: Array<[Platform, string, string]> = [
    ['windows', 'Windows x64 (.msi)', `${assetStem}-${version}-windows-x64.msi`],
    ['windows', 'Windows Arm (.msi)', `${assetStem}-${version}-windows-arm64.msi`],
    ['macos', 'macOS universal (.dmg)', `${assetStem}-${version}-macos-universal.dmg`],
    ['linux', 'Linux AppImage', `${assetStem}-${version}-linux-x86_64.AppImage`],
    ['linux', 'Linux .deb', `${assetStem}-${version}-linux-x86_64.deb`],
    ['linux', 'Linux .rpm', `${assetStem}-${version}-linux-x86_64.rpm`],
  ]
  return files.map(([platform, label, file]) => ({ platform, label, file, url: `${base}/${file}` }))
}

/* ---------------- GitHub fetch ---------------- */

type GhRelease = { tag_name: string; published_at: string; html_url: string; assets: Array<{ name: string; browser_download_url: string }> }

async function fetchLatest(repo: string): Promise<GhRelease | null> {
  try {
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json', 'User-Agent': 'artcraft-hub' }
    // Optional: a read-only token raises GitHub's API limit. Never use a token with write access here.
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    const res = await fetch(`https://api.github.com/repos/storytold/${repo}/releases/latest`, {
      headers,
      next: { revalidate: RELEASE_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return null
    return (await res.json()) as GhRelease
  } catch {
    return null
  }
}

const versionFromTag = (tag: string) => tag.replace(/^artcraft-v|^v/, '')

async function getRelease(repo: string, assetStem: string, rules: Rule[]): Promise<ReleaseInfo> {
  const fb = FALLBACK_VERSIONS[repo]
  const fbTag = repo === 'artcraft' ? `artcraft-v${fb.version}` : `v${fb.version}`
  const fallback: ReleaseInfo = {
    version: fb.version,
    publishedAt: fb.publishedAt,
    releaseUrl: `${GH}/${repo}/releases/tag/${fbTag}`,
    files: fallbackFiles(repo, assetStem, fb.version, fbTag),
    live: false,
  }

  const gh = await fetchLatest(repo)
  if (!gh) return fallback

  const files: DownloadFile[] = []
  for (const rule of rules) {
    const asset = gh.assets.find((a) => rule.match.test(a.name))
    // Only official GitHub release-asset URLs are accepted.
    if (asset && asset.browser_download_url.startsWith(`${GH}/${repo}/releases/download/`)) {
      files.push({ platform: rule.platform, label: rule.label, file: asset.name, url: asset.browser_download_url })
    }
  }
  if (files.length === 0) return fallback

  return {
    version: versionFromTag(gh.tag_name),
    publishedAt: gh.published_at.slice(0, 10),
    releaseUrl: gh.html_url.startsWith(`${GH}/${repo}/releases/`) ? gh.html_url : fallback.releaseUrl,
    files,
    live: true,
  }
}

export const getArtcraftRelease = () => getRelease('artcraft', 'ArtCraft', ARTCRAFT_RULES)
export const getLauncherRelease = () => getRelease('craft-launcher', 'artcraft-launcher', suiteRules('artcraft-launcher'))
export async function getCraftAppReleases() {
  return Promise.all(CRAFT_APPS.map(async (app) => ({ app, release: await getRelease(app.id, app.id, suiteRules(app.id)) })))
}
