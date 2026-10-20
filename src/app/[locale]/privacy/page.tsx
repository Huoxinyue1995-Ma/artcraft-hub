import type { Metadata } from 'next'
import { PageIntro, SourceLine } from '@/components/site-shell'
import { getLang, pageMetadata } from '@/lib/content'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const lang = getLang((await params).locale)
  return pageMetadata(lang, '/privacy', lang === 'zh' ? '隐私政策｜Artcraft Hub' : 'Privacy policy | Artcraft Hub', lang === 'zh' ? '了解 Artcraft Hub 的 GA4、Cookie、广告和外部链接说明。' : 'Read how Artcraft Hub handles GA4, cookies, advertising, and external links.')
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) { const lang = getLang((await params).locale); const zh = lang === 'zh'; return <div className="container page-space narrow"><PageIntro lang={lang} eyebrow="PRIVACY" title={zh ? '隐私说明' : 'Privacy'} description={zh ? '这是一份适合第一版网站的简明说明；上线前请补上真实联系邮箱和地区要求。' : 'A plain-language first draft. Add the real contact email and local requirements before launch.'} /><article className="prose"><h2>{zh ? '我们会记录什么' : 'What may be measured'}</h2><p>{zh ? '如果你同意统计 Cookie，网站可能通过 GA4 记录页面访问、语言切换和下载按钮点击。我们不上传你的电脑文件，不读取 Artcraft 安装包内容，也不收集密码。' : 'If you accept analytics cookies, GA4 may record page views, language changes, and download-button clicks. We do not upload files from your computer, inspect Artcraft installers, or collect passwords.'}</p><h2>{zh ? '外部链接' : 'External links'}</h2><p>{zh ? '下载按钮会把你带到 Artcraft、GitHub 或 Adobe 的网站。离开本站后，请阅读对方的隐私和使用规则。' : 'Download buttons may take you to Artcraft, GitHub, or Adobe. Once you leave this site, read that service’s privacy and usage rules.'}</p><h2>{zh ? '联系' : 'Contact'}</h2><p>{zh ? '联系邮箱：hello@example.com（上线前替换为真实邮箱）。' : 'Contact: hello@example.com (replace this with the real address before launch).'}</p></article><SourceLine lang={lang} /></div> }
