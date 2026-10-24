/**
 * Artcraft vs Adobe comparison data (English only).
 *
 * Two Artcraft products are compared with Adobe:
 *  - the ArtCraft AI app (facts from the official repo at tag artcraft-v0.41.0: README + source), and
 *  - the Craft App Suite (PhotoCraft, VectorCraft, FilmCraft, EffectCraft), using each project's own
 *    README and docs/target-app-parity.md. Readiness numbers are the projects' self-assessments.
 *
 * Adobe versions: the versions each Craft app's parity document says it was measured against
 * (Photoshop 27.11.0, Premiere Pro 26.5.2, After Effects 26.5); Illustrator's parity doc targets
 * the 30.x line without inspecting an install, so the latest public record (30.2.1) is used there.
 * Update COMPARE_CHECKED_AT, the versions and the rows together.
 */

export const COMPARE_CHECKED_AT = '2026-10-24'

const AC_TAG = 'artcraft-v0.41.0'
const AC = `https://github.com/storytold/artcraft/blob/${AC_TAG}`
const parity = (repo: string) => `https://github.com/storytold/${repo}/blob/main/docs/target-app-parity.md`

export const ARTCRAFT_VERSION = {
  version: 'v0.41.0',
  releasedAt: '2026-09-26',
  readme: `${AC}/README.md`,
  imageEditorTools: `${AC}/frontend/libs/components/pagedraw/src/lib/stores/SceneState.ts`,
} as const

export type AdobeApp = 'Photoshop' | 'Illustrator' | 'Premiere Pro' | 'After Effects'

export const ADOBE_VERSIONS: Record<AdobeApp, { version: string; note: string; notes: string }> = {
  Photoshop: { version: '27.11', note: 'the version PhotoCraft is measured against (27.11.0)', notes: 'https://helpx.adobe.com/photoshop/desktop/whats-new/photoshop-on-desktop-release-notes.html' },
  Illustrator: { version: '30.2.1', note: 'latest public release record; VectorCraft targets the 30.x line', notes: 'https://helpx.adobe.com/illustrator/desktop/new-features/whats-new.html' },
  'Premiere Pro': { version: '26.5.2', note: 'the version FilmCraft is measured against', notes: 'https://helpx.adobe.com/premiere-pro/using/whats-new.html' },
  'After Effects': { version: '26.5', note: 'the version EffectCraft is measured against', notes: 'https://helpx.adobe.com/after-effects/using/whats-new.html' },
}

export type CraftMatch = {
  adobe: AdobeApp
  craft: string
  repo: string
  stage: string
  /** Self-assessed "ready for real work" (could a professional replace the Adobe app with it?). */
  ready: string
  /** Self-assessed feature breadth (does each Adobe feature exist in some form?). */
  breadth: string
  has: string[]
  missing: string[]
  /** What the ArtCraft AI app (v0.41.0) offers for the same job. */
  aiApp: string
}

export const craftMatches: CraftMatch[] = [
  {
    adobe: 'Photoshop',
    craft: 'PhotoCraft',
    repo: 'photocraft',
    stage: 'early alpha',
    ready: '~45%',
    breadth: '~76%',
    has: [
      'Real PSD/PSB open, edit and save (307 of 309 test files re-render the same)',
      '16 adjustment layers incl. Curves, Levels, Hue/Saturation; 27 blend modes; layer styles',
      'Healing Brush, Clone Stamp, Patch, Content-Aware Move, Remove tool (non-generative)',
      'Type layers, Pen and shape tools, Select and Mask, on-device Select Subject',
      'RGB, CMYK, Lab at 8/16/32-bit with ICC colour management; works offline',
    ],
    missing: [
      'Generative Fill/Expand, Neural Filters and other Firefly features (no ML runtime)',
      'Photoshop plug-ins (.8BF) and UXP/ExtendScript scripting',
      'About 15 tools; PSD exchange not yet reliable enough for beta',
    ],
    aiApp: 'Prompted edits and AI inpainting with models such as Nano Banana Pro and GPT Image; one-click background removal. No manual retouching tools.',
  },
  {
    adobe: 'Illustrator',
    craft: 'VectorCraft',
    repo: 'vectorcraft',
    stage: 'alpha',
    ready: '~62%',
    breadth: '~88%',
    has: [
      'Pen, Direct Selection, Pathfinder and Shape Builder, Smart Guides, Appearance',
      'Gradients, transparency, type with styles and threading',
      'SVG, PDF and PDF-compatible .ai import/export; EPS, DXF; Export for Screens',
      'Opens Affinity documents (read-only); PSD out',
    ],
    missing: [
      'Reliable exchange of real-world .ai files (proprietary editing data is not written)',
      'Most 3D and Materials; scripting',
      'Generative AI features',
    ],
    aiApp: 'No vector editing; images export as raster files.',
  },
  {
    adobe: 'Premiere Pro',
    craft: 'FilmCraft',
    repo: 'filmcraft',
    stage: 'alpha',
    ready: '~56%',
    breadth: '~86%',
    has: [
      'Three-point editing, ripple/roll/slip/slide, multicam, nesting',
      'Full colour panel (curves, wheels, HSL secondary) with scopes and LUTs; ~30 transitions, 90+ effects',
      'Captions (SRT, WebVTT, SCC); loudness meters, mixer, audio effects',
      'H.264 MP4, ProRes 422 HQ, DNxHR export; FCP XML, FCPXML, OTIO and EDL interchange',
    ],
    missing: [
      'Native .prproj import (use FCP XML, AAF or OTIO instead)',
      'VST3/Audio Units and OpenFX plug-ins',
      'Software H.265 and AV1 export; speed on large footage; few AI features',
    ],
    aiApp: 'Video Editor (BETA): cut, trim, ripple, speed, keyframes, text, blur, shape masks; MP4/WebM export. No transitions, grading or captions.',
  },
  {
    adobe: 'After Effects',
    craft: 'EffectCraft',
    repo: 'effectcraft',
    stage: 'alpha',
    ready: '~45%',
    breadth: '~91%',
    has: [
      '306 effects incl. keying, simulation (CC Particle World, Shatter) and time effects',
      'Keyframes with Graph Editor, JavaScript expressions, puppet pins, text animators',
      'Classic 3D layers, cameras and lights; Roto Brush (optional on-device model)',
      'Render Queue to H.264, ProRes, HEVC, AV1, WebM, EXR; Lottie import and export',
    ],
    missing: [
      '.aep project import and After Effects SDK plug-ins',
      'Advanced 3D models and 3D camera tracking',
      'Not yet recommended for client work; Windows and Linux less tested than macOS',
    ],
    aiApp: 'Image-to-video with 25 AI video models (Seedance, Kling, Veo…), start/end frames and references. No keyframed motion graphics.',
  },
]

