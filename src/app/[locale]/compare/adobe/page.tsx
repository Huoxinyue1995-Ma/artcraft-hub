import type { Metadata } from 'next'
import { PageIntro, SourceLine } from '@/components/site-shell'
import { adobeLinks, adobeRows, getLang, OFFICIAL, pageMetadata } from '@/lib/content'
import { ADOBE_VERSIONS, ARTCRAFT_VERSION, COMPARE_CHECKED_AT, adobeOnly, artcraftLeads, moduleRows, type AdobeApp } from '@/lib/compare-adobe'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const lang = getLang((await params).locale)
  return pageMetadata(
    lang,
    '/compare/adobe',
    lang === 'zh' ? 'Artcraft 与 Adobe 逐模块对比（v0.41.0 vs Photoshop 27.11 等）' : 'Artcraft vs Adobe, module by module (v0.41.0 vs Photoshop 27.11 and more)',
    lang === 'zh'
      ? '按模块对比 Artcraft v0.41.0 与 Photoshop、Illustrator、Premiere Pro、After Effects：哪些 Adobe 能做而 Artcraft 未提供，哪些是 Artcraft 独有的。'
      : 'Compare Artcraft v0.41.0 with Photoshop, Illustrator, Premiere Pro, and After Effects module by module: what Adobe does that Artcraft does not provide, and where Artcraft leads.',
  )
}

const adobeAppOrder: AdobeApp[] = ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects']

