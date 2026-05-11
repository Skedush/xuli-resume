import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const developmentStages = [
  {
    number: '01',
    title: '需求解析',
    description: '解析 PDF 简历文件，读取 Ai 文件夹内容，理解候选人背景与技能图谱',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    gradient: 'from-neon-cyan/20 to-blue-500/20',
  },
  {
    number: '02',
    title: '技术选型',
    description: 'React + TypeScript + Vite + Tailwind CSS 构建现代化前端应用',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    gradient: 'from-blue-500/20 to-neon-purple/20',
  },
  {
    number: '03',
    title: 'AI 工具链',
    description: 'OpenCode 主环境 + oh-my-openagent 框架 + Sisyphus 任务执行 + Metis/Momus 审查',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    gradient: 'from-neon-purple/20 to-neon-pink/20',
  },
  {
    number: '04',
    title: 'Skill 使用',
    description: 'frontend-design、using-superpowers、brainstorming、test-driven-development、pdftk-server、find-skills 等',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    gradient: 'from-neon-pink/20 to-neon-cyan/20',
  },
  {
    number: '05',
    title: '开发过程',
    description: 'visual-engineering agent 负责 UI 实现，Sisyphus 工作流编排任务，Metis/Momus 并行审查',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    gradient: 'from-orange-500/20 to-neon-cyan/20',
  },
  {
    number: '06',
    title: '问题解决',
    description: '导航栏修复、AI 链接修复、动画优化、样式微调，确保各页面视觉一致性',
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    gradient: 'from-red-500/20 to-orange-500/20',
  },
]

const tools = [
  { name: 'OpenCode', category: '主环境', color: 'text-neon-cyan' },
  { name: 'oh-my-openagent', category: 'Agent框架', color: 'text-blue-400' },
  { name: 'Sisyphus', category: '任务执行', color: 'text-neon-purple' },
  { name: 'Metis', category: '审查', color: 'text-neon-pink' },
  { name: 'Momus', category: '审查', color: 'text-pink-400' },
  { name: 'React', category: '框架', color: 'text-cyan-400' },
  { name: 'TypeScript', category: '语言', color: 'text-blue-400' },
  { name: 'Vite', category: '构建', color: 'text-purple-400' },
  { name: 'Tailwind CSS', category: '样式', color: 'text-cyan-300' },
  { name: 'Framer Motion', category: '动画', color: 'text-pink-400' },
  { name: 'React Router', category: '路由', color: 'text-red-400' },
  { name: 'Docker', category: '容器', color: 'text-blue-500' },
  { name: 'GitHub Actions', category: 'CI/CD', color: 'text-green-400' },
  { name: 'Nginx', category: '部署', color: 'text-green-500' },
  { name: 'Letta Skills', category: 'AI Skills', color: 'text-purple-300' },
  { name: 'Claude Office Skills', category: 'AI Skills', color: 'text-orange-400' },
  { name: 'PageTransition', category: '组件', color: 'text-cyan-400' },
  { name: 'BackgroundEffects', category: '组件', color: 'text-neon-purple' },
]

export default function DevelopmentLog() {
  return (
    <>
      <style>{`
        @keyframes stageReveal {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .stage-card {
          animation: stageReveal 0.5s ease-out forwards;
          animation-delay: var(--stage-delay);
          opacity: 0;
        }
      `}</style>
      <PageTransition>
        <div className="page-container">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <div className="relative">
              <div className="flex items-center justify-between overflow-x-auto pb-4 scrollbar-hide">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent -translate-y-1/2" />
                {[
                  { time: '01:09', event: '开始对话，用户请求提取 PDF 文字' },
                  { time: '01:17', event: '初始化 Vite + React 项目' },
                  { time: '01:38', event: '完成所有页面构建' },
                  { time: '01:43', event: 'Skills 页面性能优化' },
                  { time: '01:49', event: '全项目动画性能优化' },
                  { time: '01:57', event: 'GitHub 仓库创建 xuli-resume' },
                  { time: '02:xx', event: 'Docker 配置与服务器部署' },
                  { time: 'xx:xx', event: '新增 DevelopmentLog 页面' },
                ].map((item, index) => (
                  <div key={index} className="relative flex flex-col items-center min-w-[140px] px-2">
                    <div className="w-3 h-3 rounded-full bg-dark-bg border-2 border-neon-cyan z-10 mb-3" />
                    <span className="text-neon-cyan text-xs font-mono mb-1">05.12 {item.time}</span>
                    <span className="text-gray-400 text-xs text-center leading-tight">{item.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
                AI 工程<span className="text-neon-cyan">实录</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                从需求解析到部署上线，完整记录 AI 驱动的简历网站开发流程
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {developmentStages.map((stage, index) => (
                <motion.div
                  key={stage.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-dark-card/50 rounded-2xl p-6 border border-neon-cyan/10 hover:border-neon-cyan/30 transition-colors group"
                  style={{ '--stage-delay': `${index * 0.1}s` } as React.CSSProperties}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stage.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                      <svg className="w-7 h-7 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stage.icon} />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-xs text-neon-cyan/60">{stage.number}</span>
                        <h3 className="font-display text-xl text-white">{stage.title}</h3>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{stage.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-neon-cyan/10 via-neon-purple/10 to-neon-pink/10 rounded-2xl p-8 border border-neon-cyan/20"
            >
              <h2 className="font-display text-2xl text-white mb-6 text-center">工具清单</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="px-3 py-3 bg-dark-card/80 rounded-xl border border-neon-cyan/20 hover:border-neon-cyan/50 transition-colors text-center"
                  >
                    <div className={`text-sm font-mono ${tool.color}`}>{tool.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{tool.category}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 text-center"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-dark-card/50 rounded-full border border-neon-purple/20">
                <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                <span className="text-gray-400 text-sm">
                  全程由 <span className="text-neon-cyan">AI Agents</span> 驱动开发
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </>
  )
}