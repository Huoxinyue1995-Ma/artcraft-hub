import type { Metadata } from 'next'
import { PageIntro, SourceLine } from '@/components/site-shell'
import { getLang, faqData, pageMetadata } from '@/lib/content'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const lang = getLang((await params).locale)
  return pageMetadata(lang, '/faq', lang === 'zh' ? 'Artcraft 常见问题' : 'Artcraft FAQ', lang === 'zh' ? '回答 Artcraft 下载、系统要求、安装、账号、许可证和安全提示。' : 'Answers about Artcraft downloads, platform requirements, setup, accounts, licenses, and safety.')
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) { const lang = getLang((await params).locale); const zh = lang === 'zh'; return <div className="container page-space"><PageIntro lang={lang} eyebrow="FAQ" title={zh ? '常见问题，先把疑问放下。' : 'Common questions, answered plainly.'} description={zh ? '遇到版本、安装或下载问题时，先看这里，再回到官方页面确认最新说明。' : 'When a version, setup, or download question comes up, start here and then check the latest official page.'} /><div className="faq-list">{faqData[lang].map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div><SourceLine lang={lang} /></div> }