export default async function ComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const lang = getLang((await params).locale)
  const zh = lang === 'zh'
  const versionLabel = (app: AdobeApp) => `${app} ${ADOBE_VERSIONS[app].version}`

  return (
    <div className="container page-space">
      <PageIntro
        lang={lang}
        eyebrow="ARTCRAFT × ADOBE"
        title={zh
          ? <span className="compare-title"><span className="nowrap">生成交给 Artcraft，</span><br /><span className="nowrap">精修交给 Adobe。</span></span>
          : <>Generate with Artcraft.<br />Polish with Adobe.</>}
        description={zh
          ? `Artcraft 强在多模型 AI 生成与 3D 构图，弱在精细修图、矢量设计和专业剪辑。这是面向新手的事实对照，不是 Adobe 官方评测，也不承诺 Artcraft 可以替代 Adobe。本页对比 Artcraft ${ARTCRAFT_VERSION.version} 与下表列出的 Adobe 版本；两边更新都很快，请以各自官方页面为准。`
          : `Artcraft leads in multi-model AI generation and 3D staging, but trails Adobe in fine retouching, vector design, and pro editing. A beginner-friendly fact table, not an Adobe review, and no promise that Artcraft replaces Adobe. This page compares Artcraft ${ARTCRAFT_VERSION.version} with the Adobe versions listed below. Both change quickly; check each official site.`}
      />

      <div className="table-wrap">
        <table>
          <thead><tr>
            <th>{zh ? '工具' : 'Tool'}</th><th>{zh ? '对比版本' : 'Version compared'}</th><th>{zh ? '主要用途' : 'Main use'}</th><th>{zh ? '价格模式' : 'Pricing'}</th><th>{zh ? '上手难度' : 'Learning curve'}</th><th>{zh ? '适合谁' : 'Good for'}</th>
          </tr></thead>
          <tbody>{adobeRows[lang].map((row) => <tr key={row[0]}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>

      <div className="source-box comparison-sources">
        <div>
          <strong>{zh ? '版本与来源' : 'Versions and sources'}</strong>
          <p>
            <a href={OFFICIAL.releases} target="_blank" rel="noreferrer">Artcraft {ARTCRAFT_VERSION.version}</a> ({ARTCRAFT_VERSION.releasedAt}) ·{' '}
            {adobeAppOrder.map((app, i) => <span key={app}>{i > 0 ? ' · ' : ''}<a href={ADOBE_VERSIONS[app].notes} target="_blank" rel="noreferrer">{versionLabel(app)}</a> ({ADOBE_VERSIONS[app].releasedAt})</span>)}
          </p>
          <p>
            <a href={OFFICIAL.pricing} target="_blank" rel="noreferrer">Artcraft pricing</a> · {Object.entries(adobeLinks).map(([name, url], index) => <span key={name}>{index > 0 ? ' · ' : ''}<a href={url} target="_blank" rel="noreferrer">Adobe {name}</a></span>)}
          </p>
          <p className="tiny-note">{zh
            ? `Artcraft 功能依据官方 GitHub ${ARTCRAFT_VERSION.version} 版本的 README 与源码；Adobe 版本号来自公开发布记录，以 Adobe 官方发布说明为准。最后检查：${COMPARE_CHECKED_AT}。`
            : `Artcraft features are based on the README and source code of ${ARTCRAFT_VERSION.version} on the official GitHub. Adobe versions come from public release records; Adobe’s own release notes take precedence. Last checked: ${COMPARE_CHECKED_AT}.`}</p>
        </div>
      </div>

      <section className="section-block">
        <div className="section-heading"><div>
          <p className="eyebrow">{zh ? '逐模块对比' : 'MODULE BY MODULE'}</p>
          <h2>{zh ? `Artcraft ${ARTCRAFT_VERSION.version} 每个模块，对应 Adobe 的哪一款。` : `Each Artcraft ${ARTCRAFT_VERSION.version} module, next to the closest Adobe app.`}</h2>
        </div></div>
        <div className="table-wrap compare-table">
          <table>
            <thead><tr>
              <th>{zh ? 'Artcraft 模块' : 'Artcraft module'}</th><th>{zh ? 'Artcraft 能做什么' : 'What Artcraft does'}</th><th>{zh ? '对应 Adobe' : 'Closest Adobe app'}</th><th>{zh ? 'Adobe 能做什么' : 'What Adobe does'}</th><th>{zh ? 'Artcraft 未提供 / 限制' : 'Not provided / limits in Artcraft'}</th>
            </tr></thead>
            <tbody>{moduleRows.map((row) => (
              <tr key={`${row.module}-${row.adobe}`}>
                <td>{row.module}{row.badge ? <> <span className="pill pill-blue">{row.badge}</span></> : null}</td>
                <td>{row.artcraft[lang]}</td>
                <td className="compare-app">{row.adobe === 'none' ? (zh ? '无对应' : 'No match') : versionLabel(row.adobe)}</td>
                <td>{row.adobeSide[lang]}</td>
                <td>{row.missing[lang]}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading"><div>
          <p className="eyebrow">{zh ? 'ADOBE 能做，ARTCRAFT 未提供' : 'ADOBE CAN, ARTCRAFT DOES NOT PROVIDE'}</p>
          <h2>{zh ? `这些事 Artcraft ${ARTCRAFT_VERSION.version} 中未提供。` : `What Artcraft ${ARTCRAFT_VERSION.version} does not provide.`}</h2>
        </div></div>
        <div className="table-wrap compare-table">
          <table>
            <thead><tr><th>{zh ? '任务' : 'Task'}</th><th>{zh ? '可以用' : 'Available in'}</th><th>{zh ? 'Artcraft 现状' : 'Artcraft today'}</th></tr></thead>
            <tbody>{adobeOnly.map((row) => (
              <tr key={row.task.en}>
                <td>{row.task[lang]}</td>
                <td className="compare-app">{versionLabel(row.app)}</td>
                <td>{row.note[lang]}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <p className="tiny-note">{zh
          ? `“未提供”指在 ${ARTCRAFT_VERSION.version} 的官方源码和说明中没有找到对应功能，不代表以后不会加入。`
          : `“Not provided” means no matching feature was found in the official ${ARTCRAFT_VERSION.version} source and docs; it may be added later.`}</p>
      </section>

      <section className="section-block">
        <div className="section-heading"><div>
          <p className="eyebrow">{zh ? 'ARTCRAFT 领先的地方' : 'WHERE ARTCRAFT LEADS'}</p>
          <h2>{zh ? '这些是这四款 Adobe 产品没有的。' : 'What these four Adobe apps do not offer.'}</h2>
        </div></div>
        <div className="feature-grid">{artcraftLeads.map((lead) => (
          <div className="feature-card" key={lead.title.en}>
            <h2>{lead.title[lang]}</h2>
            <p>{lead.body[lang]}</p>
            <p className="compare-vs">{lead.vs[lang]}</p>
          </div>
        ))}</div>
      </section>

      <section className="section-block">
        <div className="section-heading"><div><p className="eyebrow">{zh ? '简单选择' : 'A SIMPLE CHOICE'}</p><h2>{zh ? '你可以这样开始。' : 'A practical way to start.'}</h2></div></div>
        <div className="choice-grid">
          <div><strong>01</strong><p>{zh ? '想探索 AI、2D、3D 和图像/视频创作流程：先试 Artcraft。' : 'Want to explore AI, 2D, 3D, and image/video workflows? Start with Artcraft.'}</p></div>
          <div><strong>02</strong><p>{zh ? '需要成熟的修图、矢量、剪辑或特效工作流：看对应 Adobe 产品。' : 'Need a mature retouching, vector, editing, or effects workflow? Look at the matching Adobe app.'}</p></div>
          <div><strong>03</strong><p>{zh ? '两者也可以搭配：用 Artcraft 生成素材，再用 Adobe 精修、排版或剪辑。' : 'They can work together: generate material in Artcraft, then refine, lay out, or edit it in Adobe.'}</p></div>
        </div>
      </section>

      <SourceLine lang={lang} />
    </div>
  )
}
