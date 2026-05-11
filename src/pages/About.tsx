import { useState } from 'react'
import PageTransition from '../components/PageTransition'

const stats = [
  { value: '8+', label: '年开发经验' },
  { value: '50+', label: '完成项目' },
  { value: '4', label: '工作经历' },
  { value: '2', label: '开源贡献' },
]

const highlights = [
  { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title: '前端架构', desc: '擅长前端工程化、模块化设计与性能优化' },
  { icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: '多端开发', desc: 'Web、移动端、桌面端跨平台解决方案' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'AI集成', desc: 'LLM、RAG、Agent工作流深度应用' },
  { icon: 'M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z', title: '开源贡献', desc: '阿里xrender、京东nutui-react-taro', link: 'https://github.com/alibaba/x-render/commits?author=hsuliss' },
]

export default function About() {
  return (
    <PageTransition>
      <div className="page-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              关于<span className="text-neon-cyan">我</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              热爱技术，追求卓越，在代码中寻找美感
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="relative animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="relative bg-dark-card rounded-2xl p-8 border border-neon-cyan/10">
                <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-neon-cyan" />
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-neon-purple" />

                <h2 className="font-display text-2xl text-white mb-6">基本信息</h2>
                <div className="space-y-4">
                  <InfoRow label="姓名" value="徐力" />
                  <InfoRow label="年龄" value="31岁" />
                  <InfoRow label="性别" value="男" />
                  <SensitiveRow label="电话" hidden="158****8755" actual="15857878755" />
                  <SensitiveRow label="邮箱" hidden="L****@gmail.com" actual="Letshowmecode@gmail.com" />
                  <InfoRow label="职位" value="前端负责人 / 软件开发工程师" />
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative bg-dark-card rounded-2xl p-8 border border-neon-purple/10">
                <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-neon-purple" />
                <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-neon-cyan" />

                <h2 className="font-display text-2xl text-white mb-6">核心优势</h2>
                <div className="space-y-4">
                  {highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 text-sm hover:text-neon-cyan transition-colors"
                          >
                            {item.desc} →
                          </a>
                        ) : (
                          <p className="text-gray-400 text-sm">{item.desc}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-dark-card/50 rounded-xl p-6 text-center border border-neon-cyan/10 hover:border-neon-cyan/30 transition-colors animate-fade-in"
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
                <div className="font-display text-3xl font-bold text-neon-cyan mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
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
      <span className="text-gray-500 text-sm w-16 flex-shrink-0">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  )
}

function SensitiveRow({ label, hidden, actual }: { label: string; hidden: string; actual: string }) {
  const [revealed, setRevealed] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(actual)
    setRevealed(true)
    setTimeout(() => setRevealed(false), 2000)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-500 text-sm w-16 flex-shrink-0">{label}</span>
      <span className="text-white font-medium">
        {revealed ? actual : hidden}
      </span>
      <button
        onClick={copyToClipboard}
        className="text-xs text-neon-cyan hover:text-neon-purple transition-colors px-2 py-1 rounded bg-dark-surface/50 hover:bg-dark-surface"
        title="点击复制"
      >
        {revealed ? '已复制' : '复制'}
      </button>
    </div>
  )
}
