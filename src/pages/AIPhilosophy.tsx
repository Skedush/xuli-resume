import PageTransition from '../components/PageTransition'

const BLOG_BASE_URL = 'https://blog.zzzxc.com/生存/Ai'

const aiThemes = [
  {
    id: 'recursive-cognition',
    title: '递归认知系统',
    subtitle: 'Recursive Cognitive Systems',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    color: 'from-neon-cyan to-blue-500',
    description: '大语言模型的演变逻辑是一个递归过程——通过递归AI训练实现自我改进。模型生成训练数据，数据训练更好的模型，形成正向循环。',
    keyPoints: [
      'LLM通过RLHF实现自我优化',
      '模型输出作为下一轮训练数据',
      '递归提升带来能力涌现',
    ],
    blogPath: '大语言模型的演变逻辑',
  },
  {
    id: 'agentic-workflow',
    title: 'Agent工作流编排',
    subtitle: 'Agentic Workflow Orchestration',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
    color: 'from-neon-purple to-pink-500',
    description: '从指令时代到Agent时代，大模型参与逻辑发生根本转变。Agent能够自主规划、调用工具、反思迭代，完成复杂任务。',
    keyPoints: [
      '从被动响应到主动规划',
      '多工具调用与工具链构建',
      '自我反思与错误纠正机制',
    ],
    blogPath: 'Agent工作过程中的大模型参与逻辑',
  },
  {
    id: 'token-optimization',
    title: 'Token优化与效率',
    subtitle: 'Token Optimization',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    color: 'from-green-500 to-teal-500',
    description: 'Token是AI时代的"石油"，其消费规范与节省策略至关重要。从模型厂商到中间层，Token优化贯穿始终。',
    keyPoints: [
      '上下文压缩与摘要技术',
      '思维链精简与快速思考模式',
      '中间层缓存与复用策略',
    ],
    blogPath: '大模型厂商如何节约token',
  },
  {
    id: 'mcp',
    title: 'MCP协议',
    subtitle: 'Model Context Protocol',
    icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    color: 'from-orange-500 to-red-500',
    description: 'MCP正在成为AI系统间的事实标准协议，定义模型上下文交换规范，实现AI生态系统的互联互通。',
    keyPoints: [
      '统一上下文交换格式',
      '跨平台工具调用标准',
      '生态系统互操作性',
    ],
    blogPath: 'Agent工作过程中的大模型参与逻辑',
  },
  {
    id: 'human-ai-symbiosis',
    title: '人机共生',
    subtitle: 'Human-AI Symbiosis',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    color: 'from-neon-pink to-purple-500',
    description: 'AI革命后人类的不可替代性：责任归属、主观价值、直觉判断。人类与AI不是竞争，而是协同进化。',
    keyPoints: [
      '人类 Accountability 不可替代',
      '主观价值判断与情感智能',
      '直觉与创造力的独特性',
    ],
    blogPath: '如果我们无法复制意识能否直接接入意识',
  },
  {
    id: 'future-software',
    title: '软件工程未来',
    subtitle: 'Future of Software Engineering',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    color: 'from-indigo-500 to-purple-500',
    description: 'AI正在深刻改变软件行业：Liquid Computing、World Models、Agentic Economy。开发者角色从"写代码"转向"编排AI"。',
    keyPoints: [
      'Liquid Computing 弹性计算',
      'World Models 世界模型',
      'Agentic Economy 智能体经济',
    ],
    blogPath: 'Ai对软件行业影响，未来部分走向',
  },
]

const futureVision = {
  title: '自驱动效率与准确率',
  quote: 'AI的自驱动能力正在超越被动响应，实现主动效率优化与准确率自我纠正。',
  perspective: '从语言瓶颈的突破到意识接入的探索，技术边界正在重新定义。',
  blogPath: 'Ai自驱动效率与准确率',
}

export default function AIPhilosophy() {
  return (
    <PageTransition>
      <div className="page-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              AI<span className="text-gradient">哲学</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              13篇文章的精华凝练 · 探索AI与人类协同的未来
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {aiThemes.map((theme, index) => (
              <a
                key={theme.id}
                href={`${BLOG_BASE_URL}/${encodeURIComponent(theme.blogPath)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative h-full bg-dark-card/50 rounded-2xl p-6 border border-neon-cyan/10 hover:border-neon-cyan/30 transition-all duration-300 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.color} opacity-0 hover:opacity-5 transition-opacity`} />

                <div className="relative">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${theme.color} flex items-center justify-center mb-4 hover:scale-110 transition-transform`}>
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={theme.icon} />
                    </svg>
                  </div>

                  <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">{theme.subtitle}</span>
                  <h3 className="font-display text-xl text-white mt-1 mb-3">{theme.title}</h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{theme.description}</p>

                  <div className="space-y-2">
                    {theme.keyPoints.map((point, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-neon-cyan mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-300 text-sm">{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className={`mt-4 inline-flex items-center gap-2 text-sm font-medium text-${theme.color.split(' ')[1]}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    阅读完整文章
                  </div>
                </div>

                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.color} transform scale-x-0 hover:scale-x-100 transition-transform origin-left`} />
              </a>
            ))}
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 via-neon-purple/10 to-neon-pink/10 rounded-3xl blur-xl" />
            <div className="relative bg-dark-card/80 rounded-3xl p-10 border border-neon-cyan/20">
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="font-display text-3xl text-white mb-6">{futureVision.title}</h3>

                <blockquote className="mb-8">
                  <p className="text-xl text-gray-300 italic leading-relaxed mb-4">
                    "{futureVision.quote}"
                  </p>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    {futureVision.perspective}
                  </p>
                </blockquote>

                <div className="flex flex-wrap justify-center gap-4">
                  {['语言瓶颈突破', '意识接入探索', '脑机接口', '赛博格意识'].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-dark-surface rounded-full text-gray-300 text-sm font-mono border border-white/5 hover:border-neon-cyan/30 hover:text-neon-cyan transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={`${BLOG_BASE_URL}/${encodeURIComponent(futureVision.blogPath)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 rounded-full text-neon-cyan hover:from-neon-cyan/30 hover:to-neon-purple/30 transition-all border border-neon-cyan/30"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  阅读完整思考
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '1s' }}>
            <p className="text-gray-500 text-sm font-mono">
              更多思考：<a href="https://blog.zzzxc.com/" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline">blog.zzzxc.com</a>
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}