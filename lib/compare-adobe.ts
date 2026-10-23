import type { Lang } from '@/lib/content'

/**
 * Artcraft vs Adobe comparison data.
 *
 * Artcraft facts come from the official GitHub repository at tag artcraft-v0.41.0
 * (README + source code). Adobe versions come from public release records
 * (Wikidata P348, each citing Adobe's own release notes); adobe.com and
 * helpx.adobe.com were not machine-readable when this was written.
 * Update ARTCRAFT_VERSION / ADOBE_VERSIONS and the rows below together.
 */

export const COMPARE_CHECKED_AT = '2026-10-23'

const ARTCRAFT_TAG = 'artcraft-v0.41.0'
const SRC = `https://github.com/storytold/artcraft/blob/${ARTCRAFT_TAG}`

export const ARTCRAFT_VERSION = {
  version: 'v0.41.0',
  releasedAt: '2026-09-26',
  readme: `${SRC}/README.md`,
  appMenu: `${SRC}/frontend/apps/artcraft/app/src/config/appMenu.tsx`,
  imageEditorTools: `${SRC}/frontend/libs/components/pagedraw/src/lib/stores/SceneState.ts`,
  videoEditor: `https://github.com/storytold/artcraft/tree/${ARTCRAFT_TAG}/frontend/libs/components/video-editor/src/lib`,
  stageNotes: `${SRC}/frontend/libs/components/pagescene/AGENTS.md`,
  providerKeys: `${SRC}/crates/desktop/artcraft/src/core/providers/credentials/provider_credential_key.rs`,
  license: `${SRC}/NOTICE`,
} as const

export type AdobeApp = 'Photoshop' | 'Illustrator' | 'Premiere Pro' | 'After Effects'

export const ADOBE_VERSIONS: Record<AdobeApp, { version: string; releasedAt: string; notes: string }> = {
  Photoshop: { version: '27.11', releasedAt: '2026-10-05', notes: 'https://helpx.adobe.com/photoshop/desktop/whats-new/photoshop-on-desktop-release-notes.html' },
  Illustrator: { version: '30.2.1', releasedAt: '2026-02-10', notes: 'https://helpx.adobe.com/illustrator/desktop/new-features/whats-new.html' },
  'Premiere Pro': { version: '26.0.1', releasedAt: '2026-02-12', notes: 'https://helpx.adobe.com/premiere-pro/using/whats-new.html' },
  'After Effects': { version: '26.0', releasedAt: '2026-01-22', notes: 'https://helpx.adobe.com/after-effects/using/whats-new.html' },
}

type Text = Record<Lang, string>

export type ModuleRow = {
  module: string
  badge?: 'BETA' | 'NEW'
  adobe: AdobeApp | 'none'
  artcraft: Text
  adobeSide: Text
  missing: Text
}

