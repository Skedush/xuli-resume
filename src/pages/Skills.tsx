import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'
import skillsData from '../data/skills.json'
import type { SkillsData, SkillCategory, SkillEntry } from '../data/skills-types'

const data = skillsData as SkillsData

/**
 * Per-card max content height (px). When a category has more entries than fit
 * comfortably, the inner list becomes scrollable so the outer grid row keeps
 * a uniform height. Value chosen so:
 *  - cards with up to ~9 short skills render without scroll
 *  - long categories (10+ skills) get a scroll affordance
 *  - all cards in the same row end up the same height
 *  - no card dominates the viewport (max ~320px total with header)
 */
const CARD_MAX_HEIGHT = 240

function SkillRow({ skill }: { skill: SkillEntry }) {
  return (
    <div key={skill.id}>
      <div className="flex justify-between mb-1">
        {skill.url ? (
          <a
            href={skill.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary text-sm font-medium hover:text-accent hover:underline"
          >
            {skill.name}
          </a>
        ) : (
          <span className="text-secondary text-sm font-medium">{skill.name}</span>
        )}
        <span className="text-tertiary text-sm font-mono">{skill.level.toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-surface rounded-full overflow-hidden">
        <div className="h-full bg-accent rounded-full" style={{ width: `${skill.level}%` }} />
      </div>
    </div>
  )
}

function CategoryCard({ category }: { category: SkillCategory }) {
  return (
    <div
      className="bg-card rounded-lg p-3 border border-[var(--color-border)]/60 flex flex-col h-full"
    >
      <div className="flex items-center gap-2 mb-3 flex-shrink-0">
        <div className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center">
          <svg
            className="w-5 h-5 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
          </svg>
        </div>
        <h2 className="font-display text-base text-primary">{category.title}</h2>
      </div>

      {/*
        flex-1 + min-h-0 lets the list scroll *inside* the card while the outer
        grid row stays aligned. The list itself caps at CARD_MAX_HEIGHT so
        no single card can make the row taller than its peers.
      */}
      <div
        className="space-y-2 flex-1 min-h-0 overflow-y-auto pr-1"
        style={{ maxHeight: `${CARD_MAX_HEIGHT}px` }}
      >
        {category.skills.map((skill) => (
          <SkillRow key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <PageHeader
            title="技术"
            subtitle="掌握现代化前端技术体系，持续学习AI驱动开发"
            highlightWord="栈"
          />

          <div className="bg-card rounded-lg p-3 mb-6 border border-accent/30">
            <p className="text-accent text-xs text-center font-medium leading-relaxed">
              评分基于个人主观评价。「知之越多，方知未知越多」——技术认知如圆，圆的面积越大，接触的未知边界也越长
            </p>
          </div>

          {/*
            `items-stretch` (default for grid) + each card being h-full keeps
            every card in a row the same height. Tall cards scroll internally
            rather than breaking the grid rhythm.
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
            {data.categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
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
