import PageTransition from '../components/PageTransition'

const skillCategories = [
  {
    title: '前端基础',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    skills: [
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 95 },
      { name: 'JavaScript', level: 92 },
      { name: 'TypeScript', level: 90 },
    ],
  },
  {
    title: '前端框架',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    skills: [
      { name: 'React', level: 92 },
      { name: 'Vue', level: 70 },
      { name: 'Taro', level: 88 },
      { name: 'UniApp', level: 60 },
      { name: 'React Native', level: 75 },
    ],
  },
  {
    title: 'UI组件库',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    skills: [
      { name: 'Ant Design', level: 95 },
      { name: 'ElementUI', level: 80 },
      { name: 'ECharts', level: 92 },
    ],
  },
  {
    title: '前端工程化',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    skills: [
      { name: 'Vite', level: 88 },
      { name: 'Webpack', level: 85 },
      { name: 'ESLint/Prettier', level: 90 },
      { name: 'GitLab CI/CD', level: 90 },
      { name: 'Husky', level: 90 },
    ],
  },
  {
    title: 'AI工具',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    skills: [
      { name: 'LLM / RAG', level: 60 },
      { name: 'Agent工作流', level: 70 },
      { name: 'Trae / Cursor', level: 90 },
      { name: 'Claude Code', level: 70 },
    ],
  },
  {
    title: '其他技术',
    icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
    skills: [
      { name: 'Node.js', level: 60 },
      { name: 'Python', level: 75 },
      { name: 'Django', level: 60 },
      { name: 'Playwright', level: 60 },
      { name: 'Nginx', level: 80 },
    ],
  },
]

const tools = ['Monorepo', 'MultiRepo', 'npm', 'pnpm', 'yarn', 'Vite', 'GitLab CI/CD', 'Stylelint', 'Husky', 'Selenium', '地图API', '腾讯实时音视频', '浙政钉', '浙里办']

export default function Skills() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0B0F14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#E2E8F0] mb-4">
              技术<span className="text-[#22D3EE]">栈</span>
            </h1>
            <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
              掌握现代化前端技术体系，持续学习AI驱动开发
            </p>
          </div>

          <div className="bg-[#1C2431] rounded-lg p-4 mb-12 border border-[#22D3EE]/30">
            <p className="text-[#22D3EE] text-sm text-center font-medium">
              评分基于个人主观评价。「知之越多，方知未知越多」——技术认知如圆，圆的面积越大，接触的未知边界也越长
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="bg-[#1C2431] rounded-lg p-6 border border-white/5"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-[#151A23] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#22D3EE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
                    </svg>
                  </div>
                  <h2 className="font-display text-xl text-[#E2E8F0]">{category.title}</h2>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-[#94A3B8] text-sm font-medium">{skill.name}</span>
                        <span className="text-[#64748B] text-sm font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-[#151A23] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#22D3EE] rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-[#1C2431] rounded-lg p-8 border border-white/5">
            <h2 className="font-display text-2xl text-[#E2E8F0] mb-6 text-center">工具链</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 bg-[#151A23] text-[#94A3B8] text-sm font-mono rounded border border-white/5"
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