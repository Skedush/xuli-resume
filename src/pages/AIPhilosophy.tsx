import PageTransition from '../components/PageTransition'

const BLOG_BASE_URL = 'https://blog.zzzxc.com/生存/Ai'

const aiThemes = [
  {
    id: 'llm-evolution',
    title: 'LLM 演进逻辑',
    subtitle: 'LLM Evolutionary Logic',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    description: '大语言模型的演变遵循递归逻辑——RLHF、RLAIF、合成数据生成。模型参与自身训练，形成自增强循环。',
    keyPoints: [
      'RLHF / RLAIF 训练范式',
      '合成数据与知识蒸馏',
      'Self-Evolving 自演化',
    ],
    blogPath: '大语言模型的演变逻辑',
  },
  {
    id: 'agentic-ai',
    title: 'Agentic AI',
    subtitle: 'Agentic AI Systems',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
    description: '从被动响应到主动规划——Agent 能够自主决策、调用工具、反思迭代。Tool Use + Memory + Planning 构成核心能力。',
    keyPoints: [
      'ReAct / CoT 推理模式',
      'Tool Use & MCP 协议',
      'Self-Reflection 自我反思',
    ],
    blogPath: 'Agent工作过程中的大模型参与逻辑',
  },
  {
    id: 'rag-middleware',
    title: 'RAG 与中间层',
    subtitle: 'RAG & Middleware',
    icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    description: 'Retrieval Augmented Generation 与中间层架构。Token 优化、语义缓存、意图路由——构建高效 AI 系统的工程实践。',
    keyPoints: [
      '向量检索与上下文注入',
      'Token 压缩与成本优化',
      'Intent Routing 意图路由',
    ],
    blogPath: '中间层实现Token节省',
  },
  {
    id: 'world-models',
    title: '世界模型',
    subtitle: 'World Models',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935v5.478a6 6 0 0012 0V3M8 1l2.909 2.909a9.915 9.915 0 013.636 5.636A6 6 0 0112 18v-5M8 1v5',
    description: '从语言模型到世界模型——Yann LeCun 的 JEPA、具身智能、Neuro-Symbolic AI。多模态融合让 AI 理解物理因果。',
    keyPoints: [
      'JEPA / 联合嵌入预测架构',
      '具身智能 Embodied AI',
      '物理直觉与因果推理',
    ],
    blogPath: 'Ai是否能剥离语言瓶颈',
  },
  {
    id: 'alignment-governance',
    title: '对齐与治理',
    subtitle: 'Alignment & Governance',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944 11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    description: 'AI Alignment 与系统 Governance。目标定义、偏好学习、人类监督——确保 AI 行为符合预期的重要性。',
    keyPoints: [
      'Goal Specification 目标定义',
      'Preference Learning 偏好学习',
      'Human-in-the-Loop 人类监督',
    ],
    blogPath: 'Ai革命后人类不可替代性与稀缺性',
  },
  {
    id: 'cognitive-reliability',
    title: '认知可靠性',
    subtitle: 'Cognitive Reliability',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    description: 'Cognitive Reliability——Hallucination 抑制、Eval 驱动开发、Verification 体系。构建可信赖 AI 系统的工程实践。',
    keyPoints: [
      'Hallucination Detection 幻觉检测',
      'Eval-Driven Development',
      'Observability 可观测性',
    ],
    blogPath: 'Ai自驱动效率与准确率',
  },
  {
    id: 'ai-software-engineering',
    title: 'AI 软件工程',
    subtitle: 'AI Software Engineering',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    description: 'AI-Native Development、Workflow Orchestration、Multi-Agent Systems。开发者角色从"写代码"转变为"搭系统"。',
    keyPoints: [
      'Agentic Workflow 工作流编排',
      'Multi-Agent Coordination',
      'Self-Tuning Systems 自调优',
    ],
    blogPath: 'Ai对软件行业近期影响自我理解',
  },
  {
    id: 'long-term-ai',
    title: 'AI 长期影响',
    subtitle: 'Long-term AI Impact',
    icon: 'M12 8v4l3 3m6-3l-3 3m0-4l-3 3m6 0l-3-3',
    description: 'Goal Definition 与 Governance 将成为稀缺能力。复杂系统不会因 AI 变强而消失——人类仍是意义的定义者。',
    keyPoints: [
      'Complexity 复杂度不会消失',
      'Goal Definition 目标定义',
      'System Governance 系统治理',
    ],
    blogPath: 'Ai对软件行业长期影响的自我理解',
  },
  {
    id: 'consciousness-ai',
    title: '意识与 AI',
    subtitle: 'Consciousness & AI',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    description: 'AI 能否拥有意识？具身认知、哲学僵尸、中文房间——从技术到哲学的边界探索。',
    keyPoints: [
      'Embodied Cognition 具身认知',
      'Chinese Room / Philosophical Zombie',
      'Integrated Information Theory IIT',
    ],
    blogPath: '我们永远造不出理想中的-AI',
  },
]

