import type { Metadata } from 'next'
import { PageIntro, SourceLine } from '@/components/site-shell'
import { getLang, pageMetadata } from '@/lib/content'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const lang = getLang((await params).locale)
  return pageMetadata(lang, '/terms', lang === 'zh' ? '使用条款｜Artcraft Hub' : 'Terms | Artcraft Hub', lang === 'zh' ? '了解 Artcraft Hub 的第三方链接、版本变化和资料免责声明。' : 'Read the Artcraft Hub terms covering third-party links, changing versions, and resource disclaimers.')
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) { const lang = getLang((await params).locale); const zh = lang === 'zh'; return <div className="container page-space narrow"><PageIntro lang={lang} eyebrow="TERMS" title={zh ? '使用条款' : 'Terms'} description={zh ? '使用本网站表示你理解它是一个独立资料站。' : 'Using this site means you understand that it is an independent resource.'} /><article className="prose"><h2>{zh ? '第三方资料' : 'Third-party material'}</h2><p>{zh ? '本站整理和链接第三方页面，但不控制这些页面的内容、可用性、价格、兼容性或安全提示。下载和安装前请核对官方来源。' : 'We organize and link to third-party pages, but do not control their content, availability, pricing, compatibility, or security notices. Check official sources before downloading or installing.'}</p><h2>{zh ? '不作保证' : 'No guarantee'}</h2><p>{zh ? '版本、功能、模型、系统支持和价格可能变化。本站不保证 Artcraft 能替代 Adobe，也不提供法律、购买或安全审计意见。' : 'Versions, features, models, platform support, and pricing can change. We do not promise that Artcraft replaces Adobe or provide legal, purchase, or security-audit advice.'}</p><h2>{zh ? '来源优先级' : 'Source priority'}</h2><p>{zh ? '当本站和官方页面不一致时，以 Artcraft、Adobe、GitHub 或其他原始发布方的当前页面为准。' : 'If this site conflicts with an official page, follow the current page from Artcraft, Adobe, GitHub, or the original publisher.'}</p></article><SourceLine lang={lang} /></div> }
