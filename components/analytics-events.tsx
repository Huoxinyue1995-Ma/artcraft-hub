'use client'

import { useEffect } from 'react'

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void }

/**
 * Sends custom GA4 events for links marked with data-ga-event.
 *
 * Page views on client-side navigation are NOT sent here: GA4's enhanced measurement
 * ("page changes based on browser history events", on by default) already records them.
 * Sending them here too would count every in-site navigation twice.
 */
export function AnalyticsEvents() {
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