const futureVision = {
  title: '自驱动效率与准确率',
  quote: 'AI 的自驱动能力正在超越被动响应，实现主动效率优化与准确率自我纠正。',
  perspective: '从语言瓶颈的突破到意识接入的探索，技术边界正在重新定义。',
  blogPath: 'Ai自驱动效率与准确率',
}

export default function AIPhilosophy() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0B0F14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#E2E8F0] mb-4">
              AI<span className="text-[#22D3EE]">哲学</span>
            </h1>
            <p className="text-[#94A3B8] text-lg max-w-3xl mx-auto">
              15篇文章的精华凝练 · 探索AI与人类协同的未来
            </p>
          </div>

          <div className="bg-[#1C2431] rounded-lg p-4 mb-12 border border-[#F59E0B]/30">
            <p className="text-[#F59E0B] text-sm text-center font-medium">
              ⚠️ 以下均为本人与 AI 对话后的思考总结，涉及前沿领域，尚无定论，请勿视为权威结论
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {aiThemes.map((theme) => (
              <a
                key={theme.id}
                href={`${BLOG_BASE_URL}/${encodeURIComponent(theme.blogPath)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full bg-[#1C2431] rounded-lg p-6 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-[#151A23] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#22D3EE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={theme.icon} />
                  </svg>
                </div>

                <span className="text-xs text-[#64748B] font-mono uppercase tracking-wider">{theme.subtitle}</span>
                <h3 className="font-display text-xl text-[#E2E8F0] mt-1 mb-3">{theme.title}</h3>

                <p className="text-[#64748B] text-sm leading-relaxed mb-4">{theme.description}</p>

                <div className="space-y-2">
                  {theme.keyPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-[#22D3EE] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#94A3B8] text-sm">{point}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-sm text-[#22D3EE]">
                  阅读完整文章 →
                </div>
              </a>
            ))}
          </div>

          <div className="bg-[#1C2431] rounded-lg p-10 border border-white/5">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="font-display text-3xl text-[#E2E8F0] mb-6">{futureVision.title}</h3>

              <blockquote className="mb-8">
                <p className="text-xl text-[#94A3B8] italic leading-relaxed mb-4">
                  "{futureVision.quote}"
                </p>
                <p className="text-lg text-[#64748B] leading-relaxed">
                  {futureVision.perspective}
                </p>
              </blockquote>

              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { tag: 'RLHF / RLAIF', path: '大语言模型的演变逻辑' },
                  { tag: 'World Models', path: 'Ai是否能剥离语言瓶颈' },
                  { tag: 'Agentic AI', path: 'Agent工作过程中的大模型参与逻辑' },
                  { tag: 'Alignment', path: 'Ai革命后人类不可替代性与稀缺性' },
                ].map((item) => (
                  <a
                    key={item.tag}
                    href={`${BLOG_BASE_URL}/${encodeURIComponent(item.path)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#151A23] text-[#94A3B8] text-sm font-mono rounded border border-white/5 hover:border-[#22D3EE]/30 hover:text-[#22D3EE] transition-colors"
                  >
                    {item.tag}
                  </a>
                ))}
              </div>

              <a
                href={`${BLOG_BASE_URL}/${encodeURIComponent(futureVision.blogPath)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#151A23] rounded text-[#22D3EE] hover:bg-[#1C2431] transition-colors border border-white/5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                阅读完整思考
              </a>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#64748B] text-sm">
              所有内容基于个人实践与独立思考，欢迎探讨交流
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}