import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const skillCategories = [
  {
    title: '前端基础',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    skills: [
      { name: 'HTML5', level: 95, color: 'from-orange-500 to-orange-600' },
      { name: 'CSS3', level: 95, color: 'from-blue-500 to-blue-600' },
      { name: 'JavaScript', level: 92, color: 'from-yellow-500 to-yellow-600' },
      { name: 'TypeScript', level: 90, color: 'from-blue-600 to-blue-700' },
    ],
  },
  {
    title: '前端框架',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    skills: [
      { name: 'React', level: 92, color: 'from-cyan-500 to-cyan-600' },
      { name: 'Vue', level: 70, color: 'from-green-500 to-green-600' },
      { name: 'Taro', level: 88, color: 'from-pink-500 to-pink-600' },
      { name: 'UniApp', level: 60, color: 'from-purple-500 to-purple-600' },
      { name: 'React Native', level: 75, color: 'from-blue-500 to-blue-600' },
    ],
  },
  {
    title: 'UI组件库',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    skills: [
      { name: 'Ant Design', level: 95, color: 'from-blue-500 to-blue-600' },
      { name: 'ElementUI', level: 80, color: 'from-green-500 to-green-600' },
      { name: 'ECharts', level: 92, color: 'from-orange-500 to-orange-600' },
    ],
  },
  {
    title: '前端工程化',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    skills: [
      { name: 'Vite', level: 88, color: 'from-purple-500 to-purple-600' },
      { name: 'Webpack', level: 85, color: 'from-blue-500 to-blue-600' },
      { name: 'ESLint/Prettier', level: 90, color: 'from-green-500 to-green-600' },
      { name: 'GitLab CI/CD', level: 90, color: 'from-orange-500 to-orange-600' },
      { name: 'Husky', level: 90, color: 'from-pink-500 to-pink-600' },
    ],
  },
  {
    title: 'AI工具',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    skills: [
      { name: 'LLM / RAG', level: 60, color: 'from-neon-cyan to-neon-purple' },
      { name: 'Agent工作流', level: 70, color: 'from-neon-purple to-neon-pink' },
      { name: 'Trae / Cursor', level: 90, color: 'from-blue-500 to-purple-500' },
      { name: 'Claude Code', level: 70, color: 'from-orange-500 to-red-500' },
    ],
  },
  {
    title: '其他技术',
    icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
    skills: [
      { name: 'Node.js', level: 60, color: 'from-green-500 to-green-600' },
      { name: 'Python', level: 75, color: 'from-yellow-500 to-blue-500' },
      { name: 'Django', level: 60, color: 'from-green-600 to-green-700' },
      { name: 'Playwright', level: 60, color: 'from-purple-500 to-purple-600' },
      { name: 'Nginx', level: 80, color: 'from-green-500 to-green-600' },
    ],
  },
]

const tools = ['Monorepo', 'MultiRepo', 'npm', 'pnpm', 'yarn', 'Vite', 'GitLab CI/CD', 'Stylelint', 'Husky', 'Selenium', '地图API', '腾讯实时音视频', '浙政钉', '浙里办']

// CSS animation for skill bars
const skillBarStyle = `
  @keyframes skillBarFill {
    from { width: 0; }
    to { width: var(--skill-level); }
  }
  .skill-bar-fill {
    animation: skillBarFill 0.8s ease-out forwards;
    animation-delay: var(--skill-delay);
  }
`

export default function Skills() {
  return (
    <>
      <style>{skillBarStyle}</style>
      <PageTransition>
        <div className="page-container">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
                技术<span className="text-neon-purple">栈</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                掌握现代化前端技术体系，持续学习AI驱动开发
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4 }}
                  className="bg-dark-card/50 rounded-2xl p-6 border border-neon-cyan/10 hover:border-neon-cyan/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
                      </svg>
                    </div>
                    <h2 className="font-display text-xl text-white">{category.title}</h2>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-300 text-sm font-medium">{skill.name}</span>
                          <span className="text-gray-500 text-sm font-mono">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-dark-surface rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${skill.color} rounded-full skill-bar-fill`}
                            style={{
                              '--skill-level': `${skill.level}%`,
                              '--skill-delay': `${categoryIndex * 0.1 + skillIndex * 0.05}s`,
                            } as React.CSSProperties}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-16 bg-gradient-to-r from-neon-cyan/10 via-neon-purple/10 to-neon-pink/10 rounded-2xl p-8 border border-neon-cyan/20"
            >
              <h2 className="font-display text-2xl text-white mb-6 text-center">工具链全景</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 bg-dark-card rounded-lg border border-neon-cyan/20 text-gray-300 text-sm font-mono hover:border-neon-cyan/50 hover:text-neon-cyan transition-colors cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </>
  )
}
