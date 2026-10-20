import type { Metadata } from 'next'
import { Mail } from 'lucide-react'
import { PageIntro, SourceLine } from '@/components/site-shell'
import { CONTACT_EMAIL, getLang, pageMetadata } from '@/lib/content'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const lang = getLang((await params).locale)
  return pageMetadata(lang, '/contact', lang === 'zh' ? '联系 Artcraft Hub' : 'Contact Artcraft Hub', lang === 'zh' ? '联系 Artcraft Hub，报告链接变化或提交资料更正。' : 'Contact Artcraft Hub to report changed links or suggest a correction.')
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const lang = getLang((await params).locale)
  const zh = lang === 'zh'
  return <div className="container page-space narrow"><PageIntro lang={lang} eyebrow="CONTACT" title={zh ? '发现链接变化？告诉我们。' : 'Found a changed link? Tell us.'} description={zh ? '如果官方版本、安装说明或对比资料发生变化，可以发邮件给维护者。' : 'Email the maintainer when an official release, setup note, or comparison source changes.'} /><a className="source-box source-box-link" href={`mailto:${CONTACT_EMAIL}`}><span><Mail size={16} /> {CONTACT_EMAIL}</span></a><p className="tiny-note">{zh ? '请不要通过邮件发送密码、验证码、API 密钥或安装包。' : 'Do not send passwords, verification codes, API keys, or installer files by email.'}</p><SourceLine lang={lang} /></div>
}
