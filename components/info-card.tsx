import { ArrowUpRight, Check, Terminal } from 'lucide-react'
import type { ReactNode } from 'react'

export function InfoCard({ icon, title, body, href, label }: { icon: ReactNode; title: string; body: string; href: string; label: string }) {
  return <a className="info-card" href={href}><span className="info-icon">{icon}</span><h3>{title}</h3><p>{body}</p><span className="text-link">{label} <ArrowUpRight size={14} /></span></a>
}

export function LinkCard({ title, description, href, label, badge, event }: { title: string; description: string; href: string; label: string; badge?: string; event?: string }) {
  return <a className="link-card" href={href} target="_blank" rel="noreferrer" data-ga-event={event}><div className="card-top"><span className="card-icon"><ArrowUpRight size={17} /></span>{badge && <span className="pill pill-green">{badge}</span>}</div><h3>{title}</h3><p>{description}</p><span className="text-link">{label} <ArrowUpRight size={14} /></span></a>
}

export function StepList({ steps }: { steps: { title: string; body: string; code?: string }[] }) {
  return <ol className="step-list">{steps.map((step, i) => <li key={step.title}><span className="step-number">{String(i + 1).padStart(2, '0')}</span><div><h3>{step.title}</h3><p>{step.body}</p>{step.code && <div className="code-block"><Terminal size={14} /><code>{step.code}</code></div>}</div></li>)}</ol>
}

export function Checklist({ items }: { items: string[] }) {
  return <ul className="checklist">{items.map((item) => <li key={item}><span><Check size={14} /></span>{item}</li>)}</ul>
}
