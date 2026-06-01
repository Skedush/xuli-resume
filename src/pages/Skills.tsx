import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'
import skillsData from '../data/skills.json'
import type { SkillsData } from '../data/skills-types'

const data = skillsData as SkillsData

export default function Skills() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <PageHeader title="技术" subtitle="掌握现代化前端技术体系，持续学习AI驱动开发" highlightWord="栈" />

          <div className="bg-card rounded-lg p-4 mb-8 border border-accent/30">
            <p className="text-accent text-sm text-center font-medium">
              评分基于个人主观评价。「知之越多，方知未知越多」——技术认知如圆，圆的面积越大，接触的未知边界也越长
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.categories.map((category) => (
              <div
                key={category.id}
                className="bg-card rounded-lg p-4 border border-[var(--color-border)]/60"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
                    </svg>
                  </div>
                  <h2 className="font-display text-xl text-primary">{category.title}</h2>
                </div>

                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-1">
                        {skill.url ? (
                          <a href={skill.url} target="_blank" rel="noopener noreferrer" className="text-secondary text-sm font-medium hover:text-accent hover:underline">
                            {skill.name}
                          </a>
                        ) : (
                          <span className="text-secondary text-sm font-medium">{skill.name}</span>
                        )}
                        <span className="text-tertiary text-sm font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-surface rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-card rounded-lg p-6 border border-[var(--color-border)]/60">
            <h2 className="font-display text-2xl text-primary mb-6 text-center">工具链</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {data.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 bg-surface text-secondary text-sm font-mono rounded border border-[var(--color-border)]/60"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
