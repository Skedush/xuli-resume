import { useEffect, useMemo, useRef, useState } from 'react'
import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'
import metaJson from '../data/vibe-journal-meta.json'
import type { VibeJournalMeta } from '../lib/vibeJournalSync'

const meta = metaJson as VibeJournalMeta

/**
 * Build-time bundle of every pre-rendered deliverable HTML snapshot.
 *
 * Vite's `import.meta.glob` with `query: '?raw'` inlines each matched file
 * as a string at build time. The sync script writes the files under
 * `src/data/vibe-journal-html/`, and after a re-sync the developer reruns
 * `npm run dev` / `npm run build` to pick up the new content — no browser
 * markdown parser, no runtime fetch, no upstream path leaked into the bundle.
 */
const htmlSnapshots = import.meta.glob('/src/data/vibe-journal-html/*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function formatLastRun(iso: string | null): string {
  if (!iso) return '尚未同步'
  try {
    const d = new Date(iso)
    return d.toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
  } catch {
    return iso
  }
}

export default function VibeJournal() {
  const deliverables = meta.consumedDeliverables || []
  const timelinePhases = meta.timelinePhases || []
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mobileTocOpen, setMobileTocOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLElement>(null)

  // Map each deliverable's htmlPath (repo-relative, e.g.
  // `src/data/vibe-journal-html/foo.md.html`) to the inlined HTML string
  // captured at build time. Missing snapshots fall back to the raw markdown.
  const htmlByRelPath = useMemo(() => {
    const map: Record<string, string> = {}
    for (const [globKey, html] of Object.entries(htmlSnapshots)) {
      // globKey looks like `/src/data/vibe-journal-html/foo.md.html`; store
      // both absolute and repo-relative forms so we can look up by either.
      const abs = globKey
      const rel = abs.replace(/^\//, '')
      map[abs] = html
      map[rel] = html
    }
    return map
  }, [])

  // Clamp selected index if the deliverable list shrinks between syncs.
  useEffect(() => {
    if (selectedIndex >= deliverables.length) setSelectedIndex(0)
  }, [deliverables.length, selectedIndex])

  // Reset scroll position inside the content area when switching docs.
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selectedIndex])

  // Keyboard navigation: ← / → move between docs when focus is in the page.
  useEffect(() => {
    if (deliverables.length === 0) return
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'j') {
        e.preventDefault()
        setSelectedIndex((i) => (i + 1) % deliverables.length)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'k') {
        e.preventDefault()
        setSelectedIndex((i) => (i - 1 + deliverables.length) % deliverables.length)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [deliverables.length])

  // Bring the active item into view in the sidebar whenever it changes.
  useEffect(() => {
    if (!sidebarRef.current) return
    const active = sidebarRef.current.querySelector<HTMLElement>(`[data-doc-index="${selectedIndex}"]`)
    if (active) active.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  const current = deliverables[selectedIndex]
  const currentHtml = current ? htmlByRelPath[current.htmlPath] || htmlByRelPath['/' + current.htmlPath] : ''
  const docNumberLabel = deliverables.length > 0 ? `${selectedIndex + 1} / ${deliverables.length}` : '0 / 0'

  return (
    <PageTransition>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <PageHeader
            title="Vibe Coding"
            subtitle="从上游 vibe-coding-journal 增量消费出来的 AI 编程旅程"
            highlightWord="日志"
          />

          <div className="bg-[var(--color-card)]/70 rounded-lg p-3 mb-6 border border-[var(--xuli-accent)]/20 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[var(--xuli-text-tertiary)] text-xs font-mono">
              下游同步：{formatLastRun(meta.lastRun)}
              {meta.lastRunNewDeliverables.length > 0 && (
                <span className="ml-2 text-[var(--xuli-accent)]">
                  +{meta.lastRunNewDeliverables.length} 份新文档
                </span>
              )}
              {meta.lastRunNewTimelineLines > 0 && (
                <span className="ml-2 text-[var(--xuli-accent)]">
                  +{meta.lastRunNewTimelineLines} 行新 timeline
                </span>
              )}
            </span>
            <span className="text-[var(--xuli-text-tertiary)] text-xs font-mono">
              共 {deliverables.length} 份已消费文档
            </span>
          </div>

          {timelinePhases.length > 0 && (
            <div className="overflow-x-auto pb-4 mb-8">
              <div className="flex items-start justify-start gap-4 min-w-max px-4">
                {timelinePhases.map((item) => (
                  <div key={`${item.phase}-${item.time}`} className="flex flex-col items-center min-w-[150px] max-w-[180px]">
                    <div className="w-3 h-3 bg-[var(--xuli-accent)] rounded-full mb-3" />
                    <span className="text-[var(--xuli-accent)] text-xs font-mono mb-1">{item.time}</span>
                    <span className="text-[var(--xuli-text-primary)] text-xs text-center leading-tight mb-1">
                      {item.event}
                    </span>
                    <span className="text-[var(--xuli-text-tertiary)] text-[11px] text-center leading-tight">
                      {item.tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {deliverables.length === 0 ? (
            <div className="bg-[var(--color-card)] rounded-lg p-8 border border-[var(--color-border)]/60 text-center">
              <p className="text-[var(--xuli-text-tertiary)] text-sm">
                尚无已消费文档。运行 <code className="font-mono text-[var(--xuli-accent)]">npm run sync:vibe-journal</code> 触发同步。
              </p>
            </div>
          ) : (
            <>
              {/* Mobile doc picker — collapsed by default, expands on tap. */}
              <button
                onClick={() => setMobileTocOpen((v) => !v)}
                className="lg:hidden w-full mb-4 flex items-center justify-between gap-2 px-4 py-3 rounded-lg border border-[var(--color-border)]/60 bg-[var(--color-card)]/80 text-left"
                aria-expanded={mobileTocOpen}
                aria-controls="vj-mobile-toc"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span className="text-[var(--xuli-accent)] font-mono text-xs">{docNumberLabel}</span>
                  <span className="text-[var(--xuli-text-primary)] text-sm truncate">
                    {current?.title || '—'}
                  </span>
                </span>
                <svg
                  className={`w-4 h-4 text-[var(--xuli-text-tertiary)] transition-transform ${mobileTocOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileTocOpen && (
                <div
                  id="vj-mobile-toc"
                  className="lg:hidden mb-4 max-h-72 overflow-y-auto rounded-lg border border-[var(--color-border)]/60 bg-[var(--color-surface)]/80"
                >
                  {deliverables.map((doc, idx) => (
                    <button
                      key={doc.file}
                      onClick={() => { setSelectedIndex(idx); setMobileTocOpen(false) }}
                      className={`w-full text-left px-4 py-2 text-sm border-b border-[var(--color-border)]/40 last:border-b-0 ${
                        idx === selectedIndex
                          ? 'bg-[var(--xuli-accent-muted)] text-[var(--xuli-accent)]'
                          : 'text-[var(--xuli-text-secondary)] hover:bg-[var(--color-card)]'
                      }`}
                    >
                      <span className="font-mono text-[10px] text-[var(--xuli-text-tertiary)] mr-2">{String(idx + 1).padStart(2, '0')}</span>
                      {doc.title}
                    </button>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-6 mb-12">
                {/* Desktop sidebar TOC */}
                <aside
                  ref={sidebarRef}
                  className="hidden lg:block self-start sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-lg border border-[var(--color-border)]/60 bg-[var(--color-surface)]/60 p-2"
                >
                  <div className="px-3 py-2 text-xs font-mono text-[var(--xuli-text-tertiary)] uppercase tracking-wider border-b border-[var(--color-border)]/40 mb-2">
                    产出文档
                  </div>
                  <ul className="space-y-0.5">
                    {deliverables.map((doc, idx) => {
                      const active = idx === selectedIndex
                      return (
                        <li key={doc.file}>
                          <button
                            data-doc-index={idx}
                            onClick={() => setSelectedIndex(idx)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                              active
                                ? 'bg-[var(--xuli-accent-muted)] text-[var(--xuli-accent)] border-l-2 border-[var(--xuli-accent)]'
                                : 'text-[var(--xuli-text-secondary)] hover:bg-[var(--color-card)] hover:text-[var(--xuli-text-primary)] border-l-2 border-transparent'
                            }`}
                          >
                            <div className="flex items-baseline gap-2">
                              <span className="font-mono text-[10px] text-[var(--xuli-text-tertiary)]">{String(idx + 1).padStart(2, '0')}</span>
                              <span className="line-clamp-2 leading-tight">{doc.title}</span>
                            </div>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </aside>

                {/* Reader content area */}
                <article
                  ref={contentRef}
                  className="bg-[var(--color-card)] rounded-lg border border-[var(--color-border)]/60 p-6 sm:p-8 min-h-[28rem]"
                >
                  <header className="mb-6 pb-4 border-b border-[var(--color-border)]/40">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <span className="font-mono text-xs text-[var(--xuli-text-tertiary)]">
                        文档 {docNumberLabel} · 上游：<code className="text-[var(--xuli-accent)]">{current?.file}</code>
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedIndex((i) => (i - 1 + deliverables.length) % deliverables.length)}
                          className="px-3 py-1.5 rounded-md text-xs font-mono border border-[var(--color-border)]/70 bg-[var(--color-surface)]/60 text-[var(--xuli-text-secondary)] hover:text-[var(--xuli-accent)] hover:border-[var(--xuli-accent)]/40 transition-colors"
                          title="上一篇（← 或 ↑）"
                        >
                          ← 上一篇
                        </button>
                        <button
                          onClick={() => setSelectedIndex((i) => (i + 1) % deliverables.length)}
                          className="px-3 py-1.5 rounded-md text-xs font-mono border border-[var(--color-border)]/70 bg-[var(--color-surface)]/60 text-[var(--xuli-text-secondary)] hover:text-[var(--xuli-accent)] hover:border-[var(--xuli-accent)]/40 transition-colors"
                          title="下一篇（→ 或 ↓）"
                        >
                          下一篇 →
                        </button>
                      </div>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl text-[var(--xuli-text-primary)] leading-tight">
                      {current?.title}
                    </h2>
                    {current?.summary && (
                      <p className="mt-2 text-sm text-[var(--xuli-text-secondary)]">{current.summary}</p>
                    )}
                  </header>

                  {currentHtml ? (
                    <div
                      className="vj-doc-host"
                      // The HTML was generated server-side by `marked` from a
                      // trusted upstream repo (`vibe-coding-journal`); inline
                      // HTML in the source is escaped by marked's defaults.
                      dangerouslySetInnerHTML={{ __html: currentHtml }}
                    />
                  ) : (
                    <pre className="vj-fallback whitespace-pre-wrap break-words text-sm text-[var(--xuli-text-secondary)] font-mono leading-relaxed">
                      {current?.content || '（无内容）'}
                    </pre>
                  )}
                </article>
              </div>
            </>
          )}

          <div className="bg-[var(--color-card)]/70 rounded-lg p-4 border border-[var(--xuli-accent)]/20">
            <p className="text-[var(--xuli-text-secondary)] text-sm text-center font-body leading-relaxed">
              此页面由 <code className="font-mono text-[var(--xuli-accent)]">src/lib/vibeJournalSync.ts</code> 消费上游 TIMELINE.md 与 deliverables/*.md 生成；
              同步阶段会用 <code className="font-mono text-[var(--xuli-accent)]">marked</code> 把每篇 md 预渲染成 HTML 写入 <code className="font-mono text-[var(--xuli-accent)]">src/data/vibe-journal-html/</code>，
              浏览器只读取这些下游生成产物；重复执行不会重复计分。
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
