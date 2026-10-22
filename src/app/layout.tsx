import type { Metadata } from 'next'
import Script from 'next/script'
import { ConsentBanner } from '@/components/consent-banner'
import { AnalyticsEvents } from '@/components/analytics-events'
import { VercelAnalytics } from '@/components/vercel-analytics'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://artcraftphotocraft.space'
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Artcraft Hub', template: '%s · Artcraft Hub' },
  description: 'Beginner-friendly Artcraft downloads, setup guides, features, and Adobe comparisons.',
  openGraph: { type: 'website', siteName: 'Artcraft Hub', title: 'Artcraft Hub', description: 'Independent Artcraft resource for beginners.' },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification ? { other: { 'msvalidate.01': bingVerification } } : {}),
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        {adsenseId ? <meta name="google-adsense-account" content={adsenseId} /> : null}
      </head>
      <body>
        {children}
        <ConsentBanner />
        <AnalyticsEvents />
        <VercelAnalytics />
        {gaId ? <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});gtag('config','${gaId}',{anonymize_ip:true});`}</Script>
        </> : null}
        {adsenseId ? <Script async strategy="afterInteractive" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`} crossOrigin="anonymous" /> : null}
      </body>
    </html>
  )
}
