import type { Metadata } from 'next'
import { PageIntro } from '@/components/site-shell'
import { CookieChoiceButton } from '@/components/cookie-choice-button'
import { CONTACT_EMAIL, getLang, pageMetadata } from '@/lib/content'

/**
 * Privacy policy. Written to match what the site actually does (checked in a browser on
 * PRIVACY_UPDATED_AT): Google Analytics 4, Vercel Web Analytics and Google AdSense, gated by the
 * consent banner (Google Consent Mode defaults to "denied"). Update this page whenever a tracking
 * or advertising service is added, removed or reconfigured.
 */
const PRIVACY_UPDATED_AT = '2026-10-27'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const lang = getLang((await params).locale)
  return pageMetadata(lang, '/privacy', 'Privacy policy', 'How Artcraft Hub uses cookies, Google Analytics, Vercel Web Analytics and Google AdSense advertising, and how to opt out of personalized ads.')
}

const Ext = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer">{children}</a>
)

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const lang = getLang((await params).locale)
  return (
    <div className="container page-space narrow">
      <PageIntro
        lang={lang}
        eyebrow="PRIVACY"
        title="Privacy policy"
        description={`How Artcraft Hub handles data, cookies and advertising. Last updated ${PRIVACY_UPDATED_AT}.`}
      />
      <article className="prose legal">
        <h2>Who we are</h2>
        <p>Artcraft Hub (artcraftphotocraft.space) is an independent guide to ArtCraft downloads, setup and features. It is not affiliated with ArtCraft, Storyteller, Learning Machines or Adobe. For any privacy question, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>

        <h2>What we collect</h2>
        <p>The site has no accounts, sign-ups, comments or forms, and never asks for your name. We don’t upload files from your computer, inspect ArtCraft installers, or collect passwords. The only data collected is through the services below, mostly after you accept optional cookies.</p>
        <ul>
          <li><strong>Usage information:</strong> pages you visit, links you click (such as download buttons), the website that referred you, and approximate location, device and browser.</li>
          <li><strong>Technical data:</strong> your IP address and browser details, which every web server and third-party service receives when your browser connects.</li>
          <li><strong>Emails you send us:</strong> if you contact us, we keep your message and address only to reply.</li>
        </ul>

        <h2>Your cookie choice</h2>
        <p>On your first visit, a banner asks whether you accept optional analytics and advertising cookies. Until you accept, we tell Google’s services to run with storage and ad personalization <em>denied</em> (Google Consent Mode):</p>
        <ul>
          <li><strong>If you decline or don’t choose:</strong> Google Analytics doesn’t set cookies, Vercel Web Analytics doesn’t load, and Google may still show ads, but non-personalized ones. Google’s scripts can still receive cookieless, aggregated signals, and Google may set a short-lived <code>test_cookie</code> to check whether your browser accepts cookies.</li>
          <li><strong>If you accept:</strong> Google Analytics sets its cookies (<code>_ga</code> and <code>_ga_&lt;ID&gt;</code>, kept for up to two years), Vercel Web Analytics loads, and Google may use cookies to show personalized ads.</li>
        </ul>
        <p>Your choice is stored in your browser (localStorage key <code>artcraft-consent</code>), not on our server. You can change or withdraw it at any time:</p>
        <CookieChoiceButton />

        <h2>Google Analytics</h2>
        <p>We use Google Analytics 4 to understand which pages are useful and where visitors come from. IP anonymization is enabled. Google processes this data under the <Ext href="https://policies.google.com/privacy">Google Privacy Policy</Ext>. You can also block Google Analytics on every website with the <Ext href="https://tools.google.com/dlpage/gaoptout">Google Analytics opt-out browser add-on</Ext>.</p>

        <h2>Vercel Web Analytics</h2>
        <p>If you accept, we also use Vercel Web Analytics to count page views and referring websites. It doesn’t use cookies or identify individual visitors. See the <Ext href="https://vercel.com/docs/analytics/privacy-policy">Vercel Web Analytics privacy notice</Ext>.</p>

        <h2>Advertising (Google AdSense)</h2>
        <p>This site uses Google AdSense to show ads. Third-party vendors, including Google, use cookies to serve ads based on a user’s prior visits to this website or other websites. Google’s use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet.</p>
        <p>You can opt out of personalized advertising by visiting <Ext href="https://adssettings.google.com">Google Ads Settings</Ext>. You can also opt out of a third-party vendor’s use of cookies for personalized advertising by visiting <Ext href="https://www.aboutads.info/choices/">www.aboutads.info</Ext>, or, in the EU and UK, <Ext href="https://www.youronlinechoices.eu/">www.youronlinechoices.eu</Ext>.</p>
        <p>Learn more in <Ext href="https://policies.google.com/technologies/partner-sites">How Google uses information from sites or apps that use its services</Ext> and <Ext href="https://policies.google.com/technologies/ads">How Google uses cookies in advertising</Ext>.</p>

        <h2>Hosting</h2>
        <p>The site is hosted on Vercel, which processes standard server logs (such as IP address, time and requested page) to deliver pages and protect against abuse.</p>

        <h2>External links</h2>
        <p>Download buttons and source links take you to getartcraft.com, GitHub, Adobe and other sites. Once you leave Artcraft Hub, that site’s own privacy policy applies.</p>

        <h2>Your rights</h2>
        <p>Depending on where you live (for example, under the GDPR in the EU and UK, or the CCPA in California), you may have the right to access, correct or delete personal data and to object to its use. We don’t sell personal information. Because we hold almost no personal data ourselves, most requests are best handled through the choices above and Google’s own tools. For anything else, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>

        <h2>Children</h2>
        <p>This site is not directed at children under 13, and we don’t knowingly collect their personal information.</p>

        <h2>Changes</h2>
        <p>We update this policy when the services we use change, and revise the date at the top of this page.</p>
      </article>
    </div>
  )
}