/** Each Artcraft v0.41.0 module mapped to the closest Adobe app. */
export const moduleRows: ModuleRow[] = [
  {
    module: 'Image Editor (2D)',
    adobe: 'Photoshop',
    artcraft: {
      zh: '6 个工具：选择/移动、画笔、蒙版（AI 局部重绘）、橡皮擦、画布背景色、形状（矩形/圆形/三角形/线条）。图层可调前后顺序、锁定、复制、一键去背景。',
      en: 'Six tools: select/move, brush, mask (AI inpainting), eraser, canvas background, shapes (rectangle/circle/triangle/line). Layers can be reordered, locked, duplicated, or background-removed.',
    },
    adobeSide: {
      zh: '完整的像素编辑：图层、蒙版、调整图层、滤镜、修复工具、文字、选区工具，以及生成式填充等 Firefly AI 功能。',
      en: 'Full pixel editing: layers, masks, adjustment layers, filters, healing tools, type, selection tools, plus Firefly AI features such as Generative Fill.',
    },
    missing: {
      zh: '未提供：调色（曲线/色阶/色相）、滤镜、混合模式、裁剪、文字、修复画笔/仿制图章、PSD 读写。',
      en: 'Not provided: color adjustments (curves/levels/hue), filters, blend modes, crop, type, healing/clone tools, PSD read/write.',
    },
  },
  {
    module: 'Create Image',
    adobe: 'Photoshop',
    artcraft: {
      zh: '文生图，可选 16 个图像模型（Nano Banana、GPT Image、FLUX、Seedream 等）。',
      en: 'Text-to-image with 16 image models (Nano Banana, GPT Image, FLUX, Seedream, and more).',
    },
    adobeSide: {
      zh: 'Photoshop 内置 Firefly 生成图像与生成式填充，主要使用 Adobe 自家模型。',
      en: 'Photoshop includes Firefly image generation and Generative Fill, mainly using Adobe’s own models.',
    },
    missing: {
      zh: '不是缺点，而是方向不同：Artcraft 重点在多模型切换。',
      en: 'A different focus rather than a gap: Artcraft centers on switching between many models.',
    },
  },
  {
    module: 'Edit Image / Remove Background',
    adobe: 'Photoshop',
    artcraft: {
      zh: '用文字描述修改图片（如 Nano Banana Pro、GPT Image），或在画布上涂抹蒙版指定修改区域；一键去背景。',
      en: 'Describe edits in words (e.g. Nano Banana Pro, GPT Image) or paint a mask to choose where the image changes; one-click background removal.',
    },
    adobeSide: {
      zh: '生成式填充、移除工具、选择主体、选择并遮住等，可手动精修边缘。',
      en: 'Generative Fill, Remove tool, Select Subject, Select and Mask, with manual edge refinement.',
    },
    missing: {
      zh: '未提供：去背景后的边缘精修（羽化、发丝细化等手动调整）。',
      en: 'Not provided: manual edge refinement after background removal (feathering, hair detail).',
    },
  },
  {
    module: '3D Stage',
    adobe: 'none',
    artcraft: {
      zh: '在 3D 场景里摆放背景、道具和 3D 模型，给角色摆姿势、设置镜头，再生成最终画面；可截取当前画面为 PNG。',
      en: 'Place backdrops, props, and 3D meshes in a 3D scene, pose characters, and set the camera before generating; capture the current frame as PNG.',
    },
    adobeSide: {
      zh: '这四款产品中没有对应模块。Photoshop 的 3D 功能已被 Adobe 移除；After Effects 有 3D 图层与摄像机，但用途是动画合成。',
      en: 'No equivalent among these four apps. Adobe removed Photoshop’s 3D features; After Effects has 3D layers and cameras, but for motion compositing.',
    },
    missing: {
      zh: 'v0.41.0 中「Record」录制视频按钮仍是占位功能，尚不能直接从 3D 场景渲染视频。',
      en: 'In v0.41.0 the Record button is still a stub; the 3D stage cannot render video directly yet.',
    },
  },
  {
    module: 'Image to 3D Object / 3D World',
    adobe: 'none',
    artcraft: {
      zh: '把一张图生成可下载的 3D 模型（Hunyuan 3D、Tripo3D、Meshy、Rodin 等 11 个模型），或生成可探索的 3D 世界（Marble、TripoSplat）。',
      en: 'Turn an image into a downloadable 3D mesh (11 models incl. Hunyuan 3D, Tripo3D, Meshy, Rodin) or an explorable 3D world (Marble, TripoSplat).',
    },
    adobeSide: {
      zh: '这四款产品中没有对应功能（Adobe 的 3D 工具在 Substance 3D 系列，不在本页对比范围）。',
      en: 'Not available in these four apps (Adobe’s 3D tools live in the Substance 3D line, outside this comparison).',
    },
    missing: { zh: '—', en: '—' },
  },
  {
    module: 'Angles',
    badge: 'NEW',
    adobe: 'none',
    artcraft: {
      zh: '从一张照片生成新的拍摄角度。',
      en: 'Generate new camera angles from a single photo.',
    },
    adobeSide: {
      zh: '这四款产品中没有对应功能。',
      en: 'No equivalent in these four apps.',
    },
    missing: { zh: '—', en: '—' },
  },
  {
    module: 'Create Video',
    adobe: 'After Effects',
    artcraft: {
      zh: '图生视频，可选 25 个视频模型（Seedance、Kling、Veo、Vidu、MiniMax 等，其中部分暂时停用），可设首尾帧和参考图。',
      en: 'Image-to-video with 25 video models (Seedance, Kling, Veo, Vidu, MiniMax, and more; some temporarily disabled), with start/end frames and reference images.',
    },
    adobeSide: {
      zh: 'After Effects 靠关键帧、表达式、粒子和插件手工制作动画与特效。',
      en: 'After Effects builds animation and effects by hand with keyframes, expressions, particles, and plug-ins.',
    },
    missing: {
      zh: '未提供：逐帧可控的动态图形、表达式、粒子系统、摄像机跟踪、Roto 抠像、插件生态。',
      en: 'Not provided: frame-precise motion graphics, expressions, particle systems, camera tracking, rotoscoping, plug-in ecosystem.',
    },
  },
  {
    module: 'Video Editor',
    badge: 'BETA',
    adobe: 'Premiere Pro',
    artcraft: {
      zh: '时间线剪辑：剪切、修剪、波纹编辑、变速、关键帧、文字、贴纸、模糊效果、形状蒙版（矩形、椭圆、星形等），导出 MP4 或 WebM。',
      en: 'Timeline editing: cut, trim, ripple edits, speed changes, keyframes, text, stickers, a blur effect, shape masks (rectangle, ellipse, star…), export to MP4 or WebM.',
    },
    adobeSide: {
      zh: '专业剪辑：转场、Lumetri 调色、字幕与语音转文字、多机位、代理剪辑、多种专业编码导出。',
      en: 'Professional editing: transitions, Lumetri color, captions and speech-to-text, multicam, proxies, many professional export codecs.',
    },
    missing: {
      zh: '未提供：转场、调色/LUT、字幕与自动转写、绿幕抠像、多机位、ProRes 等专业编码。',
      en: 'Not provided: transitions, color grading/LUTs, captions and transcription, chroma key, multicam, professional codecs such as ProRes.',
    },
  },
  {
    module: 'Create Audio',
    adobe: 'Premiere Pro',
    artcraft: {
      zh: '用 Suno、Seed Audio 生成音乐和音效。',
      en: 'Generate music and sound effects with Suno and Seed Audio.',
    },
    adobeSide: {
      zh: 'Premiere Pro 侧重音频编辑（混音、降噪、增强语音），音乐需另找素材。',
      en: 'Premiere Pro focuses on audio editing (mixing, noise reduction, Enhance Speech); music comes from separate libraries.',
    },
    missing: {
      zh: '未提供：多轨混音、降噪、语音增强等音频后期。',
      en: 'Not provided: multitrack mixing, noise reduction, speech enhancement.',
    },
  },
  {
    module: 'Storyboard / Moodboard',
    badge: 'BETA',
    adobe: 'none',
    artcraft: {
      zh: '分镜：每格可写标题、台词、动作并手绘草图。情绪板：收集参考图，用来引导生成。',
      en: 'Storyboard: title, dialogue, action, and a sketch per shot. Moodboard: collect references and steer generations from them.',
    },
    adobeSide: {
      zh: '这四款产品中没有专门的分镜/情绪板模块。',
      en: 'No dedicated storyboard or moodboard module in these four apps.',
    },
    missing: {
      zh: 'v0.41.0 中分镜页面受功能开关控制，不一定所有账号都能看到；情绪板仍是 BETA。',
      en: 'In v0.41.0 the Storyboard page sits behind a feature flag and may not appear for every account; Moodboard is still BETA.',
    },
  },
  {
    module: '—',
    adobe: 'Illustrator',
    artcraft: {
      zh: 'v0.41.0 没有矢量编辑模块。',
      en: 'v0.41.0 has no vector editing module.',
    },
    adobeSide: {
      zh: '矢量绘图：钢笔与路径、字体排版、Logo 与图标、导出 SVG/AI/PDF。',
      en: 'Vector drawing: pen and paths, typography, logos and icons, SVG/AI/PDF export.',
    },
    missing: {
      zh: '未提供：钢笔路径、矢量形状编辑、SVG/AI/PDF 矢量导出。',
      en: 'Not provided: pen paths, vector shape editing, SVG/AI/PDF vector export.',
    },
  },
]

