'use client'

import Link from 'next/link'
import { Languages } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { otherLang, type Lang } from '@/lib/content'

export function LanguageSwitcher({ lang }: { lang: Lang }) {
  const pathname = usePathname() || `/${lang}`
  const target = pathname.replace(/^\/(zh|en)(?=\/|$)/, `/${otherLang(lang)}`)
  return <Link className="language-link" href={target} data-ga-event="language_switch"><Languages size={16} /> {otherLang(lang).toUpperCase()}</Link>
}
