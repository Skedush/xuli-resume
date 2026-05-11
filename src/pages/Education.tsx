import PageTransition from '../components/PageTransition'

const education = {
  school: '宁波财经学院',
  degree: '本科',
  major: '软件工程',
  period: '2014 - 2018',
  description: '系统学习软件工程理论，参与多个校园技术项目，奠定扎实的编程基础。',
}

const certificates = [
  { name: '软件设计师', issuer: '中华人民共和国人力资源和社会保障部', year: '2021' },
]

const openSourceContributions = [
  {
    project: '阿里 xrender',
    description: '参与阿里跨端渲染组件库开发，贡献React组件与Bug修复',
    link: 'https://github.com/alibaba/x-render/commits?author=hsuliss',
  },
  {
    project: '京东 nutui-react-taro',
    description: '参与京东多端组件库开发，为React+Taro生态贡献代码',
    link: 'https://github.com/jdf2e/nutui-react/commits?author=Skedush',
  },
]

export default function Education() {
  return (
    <PageTransition>
      <div className="page-container">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              教育<span className="text-neon-cyan">背景</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              扎实的基础，持续的学习
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-dark-card/50 rounded-2xl p-8 border border-neon-cyan/10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display text-2xl text-white">{education.school}</h2>
                  <p className="text-neon-cyan">{education.degree} · {education.major}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-neon-cyan/10 text-neon-cyan text-sm font-mono rounded-full">
                    {education.period}
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed">{education.description}</p>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5">
                <h3 className="text-white font-semibold mb-3">主修课程</h3>
                <div className="flex flex-wrap gap-2">
                  {['数据结构', '算法设计', '操作系统', '计算机网络', '数据库原理', '软件工程', '面向对象编程'].map((course) => (
                    <span key={course} className="px-3 py-1 bg-dark-surface text-gray-400 text-sm rounded-lg">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-dark-card/50 rounded-2xl p-6 border border-neon-purple/10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="font-display text-xl text-white mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  专业证书
                </h3>
                {certificates.map((cert, i) => (
                  <div key={i} className="bg-dark-surface/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{cert.name}</span>
                      <span className="text-gray-500 text-sm">{cert.year}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{cert.issuer}</p>
                  </div>
                ))}
              </div>

              <div className="bg-dark-card/50 rounded-2xl p-6 border border-neon-pink/10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h3 className="font-display text-xl text-white mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-neon-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  开源贡献
                </h3>
                {openSourceContributions.map((item, i) => (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-dark-surface/50 rounded-lg p-4 mb-3 last:mb-0 hover:bg-dark-surface transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium">{item.project}</span>
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}