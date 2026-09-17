import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'
import { engineeringPrinciples, supportingCapabilities } from '../data/resume'

const environments = [
  {
    title: '账号独立',
    description: '为 Agent 工作单独注册和管理 Google、GitHub 等线上账号，将工作身份、项目资源和日常个人账号分开。',
  },
  {
    title: 'Mac 用户隔离',
    description: '使用专门的 macOS 用户，从独立目录、配置与浏览器状态开始搭建 Agent 工作环境。',
  },
  {
    title: 'Ubuntu 专用主机',
    description: '将一台 PC 重装为 Ubuntu，承载 AI 工作区、服务、自动化和知识库，并通过 Tailscale 与 SSH 远程使用。',
  },
]

const skillEvolution = [
  {
    title: '从固定示例走向通用能力',
    description: 'Viselora Skill 从几种固定效果扩展为基于公开 npm 包的开发指引，先判断能力与接口，再选择实现。',
  },
  {
    title: '让入口跟随架构变化',
    description: '视频工作流随 Desktop、控制通道到 npm 工作区持续演化，当前任务只使用最新 Skill 与命令，避免旧规则漂移。',
  },
  {
    title: '从失败中修正规则',
    description: '把环境、时长对齐、固定页面引用与安装副本漂移等真实问题，逐步落实到输入、状态、校验和恢复流程中。',
  },
]

export default function DevelopmentLog() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <PageHeader title="Agent" subtitle="从独立环境、稳定接口到可验证交付的工程方法" highlightWord="工程" />

          <div className="bg-[var(--color-card)]/70 rounded-lg p-4 mb-12 border border-[var(--xuli-accent)]/20">
            <p className="text-[var(--xuli-text-secondary)] text-sm text-center font-body leading-relaxed">
              余于 AI 工程，仍在持续实践。以下不是固定教条，而是从真实任务、执行偏差与交付验收中逐步形成的方法。
            </p>
          </div>

          <section className="mb-16">
            <span className="text-[var(--xuli-accent)] text-xs font-mono">WORKING PRINCIPLES</span>
            <h2 className="font-display text-2xl sm:text-3xl text-[var(--xuli-text-primary)] mt-2 mb-6">我对 Agent 的工程要求</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {engineeringPrinciples.map((principle, index) => (
                <article
                  key={principle.title}
                  className={`bg-[var(--color-card)] rounded-xl p-6 border border-[var(--color-border)]/60 ${index === engineeringPrinciples.length - 1 ? 'md:col-span-2' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-[var(--xuli-accent)] text-sm">0{index + 1}</span>
                    <div>
                      <h3 className="font-display text-lg text-[var(--xuli-text-primary)] mb-2">{principle.title}</h3>
                      <p className="text-[var(--xuli-text-tertiary)] text-sm leading-relaxed">{principle.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <span className="text-[var(--xuli-accent)] text-xs font-mono">IDENTITY & ENVIRONMENT</span>
            <h2 className="font-display text-2xl sm:text-3xl text-[var(--xuli-text-primary)] mt-2 mb-6">为 Agent 建立清楚的工作边界</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {environments.map((environment, index) => (
                <article key={environment.title} className="relative bg-[var(--color-card)] rounded-xl p-6 border border-[var(--color-border)]/60">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-secondary)] text-[var(--xuli-accent)] font-mono flex items-center justify-center mb-5">
                    {index + 1}
                  </div>
                  <h3 className="font-display text-xl text-[var(--xuli-text-primary)] mb-3">{environment.title}</h3>
                  <p className="text-[var(--xuli-text-tertiary)] text-sm leading-relaxed">{environment.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 mb-16">
            <div className="bg-[var(--color-card)] rounded-xl p-6 sm:p-8 border border-[var(--color-border)]/60">
              <span className="text-[var(--xuli-accent)] text-xs font-mono">AGENT TOOLING</span>
              <h2 className="font-display text-2xl text-[var(--xuli-text-primary)] mt-2 mb-6">为 Agent 补充的辅助能力</h2>
              <div className="space-y-5">
                {supportingCapabilities.map((item) => (
                  <div key={item.name} className="pb-5 border-b border-[var(--color-border)]/60 last:border-0 last:pb-0">
                    <h3 className="text-[var(--xuli-text-primary)] font-semibold mb-1">{item.name}</h3>
                    <p className="text-[var(--xuli-text-tertiary)] text-sm leading-relaxed">{item.purpose}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--color-card)] rounded-xl p-6 sm:p-8 border border-[var(--color-border)]/60">
              <span className="text-[var(--xuli-accent)] text-xs font-mono">SKILL EVOLUTION</span>
              <h2 className="font-display text-2xl text-[var(--xuli-text-primary)] mt-2 mb-6">方法如何随实践演变</h2>
              <div className="space-y-6">
                {skillEvolution.map((item, index) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-[var(--xuli-accent)] font-mono text-sm">0{index + 1}</span>
                    <div>
                      <h3 className="text-[var(--xuli-text-primary)] font-semibold mb-2">{item.title}</h3>
                      <p className="text-[var(--xuli-text-tertiary)] text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[var(--color-card)] rounded-xl p-6 sm:p-10 border border-[var(--xuli-accent)]/20 text-center">
            <span className="text-[var(--xuli-accent)] text-xs font-mono">REMOTE AGENT WORKFLOW</span>
            <h2 className="font-display text-2xl text-[var(--xuli-text-primary)] mt-3 mb-4">Mac × Ubuntu × SSH / Git</h2>
            <p className="text-[var(--xuli-text-secondary)] leading-relaxed max-w-3xl mx-auto">
              在 Mac 进行项目开发、交互检查和媒体制作，在 Ubuntu 维护工作区、服务、自动化与知识库；通过 Tailscale、SSH 和 Git 协作。个人 helper 将任务模板、产物校验与协作说明暴露为 Agent 可调用入口。
            </p>
          </section>
        </div>
      </div>
    </PageTransition>
  )
}