export const parityLink = (repo: string) => parity(repo)

/** Things only the ArtCraft AI app offers among everything compared here. */
export const artcraftLeads: Array<{ title: string; body: string; vs: string }> = [
  {
    title: '60+ AI models in one app',
    body: 'The official catalog lists 62 models: 16 image, 25 video, 5 audio, 11 3D mesh, 5 world — including Nano Banana, GPT Image, FLUX, Seedream, Kling, Veo, Seedance, Suno and Hunyuan 3D (some temporarily disabled).',
    vs: 'Adobe apps mainly use Firefly and other Adobe models.',
  },
  {
    title: 'Stage a 3D scene, then generate',
    body: 'Arrange backdrops, props, character poses and camera position in 3D Stage before generating, for control over composition and angle.',
    vs: 'None of the four Adobe apps offer this “3D blocking + AI generation” workflow.',
  },
  {
    title: 'Image to 3D mesh or 3D world',
    body: 'Turn one image into a downloadable 3D mesh or an explorable Gaussian-splat world, then bring it back into 3D Stage.',
    vs: 'Not offered by these four Adobe apps.',
  },
  {
    title: 'Consistent characters and new angles',
    body: 'Guide a character’s placement and pose with a posed mannequin, and generate new camera angles from one photo with Angles.',
    vs: 'These four Adobe apps have no dedicated character-consistency tool.',
  },
  {
    title: 'Open source, free, and on Linux',
    body: 'The AI app and every Craft app are MIT / Apache-2.0. The Craft apps are free, run offline, and ship for Windows, macOS, Linux, FreeBSD and the web. AI generation in the ArtCraft app uses credits.',
    vs: 'Adobe apps are closed-source subscriptions with no Linux version.',
  },
  {
    title: 'Built for scripts and AI agents',
    body: 'PhotoCraft, VectorCraft, FilmCraft and EffectCraft expose every command to a CLI, a JSON control channel and an MCP server, so scripts and agents can drive them.',
    vs: 'Adobe relies on its own scripting (UXP, ExtendScript) and plug-ins.',
  },
]

/** Where Adobe is still ahead of both the AI app and the Craft apps. */
export const adobeLeads: Array<{ task: string; app: AdobeApp; note: string }> = [
  { app: 'Photoshop', task: 'Generative Fill, Generative Expand and Neural Filters inside a full editor', note: 'PhotoCraft has no generative features; the ArtCraft AI app generates but has no manual editing tools' },
  { app: 'Photoshop', task: 'Reliable PSD exchange and Photoshop plug-ins', note: 'PhotoCraft opens and saves PSD, but exchange is not yet beta-reliable; no .8BF plug-ins' },
  { app: 'Illustrator', task: 'Round-tripping real .ai files with full editing data', note: 'VectorCraft writes PDF-compatible .ai only' },
  { app: 'Premiere Pro', task: 'Opening .prproj projects and hosting audio/video plug-ins', note: 'FilmCraft imports FCP XML, AAF and OTIO instead; no VST3, AU or OpenFX' },
  { app: 'After Effects', task: 'Opening .aep projects, SDK plug-ins and 3D camera tracking', note: 'EffectCraft uses its own .ecproj format' },
  { app: 'Photoshop', task: 'A mature, production-tested tool used daily by professionals', note: 'Every Craft app is alpha; their own estimates for professional readiness are 45–62%' },
]
