'use client'

import { useEffect } from 'react'

export function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const link = target?.closest<HTMLAnchorElement>('a[data-ga-event]')
      const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
      if (link && gtag) gtag('event', link.dataset.gaEvent || 'link_click', { link_url: link.href })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  return null
}
