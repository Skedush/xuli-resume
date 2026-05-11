import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const floatingWords = ['React', 'TypeScript', 'Vite', 'AI', 'Node']

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <BackgroundScene />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="inline-block px-4 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan text-sm font-mono tracking-wider">
              AVAILABLE_FOR_WORK
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <span className="text-white">你好，</span>
            <br />
            <span className="text-gradient">我是徐力</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-400 font-body mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
            8年经验的前端工程师 · 专注于现代化技术栈与AI驱动开发
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Link
              to="/about"
              className="group relative px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-purple text-white font-display font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">探索更多</span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              to="/experience"
              className="px-8 py-4 border border-white/20 text-white font-display font-semibold rounded-lg hover:bg-white/5 transition-all duration-300"
            >
              工作经历
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="bg-dark-card/50 rounded-xl p-6 border border-neon-cyan/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-display text-lg mb-2">关于这个网站</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    这是一个由 AI Agent 工作流辅助开发的个人简历网站。开发过程中使用了 OpenCode、oh-my-openagent 等 AI 工具，以及 Sisyphus、Metis、Momus 等 Agent 进行任务规划、代码审查与优化。
                  </p>
                  <Link
                    to="/development-log"
                    className="inline-flex items-center gap-2 text-neon-cyan text-sm font-medium hover:text-neon-purple transition-colors"
                  >
                    了解更多开发过程
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 text-sm font-mono animate-fade-in" style={{ animationDelay: '1s' }}>
            {floatingWords.map((word, i) => (
              <span
                key={word}
                className={`${['text-cyan-400', 'text-blue-400', 'text-purple-400', 'text-pink-400', 'text-green-400'][i]} opacity-60 hover:opacity-100 transition-opacity cursor-default`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-neon-cyan/30 rounded-full flex justify-center">
            <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full mt-2" />
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

function BackgroundScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-neon-purple rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-neon-pink rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-neon-cyan/10 rotate-hexagon animate-spin-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-neon-purple/10 rounded-full animate-spin-slow-reverse" />
    </div>
  )
}