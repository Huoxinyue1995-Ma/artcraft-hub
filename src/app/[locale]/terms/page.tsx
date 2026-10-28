import type { Metadata } from 'next'
import Link from 'next/link'
import { PageIntro } from '@/components/site-shell'
import { CONTACT_EMAIL, getLang, pageMetadata } from '@/lib/content'

const TERMS_UPDATED_AT = '2026-10-27'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const lang = getLang((await params).locale)
  return pageMetadata(lang, '/terms', 'Terms of use', 'Terms of use for Artcraft Hub: an independent guide, third-party links and downloads, accuracy, advertising, trademarks and limitation of liability.')
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const lang = getLang((await params).locale)
  return (
    <div className="container page-space narrow">
      <PageIntro
        lang={lang}
        eyebrow="TERMS"
        title="Terms of use"
        description={`By using Artcraft Hub you agree to these terms. Last updated ${TERMS_UPDATED_AT}.`}
      />
      <article className="prose legal">
        <h2>An independent guide</h2>
        <p>Artcraft Hub is an independent website that explains how to download, install and use ArtCraft and the Craft apps. We are not affiliated with, endorsed by, or speaking for ArtCraft, Storyteller, Learning Machines or Adobe.</p>

        <h2>Downloads and third-party links</h2>
        <p>We don’t host or modify any installer. Download links point to the publishers’ own pages, mainly getartcraft.com and github.com/storytold. We don’t control those sites, their files, availability, pricing or security. You download and install software at your own risk, and the publisher’s license and terms apply to it. Check the source and checksum before installing. Our <Link href={`/${lang}/is-artcraft-safe`}>safety guide</Link> explains how.</p>

        <h2>Accuracy</h2>
        <p>We check our pages against official sources and show the date we last did so, but versions, features, prices and requirements change often. Information is provided “as is”, without warranties of any kind, and may be out of date. If our page conflicts with the publisher’s current page, the publisher’s page is correct. Nothing here is legal, financial or professional security advice.</p>

        <h2>Advertising</h2>
        <p>The site shows ads served by Google AdSense, which helps cover hosting. Ads are chosen by Google, not by us, and don’t mean we endorse the advertiser. Our <Link href={`/${lang}/privacy`}>privacy policy</Link> explains how advertising cookies work and how to opt out.</p>

        <h2>Trademarks and content</h2>
        <p>ArtCraft, the Craft app names, Adobe, Photoshop, Illustrator, Premiere Pro, After Effects and other names belong to their respective owners and are used only to identify their products. The original text and layout of this site are ours. You may quote short excerpts with a link back to the page.</p>

        <h2>Acceptable use</h2>
        <p>Don’t use the site in a way that disrupts it or other visitors, such as automated scraping at a damaging rate, attempts to break its security, or generating fraudulent ad clicks.</p>

        <h2>Limitation of liability</h2>
        <p>To the extent allowed by law, Artcraft Hub is not liable for any loss or damage arising from using this site, its links, or any software you download through them.</p>

        <h2>Changes and contact</h2>
        <p>We may update these terms and will change the date above when we do. Questions: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
      </article>
    </div>
  )
}
