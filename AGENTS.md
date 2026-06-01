# PROJECT KNOWLEDGE BASE

**Generated:** 2025-05-12
**Project:** 徐力个人简历网站 (xuli-resume)

## OVERVIEW
React 18 + TypeScript 5 + Vite 5 简历网站，9 页面展示技术能力、AI 哲学、开发过程、vibe coding 日志。

**访问**: <https://resume.zzzxc.com>

## STRUCTURE
```
src/
├── App.tsx          # 路由 + AnimatePresence
├── main.tsx         # 入口 (BrowserRouter)
├── pages/           # 9 页面 (Home, About, Skills, Experience, Projects, Education, AIPhilosophy, DevelopmentLog, VibeJournal)
├── components/      # 7 共享组件 (Navbar, Footer, Logo, PageHeader, AnimatedItem, PageTransition, BackgroundEffects)
├── lib/             # 工具库 (vibeJournalSync.ts — 下游同步层；scripts/sync-vibe-journal.mjs — CLI runner)
├── data/            # 数据文件
│   ├── skills.json                 # 技能面板数据（被 sync 增量更新）
│   ├── skills-types.ts             # 技能数据模型（共享给 browser + sync）
│   ├── vibe-journal-consumer-state.json  # 下游消费状态（sync 写入）
│   └── vibe-journal-meta.json      # 浏览器可读的 sync 元数据（lastRun, 文档列表, 最近增量）
└── styles/index.css # 全局 + CSS 变量 + 自定义 utilities
Ai/                  # 13 篇 AI 文章 MD 文件 (DevelopmentLog 页面内容)
public/favicon.svg   # 抽象简历 + AI logo
```

## WHERE TO LOOK
| Task | Location |
|------|----------|
| 添加新页面 | `src/pages/` + `src/App.tsx` |
| 修改导航/页脚 | `src/components/Navbar.tsx`, `Footer.tsx` |
| 自定义 CSS | `src/styles/index.css` |
| 页面头部统一 | `src/components/PageHeader.tsx` |
| 同步 vibe-coding-journal 上游 | `npm run sync:vibe-journal`（实现见 `src/lib/vibeJournalSync.ts`） |
| 修改技能面板 | `src/data/skills.json`（结构见 `src/data/skills-types.ts`） |

## CONVENTIONS
- **组件**: 大写驼峰 (`PageHeader.tsx`)
- **页面**: 大写驼峰 (`Home.tsx`)
- **样式**: Tailwind class，拼写错误会被忽略
- **动画**: Framer Motion + CSS GPU 加速
- **无 ESLint**: 项目无 lint 配置

## CONSTRAINTS
- TypeScript: `noUnusedLocals=true`, `noUnusedParameters=true`
- 无 ESLint / 无测试
- 代码中无 DO NOT/NEVER 注释
- `src/lib/vibeJournalSync.ts` 是 server-side only（用 `fs`），**不要**在浏览器组件里 import
- `scripts/sync-vibe-journal.mjs` 通过 Node 24 `--experimental-strip-types` 直接运行 TS，**不要**用 tsx/ts-node 之类的依赖

## 下游消费侧（vibe-coding-journal）

### 数据源（只读）
- 上游内容：`/data/projects/repos/vibe-coding-journal/`
  - `deliverables/*.md` — 已总结的 markdown 文档
  - `TIMELINE.md` — 时间线（追加式）
  - `AGENTS.md` / `SUMMARY_MANIFEST.md` — 上游约束

### 同步入口
```bash
npm run sync:vibe-journal        # 实际写入
npm run sync:vibe-journal:dry    # 仅计算 diff，不写盘
```

未来统一 cron 直接调用 `scripts/sync-vibe-journal.mjs` 即可（不要重新实现同步逻辑）。

### 状态文件
- `src/data/vibe-journal-consumer-state.json` — sync 写入
  - `consumedDeliverables: string[]` — 已消费的 deliverable 文件名
  - `deliverableLineHashes: Record<file, string[]>` — 每个文件的已消费行 hash 快照（审计/可读）
  - `deliverableLineCursors: Record<file, number>` — 每个文件已消费到的 meaningful line 位置（增量判定主依据，可处理重复行追加）
  - `timelineLineHashes: string[]` — TIMELINE.md 已消费行 hash 快照
  - `timelineLineCursor: number` — TIMELINE.md 已消费到的 meaningful line 位置
  - `skillsIncrementLog: SkillsIncrementEntry[]` — 每次增量审计日志（最近 500 条）
  - `lastRun: ISO string | null` — 最近一次有变化的时间
