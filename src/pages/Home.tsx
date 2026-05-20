import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { useGenerativeDesign } from '../components/GenerativeDesignProvider'

const floatingWords = ['React', 'TypeScript', 'Vite', 'AI', 'Node']

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
            transition={{ duration: 0.6, delay: 0 }}
            className="text-6xl text-[var(--xuli-accent)]/20 mb-4 home-hero-symbol"
          >
            ∞
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[var(--xuli-text-primary)]"
          >
            Senior Frontend Engineer
            <br />
            <span className="text-[var(--xuli-accent)]">AI-Driven Development</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-[var(--xuli-text-secondary)] font-body mb-10 max-w-xl home-hero-intro"
          >
            8年经验 · 专注现代化前端技术栈 · AI驱动开发实践
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 home-status-wrap"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--xuli-border)] bg-[var(--xuli-bg-secondary)] text-[var(--xuli-text-secondary)] text-sm font-mono">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-subtle-pulse" />
              待业中 · 寻找机会
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-16 home-actions"
          >
            <Link
              to="/about"
              className="btn btn-primary"
            >
              个人介绍
            </Link>
            <Link
              to="/experience"
              className="btn btn-outline"
            >
              工作经历
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-lg home-ai-card"
          >
            <Link to="/ai-philosophy" className="block bg-[var(--xuli-bg-tertiary)] border border-[var(--xuli-border)] rounded-xl p-6 text-left hover:border-[var(--xuli-accent)]/30 transition-colors">
              <h3 className="text-[var(--xuli-text-primary)] font-display text-base mb-3">AI 时代的软件开发</h3>
              <div className="text-[var(--xuli-text-secondary)] text-sm space-y-3 leading-relaxed">
                <p>
                  <span className="text-[var(--xuli-text-tertiary)]">近期变化：</span>认知能力自增强——AI 帮助开发 AI → 帮助优化 workflow → 帮助生成 agent。软件开发速度进入自增强循环。
                </p>
                <p>
                  <span className="text-[var(--xuli-text-tertiary)]">核心转变：</span>从"程序"到"认知系统"。function/class/API → memory/reasoning/planning/orchestration。软件开始拥有认知属性。
                </p>
                <p>
                  <span className="text-[var(--xuli-text-tertiary)]">长期思考：</span>AI 可以越来越擅长"如何做到"，但未必知道"为什么做"和"应该做到什么程度"。稀缺的不是实现能力，而是 <span className="text-[var(--xuli-accent)]">Goal Definition</span>（定义方向）和 <span className="text-[var(--xuli-accent)]">Governance</span>（治理复杂系统）。
                </p>
                <p className="text-[var(--xuli-text-tertiary)]">
                  永恒的：定义方向、治理复杂系统、协调现实世界——这些是人类不可替代的价值。
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="max-w-lg mt-8 home-log-card"
          >
            <Link to="/development-log" className="block bg-[var(--xuli-bg-tertiary)] border border-[var(--xuli-border)] rounded-xl p-6 text-left hover:border-[var(--xuli-accent)]/30 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-[var(--xuli-text-primary)] font-display text-base">关于这个网站</h3>
                <span className="px-2 py-0.5 bg-[var(--xuli-accent)]/10 text-[var(--xuli-accent)] text-xs font-mono rounded">
                  ~1小时完成
                </span>
              </div>
              <p className="text-[var(--xuli-text-secondary)] text-sm mb-4">
                <span className="text-[var(--xuli-accent)] font-semibold">01:09 开始对话</span> →
                <span className="text-[#4ADE80] font-semibold">02:15 已部署上线</span>
              </p>
              <p className="text-[var(--xuli-text-tertiary)] text-xs mb-4">
                OpenCode + Sisyphus 工作流 + Metis/Momus 审查 · 8个页面并行构建
              </p>
              <span className="inline-flex items-center gap-2 text-[var(--xuli-accent)] text-sm font-medium">
                查看完整开发过程
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4 text-sm font-mono mt-12 home-tag-cloud"
          >
            {floatingWords.map((word) => (
              <span
                key={word}
                className="text-[var(--xuli-text-tertiary)]"
              >
                {word}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
