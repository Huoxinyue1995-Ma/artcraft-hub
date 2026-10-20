import { notFound } from 'next/navigation'
import { getLang, type Lang } from '@/lib/content'
import { SiteFooter, SiteHeader } from '@/components/site-shell'

export function generateStaticParams() { return [{ locale: 'zh' }, { locale: 'en' }] }

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params
  if (locale !== 'zh' && locale !== 'en') notFound()
  const lang = locale as Lang
  return <div lang={lang === 'zh' ? 'zh-CN' : 'en'}><SiteHeader lang={lang} /><main>{children}</main><SiteFooter lang={lang} /></div>
}
