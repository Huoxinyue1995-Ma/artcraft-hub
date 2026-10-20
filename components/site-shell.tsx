import Link from 'next/link'
import { ArrowUpRight, Github, Sparkles } from 'lucide-react'
import { getLang, navItems, otherLang, type Lang, OFFICIAL, sourceNote } from '@/lib/content'
import { LanguageSwitcher } from '@/components/language-switcher'

export function SiteHeader({ lang }: { lang: Lang }) {
  const items = navItems(lang)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href={`/${lang}`} aria-label="Artcraft Hub home">
          <span className="brand-mark"><Sparkles size={16} strokeWidth={2.5} /></span>
          <span>Artcraft <em>Hub</em></span>
        </Link>
        <nav className="main-nav" aria-label={lang === 'zh' ? '主导航' : 'Main navigation'}>
          {items.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="header-actions">
          <a className="icon-link" href={OFFICIAL.github} target="_blank" rel="noreferrer" aria-label="Artcraft on GitHub" data-ga-event="official_github_click"><Github size={17} /></a>
          <LanguageSwitcher lang={lang} />
        </div>
      </div>
    </header>
  )
}

export function SiteFooter({ lang }: { lang: Lang }) {
  const title = lang === 'zh' ? '把第一步变简单。' : 'Make the first step simple.'
  const copy = lang === 'zh'
    ? '一个独立维护的 Artcraft 新手资料站，帮你找到官方入口、看懂安装步骤。'
    : 'An independent beginner guide to Artcraft, with official links and clear setup steps.'
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="eyebrow">ARTCRAFT HUB</p>
          <h2>{title}</h2>
          <p className="muted footer-copy">{copy}</p>
        </div>
        <div className="footer-links">
          <div>
            <p className="footer-heading">{lang === 'zh' ? '开始使用' : 'Start here'}</p>
            <Link href={`/${lang}/downloads`}>{lang === 'zh' ? '官方下载' : 'Official downloads'}</Link>
            <Link href={`/${lang}/install/windows`}>{lang === 'zh' ? '安装教程' : 'Setup guides'}</Link>
            <Link href={`/${lang}/compare/adobe`}>{lang === 'zh' ? '对比 Adobe' : 'Compare Adobe'}</Link>
          </div>
          <div>
            <p className="footer-heading">{lang === 'zh' ? '关于本站' : 'About this site'}</p>
            <Link href={`/${lang}/about`}>{lang === 'zh' ? '关于与来源' : 'About & sources'}</Link>
            <Link href={`/${lang}/contact`}>{lang === 'zh' ? '联系' : 'Contact'}</Link>
            <Link href={`/${lang}/privacy`}>{lang === 'zh' ? '隐私政策' : 'Privacy'}</Link>
            <Link href={`/${lang}/terms`}>{lang === 'zh' ? '使用条款' : 'Terms'}</Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Artcraft Hub</span>
        <span>{sourceNote(lang)}</span>
        <a href={OFFICIAL.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a>
      </div>
    </footer>
  )
}

export function Notice({ lang }: { lang: Lang }) {
  return <div className="notice"><span className="notice-dot" />{lang === 'zh' ? '独立资料站 · 非 Artcraft 或 Adobe 官方网站' : 'Independent resource · not an official Artcraft or Adobe website'}</div>
}

export function PageIntro({ lang, eyebrow, title, description }: { lang: Lang; eyebrow: string; title: string; description: string }) {
  return <div className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{description}</p></div>
}

export function SourceLine({ lang }: { lang: Lang }) {
  return <p className="source-line">{sourceNote(lang)}</p>
}
