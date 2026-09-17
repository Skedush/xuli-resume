import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'
import { capabilityHighlights, profile, profileLinks } from '../data/resume'

const stats = [
  { value: '8 年', label: '软件行业经验' },
  { value: '7 个', label: '代表项目' },
  { value: '5 段', label: '工作经历' },
  { value: '2 项', label: '开源贡献' },
]

export default function About() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <PageHeader title="关于" subtitle="以问题、方法、作品与验证呈现真实能力" highlightWord="我" />

          <section className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 mb-10">
            <div className="bg-[var(--xuli-bg-tertiary)] rounded-xl p-8 border border-[var(--color-border)]/60">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[var(--xuli-accent)]/30 mb-4">
                  <img src="/ai-photo.jpg" alt="徐力" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-[var(--xuli-text-primary)] font-display text-2xl mb-1">{profile.name}</h2>
                <p className="text-[var(--xuli-accent)] text-sm">{profile.title}</p>
              </div>

              <dl className="space-y-3 mb-8">
                <InfoRow label="所在地" value={profile.location} />
                <InfoRow label="电话" value={profile.phone} />
                <InfoRow label="邮箱" value={profile.email} />
                <InfoRow label="状态" value={profile.status} />
              </dl>

              <div className="pt-6 border-t border-[var(--xuli-border)]/70">
                <h3 className="text-[var(--xuli-text-primary)] font-semibold mb-3">求职方向</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.directions.map((direction) => (
                    <span key={direction} className="px-3 py-1.5 bg-[var(--xuli-bg-secondary)] text-[var(--xuli-text-secondary)] text-xs rounded">
                      {direction}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[var(--xuli-bg-tertiary)] rounded-xl p-8 border border-[var(--color-border)]/60">
              <span className="text-[var(--xuli-accent)] text-xs font-mono">MY POSITION</span>
              <h2 className="font-display text-2xl text-[var(--xuli-text-primary)] mt-2 mb-5">AI 时代，能力应由过程与作品共同证明</h2>
              <div className="space-y-4 text-[var(--xuli-text-secondary)] leading-relaxed">
                <p>
                  我希望通过自己提出的问题、发现和筛选工具的方法、组织 AI 完成任务的过程，以及可以检查的作品，呈现我能做什么。
                </p>
                <p>
                  我不把自己描述为精通所有工具的人。不同工具的掌握程度从了解用途、动手试用，到接入实际项目各不相同。真正重要的是遇到问题时能找到可选路径，并在接口、数据、状态与验证等关键环节承担结果责任。
                </p>
                <p>
                  从前端开发出发，我把实践扩展到 Agent 工作流、Python 数据处理、视觉推理、视频生产、后端服务和部署运维。工具会变化，但问题定义、工程判断与可靠交付需要持续积累。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                {profileLinks.slice(0, 3).map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-4 py-3 rounded-lg bg-[var(--xuli-bg-secondary)] border border-[var(--xuli-border)]/70 hover:border-[var(--xuli-accent)]/40 transition-colors"
                  >
                    <span className="block text-[var(--xuli-text-tertiary)] text-xs mb-1">{link.label}</span>
                    <span className="text-[var(--xuli-text-primary)] text-sm group-hover:text-[var(--xuli-accent)] transition-colors">{link.value} ↗</span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-[var(--xuli-text-primary)] mb-5">核心能力</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {capabilityHighlights.map((item, index) => (
                <article key={item.title} className="bg-[var(--xuli-bg-tertiary)] rounded-xl p-6 border border-[var(--color-border)]/60">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-[var(--xuli-accent)] text-sm">0{index + 1}</span>
                    <div>
                      <h3 className="text-[var(--xuli-text-primary)] font-semibold mb-2">{item.title}</h3>
                      <p className="text-[var(--xuli-text-tertiary)] text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[var(--xuli-bg-tertiary)] rounded-lg p-6 text-center border border-[var(--color-border)]/60">
                <div className="font-display text-2xl sm:text-3xl font-bold text-[var(--xuli-accent)] mb-2">{stat.value}</div>
                <div className="text-[var(--xuli-text-tertiary)] text-sm">{stat.label}</div>
              </div>
            ))}
          </section>

          <section className="bg-[var(--xuli-bg-tertiary)] rounded-xl p-6 border border-[var(--color-border)]/60">
            <h2 className="font-display text-xl text-[var(--xuli-text-primary)] mb-4">更多平台</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {profileLinks.slice(3).map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-[var(--xuli-text-secondary)] hover:text-[var(--xuli-accent)] text-sm transition-colors">
                  {link.label} · {link.value} ↗
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-[var(--xuli-text-tertiary)] text-sm">{label}</dt>
      <dd className="text-[var(--xuli-text-primary)] text-sm font-medium text-right">{value}</dd>
    </div>
  )
}
