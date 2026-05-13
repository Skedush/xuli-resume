# PROJECT KNOWLEDGE BASE

**Generated:** 2025-05-12
**Project:** 徐力个人简历网站 (xuli-resume)

## OVERVIEW
React 18 + TypeScript 5 + Vite 5 简历网站，8页面展示技术能力、AI哲学、开发过程。

**访问**: <https://resume.zzzxc.com>

## STRUCTURE
```
src/
├── App.tsx          # 路由 + AnimatePresence
├── main.tsx         # 入口 (BrowserRouter)
├── pages/           # 8页面 (Home, About, Skills, Experience, Projects, Education, AIPhilosophy, DevelopmentLog)
├── components/      # 7共享组件 (Navbar, Footer, Logo, PageHeader, AnimatedItem, PageTransition, BackgroundEffects)
└── styles/index.css # 全局 + CSS变量 + 自定义utilities
Ai/                  # 13篇 AI 文章 MD 文件 (DevelopmentLog 页面内容)
public/favicon.svg   # 抽象简历+AI logo
```

## WHERE TO LOOK
| Task | Location |
|------|----------|
| 添加新页面 | `src/pages/` + `src/App.tsx` |
| 修改导航/页脚 | `src/components/Navbar.tsx`, `Footer.tsx` |
| 自定义CSS | `src/styles/index.css` |
| 页面头部统一 | `src/components/PageHeader.tsx` |

## CONVENTIONS
- **组件**: 大写驼峰 (`PageHeader.tsx`)
- **页面**: 大写驼峰 (`Home.tsx`)
- **样式**: Tailwind class，拼写错误会被忽略
- **动画**: Framer Motion + CSS GPU加速
- **无ESLint**: 项目无 lint 配置

## CONSTRAINTS
- TypeScript: `noUnusedLocals=true`, `noUnusedParameters=true`
- 无 ESLint / 无测试
- 代码中无 DO NOT/NEVER 注释

## COMMANDS
```bash
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run preview  # 预览构建
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
- **图标**: 抽象几何设计（简历+AI 结合），非真实照片

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
