'use client'

import { useEffect, useState } from 'react'

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void }

export function ConsentBanner() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const saved = window.localStorage.getItem('artcraft-consent')
    setVisible(saved === null)
    if (saved === 'accepted') {
      ;(window as GtagWindow).gtag?.('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      })
    }
  }, [])
  if (!visible) return null
  const choose = (accepted: boolean) => {
    window.localStorage.setItem('artcraft-consent', accepted ? 'accepted' : 'declined')
    window.dispatchEvent(new Event('artcraft-consent-change'))
    ;(window as GtagWindow).gtag?.('consent', 'update', { analytics_storage: accepted ? 'granted' : 'denied', ad_storage: accepted ? 'granted' : 'denied', ad_user_data: accepted ? 'granted' : 'denied', ad_personalization: accepted ? 'granted' : 'denied' })
    setVisible(false)
  }
  return <aside className="consent-banner" aria-label="Cookie choices"><p>可选统计用于了解访问和下载情况；你也可以拒绝。<br />Optional analytics help us understand visits and downloads.</p><div><button onClick={() => choose(false)}>拒绝 / Decline</button><button className="consent-accept" onClick={() => choose(true)}>同意 / Accept</button></div></aside>
}
