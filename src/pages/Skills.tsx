import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'

interface Skill {
  name: string
  level: number
  url?: string
}

const skillCategories: { title: string; icon: string; skills: Skill[] }[] = [
  {
    title: '前端基础',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    skills: [
      { name: 'HTML5', level: 95, url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
      { name: 'CSS3', level: 95, url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
      { name: 'JavaScript', level: 92, url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { name: 'TypeScript', level: 90, url: 'https://www.typescriptlang.org' },
    ],
  },
  {
    title: '前端框架',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    skills: [
      { name: 'React', level: 92, url: 'https://react.dev' },
      { name: 'Vue', level: 70, url: 'https://vuejs.org' },
      { name: 'Taro', level: 88, url: 'https://taro.jd.com' },
      { name: 'UniApp', level: 60, url: 'https://uniapp.dcloud.net.cn' },
      { name: 'React Native', level: 75, url: 'https://reactnative.dev' },
    ],
  },
  {
    title: 'UI组件库',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    skills: [
      { name: 'Ant Design', level: 95, url: 'https://ant.design' },
      { name: 'ElementUI', level: 80, url: 'https://element.eleme.cn' },
      { name: 'ECharts', level: 92, url: 'https://echarts.apache.org' },
    ],
  },
  {
    title: '前端工程化',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    skills: [
      { name: 'Vite', level: 88, url: 'https://vitejs.dev' },
      { name: 'Webpack', level: 85, url: 'https://webpack.js.org' },
      { name: 'ESLint/Prettier', level: 90, url: 'https://eslint.org' },
      { name: 'GitLab CI/CD', level: 90 },
      { name: 'Husky', level: 90, url: 'https://typicode.github.io/husky' },
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
      { name: 'Node.js', level: 60, url: 'https://nodejs.org' },
      { name: 'Python', level: 75, url: 'https://www.python.org' },
      { name: 'Django', level: 60, url: 'https://www.djangoproject.com' },
      { name: 'Playwright', level: 60, url: 'https://playwright.dev' },
      { name: 'Nginx', level: 80, url: 'https://nginx.org' },
    ],
  },
]

const tools = ['Monorepo', 'MultiRepo', 'npm', 'pnpm', 'yarn', 'Vite', 'GitLab CI/CD', 'Stylelint', 'Husky', 'Selenium', '地图API', '腾讯实时音视频', '浙政钉', '浙里办']

export default function Skills() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <PageHeader title="技术" subtitle="掌握现代化前端技术体系，持续学习AI驱动开发" highlightWord="栈" />

          <div className="bg-card rounded-lg p-4 mb-8 border border-accent/30">
            <p className="text-accent text-sm text-center font-medium">
              评分基于个人主观评价。「知之越多，方知未知越多」——技术认知如圆，圆的面积越大，接触的未知边界也越长
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="bg-card rounded-lg p-4 border border-[var(--color-border)]/60"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
                    </svg>
                  </div>
                  <h2 className="font-display text-xl text-primary">{category.title}</h2>
                </div>

                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        {skill.url ? (
                          <a href={skill.url} target="_blank" rel="noopener noreferrer" className="text-secondary text-sm font-medium hover:text-accent hover:underline">
                            {skill.name}
                          </a>
                        ) : (
                          <span className="text-secondary text-sm font-medium">{skill.name}</span>
                        )}
                        <span className="text-tertiary text-sm font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-surface rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-card rounded-lg p-6 border border-[var(--color-border)]/60">
            <h2 className="font-display text-2xl text-primary mb-6 text-center">工具链</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {tools.map((tool) => (
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