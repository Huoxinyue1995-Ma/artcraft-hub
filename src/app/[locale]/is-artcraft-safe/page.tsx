import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react'
import { PageIntro } from '@/components/site-shell'
import { getLang, pageMetadata, SITE_URL } from '@/lib/content'

/**
 * "Is ArtCraft safe?" — research article.
 *
 * Every claim below was checked on SAFETY_CHECKED_AT against:
 *  - getartcraft.com/apps, /pricing, /download (quotes are verbatim)
 *  - the ArtCraft AI app source at tag artcraft-v0.41.0 (telemetry, API hosts)
 *  - the installers themselves (Windows Authenticode and macOS Gatekeeper checks were run on
 *    the downloaded files: AI app v0.41.0, Launcher v0.8.1, PhotoCraft v0.16.0)
 *  - each repo's LICENSE/NOTICE, and Storyteller's privacy statement (updated 2022-11-18)
 * Re-check the signing results and the pricing block whenever a new AI-app release ships.
 */
export const SAFETY_CHECKED_AT = '2026-10-26'

const PATH = '/is-artcraft-safe'
const TITLE = 'Is ArtCraft Safe? Downloads, Data and Alpha Risks (2026)'
const DESCRIPTION = 'ArtCraft is two things — 13 local open-source apps and an AI generation app that needs an account. We check the official download sources, installer signatures, where your files go, and the real alpha-stage risks.'

const faq: Array<{ q: string; a: string }> = [
  {
    q: 'Is ArtCraft free?',
    a: 'The 13 Craft apps (PhotoCraft, VectorCraft, FilmCraft and the rest) are free and open source. The ArtCraft AI app is also open source and free to download, but AI generations use credits. Paid plans start at $8/month during the current 20%-off offer ($10 regular), and the official pricing page says ArtCraft can be used without a subscription if you bring your own compute or third-party subscriptions.',
  },
  {
    q: 'Is ArtCraft open source?',
    a: 'Yes. The AI app and every Craft app are on GitHub under the storytold organization, dual-licensed MIT or Apache-2.0. The ArtCraft name and logos are trademarks and are not covered by that license, and some bundled third-party files carry their own licenses, listed in each repository’s NOTICE file.',
  },
  {
    q: 'Does ArtCraft work offline?',
    a: 'The Craft apps do: they run locally on your own files. The ArtCraft AI app does not — generation runs on remote models and needs a signed-in account. The browser versions of the Craft apps need an internet connection to load, but then process your files inside the browser tab.',
  },
  {
    q: 'Is ArtCraft safe for client work?',
    a: 'The software is not malicious, but most Craft apps are labelled “Early alpha” or “In development”, and their own estimates of readiness for professional work are roughly 45–62%. Use them for drafts and personal projects, keep originals and backups, and deliver client files from a tool you have tested end to end.',
  },
  {
    q: 'Which websites are official?',
    a: 'getartcraft.com (including app.getartcraft.com) and github.com/storytold. artcraft.ai simply redirects to getartcraft.com. Sites such as artcraft.tips and Uptodown are not official ArtCraft domains — and neither is this one. Download installers only from getartcraft.com or GitHub Releases.',
  },
  {
    q: 'Is ArtCraft legal to use? Does it infringe Adobe?',
    a: 'Using open-source software under the MIT or Apache-2.0 license is legal, including commercially. The Craft apps describe themselves as clean-room reimplementations written from public specifications, with no Adobe code or assets. Whether any product infringes a third party’s rights is a legal question we can’t settle; for anything high-stakes, ask a lawyer. What you generate with AI models is also subject to each model provider’s terms.',
  },
]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const lang = getLang((await params).locale)
  return {
    ...pageMetadata(lang, PATH, TITLE, DESCRIPTION),
    title: { absolute: TITLE },
    openGraph: { type: 'article', title: TITLE, description: DESCRIPTION, url: `/${lang}${PATH}` },
  }
}

