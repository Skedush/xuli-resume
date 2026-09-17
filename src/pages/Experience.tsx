import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'
import { workExperiences } from '../data/resume'

export default function Experience() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <PageHeader title="工作" subtitle="从技术支持、前端工程，到团队负责与远程协作" highlightWord="经历" />

          <div className="space-y-8">
            {workExperiences.map((exp) => (
              <div
                key={`${exp.company}-${exp.period}`}
                className="relative pl-8 border-l border-[var(--color-border)]/70"
              >
                <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] bg-[var(--xuli-accent)] rounded-full" />

                <div className="bg-[var(--xuli-bg-tertiary)] rounded-lg p-6 border border-[var(--color-border)]/60">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-0.5 bg-[var(--xuli-bg-secondary)] text-[var(--xuli-accent)] text-xs font-mono rounded">
                      {exp.type}
                    </span>
                    <span className="text-[var(--xuli-text-tertiary)] text-sm">{exp.period}</span>
                  </div>
                  <h3 className="font-display text-xl text-[var(--xuli-text-primary)] mb-1">{exp.position}</h3>
                  <p className="text-[var(--xuli-text-secondary)] text-sm mb-3">{exp.company}</p>
                  <p className="text-[var(--xuli-text-tertiary)] text-sm mb-4 leading-relaxed">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight) => (
                      <span key={highlight} className="px-2 py-1 bg-[var(--xuli-bg-secondary)] text-[var(--xuli-text-secondary)] text-xs rounded">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
