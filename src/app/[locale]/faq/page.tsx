import type { Metadata } from 'next'
import Link from 'next/link'
import { PageIntro, SourceLine } from '@/components/site-shell'
import { faqItems, getLang, pageMetadata } from '@/lib/content'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const lang = getLang((await params).locale)
  return pageMetadata(lang, '/faq', 'ArtCraft FAQ', 'Answers about ArtCraft and the Craft apps: pricing, official downloads, Windows, macOS and Linux support, the Launcher, safety, and how they compare with Adobe.')
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const lang = getLang((await params).locale)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  }
  return (
    <div className="container page-space">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <PageIntro lang={lang} eyebrow="FAQ" title="Common questions, answered plainly." description="Short answers to what people ask most about ArtCraft. Each links to a longer guide on this site, and the official pages are always the final word." />
      <div className="faq-list">{faqItems.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
      <p className="tiny-note faq-more">More detail: <Link href={`/${lang}/downloads`}>official downloads</Link> · <Link href={`/${lang}/install/linux`}>Linux install guide</Link> · <Link href={`/${lang}/is-artcraft-safe`}>is ArtCraft safe?</Link> · <Link href={`/${lang}/compare/adobe`}>ArtCraft vs Adobe</Link></p>
      <SourceLine lang={lang} />
    </div>
  )
}
