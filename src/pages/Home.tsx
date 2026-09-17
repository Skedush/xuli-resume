import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { useGenerativeDesign } from '../components/GenerativeDesignProvider'
import { profile, projects } from '../data/resume'

const focusWords = ['Agent-first', 'TypeScript', 'Python', 'Full-stack', 'Delivery']

export default function Home() {
  const { layout } = useGenerativeDesign()
  const layoutClassName =
    layout === 'split'
      ? 'home-layout-split'
      : layout === 'magazine'
        ? 'home-layout-magazine'
        : 'home-layout-focus'
  const shellClassName =
    layout === 'focus'
      ? 'min-h-screen flex items-center justify-center px-4 py-20'
      : 'min-h-screen flex items-start justify-center px-4 pt-24 pb-20 sm:pt-28 sm:pb-24'

  return (
    <PageTransition>
      <div className={shellClassName}>
        <div className={`relative z-10 w-full mx-auto ${layoutClassName}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-6xl text-[var(--xuli-accent)]/20 mb-4 home-hero-symbol"
            aria-hidden="true"
          >
            ∞
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[var(--xuli-text-primary)]"
          >
            AI 应用构建者
            <br />
            <span className="text-[var(--xuli-accent)]">全栈工程师</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 home-hero-intro"
          >
            <p className="text-lg sm:text-xl text-[var(--xuli-text-secondary)] font-body max-w-3xl leading-relaxed">
              {profile.summary}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--xuli-border)] bg-[var(--xuli-bg-secondary)] text-[var(--xuli-text-secondary)] text-sm font-mono">
              <span className="w-2 h-2 rounded-full bg-[var(--color-green)] animate-subtle-pulse" />
              {profile.status}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-16 home-actions"
          >
            <Link to="/projects" className="btn btn-primary">
              查看代表项目
            </Link>
            <Link to="/about" className="btn btn-outline">
              了解我的方法
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-lg home-ai-card"
          >
            <Link
              to="/ai-philosophy"
              className="block bg-[var(--xuli-bg-tertiary)] border border-[var(--xuli-border)] rounded-xl p-6 text-left hover:border-[var(--xuli-accent)]/40 transition-colors"
            >
              <span className="text-[var(--xuli-accent)] text-xs font-mono">AI-NATIVE / AGENT-FIRST</span>
              <h2 className="text-[var(--xuli-text-primary)] font-display text-xl mt-2 mb-3">
                先定义问题，再组织 AI 完成交付
              </h2>
              <p className="text-[var(--xuli-text-secondary)] text-sm leading-relaxed">
                我关注的不只是工具熟练度，而是如何检索方案、明确边界、组织 Agent、检查状态，并对接口、数据、验证与最终结果负责。
              </p>
              <span className="mt-4 inline-flex text-[var(--xuli-accent)] text-sm">阅读我的 AI 思考 →</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-lg mt-8 home-log-card"
          >
            <Link
              to="/projects"
              className="block bg-[var(--xuli-bg-tertiary)] border border-[var(--xuli-border)] rounded-xl p-6 text-left hover:border-[var(--xuli-accent)]/40 transition-colors"
            >
              <span className="text-[var(--xuli-accent)] text-xs font-mono">SELECTED WORK</span>
              <h2 className="text-[var(--xuli-text-primary)] font-display text-xl mt-2 mb-4">从想法到可检查的作品</h2>
              <div className="space-y-3">
                {projects.slice(0, 3).map((project) => (
                  <div key={project.name} className="flex items-baseline justify-between gap-4">
                    <span className="text-[var(--xuli-text-secondary)] text-sm">{project.name}</span>
                    <span className="text-[var(--xuli-text-tertiary)] text-xs text-right">{project.subtitle}</span>
                  </div>
                ))}
              </div>
              <span className="mt-5 inline-flex text-[var(--xuli-accent)] text-sm">查看 7 个代表项目 →</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 text-sm font-mono mt-12 home-tag-cloud"
          >
            {focusWords.map((word) => (
              <span key={word} className="text-[var(--xuli-text-tertiary)]">
                {word}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
