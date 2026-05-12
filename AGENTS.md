# AGENTS.md

## 项目概述

徐力个人简历网站 - 展示技术能力、AI 哲学思考与开发过程

**访问地址**: <https://resume.zzzxc.com>

## Tech Stack

- **框架**: React 18 + TypeScript 5 + Vite 5
- **样式**: Tailwind CSS v3.4 (自定义 neon 配色 + design tokens)
- **路由**: React Router v6 (多页面 SPA)
- **动画**: CSS (GPU 加速) + Framer Motion v11 (页面过渡)
- **部署**: Docker + Nginx + GitHub Actions (SSH 部署到服务器)

## 关键配置

- **Path Alias**: `@/` 指向 `src/`，vite 和 tsconfig 均已配置
- **TypeScript**: strict 模式开启 (`noUnusedLocals`, `noUnusedParameters`)
- **构建**: `tsc -b && vite build` (类型检查在构建前)
- **字体**: Orbitron (display), Rajdhani (body), JetBrains Mono (mono)

## Build Commands

```bash
npm install          # 安装依赖
npm run dev         # 开发模式 http://localhost:5173
npm run build       # 生产构建（先运行 tsc -b 类型检查）
npm run preview     # 预览构建结果
```

## Entry Point

- `src/App.tsx` - 应用入口，路由配置
- `src/pages/` - 8 个页面组件
- `src/components/` - 共享组件 (Navbar, Footer, PageTransition, BackgroundEffects)
- `src/styles/index.css` - 全局样式与 CSS 变量

## 自定义 CSS Utilities

可用的工具类：`text-gradient`, `border-glow`, `bg-glass`, `noise-overlay`, `grid-background`, `glow-text`, `glow-box`

## 页面结构

| 页面             | 路由                 | 说明         |
| -------------- | ------------------ | ---------- |
| Home           | `/`                | 首页，AI 开发介绍 |
| About          | `/about`           | 基本信息，隐私保护  |
| Skills         | `/skills`          | 技术栈展示      |
| Experience     | `/experience`      | 工作经历       |
| Projects       | `/projects`        | 项目展示       |
| Education      | `/education`       | 教育背景与开源贡献  |
| AIPhilosophy   | `/ai-philosophy`   | AI 哲学思考    |
| DevelopmentLog | `/development-log` | AI 工程实录    |

**共 8 个页面**，所有路由在 `src/App.tsx` 的 `AnimatePresence` 包装内。

## 部署信息

- **服务器**: SSH 部署，端口 8888
- **Nginx**: 反向代理到容器
- **SSL**: 通配符证书 blog.zzzxc.com
- **CI/CD**: GitHub Actions SSH 部署

## AI 工作流

本项目通过 AI Agent 工作流辅助开发：

| 角色       | 工具/代理                         | 用途        |
| -------- | ----------------------------- | --------- |
| 主环境      | OpenCode                      | AI 代码开发环境 |
| Agent 框架 | oh-my-openagent               | 工作流编排     |
| 任务执行     | Sisyphus                      | 任务规划与追踪   |
| 代码审查     | Metis / Momus                 | 审查与优化     |
| 前端设计     | frontend-design skill         | UI 规范     |
| PDF 处理   | pdftk-server / pdf-extraction | 内容提取      |

## 内容来源

- 简历 PDF: `徐力-软件开发工程师.pdf`
- AI 文章: `Ai/` 文件夹 (13 篇 MD 文件)
- 开源贡献: GitHub (xrender, nutui)

## 开发过程时间线

- 2025.05.12 01:09 - 开始对话，提取 PDF
- 2025.05.12 01:17 - 初始化 Vite + React 项目
- 2025.05.12 01:38 - 完成所有页面构建
- 2025.05.12 01:43 - Skills 页面性能优化
- 2025.05.12 01:49 - 全项目动画优化
- 2025.05.12 01:57 - GitHub 仓库创建
- 2025.05.12 02:xx - Docker 配置与服务器部署
- 2025.05.12 xx:xx - 新增工程实录页面

