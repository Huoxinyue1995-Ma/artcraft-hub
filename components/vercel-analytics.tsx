'use client'

import { useEffect, useState } from 'react'

const consentEvent = 'artcraft-consent-change'

/**
 * Loads Vercel Web Analytics only after the visitor accepts optional analytics.
 * The script is served by Vercel at /_vercel/insights/script.js, so no package
 * or measurement ID is needed in the app.
 */
export function VercelAnalytics() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const syncConsent = () => setEnabled(window.localStorage.getItem('artcraft-consent') === 'accepted')
    syncConsent()
    window.addEventListener(consentEvent, syncConsent)
    return () => window.removeEventListener(consentEvent, syncConsent)
  }, [])

  useEffect(() => {
    if (!enabled || document.querySelector('script[data-artcraft-vercel-insights]')) return
    const script = document.createElement('script')
    script.defer = true
    script.src = '/_vercel/insights/script.js'
    script.dataset.artcraftVercelInsights = 'true'
    document.head.appendChild(script)
  }, [enabled])

  return null
}
