import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import { PageIntro, SourceLine } from '@/components/site-shell'
import { getLang, OFFICIAL, pageMetadata } from '@/lib/content'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const lang = getLang((await params).locale)
  return pageMetadata(lang, '/about', lang === 'zh' ? '关于 Artcraft Hub' : 'About Artcraft Hub', lang === 'zh' ? '了解 Artcraft Hub 的独立身份、资料来源和更新方式。' : 'Learn who maintains Artcraft Hub, where its sources come from, and how the guides are updated.')
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) { const lang = getLang((await params).locale); const zh = lang === 'zh'; return <div className="container page-space narrow"><PageIntro lang={lang} eyebrow="ABOUT" title={zh ? '一个独立的 Artcraft 资料站。' : 'An independent Artcraft resource.'} description={zh ? '本站帮助新手找到官方入口、看懂安装步骤，也把 Artcraft 与 Adobe 的用途差别讲清楚。' : 'This site helps beginners find official entry points, follow setup steps, and understand how Artcraft differs from Adobe tools.'} /><article className="prose"><h2>{zh ? '我们不代表 Artcraft 或 Adobe' : 'We do not represent Artcraft or Adobe'}</h2><p>{zh ? 'Artcraft 的官方项目是 storytold/artcraft。本站由独立维护者整理公开资料，页面中的商标、名称和下载文件仍属于各自权利人。' : 'The official project is storytold/artcraft. This site is maintained independently using public sources; names, marks, and download files remain with their respective owners.'}</p><h2>{zh ? '资料怎么更新' : 'How sources are updated'}</h2><p>{zh ? '我们每月检查官方 GitHub、Releases、开发说明和 Adobe 官方页面。版本、功能或许可证变化时，会在页面上更新检查日期。' : 'We check the official GitHub, Releases, setup notes, and Adobe pages monthly. When versions, features, or licensing notes change, we update the checked date.'}</p><a className="source-box source-box-link" href={OFFICIAL.github} target="_blank" rel="noreferrer"><span>{zh ? '打开官方 GitHub' : 'Open the official GitHub'}</span><ExternalLink size={16} /></a></article><SourceLine lang={lang} /></div> }