export type GapRow = { task: Text; app: AdobeApp; note: Text }

/** Things the listed Adobe version can do that Artcraft v0.41.0 does not provide. */
export const adobeOnly: GapRow[] = [
  { app: 'Photoshop', task: { zh: '曲线、色阶、色相/饱和度等调色', en: 'Curves, levels, hue/saturation and other color adjustments' }, note: { zh: 'Artcraft 的图像编辑器没有调色工具', en: 'Artcraft’s Image Editor has no color adjustment tools' } },
  { app: 'Photoshop', task: { zh: '锐化、液化、模糊画廊等滤镜', en: 'Filters such as Sharpen, Liquify, and Blur Gallery' }, note: { zh: '图像编辑器中没有滤镜', en: 'No filters in the Image Editor' } },
  { app: 'Photoshop', task: { zh: '图层混合模式与图层样式（投影、描边等）', en: 'Layer blend modes and layer styles (drop shadow, stroke…)' }, note: { zh: '只能调整图层前后顺序', en: 'Layers can only be reordered' } },
  { app: 'Photoshop', task: { zh: '裁剪、拉直、透视裁剪', en: 'Crop, straighten, and perspective crop' }, note: { zh: '画布按 2:3、3:2、1:1 等比例设置', en: 'Canvas uses ratio presets such as 2:3, 3:2, 1:1' } },
  { app: 'Photoshop', task: { zh: '在图片上排版文字', en: 'Set type on an image' }, note: { zh: '图像编辑器没有文字工具（视频编辑器和情绪板里有文字）', en: 'No type tool in the Image Editor (text exists in the Video Editor and Moodboard)' } },
  { app: 'Photoshop', task: { zh: '修复画笔、仿制图章等手动修图', en: 'Manual retouching with Healing Brush or Clone Stamp' }, note: { zh: '局部修改依赖 AI 重绘', en: 'Local changes rely on AI inpainting' } },
  { app: 'Photoshop', task: { zh: '打开、保存 PSD 分层文件', en: 'Open and save layered PSD files' }, note: { zh: '源码中未发现 PSD 支持', en: 'No PSD support found in the source' } },
  { app: 'Photoshop', task: { zh: 'CMYK 印刷色彩、16/32 位色深、色彩配置文件', en: 'CMYK print color, 16/32-bit depth, color profiles' }, note: { zh: '源码中未发现相关支持', en: 'No related support found in the source' } },
  { app: 'Photoshop', task: { zh: '断网修图', en: 'Edit images offline' }, note: { zh: 'Artcraft 生成与去背景需要联网并登录；Photoshop 的生成式 AI 也需联网', en: 'Artcraft generation and background removal need an internet sign-in; Photoshop’s generative AI is online too' } },
  { app: 'Illustrator', task: { zh: '钢笔工具绘制矢量路径、制作 Logo 和图标', en: 'Draw vector paths with the Pen tool for logos and icons' }, note: { zh: '没有矢量编辑模块', en: 'No vector editing module' } },
  { app: 'Illustrator', task: { zh: '导出 SVG、AI、PDF 矢量文件', en: 'Export SVG, AI, or PDF vector files' }, note: { zh: '图像以位图形式导出', en: 'Images export as raster files' } },
  { app: 'Premiere Pro', task: { zh: '镜头之间加转场', en: 'Add transitions between clips' }, note: { zh: '视频编辑器（BETA）中没有转场', en: 'No transitions in the Video Editor (BETA)' } },
  { app: 'Premiere Pro', task: { zh: '调色与 LUT', en: 'Color grading and LUTs' }, note: { zh: '视频效果目前只有模糊', en: 'Blur is the only video effect for now' } },
  { app: 'Premiere Pro', task: { zh: '自动字幕、语音转文字', en: 'Auto captions and speech-to-text' }, note: { zh: '未提供字幕功能', en: 'No caption feature' } },
  { app: 'Premiere Pro', task: { zh: '多机位剪辑、导出 ProRes 等专业编码', en: 'Multicam editing and professional codecs such as ProRes' }, note: { zh: '仅导出 MP4 / WebM', en: 'Exports MP4 / WebM only' } },
  { app: 'After Effects', task: { zh: '关键帧动态图形、表达式、粒子', en: 'Keyframed motion graphics, expressions, particles' }, note: { zh: '动态画面主要由 AI 视频模型生成', en: 'Motion comes mainly from AI video models' } },
  { app: 'After Effects', task: { zh: '摄像机跟踪、Roto 抠像、绿幕抠像', en: 'Camera tracking, rotoscoping, chroma keying' }, note: { zh: '未提供', en: 'Not provided' } },
]

