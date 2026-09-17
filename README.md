# 徐力个人简历网站

[resume.zzzxc.com](https://resume.zzzxc.com) 是一个用 React 18、TypeScript 5 和 Vite 5 构建的九页面个人简历与工程实践站点。

## 当前视觉方向

网站采用稳定的“工程师工作手账”设计：灰绿绘图纸、石墨文字、工程蓝标注、印章红与荧光笔黄。CSS 手绘组件负责全站结构，首页、项目页和 Vibe 日志页的透明 WebP 插画分别表达工作流、项目蓝图与实践循环。

这是一套手绘风格的数字界面与项目专属插画组合，不再使用深色 neon、随机主题或“换一版”交互。

## 页面

- `/` 首页
- `/about` 关于
- `/skills` 技能
- `/experience` 工作经历
- `/projects` 项目
- `/education` 教育
- `/ai-philosophy` AI 哲学
- `/development-log` AI 工程实录
- `/vibe-journal` Vibe 日志

## 本地开发

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Vibe Journal 同步

```bash
npm run sync:vibe-journal
npm run sync:vibe-journal:dry
```

同步实现位于 `src/lib/vibeJournalSync.ts`，CLI 入口是 `scripts/sync-vibe-journal.mjs`。浏览器只读取同步生成的元数据与 HTML 快照，不直接访问上游仓库，也不在运行时解析 Markdown。

## 设计与内容入口

- 设计 token：`src/styles/tokens.css`
- 手绘组件与响应式样式：`src/styles/index.css`
- 插画资产：`public/illustrations/`
- 简历共享数据：`src/data/resume.ts`
- 当前工程约束：`AGENTS.md`
- 阶段记录：`PROGRESS.md`

## 部署

推送 `main` 后，GitHub Actions 通过 SSH 更新服务器代码，并执行 `docker compose -f docker-compose.prod.yml up -d --build --remove-orphans`。Nginx 容器对外提供单页应用，生产地址为 [resume.zzzxc.com](https://resume.zzzxc.com)。
