import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const floatingWords = ['React', 'TypeScript', 'Vite', 'AI', 'Node']

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center ambient-bg">
        <SubtleBackground />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#E2E8F0]"
          >
            Senior Frontend Engineer
            <br />
            <span className="text-[#22D3EE]">AI-Driven Development</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#94A3B8] font-body mb-10 max-w-xl mx-auto"
          >
            8年经验 · 专注现代化前端技术栈 · AI驱动开发实践
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2A3441] bg-[#151A23] text-[#94A3B8] text-sm font-mono">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-subtle-pulse" />
              待业中 · 寻找机会
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
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
            className="max-w-lg mx-auto"
          >
            <Link to="/ai-philosophy" className="block bg-[#1C2431] border border-[#2A3441] rounded-xl p-6 text-left hover:border-[#22D3EE]/30 transition-colors">
              <h3 className="text-[#E2E8F0] font-display text-base mb-3">AI 时代的软件开发</h3>
              <div className="text-[#94A3B8] text-sm space-y-3 leading-relaxed">
                <p>
                  <span className="text-[#64748B]">近期变化：</span>认知能力自增强——AI 帮助开发 AI → 帮助优化 workflow → 帮助生成 agent。软件开发速度进入自增强循环。
                </p>
                <p>
                  <span className="text-[#64748B]">核心转变：</span>从"程序"到"认知系统"。function/class/API → memory/reasoning/planning/orchestration。软件开始拥有认知属性。
                </p>
                <p>
                  <span className="text-[#64748B]">长期思考：</span>AI 可以越来越擅长"如何做到"，但未必知道"为什么做"和"应该做到什么程度"。稀缺的不是实现能力，而是 <span className="text-[#22D3EE]">Goal Definition</span>（定义方向）和 <span className="text-[#22D3EE]">Governance</span>（治理复杂系统）。
                </p>
                <p className="text-[#64748B]">
                  永恒的：定义方向、治理复杂系统、协调现实世界——这些是人类不可替代的价值。
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="max-w-lg mx-auto mt-8"
          >
            <Link to="/development-log" className="block bg-[#1C2431] border border-[#2A3441] rounded-xl p-6 text-left hover:border-[#22D3EE]/30 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-[#E2E8F0] font-display text-base">关于这个网站</h3>
                <span className="px-2 py-0.5 bg-[#22D3EE]/10 text-[#22D3EE] text-xs font-mono rounded">
                  ~1小时完成
                </span>
              </div>
              <p className="text-[#94A3B8] text-sm mb-4">
                <span className="text-[#22D3EE] font-semibold">01:09 开始对话</span> →
                <span className="text-[#4ADE80] font-semibold">02:xx 已部署上线</span>
              </p>
              <p className="text-[#64748B] text-xs mb-4">
                OpenCode + Sisyphus 工作流 + Metis/Momus 审查 · 8个页面并行构建
              </p>
              <span className="inline-flex items-center gap-2 text-[#22D3EE] text-sm font-medium">
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
            className="flex flex-wrap justify-center gap-4 text-sm font-mono mt-12"
          >
            {floatingWords.map((word) => (
              <span
                key={word}
                className="text-[#64748B]"
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

function SubtleBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#22D3EE]/[0.02] rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#22D3EE]/[0.02] rounded-full blur-3xl" />
    </div>
  )
}
