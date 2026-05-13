import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'

const projects = [
  {
    name: 'AI 个人简历网站',
    period: '2025.05',
    role: '全栈开发',
    description: '基于 AI Agent 工作流打造的个人简历网站，展示技术能力与 AI 哲学思考。',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Router', 'Docker', 'GitHub Actions', 'Nginx'],
    highlights: ['AI驱动开发流程', 'Agent工作流编排', '多页面SPA架构', 'CI/CD自动化部署'],
  },
  {
    name: '低代码平台',
    period: '2023.11 - 2025.06',
    role: '前端负责人',
    description: '开发一款 Web 端低代码平台，支持用户通过可视化配置快速构建后台数据管理系统。平台具备灵活的表单设计、数据关联、流程审批及任务分配等功能。',
    tech: ['React', 'x-render'],
    highlights: ['拖拽式表单组件设计', '多表数据关联配置', '自定义按钮配置', '流程审批', '任务指派', 'x-render bug修复'],
  },
  {
    name: '乐清警保系统',
    period: '2023.03 - 2023.09',
    role: '前端负责人',
    description: '警保联动数字化系统，实现警情上报与任务下发功能，涵盖手机钉钉 H5 端与后台 Web 端。',
    tech: ['React', 'Taro'],
    highlights: ['腾讯实时音视频RTC对接', '高德地图路径规划与行动轨迹展示', '任务派发'],
  },
  {
    name: '智慧高速',
    period: '2022.02 - 2022.06',
    role: '前端开发',
    description: '高速公路 LED 屏幕的后台管理系统，主要实现对设备的远程控制与节目内容的编辑管理。',
    tech: [],
    highlights: ['设备实时画面预览', '封装前端请求方法', '素材上传模块', '拖拽式编辑'],
  },
  {
    name: '信息发布系统',
    period: '2021.09 - 2022.03',
    role: '前端开发工程师',
    description: '北京地铁17号线 LED 显示屏控制后台系统，实现素材上传、节目编辑、审批、发布、排期计划及显示屏垫片展示等功能。',
    tech: [],
    highlights: ['素材上传', '节目编辑', '审批', '发布', '排期计划'],
  },
  {
    name: '数字化一张图',
    period: '2021.06 - 2021.08',
    role: 'Web前端开发',
    description: '数字化大屏展示系统，使用 EChart 插件进行数据图表展示，基于 AntV L7 的地图开发，给社区工作人员查看数据统计。',
    tech: [],
    highlights: ['ECharts数据图表', 'AntV L7地图开发', '接口联调'],
  },
  {
    name: '前端持续化集成',
    period: '2020.07 - 2020.08',
    role: '开发',
    description: '前端工程化持续集成工具的搭建，实现自动化部署流程。',
    tech: ['GitLab CI', 'Docker', 'ESLint', 'Husky'],
    highlights: ['自动化构建', '自动部署', '代码风格控制'],
  },
]

export default function Projects() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <PageHeader title="项目" subtitle="从企业级平台到个人项目，代码创造价值" highlightWord="展示" />

          <div className="bg-[var(--xuli-bg-tertiary)] rounded-lg p-4 mb-12 border border-[var(--xuli-accent)]/30">
            <p className="text-[var(--xuli-text-tertiary)] text-sm text-center">
              以下皆为业务之作，技止此耳，唯手熟尔，不足挂齿
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.name}
                className="bg-[var(--xuli-bg-tertiary)] rounded-lg overflow-hidden border border-subtle"
              >
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-[var(--xuli-bg-secondary)] text-[var(--xuli-accent)] text-xs font-mono rounded">
                      {project.period}
                    </span>
                    <span className="px-3 py-1 bg-[var(--xuli-bg-secondary)] text-[var(--xuli-text-tertiary)] text-xs font-mono rounded">
                      {project.role}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl text-[var(--xuli-text-primary)] mb-3">
                    {project.name}
                  </h3>

                  <p className="text-[var(--xuli-text-tertiary)] text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-[var(--xuli-bg-secondary)] text-[var(--xuli-text-secondary)] text-xs font-mono rounded border border-subtle"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-2 py-1 bg-[var(--xuli-bg-secondary)]/50 text-[var(--xuli-text-tertiary)] text-xs rounded"
                      >
                        {highlight}
                      </span>
                    ))}
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