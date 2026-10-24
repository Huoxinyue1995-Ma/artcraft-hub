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
const baiduVerification = process.env.NEXT_PUBLIC_BAIDU_SITE_VERIFICATION

const otherVerification: Record<string, string> = {
  ...(bingVerification ? { 'msvalidate.01': bingVerification } : {}),
  ...(baiduVerification ? { 'baidu-site-verification': baiduVerification } : {}),
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Artcraft Hub', template: '%s · Artcraft Hub' },
  description: 'Beginner-friendly Artcraft downloads, setup guides, features, and Adobe comparisons.',
  openGraph: { type: 'website', siteName: 'Artcraft Hub', title: 'Artcraft Hub', description: 'Independent Artcraft resource for beginners.' },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(Object.keys(otherVerification).length ? { other: otherVerification } : {}),
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
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
          <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());let consent='denied';try{consent=window.localStorage.getItem('artcraft-consent')==='accepted'?'granted':'denied'}catch{};gtag('consent','default',{analytics_storage:consent,ad_storage:consent,ad_user_data:consent,ad_personalization:consent});gtag('config','${gaId}',{anonymize_ip:true});`}</Script>
        </> : null}
        {adsenseId ? <Script async strategy="afterInteractive" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`} crossOrigin="anonymous" /> : null}
      </body>
    </html>
  )
}
