import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'

const developmentStages = [
  {
    number: '01',
    title: '需求解析',
    description: '解析 PDF 简历文件，读取 Ai 文件夹内容，理解候选人背景与技能图谱',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    number: '02',
    title: '技术选型',
    description: 'React + TypeScript + Vite + Tailwind CSS 构建现代化前端应用',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  },
  {
    number: '03',
    title: 'AI 工具链',
    description: 'OpenCode 主环境 + oh-my-openagent 框架 + Sisyphus 任务执行 + Metis/Momus 审查',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    number: '04',
    title: 'Skill 使用',
    description: 'frontend-design、using-superpowers、brainstorming、test-driven-development、pdftk-server、find-skills 等',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  },
  {
    number: '05',
    title: '开发过程',
    description: 'visual-engineering agent 负责 UI 实现，Sisyphus 工作流编排任务，Metis/Momus 并行审查',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
  {
    number: '06',
    title: '问题解决',
    description: '导航栏修复、AI 链接修复、动画优化、样式微调，确保各页面视觉一致性',
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  },
]

const tools = [
  { name: 'OpenCode', category: '主环境' },
  { name: 'oh-my-openagent', category: 'Agent框架' },
  { name: 'Sisyphus', category: '任务执行' },
  { name: 'Metis', category: '审查' },
  { name: 'Momus', category: '审查' },
  { name: 'React', category: '框架' },
  { name: 'TypeScript', category: '语言' },
  { name: 'Vite', category: '构建' },
  { name: 'Tailwind CSS', category: '样式' },
  { name: 'Framer Motion', category: '动画' },
  { name: 'React Router', category: '路由' },
  { name: 'Docker', category: '容器' },
  { name: 'GitHub Actions', category: 'CI/CD' },
  { name: 'Nginx', category: '部署' },
]

const humanContributions = [
  {
    number: '01',
    title: '需求定义',
    description: '发起请求，明确表达需求（提取 PDF、AI 简历网站、多页面、AI 模块）',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  },
  {
    number: '02',
    title: '决策拍板',
    description: 'AI 提出多个方案时，做出最终选择（设计风格、技术栈）',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    number: '03',
    title: '代码审查',
    description: '审核 AI 生成的代码，确认是否符合预期',
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
  },
  {
    number: '04',
    title: '问题反馈',
    description: '发现问题后描述问题（导航错位、动画卡顿、链接错误）',
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  },
  {
    number: '05',
    title: '迭代优化',
    description: '对 AI 的输出提出修改意见，持续迭代直到满意',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  },
  {
    number: '06',
    title: '最终部署',
    description: '服务器配置、DNS 解析、Nginx 反向代理、SSL 证书',
    icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
  },
  {
    number: '07',
    title: '内容提供',
    description: '提供 PDF 简历、13 篇 AI 文章、GitHub 链接等素材',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
]

export default function DevelopmentLog() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0B0F14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <PageHeader title="AI 工程" subtitle="从需求解析到部署上线，完整记录 AI 驱动的简历网站开发流程" highlightWord="实录" />

          <div className="bg-[#1C2431]/70 rounded-lg p-4 mb-8 border border-[#22D3EE]/20">
            <p className="text-[#94A3B8] text-sm text-center font-body leading-relaxed">
              余于 AI 工程，实乃初探，皆在摸索之中。愿与同道者共研同进，或有所得，亦未可知。
            </p>
          </div>

          <div className="overflow-x-auto pb-4 mb-8">
            <div className="flex items-center justify-start gap-4 min-w-max px-4">
              {[
                { time: '01:09', event: '开始对话，用户请求提取 PDF 文字' },
                { time: '01:17', event: '初始化 Vite + React 项目' },
                { time: '01:38', event: '完成所有页面构建' },
                { time: '01:43', event: 'Skills 页面性能优化' },
                { time: '01:49', event: '全项目动画性能优化' },
                { time: '01:57', event: 'GitHub 仓库创建 xuli-resume' },
                { time: '02:15', event: 'Docker 配置与服务器部署' },
                { time: '02:35', event: '新增 DevelopmentLog 页面' },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center min-w-[140px]">
                  <div className="w-3 h-3 bg-[#22D3EE] rounded-full mb-3" />
                  <span className="text-[#22D3EE] text-xs font-mono mb-1">05.12 {item.time}</span>
                  <span className="text-[#64748B] text-xs text-center leading-tight">{item.event}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {developmentStages.map((stage) => (
                <div
                  key={stage.number}
                  className="bg-[#1C2431] rounded-lg p-6 border border-white/5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#151A23] flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#22D3EE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stage.icon} />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-xs text-[#64748B]">{stage.number}</span>
                        <h3 className="font-display text-lg text-[#E2E8F0]">{stage.title}</h3>
                      </div>
                      <p className="text-[#64748B] text-sm leading-relaxed">{stage.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#1C2431] rounded-lg p-8 border border-white/5 mb-8">
              <h2 className="font-display text-2xl text-[#E2E8F0] mb-6 text-center">工具清单</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="px-3 py-3 bg-[#151A23] rounded-lg border border-white/5 text-center"
                  >
                    <div className="text-sm font-mono text-[#22D3EE]">{tool.name}</div>
                    <div className="text-xs text-[#64748B] mt-1">{tool.category}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1C2431] rounded-lg p-8 border border-white/5">
              <h2 className="font-display text-2xl text-[#E2E8F0] mb-6 text-center">人类贡献</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {humanContributions.map((item) => (
                  <div
                    key={item.number}
                    className="bg-[#151A23] rounded-lg p-4 border border-white/5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1C2431] flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#22D3EE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-[#64748B]">{item.number}</span>
                          <h3 className="font-display text-base text-[#E2E8F0]">{item.title}</h3>
                        </div>
                        <p className="text-[#64748B] text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C2431] rounded-full border border-white/5">
                <span className="w-2 h-2 rounded-full bg-[#22D3EE]" />
                <span className="text-[#64748B] text-sm">
                  全程由 <span className="text-[#22D3EE]">AI Agents</span> 驱动开发
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}