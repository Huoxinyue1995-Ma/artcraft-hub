import type { Metadata } from 'next'
import { Mail } from 'lucide-react'
import { PageIntro, SourceLine } from '@/components/site-shell'
import { CONTACT_EMAIL, getLang, pageMetadata } from '@/lib/content'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const lang = getLang((await params).locale)
  return pageMetadata(lang, '/contact', 'Contact Artcraft Hub', 'Contact Artcraft Hub to report a changed link, suggest a correction or ask a privacy question.')
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const lang = getLang((await params).locale)
  return (
    <div className="container page-space narrow">
      <PageIntro lang={lang} eyebrow="CONTACT" title="Contact Artcraft Hub" description="Artcraft Hub is maintained by one independent editor. Email is the best way to reach us; we usually reply within a few days." />
      <a className="source-box source-box-link" href={`mailto:${CONTACT_EMAIL}`}><span><Mail size={16} /> {CONTACT_EMAIL}</span></a>
      <article className="prose legal">
        <h2>Good reasons to write</h2>
        <ul>
          <li>A download link, version number or price on this site is out of date.</li>
          <li>Something in a guide is wrong or unclear.</li>
          <li>A privacy question, or a request about data described in our privacy policy.</li>
        </ul>
        <h2>What we can’t help with</h2>
        <p>We are not the ArtCraft team. For bugs, account or billing questions about ArtCraft itself, contact ArtCraft through getartcraft.com or open an issue on the app’s GitHub repository.</p>
        <p>Please don’t send passwords, verification codes, API keys or installer files by email.</p>
      </article>
      <SourceLine lang={lang} />
    </div>
  )
}
