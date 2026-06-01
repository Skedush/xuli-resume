# 项目进度与注意事项

> 给后续 session / 新对话快速恢复上下文。本文档只记项目级阶段、决策、注意事项与未来任务。
> 每次完成项目级任务后，请在本文件追加新阶段，不要覆盖历史。

## 时间线

| 阶段 | 时间 | 事件 | 关键产物 |
|------|------|------|----------|
| 1    | 2026-05-12 起 | xuli-resume 第一个版本上线（9 页面 + 简历内容） | React 18 + TS 5 + Vite 5 + Framer Motion + GitHub Actions 部署 |
| 2    | 2026-05 中 | 主题 / 布局 / Background Effects / 设计 token 重构 | `tokens.css` + `GenerativeDesignProvider` + `BackgroundEffects` |
| 3    | 2026-05 末 | 移动端导航 fixed 吸顶 + 实底菜单修复 | `Navbar.tsx` 修复回归 |
| 4    | 2026-06-01 | **vibe-coding-journal 下游消费侧接入** | `VibeJournal` 页 + 路由 + 同步 lib + 消费状态 + skills 增量 |

## 阶段 4 详情（vibe-coding-journal 下游消费侧）

### 目标
把 `vibe-coding-journal` 当成"已整理好的上游内容源"，在 xuli-resume 内做"下游消费器"：
- 新增页面展示上游 timeline + deliverables
- 增量更新技能面板
- 为未来"上游 + 下游"一体化 cron 预留清晰入口

### 严格边界
- **只做下游，不实现完整总流水线**
- **不修改** `/data/projects/repos/vibe-coding-journal/` 任何文件
- **不依赖** `SUMMARY_MANIFEST.md` 作为下游消费状态
- 同步逻辑**不在** 页面组件里，必须抽成可复用入口

### 实现内容

| 模块 | 文件 | 角色 |
|------|------|------|
| 同步 lib（核心） | `src/lib/vibeJournalSync.ts` | 服务端单文件库，导出 `runSync()` / `applySkillIncrements()` / `loadState()` 等 |
| CLI runner | `scripts/sync-vibe-journal.mjs` | `node --experimental-strip-types` 直接跑；带 `--dry-run` / `--json` / `--quiet` |
| 消费状态（机器用） | `src/data/vibe-journal-consumer-state.json` | 真状态：consumedDeliverables + 逐行 hash + skillsIncrementLog |
| 元数据（浏览器用） | `src/data/vibe-journal-meta.json` | 轻量摘要，**不要**当成下游状态 |
| 技能数据 | `src/data/skills.json` + `src/data/skills-types.ts` | Skills 页用；sync 写入（idempotent） |
| 页面 | `src/pages/VibeJournal.tsx` | 读取 sync 生成的 timelinePhases + deliverables 正文预览；不直接解析上游、不硬编码上游内容 |
| 路由 | `src/App.tsx` | `/vibe-journal` |
| 导航 | `src/components/Navbar.tsx` | 加了"Vibe 日志"入口（桌面端 + 移动端） |
| 项目说明 | `AGENTS.md` | 记录了下游消费侧、状态文件、幂等保证、skill 归一化等 |

### 关键技术栈
- 同步 lib 用 `node:fs` / `node:path`；通过 Node 24 `--experimental-strip-types` 直接跑 TS
- 技能识别用 `SKILL_ALIASES` 字典 + 最长优先 + 词边界匹配
- 增量检测用“meaningful line cursor + 行 hash 快照”：cursor 判断新增位置，能处理重复文本追加；hash 仅用于审计/状态可读性
- 95 上限靠 `clampLevel()` + `applySkillIncrements()` 组合保证；超 cap 时 `increments` 列表里不会写虚的 delta

### 关键转折点
- **不实现总 cron**：本次只完成"下游消费器"，上游生成 + 触发仍待未来统一入口
- **不把 manifest 当状态**：`SUMMARY_MANIFEST.md` 是上游清单，不能替代 `vibe-journal-consumer-state.json`
- **元数据 vs 状态分两层**：meta 给浏览器读、state 给 sync 读，避免浏览器把 fs-only 字段当数据读
- **技能增量 log 上限 500**：超出会自动裁剪，避免 `consumer-state.json` 无界增长

### 仓库表（xuli-resume 视角）

| 仓库 | 关系 |
|------|------|
| `xuli-resume` | 下游（本次工作所在） |
| `vibe-coding-journal` | 上游内容源（只读） |
| `codex-hermes` | workflow 治理参考（未来总入口可能挂在这里） |

### 命令
```bash
npm run dev                              # 启动开发服务器
npm run build                            # tsc + vite build（本次验证通过）
npm run sync:vibe-journal                # 实际写入（idempotent）
npm run sync:vibe-journal:dry            # 仅计算 diff，不写盘
```

## 注意事项

1. **`src/lib/vibeJournalSync.ts` 是 server-side only**（用 `fs`/`path`），**不要**在浏览器组件里 import。浏览器只读 `vibe-journal-meta.json`。
2. **`scripts/sync-vibe-journal.mjs` 用 Node 24 `--experimental-strip-types`** 跑 TS，**不要**装 tsx / ts-node。
3. **未来总 cron 接入方式**：直接 `node --experimental-strip-types --no-warnings scripts/sync-vibe-journal.mjs`，不要重新实现同步逻辑。
4. **新增 skill 的标准做法**：在 `src/data/skills.json` 加条目 + 在 `src/lib/vibeJournalSync.ts` 的 `SKILL_ALIASES` 加 alias + 可选 `SKILL_CATEGORY_HINT`。
5. **不修改 `vibe-coding-journal` 上游**——所有改动都在 xuli-resume 内。
6. **不依赖 `SUMMARY_MANIFEST.md`**——下游消费状态只看 `vibe-journal-consumer-state.json`。
7. **未来追加 deliverables/TIMELINE.md** 时，不需要改任何 xuli-resume 代码，重跑 `npm run sync:vibe-journal` 即可。

## 验证（本次）

- `npm run build`：通过（vite 5.4.21 / 410 modules / 366.70 kB JS）
- `npm run sync:vibe-journal` 第一次：增量 0（当前状态已消费上游内容）
- `npm run sync:vibe-journal` 第二次：增量 0（idempotent 验证通过）
- `npm run sync:vibe-journal:dry`：增量 0（dry-run 不写盘）
- `npm run preview -- --host 0.0.0.0` + `curl -I http://127.0.0.1:4173/vibe-journal`：HTTP 200

## 后续建议

1. 未来总 cron 可以直接以 `scripts/sync-vibe-journal.mjs` 作为下游入口；上游生成由独立的 cron 负责并写入 `vibe-coding-journal/deliverables/`。
2. 技能面板如需更精细的"按周/月聚合"，可以在 `vibe-journal-meta.json` 加一层 `recentIncrements` 聚合视图。
3. 监控建议：在 `consumer-state.json` 缺失或异常时，让 sync 自动重建一个空状态（已实现 `loadState()` 的容错），但生产里建议配合文件存在性告警。