function JsonLd({ lang }: { lang: string }) {
  const url = `${SITE_URL}/${lang}${PATH}`
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Is ArtCraft Safe to Use?',
      description: DESCRIPTION,
      datePublished: SAFETY_CHECKED_AT,
      dateModified: SAFETY_CHECKED_AT,
      mainEntityOfPage: url,
      author: { '@type': 'Organization', name: 'Artcraft Hub', url: `${SITE_URL}/${lang}` },
      publisher: { '@type': 'Organization', name: 'Artcraft Hub', url: `${SITE_URL}/${lang}` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Artcraft Hub', item: `${SITE_URL}/${lang}` },
        { '@type': 'ListItem', position: 2, name: 'Is ArtCraft safe?', item: url },
      ],
    },
  ]
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

const Src = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer">{children} <ArrowUpRight size={12} /></a>
)

export default async function IsArtcraftSafePage({ params }: { params: Promise<{ locale: string }> }) {
  const lang = getLang((await params).locale)

  return (
    <div className="container page-space">
      <JsonLd lang={lang} />
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link href={`/${lang}`}>Artcraft Hub</Link> <span>/</span> <span>Is ArtCraft safe?</span></nav>
      <PageIntro
        lang={lang}
        eyebrow="SAFETY · RESEARCH"
        title="Is ArtCraft Safe to Use?"
        description={`It depends on which half you use. We checked the official sources, the installers themselves, the source code and the pricing page. Last verified ${SAFETY_CHECKED_AT}.`}
      />

      {/* ---- 30-second answer ---- */}
      <section className="safe-answer" aria-label="Short answer">
        <div className="safe-answer-row">
          <ShieldCheck size={22} />
          <div>
            <h2>The 13 Craft apps: yes.</h2>
            <p>Open source, written in Rust, and run entirely on your machine — in ArtCraft’s own words, “No cloud round-trips between you and your work.” No account is needed. The installers we checked are signed by the publisher.</p>
          </div>
        </div>
        <div className="safe-answer-row">
          <AlertTriangle size={22} />
          <div>
            <h2>The AI app: safe, but not private.</h2>
            <p>It needs an account, and your prompts and reference images are sent to ArtCraft’s servers and the AI model providers you pick (Nano Banana, GPT-Image-1.5, Seedance 2.0, Kling 3.0 Pro and others). Payment runs through Stripe.</p>
          </div>
        </div>
        <div className="safe-answer-row">
          <AlertTriangle size={22} />
          <div>
            <h2>The real risk is “alpha”, not malware.</h2>
            <p>Most apps are labelled Early alpha or In development. Expect bugs, file-format gaps and crashes — so keep backups and don’t make them the only home of client work yet.</p>
          </div>
        </div>
      </section>

      <article className="prose safe-article">
        {/* §1 */}
        <h2 id="two-things">ArtCraft is really two things</h2>
        <p>Most “is it safe” answers treat ArtCraft as a single app. It isn’t, and the answer differs for each half:</p>
        <ul>
          <li><strong>The Craft App Suite</strong> — 13 desktop apps from PhotoCraft (image editing) to GridCraft (spreadsheets). Each is a separate open-source project on GitHub under <code>storytold</code>, free to use, and installed either individually or through the ArtCraft Launcher. See <Link href={`/${lang}/features#craft-apps`}>what each of the 13 Craft apps does</Link>.</li>
          <li><strong>The ArtCraft AI app</strong> — a desktop and browser studio (<code>app.getartcraft.com</code>) for AI images, video and 3D. It is open source too, but the generation itself runs on remote models and is paid for with credits.</li>
        </ul>
        <p>So separate two questions. <em>Is it safe to download?</em> depends on where the file comes from and whether it is signed. <em>Is it safe to use?</em> depends on where your data goes. The rest of this page answers each in turn.</p>

        {/* §2 */}
        <h2 id="downloads">Is ArtCraft safe to download? Check the source first</h2>
        <p>There are only two official places to get ArtCraft installers: <strong>getartcraft.com</strong> and <strong>GitHub Releases under github.com/storytold</strong>. Third-party download portals — Uptodown, for example, lists both ArtCraft and the ArtCraft Launcher — repackage files you cannot easily trace back to the publisher. Even when the file is unchanged, you lose the ability to tell. Skip them.</p>
        <p>We downloaded the current installers and checked their signatures ourselves:</p>
        <div className="table-wrap safe-table">
          <table>
            <thead><tr><th>Installer</th><th>Windows</th><th>macOS</th></tr></thead>
            <tbody>
              <tr><td>ArtCraft Launcher v0.8.1</td><td><span className="safe-ok">Signed</span> — Learning Machines (DigiCert / Microsoft ID Verified)</td><td><span className="safe-ok">Signed and notarized</span> — Developer ID “Learning Machines LLC”</td></tr>
              <tr><td>PhotoCraft v0.16.0</td><td><span className="safe-ok">Signed</span> — Learning Machines</td><td><span className="safe-ok">Signed and notarized</span> (per its release notes)</td></tr>
              <tr><td>ArtCraft AI app v0.41.0</td><td><span className="safe-warn">Not signed</span> — expect a Windows SmartScreen warning</td><td><span className="safe-ok">App signed and notarized</span>; the outer disk image is not notarized</td></tr>
            </tbody>
          </table>
        </div>
        <p>Learning Machines is the company behind Storyteller and ArtCraft, so a signature in that name is what you want to see. The unsigned Windows installer for the AI app doesn’t mean the file is bad — it means Windows can’t vouch for it, which makes checking the source and checksum more important.</p>
        <h3>A four-step check before you install</h3>
        <ol className="safe-checklist">
          <li><CheckCircle2 size={16} /> <span><strong>Start from an official page.</strong> Use getartcraft.com or our <Link href={`/${lang}/downloads`}>official ArtCraft download links</Link>, which point only to github.com/storytold and getartcraft.com.</span></li>
          <li><CheckCircle2 size={16} /> <span><strong>Check the release belongs to storytold.</strong> The address should read <code>github.com/storytold/&lt;app&gt;/releases/…</code> — not a fork or a personal account.</span></li>
          <li><CheckCircle2 size={16} /> <span><strong>Compare the SHA-256 checksum.</strong> GitHub shows a digest for every release file, and the Craft apps also publish a <code>SHA256SUMS.txt</code>. Run <code>shasum -a 256 &lt;file&gt;</code> on macOS or Linux, or <code>certutil -hashfile &lt;file&gt; SHA256</code> on Windows.</span></li>
          <li><CheckCircle2 size={16} /> <span><strong>Read the OS prompt.</strong> On macOS, Gatekeeper should open the app without “unidentified developer” warnings. On Windows, signed installers show “Learning Machines” as the publisher; the AI app’s unsigned installer shows “Unknown publisher” — only continue if steps 1–3 passed.</span></li>
        </ol>

        {/* §3 */}
        <h2 id="code">What the code tells you — and what it doesn’t</h2>
        <p>ArtCraft states three principles for every Craft app on its <Src href="https://getartcraft.com/apps">official apps page</Src>:</p>
        <blockquote>
          <p>“Every line is on GitHub under permissive licenses.”</p>
          <p>“Pure Rust compiled to real desktop apps for macOS, Windows and Linux. No Electron, no web views.”</p>
          <p>“Everything runs locally on your own files. No cloud round-trips between you and your work.”</p>
        </blockquote>
        <p>In practical terms: no embedded browser engine means a smaller attack surface than the Electron apps many tools ship as; running locally means your files are not uploaded to edit them; and public source means anyone can inspect what the app does. PdfCraft goes further and says it has no account, no telemetry and no cloud processing.</p>
        <p>Be honest about the limits, though. <strong>Open source is not the same as audited.</strong> We found no independent security audit for any of these apps, and these projects are only weeks old, moving fast. A couple of details are also worth knowing: PhotoCraft checks for updates once per launch (you can switch this off), and the ArtCraft AI app loads usage analytics (Google Analytics and PostHog) in its code.</p>
        <p>Three checks anyone can do in five minutes:</p>
        <ul>
          <li><strong>Look at the repository’s activity.</strong> Recent commits, open issues and answered bug reports suggest a maintained project.</li>
          <li><strong>Look at where release files come from.</strong> Assets should be attached to a release under <code>storytold</code>, with checksums.</li>
          <li><strong>Try the browser version first.</strong> The official apps page lists a WebAssembly version for twelve of the 13 Craft apps (all except FilmCraft), so you can test one inside the browser sandbox before installing anything.</li>
        </ul>

        {/* §4 */}
        <h2 id="data">Where your files go</h2>
        <p>This is the part most reviews skip, and the one that matters most if you handle other people’s work:</p>
        <div className="table-wrap safe-table">
          <table>
            <thead><tr><th>How you use ArtCraft</th><th>Do your files leave your computer?</th><th>Account needed</th><th>Basis</th></tr></thead>
            <tbody>
              <tr><td>The 13 Craft apps (desktop)</td><td><span className="safe-ok">No</span> — processed locally</td><td>No</td><td>Official: “Your files, your machine”</td></tr>
              <tr><td>Craft apps in the browser</td><td><span className="safe-ok">No</span> — processed in the browser tab</td><td>No</td><td>Official: they “compile to WebAssembly and run in a browser tab”</td></tr>
              <tr><td>ArtCraft AI app (image, video, 3D)</td><td><span className="safe-warn">Yes</span> — prompts and reference images go to ArtCraft’s API and the model provider</td><td>Yes</td><td>Requests go to ArtCraft’s API (api.storyteller.ai), or straight to a provider such as fal.ai if you use your own key; credits are priced per model</td></tr>
            </tbody>
          </table>
        </div>
        <p>For the AI side, the operator’s privacy statement (<Src href="https://storyteller.ai/privacy">Storyteller privacy statement</Src>, last updated November 2022) says it may share data with service providers and keeps payment data with Stripe. It predates ArtCraft, and getartcraft.com does not link a separate privacy policy — a gap worth knowing about.</p>
        <p><strong>Our rule of thumb:</strong> keep unreleased client assets, contracts (PdfCraft) and CAD drawings in the local apps. Use the AI app for concept art, moodboards and anything you would be comfortable sharing with a cloud service.</p>

        {/* §5 */}
        <h2 id="payments">Accounts and payments</h2>
        <p>On the <Src href="https://getartcraft.com/pricing">official pricing page</Src>:</p>
        <ul>
          <li>Checkout runs through Stripe (“Secure checkout via Stripe”), so ArtCraft does not handle your card number directly, and plans say “Cancel anytime”.</li>
          <li>“Credits refunded if a generation fails” — you are not charged for failed jobs.</li>
          <li>Subscriptions are optional: ArtCraft “can be used without paying for a subscription. You can bring your own compute and third-party subscriptions.” One-time credit packs “never expire”.</li>
          <li>Prices on {SAFETY_CHECKED_AT}: Basic $8/mo, Pro $28/mo, Max $48/mo (billed yearly), shown as a “limited-time” 20% discount on $10, $35 and $60. Limited-time prices change — check the pricing page before you buy.</li>
        </ul>

        {/* §6 */}
        <h2 id="alpha">The real risk: it’s alpha software</h2>
        <p>ArtCraft labels its own apps. On the apps page, PhotoCraft, PdfCraft and FigCraft are <strong>Early alpha</strong> and the other ten are <strong>In development</strong> — all thirteen have installers ready. Their own parity reports estimate readiness for professional work at roughly 45% (PhotoCraft), 56% (FilmCraft) and 62% (VectorCraft). PhotoCraft’s README says plainly that it “is not yet a Photoshop replacement for daily professional work”.</p>
        <p>What that means in practice:</p>
        <ul>
          <li><strong>File compatibility.</strong> PSD, .ai and project files open and save, but not every feature round-trips. PhotoCraft says PSD exchange is not yet reliable enough for beta.</li>
          <li><strong>Crashes and lost work.</strong> Alpha apps freeze and crash more than mature ones. Some save atomically and keep recovery data; don’t rely on it.</li>
          <li><strong>Changes between versions.</strong> New releases arrive almost daily, and behaviour can change between them.</li>
        </ul>
        <p>How to use them safely: save to a new file instead of overwriting your original, keep dated versions, never make an alpha app the only copy of a project, and keep the original Adobe file for anything you deliver. Our <Link href={`/${lang}/compare/adobe`}>comparison of the Craft apps with Photoshop, Illustrator and Premiere Pro</Link> shows what each app is still missing.</p>
        <p><strong>When is it reasonable to switch?</strong> When the app you need is out of alpha, when it reliably opens and re-saves your real files, and when you have finished one complete project in it without needing the original tool.</p>

        {/* §7 */}
        <h2 id="client-work">Client work and commercial use: a checklist</h2>
        <ul>
          <li><strong>License.</strong> MIT and Apache-2.0 allow commercial use, modification and redistribution, provided you keep copyright and license notices. Each repository’s <code>LICENSE-MIT</code>, <code>LICENSE-APACHE</code> and <code>NOTICE</code> files are the authority — check them for the app you use.</li>
          <li><strong>Trademarks.</strong> The ArtCraft name and logos are not covered by the license.</li>
          <li><strong>Your output.</strong> Files you create with the local apps are yours; the license covers the software, not your work. For AI generations, also check the terms of the model you used.</li>
          <li><strong>Delivery.</strong> Export to standard formats (PNG, PDF, SVG, MP4) and open them in a second tool before sending them to a client.</li>
          <li><strong>Data.</strong> Don’t upload a client’s confidential material to the AI app without their permission.</li>
        </ul>

        {/* §8 */}
        <h2 id="vs-adobe">How it compares with Adobe on safety</h2>
        <ul>
          <li><strong>Source:</strong> ArtCraft is open and inspectable; Adobe is closed-source, but mature and consistently signed.</li>
          <li><strong>Data:</strong> the Craft apps stay local with no account; Adobe apps require an Adobe account, and Firefly features run in Adobe’s cloud.</li>
          <li><strong>Maturity:</strong> Adobe is production-proven; most Craft apps are alpha.</li>
        </ul>
        <p>For a feature-by-feature view, see <Link href={`/${lang}/compare/adobe`}>Artcraft vs Adobe: PhotoCraft, VectorCraft, FilmCraft and EffectCraft compared</Link>.</p>
      </article>

      {/* §9 FAQ */}
      <section className="section-block" id="faq">
        <div className="section-heading"><div><p className="eyebrow">FAQ</p><h2>Common questions</h2></div></div>
        <div className="faq-list">{faq.map(({ q, a }) => (
          <details className="faq-item" key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}</div>
      </section>

      {/* §10 Sources */}
      <div className="source-box comparison-sources">
        <div>
          <strong>Sources and verification date</strong>
          <p>
            <Src href="https://getartcraft.com/apps">ArtCraft apps page</Src> · <Src href="https://getartcraft.com/pricing">ArtCraft pricing</Src> · <Src href="https://github.com/storytold/artcraft/releases">ArtCraft AI app releases</Src> · <Src href="https://github.com/storytold/craft-launcher/releases">ArtCraft Launcher releases</Src> · <Src href="https://storyteller.ai/privacy">Storyteller privacy statement</Src>
          </p>
          <p className="tiny-note">Installer signatures were checked on the downloaded files (Windows Authenticode, macOS Gatekeeper). Telemetry and API hosts were read from the AI app’s source at v0.41.0. Prices and labels are quoted from the official pages. This page was last verified on {SAFETY_CHECKED_AT}. This site is independent from ArtCraft and Adobe.</p>
        </div>
      </div>
      <p className="tiny-note">Ready to install? Get the <Link href={`/${lang}/downloads`}>official ArtCraft download links for Windows, macOS and Linux</Link>.</p>
    </div>
  )
}
