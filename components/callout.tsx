import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { Lang } from '@/lib/content'

export function OfficialCallout({ lang }: { lang: Lang }) {
  return (
    <div className="official-callout">
      <div><span className="pill pill-blue">{lang === 'zh' ? '先看这里' : 'Start here'}</span><h3>{lang === 'zh' ? '只从官方入口下载' : 'Download from an official source'}</h3><p>{lang === 'zh' ? '版本会更新，安装包也可能变化。打开下载页前，先确认自己的系统。' : 'Versions and installers change. Check your operating system before opening the download page.'}</p></div>
      <Link className="button button-dark" href={`/${lang}/downloads`}>{lang === 'zh' ? '查看下载入口' : 'See download links'} <ExternalLink size={15} /></Link>
    </div>
  )
}

export function Callout({ lang, title, body }: { lang: Lang; title: string; body: string }) {
  return <div className="callout"><span className="callout-mark">!</span><div><h3>{title}</h3><p>{body}</p></div></div>
}
