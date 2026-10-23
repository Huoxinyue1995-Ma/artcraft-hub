'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void }

export function AnalyticsEvents() {
  const pathname = usePathname()
  const lastTrackedPath = useRef<string | null>(null)

  // Next.js client-side navigations don't reload the page, and GA4's built-in
  // history-change detection does not fire with the App Router. Send page_view manually.
  useEffect(() => {
    if (lastTrackedPath.current === null) {
      // The initial page_view is sent by gtag('config', ...) in the root layout.
      lastTrackedPath.current = pathname
      return
    }
    if (lastTrackedPath.current === pathname) return
    lastTrackedPath.current = pathname

    // Wait a moment so document.title reflects the new page's metadata.
    const timer = window.setTimeout(() => {
      ;(window as GtagWindow).gtag?.('event', 'page_view', {
        page_location: window.location.href,
        page_path: window.location.pathname,
        page_title: document.title,
      })
    }, 150)
    return () => window.clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const link = target?.closest<HTMLAnchorElement>('a[data-ga-event]')
      const gtag = (window as GtagWindow).gtag
      if (link && gtag) gtag('event', link.dataset.gaEvent || 'link_click', { link_url: link.href })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
