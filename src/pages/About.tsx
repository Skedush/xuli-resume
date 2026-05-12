import PageTransition from '../components/PageTransition'

const stats = [
  { value: '8+', label: '年开发经验' },
  { value: '20+', label: '完成项目' },
  { value: '4', label: '工作经历' },
  { value: '2', label: '开源贡献' },
]

const highlights: { icon: string; title: string; desc: string | React.ReactNode }[] = [
  { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title: '前端架构', desc: '擅长前端工程化、模块化设计与性能优化' },
  { icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: '多端开发', desc: 'Web、移动端、桌面端跨平台解决方案' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'AI集成', desc: 'LLM、RAG、Agent工作流深度应用' },
  { icon: 'M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z', title: '开源贡献', desc: (
    <>
      <a href="https://github.com/alibaba/x-render/commits?author=hsuliss" target="_blank" rel="noopener noreferrer" className="text-[#22D3EE] hover:underline">阿里 xrender</a>
      {'、'}
      <a href="https://github.com/jdf2e/nutui-react/commits?author=Skedush" target="_blank" rel="noopener noreferrer" className="text-[#22D3EE] hover:underline">京东 nutui-react-taro</a>
    </>
  ) },
]

export default function About() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0B0F14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#E2E8F0] mb-4">
              关于<span className="text-[#22D3EE]">我</span>
            </h1>
            <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
              热爱技术，追求卓越，在代码中寻找美感
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-[#1C2431] rounded-lg p-8 border border-white/5">
              <h2 className="font-display text-2xl text-[#E2E8F0] mb-6">基本信息</h2>
              <div className="space-y-4">
                <InfoRow label="姓名" value="徐力" />
                <InfoRow label="年龄" value="31岁" />
                <InfoRow label="性别" value="男" />
                <InfoRow label="电话" value="158****8755" />
                <InfoRow label="邮箱" value="L****@gmail.com" />
                <InfoRow label="职位" value="前端负责人 / 软件开发工程师" />
              </div>
            </div>

            <div className="bg-[#1C2431] rounded-lg p-8 border border-white/5">
              <h2 className="font-display text-2xl text-[#E2E8F0] mb-6">核心优势</h2>
              <div className="space-y-4">
                {highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#151A23] flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#22D3EE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[#E2E8F0] font-semibold mb-1">{item.title}</h3>
                      <p className="text-[#64748B] text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-[#1C2431] rounded-lg p-6 text-center border border-white/5"
              >
                <div className="font-display text-3xl font-bold text-[#22D3EE] mb-2">{stat.value}</div>
                <div className="text-[#64748B] text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[#64748B] text-sm w-16 flex-shrink-0">{label}</span>
      <span className="text-[#E2E8F0] font-medium">{value}</span>
    </div>
  )
}