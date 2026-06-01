import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'
import metaJson from '../data/vibe-journal-meta.json'
import type { VibeJournalMeta } from '../lib/vibeJournalSync'

const meta = metaJson as VibeJournalMeta

function formatLastRun(iso: string | null): string {
  if (!iso) return '尚未同步'
  try {
    const d = new Date(iso)
    return d.toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
  } catch {
    return iso
  }
}

function renderMarkdownPreview(markdown: string): string[] {
  return markdown
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('```'))
    .slice(0, 18)
}

export default function VibeJournal() {
  const deliverables = meta.consumedDeliverables || []
  const timelinePhases = meta.timelinePhases || []

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

          <div className="mb-12">
            <h2 className="font-display text-2xl text-[var(--xuli-text-primary)] mb-6 text-center">产出文档</h2>
            {deliverables.length === 0 ? (
              <div className="bg-[var(--color-card)] rounded-lg p-8 border border-[var(--color-border)]/60 text-center">
                <p className="text-[var(--xuli-text-tertiary)] text-sm">
                  尚无已消费文档。运行 <code className="font-mono text-[var(--xuli-accent)]">npm run sync:vibe-journal</code> 触发同步。
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {deliverables.map((doc) => (
                  <article
                    key={doc.file}
                    className="bg-[var(--color-card)] rounded-lg p-6 border border-[var(--color-border)]/60 hover:border-[var(--xuli-accent)]/30 transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-secondary)] flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[var(--xuli-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-display text-lg text-[var(--xuli-text-primary)]">{doc.title}</h3>
                        <p className="text-xs text-[var(--xuli-text-tertiary)] font-mono mt-0.5">{doc.file}</p>
                      </div>
                    </div>

                    {doc.summary && (
                      <p className="text-[var(--xuli-text-secondary)] text-sm leading-relaxed mb-4">
                        {doc.summary}
                      </p>
                    )}

                    <div className="bg-[var(--color-bg-secondary)] rounded-lg p-4 border border-[var(--color-border)]/50 space-y-2 max-h-96 overflow-y-auto">
                      {renderMarkdownPreview(doc.content).map((line, index) => {
                        const isHeading = line.startsWith('#')
                        return (
                          <p
                            key={`${doc.file}-${index}`}
                            className={isHeading ? 'text-[var(--xuli-accent)] font-display text-sm mt-3 first:mt-0' : 'text-[var(--xuli-text-tertiary)] text-sm leading-relaxed'}
                          >
                            {line.replace(/^#{1,6}\s*/, '').replace(/^[-*]\s*/, '• ')}
                          </p>
                        )
                      })}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[var(--color-card)]/70 rounded-lg p-4 border border-[var(--xuli-accent)]/20">
            <p className="text-[var(--xuli-text-secondary)] text-sm text-center font-body leading-relaxed">
              此页面由 <code className="font-mono text-[var(--xuli-accent)]">src/lib/vibeJournalSync.ts</code> 消费上游 TIMELINE.md 与 deliverables/*.md 生成；页面组件只读取同步后的下游数据，重复执行不会重复计分。
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
