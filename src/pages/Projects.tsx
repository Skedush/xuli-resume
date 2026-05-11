import PageTransition from '../components/PageTransition'

const projects = [
  {
    name: '低代码平台',
    period: '2023.11 - 2025.06',
    role: '前端负责人',
    description: '企业级低代码平台，支持可视化表单、流程引擎、数据大屏配置，显著提升开发效率。',
    tech: ['React', 'TypeScript', '拖拽引擎', 'ECharts', '权限系统'],
    highlights: ['可视化配置', '动态表单生成', '流程审批', '多端适配'],
    color: 'from-neon-cyan to-blue-500',
  },
  {
    name: '乐清警保系统',
    period: '2023.03 - 2023.09',
    role: '前端负责人',
    description: '警保联动数字化系统，实现保险理赔、案件管理、数据统计一体化。',
    tech: ['React', 'Taro', 'Ant Design', 'ECharts', '高德地图'],
    highlights: ['移动端适配', '实时数据同步', 'GPS定位', '报案流程优化'],
    color: 'from-neon-purple to-pink-500',
  },
  {
    name: '智慧高速',
    period: '2022.02 - 2022.06',
    role: '前端开发',
    description: '高速公路智慧管控平台，实时监控、数据分析、预警指挥一体化解决方案。',
    tech: ['Vue', 'ECharts', 'WebSocket', 'GIS地图', 'Video.js'],
    highlights: ['实时监控大屏', '数据可视化', '预警系统', '视频集成'],
    color: 'from-orange-500 to-red-500',
  },
  {
    name: '信息发布系统',
    period: '2021.09 - 2022.03',
    role: '前端开发',
    description: '多媒体信息发布平台，支持多终端内容管理、实时发布与统计分析。',
    tech: ['Vue', 'ElementUI', 'Video.js', 'JWT'],
    highlights: ['多屏管理', '内容审核', '定时发布', '数据统计'],
    color: 'from-green-500 to-teal-500',
  },
  {
    name: '数字化一张图',
    period: '2021.06 - 2021.08',
    role: '前端开发',
    description: '数字化地理信息一张图系统，整合多源数据实现可视化呈现。',
    tech: ['Vue', 'ECharts', 'GeoJSON', 'Mapbox'],
    highlights: ['地图可视化', '数据叠加', '空间分析', '专题图'],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    name: '博客系统',
    period: '2021.03 - 2021.05',
    role: '全栈开发',
    description: '个人技术博客系统，支持Markdown编辑、标签分类、评论互动。',
    tech: ['Vue', 'Node.js', 'MongoDB', 'JWT'],
    highlights: ['Markdown渲染', 'SEO优化', '评论系统', '主题切换'],
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: '前端持续化集成',
    period: '2020.07 - 2020.08',
    role: '架构设计',
    description: '前端CI/CD自动化流程设计，提升团队交付效率与代码质量。',
    tech: ['GitLab CI', 'Docker', 'ESLint', 'Husky', '自动化测试'],
    highlights: ['自动化构建', '代码检查', '自动部署', '质量门禁'],
    color: 'from-indigo-500 to-purple-500',
  },
]

export default function Projects() {
  return (
    <PageTransition>
      <div className="page-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              项目<span className="text-neon-cyan">展示</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              从企业级平台到个人项目，代码创造价值
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.name}
                className="group animate-fade-in"
                style={{ animationDelay: `${0.1 + index * 0.08}s` }}
              >
                <div className="relative bg-dark-card/50 rounded-2xl overflow-hidden border border-neon-cyan/10 hover:border-neon-cyan/30 transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-5 group-hover:opacity-10 transition-opacity`} />

                  <div className="relative p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-neon-cyan/10 text-neon-cyan text-xs font-mono rounded-full">
                        {project.period}
                      </span>
                      <span className="px-3 py-1 bg-dark-surface text-gray-400 text-xs font-mono rounded-full">
                        {project.role}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl text-white mb-3 group-hover:text-neon-cyan transition-colors">
                      {project.name}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-dark-surface text-gray-300 text-xs font-mono rounded border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-2 py-1 bg-dark-surface/50 text-gray-400 text-xs rounded"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}