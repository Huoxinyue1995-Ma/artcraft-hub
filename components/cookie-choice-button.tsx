'use client'

import { useEffect, useState } from 'react'

/**
 * Lets a visitor change or withdraw their cookie choice at any time.
 * Clears the stored choice and reloads, so the consent banner appears again and
 * GA4 / AdSense start from "denied" until the visitor chooses.
 */
export function CookieChoiceButton() {
  const [current, setCurrent] = useState<string | null>(null)
  useEffect(() => {
    try { setCurrent(window.localStorage.getItem('artcraft-consent')) } catch { setCurrent(null) }
  }, [])
  const reset = () => {
    try { window.localStorage.removeItem('artcraft-consent') } catch {}
    window.location.reload()
  }
  const label = current === 'accepted' ? 'Accepted' : current === 'declined' ? 'Declined' : 'Not chosen yet'
  return (
    <div className="cookie-choice">
      <span>Your current choice: <strong>{label}</strong></span>
      <button type="button" onClick={reset}>Change cookie choice</button>
    </div>
  )
}
