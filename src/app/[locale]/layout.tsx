import { notFound } from 'next/navigation'
import { getLang, type Lang } from '@/lib/content'
import { SiteFooter, SiteHeader } from '@/components/site-shell'

// English-only for now; /zh/* is redirected to /en/* in next.config.ts.
export function generateStaticParams() { return [{ locale: 'en' }] }
export const dynamicParams = false

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params
  if (locale !== 'en') notFound()
  const lang = locale as Lang
  return <><SiteHeader lang={lang} /><main>{children}</main><SiteFooter lang={lang} /></>
}
