import PageTransition from '../components/PageTransition'

const experiences = [
  {
    company: '浙江芝立软件有限公司',
    position: '前端负责人',
    period: '2022.07 - 2025.08',
    type: '全职',
    description: '担任前端技术负责人，负责前端团队技术选型、架构设计与项目交付。主导低代码平台与警保系统等核心项目。',
    highlights: ['低代码平台前端架构设计', '团队技术管理与培养'],
  },
  {
    company: '上海盛璨软件科技有限公司',
    position: '前端软件开发工程师',
    period: '2021.08 - 2022.06',
    type: '全职',
    description: '参与智慧高速、信息发布系统等政企项目开发，负责前端架构设计与功能实现。',
    highlights: ['智慧高速前端开发', '信息发布系统架构', 'ECharts数据可视化'],
  },
  {
    company: '浙江立地信息科技有限公司',
    position: 'Web前端',
    period: '2019.03 - 2021.08',
    type: '全职',
    description: '从事Web应用开发，参与多个政企数字化转型项目，积累丰富的前端工程化经验。',
    highlights: ['政企数字化项目', '前端工程化实践', '持续集成搭建'],
  },
  {
    company: '杭州优户通科技有限公司',
    position: 'IT技术支持',
    period: '2018.08 - 2019.01',
    type: '全职',
    description: 'IT技术支持岗位，负责内部系统维护与技术支持，为后续技术工作打下基础。',
    highlights: ['系统维护', '技术支持', '问题解决'],
  },
]

export default function Experience() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0B0F14]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#E2E8F0] mb-4">
              工作<span className="text-[#22D3EE]">经历</span>
            </h1>
            <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
              8年深耕前端，从初入职场到技术负责人
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp) => (
              <div
                key={exp.company}
                className="relative pl-8 border-l border-white/10"
              >
                <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] bg-[#22D3EE] rounded-full" />

                <div className="bg-[#1C2431] rounded-lg p-6 border border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-0.5 bg-[#151A23] text-[#22D3EE] text-xs font-mono rounded">
                      {exp.type}
                    </span>
                    <span className="text-[#64748B] text-sm">{exp.period}</span>
                  </div>
                  <h3 className="font-display text-xl text-[#E2E8F0] mb-1">{exp.position}</h3>
                  <p className="text-[#94A3B8] text-sm mb-3">{exp.company}</p>
                  <p className="text-[#64748B] text-sm mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((h, i) => (
                      <span key={i} className="px-2 py-1 bg-[#151A23] text-[#94A3B8] text-xs rounded">
                        {h}
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