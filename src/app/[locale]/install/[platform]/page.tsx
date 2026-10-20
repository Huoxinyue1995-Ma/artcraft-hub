import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { StepList, Checklist } from '@/components/info-card'
import { PageIntro, SourceLine } from '@/components/site-shell'
import { getLang, OFFICIAL, pageMetadata } from '@/lib/content'

const platforms = ['windows', 'macos', 'linux'] as const
export function generateStaticParams() { return ['zh', 'en'].flatMap((locale) => platforms.map((platform) => ({ locale, platform }))) }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; platform: string }> }): Promise<Metadata> {
  const { locale, platform } = await params
  const lang = getLang(locale)
  const labels = {
    windows: lang === 'zh' ? 'Windows 安装教程' : 'Windows setup guide',
    macos: lang === 'zh' ? 'macOS 安装教程' : 'macOS setup guide',
    linux: lang === 'zh' ? 'Linux 源码安装教程' : 'Linux source setup guide',
  } as const
  const descriptions = {
    windows: lang === 'zh' ? '按新手步骤安装 Artcraft，确认 Windows 10 64-bit+、官方来源和首次打开。' : 'Install Artcraft step by step on Windows 10 64-bit+, with official-source and first-launch checks.',
    macos: lang === 'zh' ? '按新手步骤安装 Artcraft，确认 macOS 12+、通用安装包和首次打开。' : 'Install Artcraft step by step on macOS 12+, using the universal package and first-launch checks.',
    linux: lang === 'zh' ? '按官方开发说明在 Linux 上从源码构建 Artcraft。' : 'Follow the official developer guide to build Artcraft from source on Linux.',
  } as const
  if (!(platform in labels)) return pageMetadata(lang, `/install/${platform}`, 'Artcraft setup', 'Artcraft setup guide')
  return pageMetadata(lang, `/install/${platform}`, labels[platform as keyof typeof labels], descriptions[platform as keyof typeof descriptions])
}

export default async function InstallPage({ params }: { params: Promise<{ locale: string; platform: string }> }) {
  const { locale, platform } = await params; const lang = getLang(locale); const zh = lang === 'zh'
  if (!platforms.includes(platform as typeof platforms[number])) notFound()
  const isLinux = platform === 'linux'; const title = isLinux ? (zh ? 'Linux：源码构建路线。' : 'Linux: the source-build route.') : platform === 'macos' ? (zh ? 'macOS：使用通用安装包。' : 'macOS: use the universal package.') : (zh ? 'Windows：从官方安装包开始。' : 'Windows: start with the official installer.')
  const steps = isLinux ? (zh ? [{ title: '先读官方开发环境说明', body: 'Linux 在官方资料中主要走源码构建。先打开开发说明，不要随意下载第三方安装包。' }, { title: '准备 Rust、Node.js 和 Tauri CLI', body: '官方说明会随项目变化；按当前页面的版本要求安装，不要照抄旧教程。' }, { title: '运行官方脚本', body: '使用仓库中的 Unix 开发脚本启动前端和 Rust/Tauri，遇到编译错误先看官方文档。', code: './script/artcraft/unix_dev.sh' }, { title: '完成最小测试', body: '能打开桌面窗口、看到前端页面并关闭开发进程，才算构建成功。' }] : [{ title: 'Read the official setup guide', body: 'Linux is mainly a source-build route in the official material. Do not use random third-party installers.' }, { title: 'Install Rust, Node.js, and the Tauri CLI', body: 'Follow the versions listed on the current official page instead of copying an old guide.' }, { title: 'Run the official script', body: 'Use the Unix launcher in the repository to start the frontend and Rust/Tauri.', code: './script/artcraft/unix_dev.sh' }, { title: 'Run a small test', body: 'The build is ready when the desktop window opens, the frontend appears, and the process exits cleanly.' }]) : platform === 'macos' ? (zh ? [{ title: '确认系统版本', body: 'Artcraft 官方下载页目前列出 macOS 12+；官方提供 universal 通用安装包，不需要先区分 Apple 芯片或 Intel。' }, { title: '打开官方稳定下载页', body: '优先使用 getartcraft.com；需要查看版本说明时，再打开 GitHub Releases。' }, { title: '安装并第一次打开', body: '打开官方提供的 universal 文件，首次打开时阅读 macOS 安全提示并确认来源。不要把未经官方说明的安装动作写进步骤。' }, { title: '做一个最小测试', body: '打开应用并完成一次最小图像或项目操作，确认安装可用。' }] : [{ title: 'Check the macOS version', body: 'The official page currently lists macOS 12+ and provides a universal package, so you do not need to identify Apple silicon or Intel first.' }, { title: 'Open the official stable download', body: 'Start with getartcraft.com and use GitHub Releases for release notes.' }, { title: 'Install and open it once', body: 'Open the official universal file and read the macOS security prompt before confirming the source.' }, { title: 'Run a small test', body: 'Open the app and complete a small image or project action.' }]) : (zh ? [{ title: '确认 Windows 版本和架构', body: 'Artcraft 官方下载页目前列出 Windows 10 64-bit+；再选择官方页面中对应的安装文件。' }, { title: '打开官方稳定下载页', body: '优先使用 getartcraft.com；GitHub Releases 用来查看版本和资产文件。' }, { title: '运行安装程序', body: '只运行来自官方入口的文件。出现安全提示时，先核对发布来源。' }, { title: '完成第一次打开', body: '打开 Artcraft，完成一个最小测试，确认应用能正常启动；安装后可能需要免费注册或登录。' }] : [{ title: 'Check your Windows version', body: 'The official download page currently lists Windows 10 64-bit+; choose the matching file there.' }, { title: 'Open the official stable download', body: 'Start with getartcraft.com; use GitHub Releases to inspect versions and assets.' }, { title: 'Run the installer', body: 'Only run a file from an official entry point. Check the source if Windows shows a warning.' }, { title: 'Open it once', body: 'Launch Artcraft and complete a small test; a free sign-in may be required after installation.' }])
  return <div className="container page-space"><PageIntro lang={lang} eyebrow={isLinux ? 'LINUX / SOURCE' : `${platform.toUpperCase()} / SETUP`} title={title} description={zh ? '每一步只做一个动作。如果官方页面发生变化，以官方页面为准。' : 'One action at a time. If the official page changes, follow the current official page.'} /><div className="button-row"><a className="button button-dark" href={isLinux ? OFFICIAL.setup : OFFICIAL.download} target="_blank" rel="noreferrer">{zh ? '打开官方入口' : 'Open official source'} <ArrowUpRight size={16} /></a><a className="text-link" href={OFFICIAL.releases} target="_blank" rel="noreferrer">{zh ? '查看版本发布' : 'View releases'} <ArrowUpRight size={15} /></a></div><section className="section-block"><StepList steps={steps} /></section><section className="split-panel"><div><p className="eyebrow">{zh ? '完成后检查' : 'AFTER INSTALL'}</p><h2>{zh ? '看到这些，就可以继续。' : 'If these are true, keep going.'}</h2></div><Checklist items={zh ? ['应用能正常打开。','下载文件来自官方页面。','没有为了安装而关闭系统安全保护。','遇到报错时保留版本号和完整提示。'] : ['The app opens normally.','The file came from an official page.','You did not disable system security to install it.','You kept the version and full error message if something failed.']} /></section><SourceLine lang={lang} /></div>
}