export type LeadRow = { title: Text; body: Text; vs: Text }

/** Where Artcraft v0.41.0 offers something these four Adobe apps do not. */
export const artcraftLeads: LeadRow[] = [
  {
    title: { zh: '一个应用里切换 60 多个 AI 模型', en: '60+ AI models in one app' },
    body: { zh: '官方目录共 62 个模型：图像 16、视频 25、音乐音效 5、3D 模型 11、3D 世界 5，包括 Nano Banana、GPT Image、FLUX、Seedream、Kling、Veo、Seedance、Suno、Hunyuan 3D 等（部分模型暂时停用）。', en: 'The official catalog lists 62 models: 16 image, 25 video, 5 audio, 11 3D mesh, 5 world — including Nano Banana, GPT Image, FLUX, Seedream, Kling, Veo, Seedance, Suno, and Hunyuan 3D (some temporarily disabled).' },
    vs: { zh: 'Adobe 应用主要使用 Firefly 等自家模型。', en: 'Adobe apps mainly use Firefly and other Adobe models.' },
  },
  {
    title: { zh: '先搭 3D 场景，再生成画面', en: 'Stage a 3D scene, then generate' },
    body: { zh: '在 3D Stage 里摆好背景、道具、角色姿势和镜头位置，再交给 AI 生成，构图和角度更可控。', en: 'Arrange backdrops, props, character poses, and camera position in 3D Stage before generating, for more control over composition and angle.' },
    vs: { zh: '这四款 Adobe 产品没有这种「3D 预演 + AI 生成」流程。', en: 'None of the four Adobe apps offer this “3D blocking + AI generation” workflow.' },
  },
  {
    title: { zh: '图片直接变 3D 模型或 3D 世界', en: 'Image to 3D mesh or 3D world' },
    body: { zh: '一张图即可生成可下载的 3D 模型，或可探索的高斯泼溅世界，再放回 3D Stage 使用。', en: 'Turn one image into a downloadable 3D mesh or an explorable Gaussian-splat world, then bring it back into 3D Stage.' },
    vs: { zh: '这四款 Adobe 产品不提供。', en: 'Not offered by these four Adobe apps.' },
  },
  {
    title: { zh: '角色一致与新机位', en: 'Consistent characters and new angles' },
    body: { zh: '用摆好姿势的人偶引导角色位置和动作（Character Identity Transfer），用 Angles 从一张照片生成新角度，适合 AI 短片分镜。', en: 'Guide a character’s placement and pose with a posed mannequin (Character Identity Transfer) and generate new angles from one photo with Angles — useful for AI film shots.' },
    vs: { zh: 'Adobe 这四款产品没有专门的角色一致性工具。', en: 'These four Adobe apps have no dedicated character-consistency tool.' },
  },
  {
    title: { zh: '图像、视频、音频、3D、分镜在同一个应用', en: 'Image, video, audio, 3D, and storyboards in one app' },
    body: { zh: '从情绪板、分镜到生成图、视频、配乐，再到时间线粗剪，都在 Artcraft 里完成。', en: 'Go from moodboard and storyboard to images, video, music, and a rough timeline cut without leaving Artcraft.' },
    vs: { zh: '在 Adobe 生态中通常需要在多款应用之间切换。', en: 'In Adobe’s ecosystem this usually spans several apps.' },
  },
  {
    title: { zh: '开源，可免费开始', en: 'Open source, free to start' },
    body: { zh: '源码以 MIT / Apache-2.0 双许可证公开（第三方素材另见 NOTICE），可自行编译，包括 Linux。AI 生成按积分计费，以官方价格页为准。', en: 'Source is public under MIT / Apache-2.0 (third-party material in NOTICE) and can be built from source, including on Linux. AI generation uses credits; see the official pricing page.' },
    vs: { zh: 'Adobe 应用为闭源订阅软件，不提供 Linux 版本。', en: 'Adobe apps are closed-source subscriptions with no Linux version.' },
  },
]