- `src/data/vibe-journal-meta.json` — sync 写入
  - 浏览器可读的轻量摘要：lastRun、新文档数、新行数、文档列表、近期增量
  - **不要**把它当成下游消费状态；真正的状态在 consumer-state.json
- `src/data/skills.json` — sync 写入
  - 每个被识别的 skill 按其 alias 归一化为 canonical id，命中后 +1，被 95 上限 clamp
  - 新技能按 `SKILL_CATEGORY_HINT` 落到对应 category，否则落到第一个 category

### 幂等保证
- **新 deliverable**（文件名首次出现）→ 全文逐行记录 hash，并把 cursor 推进到文件末尾
- **已有 deliverable**（文件存在但内容新增）→ 用 cursor 只消费上次位置之后的新行；即使新增行文本与旧行重复，也会被计入
- **TIMELINE.md** → 同上，使用 timelineLineCursor 判断新增位置
- 重复运行（无上游变化）→ `newDeliverables=0 newTimelineLines=0 increments=0`
- 单技能永远不超过 95；累计 delta 受 clamp 影响（被 cap 的部分不会虚增）

### skill 归一化
- 入口：`SKILL_ALIASES` 字典（`src/lib/vibeJournalSync.ts`）
- 匹配规则：最长优先 + 词边界（避免 "react" 误匹配 "react native"）
- 新增技能：只需在 `src/data/skills.json` 加一个条目；alias 表里加一个映射即可

## AGENT PITFALLS / CHANGE SAFETY
- **Navbar 必须保持 `fixed` 吸顶**：移动端和桌面端都依赖顶部固定定位；不要把 `Navbar` 改成 `relative` / `absolute`，否则滚动后会失去吸顶。
- **移动端汉堡菜单图标不要用未定义的 Tailwind 颜色类**：例如 `bg-primary` 在本项目里无效；请使用 `bg-text-primary`、`bg-[var(--...)]` 或 `tailwind.config.js` 中真实存在的颜色 token。
- **移动端菜单背景要用实底**：滚动状态下也要保持 `bg-surface` / 明确的 CSS var 背景和足够的 `z-index`，避免出现"能点但看起来透明"的问题。
- **改主题/布局时优先改 token，不要在页面里硬编码颜色**：全局主题由 `data-theme-variant` / `data-layout-variant` + `src/styles/tokens.css` / `src/styles/index.css` 驱动。
- **不要把 `src/lib/vibeJournalSync.ts` 引入浏览器**：它是 server-side only（用 fs/path）。浏览器侧用 `vibe-journal-meta.json` 拿同步元数据。
- **不要直接读 `SUMMARY_MANIFEST.md` 当作下游消费状态**：那是上游用的清单；下游必须自己维护 `vibe-journal-consumer-state.json`。
- **验证方式**：本项目没有 lint/test，改动后至少跑 `npm run build` 确认能过；改动同步逻辑后必须跑 `npm run sync:vibe-journal` 至少两次验证幂等。

## COMMANDS
```bash
npm run dev                       # http://localhost:5173
npm run build                     # tsc -b && vite build
npm run preview                   # 预览构建
npm run sync:vibe-journal         # 增量同步 vibe-coding-journal
npm run sync:vibe-journal:dry     # 仅计算 diff，不写盘
```

## DEPLOY
- CI/CD: GitHub Actions → SSH → server → `docker compose up --build`
- 构建在服务器执行，不在 CI
- 环境: Docker + Nginx (端口 8888)

## 用户偏好 (徐力)

### 设计风格
- **主题**: 深色 neon 风格，科技感 + AI 感
- **配色**: 暗色背景 + 青色(#22D3EE)强调色
- **字体**: Orbitron (标题), Rajdhani (正文), JetBrains Mono (代码)
- **图标**: 抽象几何设计（简历 + AI 结合），非真实照片

### 页面布局偏好
- 状态 badge（如"待业中"）放在副标题行
- 页面顶部需要有足够留白，内容不要被 navbar 遮挡
- "探索更多"按钮文字根据页面调整（如"个人介绍"）
- 需要在特定页面添加文言文风格的 disclaimer

### 代码偏好
- 提取共享组件，避免重复代码（Logo, PageHeader, AnimatedItem）
- 使用 Tailwind class，简洁为主
- 动画使用 Framer Motion + CSS GPU 加速

### 内容偏好
- AI 工程实录页面展示 AI 工作方法和流程
- 开源贡献需要两个项目都做成可点击链接
- 技能面板允许被 sync 自动增量更新；新技能按 alias 归一化，重复计分会去重
