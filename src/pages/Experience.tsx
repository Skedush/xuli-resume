import PageTransition from '../components/PageTransition'

const experiences = [
  {
    company: '浙江芝立软件有限公司',
    position: '前端负责人',
    period: '2022.07 - 2025.08',
    type: '全职',
    description: '担任前端技术负责人，负责前端团队技术选型、架构设计与项目交付。主导低代码平台与警保系统等核心项目。',
    highlights: ['低代码平台前端架构设计', '团队技术管理与培养', '项目交付与客户对接'],
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
      <div className="page-container">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              工作<span className="text-neon-pink">经历</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              8年深耕前端，从初入职场到技术负责人
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-pink transform md:-translate-x-1/2" />

            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className={`relative mb-12 md:mb-16 animate-fade-in ${
                  index % 2 === 0 ? 'md:pr-[52%] md:text-right' : 'md:pl-[52%] md:text-left'
                }`}
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className={`absolute top-0 w-4 h-4 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple ${
                  index % 2 === 0 ? 'md:left-auto md:right-0 md:-translate-x-1/2' : 'md:left-0 md:translate-x-1/2'
                }`} />
                <div className={`bg-dark-card/50 rounded-xl p-6 border border-neon-cyan/10 hover:border-neon-cyan/30 transition-colors ${
                  index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-neon-cyan/10 text-neon-cyan text-xs font-mono rounded">{exp.type}</span>
                    <span className="text-gray-500 text-sm">{exp.period}</span>
                  </div>
                  <h3 className="font-display text-xl text-white mb-1">{exp.position}</h3>
                  <p className="text-neon-purple text-sm mb-3">{exp.company}</p>
                  <p className="text-gray-400 text-sm mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((h, i) => (
                      <span key={i} className="px-2 py-1 bg-dark-surface text-gray-300 text-xs rounded">{h}</span>
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
