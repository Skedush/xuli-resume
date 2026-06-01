/**
 * VibeJournal Downstream Sync Library
 *
 * Server-side only reusable downstream sync layer for consuming
 * /data/projects/repos/vibe-coding-journal into xuli-resume.
 */

import fs from 'fs'
import path from 'path'

export const UPSTREAM_VC_JOURNAL = '/data/projects/repos/vibe-coding-journal'
export const DELIVERABLES_DIR = path.join(UPSTREAM_VC_JOURNAL, 'deliverables')
export const TIMELINE_FILE = path.join(UPSTREAM_VC_JOURNAL, 'TIMELINE.md')

const PROJECT_ROOT = process.cwd()
const STATE_FILE = path.join(PROJECT_ROOT, 'src/data/vibe-journal-consumer-state.json')
const SKILLS_FILE = path.join(PROJECT_ROOT, 'src/data/skills.json')
export const META_FILE = path.join(PROJECT_ROOT, 'src/data/vibe-journal-meta.json')
export const MAX_SKILL_LEVEL = 95

export interface ConsumerState {
  consumedDeliverables: string[]
  deliverableLineHashes: Record<string, string[]>
  /** Reliable append cursor per deliverable: counts meaningful lines already consumed, preserving duplicate appended lines. */
  deliverableLineCursors: Record<string, number>
  timelineLineHashes: string[]
  /** Reliable append cursor for TIMELINE.md: counts meaningful lines already consumed, preserving duplicate appended lines. */
  timelineLineCursor: number
  timelineLastConsumedHash: string
  skillsIncrementLog: SkillsIncrementEntry[]
  lastRun: string | null
}

export interface SkillsIncrementEntry {
  timestamp: string
  source: string
  skillId: string
  skillName: string
  delta: number
  newLevel: number
}

export interface SkillOccurrence {
  skill: string
  skillId: string | null
  count: number
  source: string
}

export interface SyncResult {
  newDeliverables: string[]
  newTimelineLines: number
  skills: SkillOccurrence[]
  increments: SkillsIncrementEntry[]
  state: ConsumerState
  skillsData?: unknown
}

export interface DeliverableMeta {
  file: string
  title: string
  summary: string
  content: string
  tags: string[]
  firstConsumed: string | null
}

export interface TimelinePhaseMeta {
  phase: string
  time: string
  event: string
  repos: string
  tech: string
}

export interface VibeJournalMeta {
  lastRun: string | null
  lastRunNewDeliverables: string[]
  lastRunNewTimelineLines: number
  timelinePhases: TimelinePhaseMeta[]
  consumedDeliverables: DeliverableMeta[]
  recentIncrements: SkillsIncrementEntry[]
}

export const SKILL_ALIASES: Record<string, string> = {
  'typescript': 'typescript',
  'javascript': 'javascript',
  'python': 'python',
  'node.js': 'nodejs',
  'node': 'nodejs',
  'nodejs': 'nodejs',
  'react native': 'react-native',
  'react-native': 'react-native',
  'react.js': 'react',
  'react': 'react',
  'vue 3': 'vue',
  'vue3': 'vue',
  'vue': 'vue',
  'taro': 'taro',
  'uniapp': 'uniapp',
  'ant design pro': 'ant-design-pro',
  'ant design': 'ant-design',
  'ant-design': 'ant-design',
  'antd': 'ant-design',
  'element plus': 'element-ui',
  'element ui': 'element-ui',
  'elementui': 'element-ui',
  'echarts': 'echarts',
  'vite': 'vite',
  'webpack': 'webpack',
  'eslint/prettier': 'eslint-prettier',
  'eslint': 'eslint-prettier',
  'prettier': 'eslint-prettier',
  'stylelint': 'eslint-prettier',
  'husky': 'husky',
  'gitlab ci/cd': 'gitlab-ci',
  'gitlab ci': 'gitlab-ci',
  'claude code': 'claude-code',
  'openai codex': 'openai-codex',
  'codex': 'openai-codex',
  'opencode': 'opencode',
  'hermes agent': 'hermes-agent',
  'hermes': 'hermes-agent',
  'agent工作流': 'agent-workflow',
  'agent': 'agent-workflow',
  'llm / rag': 'llm-rag',
  'llm/rag': 'llm-rag',
  'llm': 'llm-rag',
  'rag': 'llm-rag',
  'mcp': 'mcp',
  'trae / cursor': 'trae-cursor',
  'trae': 'trae-cursor',
  'cursor': 'trae-cursor',
  'django': 'django',
  'fastapi': 'fastapi',
  'pydantic': 'pydantic',
  'sqlalchemy': 'sqlalchemy',
  'jwt': 'jwt',
  'sqladmin': 'sqladmin',
  'playwright': 'playwright',
  'nginx': 'nginx',
  'docker': 'docker',
  'github actions workflow': 'github-actions',
  'github actions': 'github-actions',
  'ollama': 'ollama',
  'litellm': 'litellm',
  'open webui': 'open-webui',
  'open-webui': 'open-webui',
  'qdrant': 'qdrant',
  'pgvector': 'pgvector',
  'chromadb': 'chromadb',
  'minimax': 'minimax',
  'openai': 'minimax',
  'tailscale vpn': 'tailscale',
  'tailscale': 'tailscale',
  'vpn': 'vpn',
  'vps': 'vps',
  'ssh': 'ssh',
  'mihomo': 'mihomo',
  'clash': 'mihomo',
  'sing-box': 'mihomo',
  'singbox': 'mihomo',
}

export const SKILL_CATEGORY_HINT: Record<string, string> = {
  typescript: 'frontend-basics', javascript: 'frontend-basics', react: 'frontend-frameworks',
  'react-native': 'frontend-frameworks', vue: 'frontend-frameworks', taro: 'frontend-frameworks', uniapp: 'frontend-frameworks',
  'ant-design': 'ui-libraries', 'ant-design-pro': 'ui-libraries', 'element-ui': 'ui-libraries', echarts: 'ui-libraries',
  vite: 'frontend-tooling', webpack: 'frontend-tooling', 'eslint-prettier': 'frontend-tooling', husky: 'frontend-tooling', 'gitlab-ci': 'frontend-tooling',
  'claude-code': 'ai-tools', 'openai-codex': 'ai-tools', opencode: 'ai-tools', 'hermes-agent': 'ai-tools', 'agent-workflow': 'ai-tools', 'llm-rag': 'ai-tools', 'trae-cursor': 'ai-tools',
  mcp: 'ai-infra', nodejs: 'backend', python: 'backend', django: 'backend', fastapi: 'backend', pydantic: 'backend', sqlalchemy: 'backend', jwt: 'backend', sqladmin: 'backend', playwright: 'backend', nginx: 'backend',
  ollama: 'ai-infra', litellm: 'ai-infra', 'open-webui': 'ai-infra', qdrant: 'ai-infra', pgvector: 'ai-infra', chromadb: 'ai-infra', minimax: 'ai-infra', tailscale: 'ai-infra', vpn: 'ai-infra', vps: 'ai-infra', ssh: 'ai-infra', mihomo: 'ai-infra', docker: 'ai-infra', 'github-actions': 'ai-infra',
}

const ALIAS_KEYS_SORTED = Object.keys(SKILL_ALIASES).sort((a, b) => b.length - a.length)

export function emptyState(): ConsumerState {
  return {
    consumedDeliverables: [],
    deliverableLineHashes: {},
    deliverableLineCursors: {},
    timelineLineHashes: [],
    timelineLineCursor: 0,
    timelineLastConsumedHash: '',
    skillsIncrementLog: [],
    lastRun: null,
  }
}

export function loadState(): ConsumerState {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const raw = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'))
      const deliverableLineHashes = raw.deliverableLineHashes && typeof raw.deliverableLineHashes === 'object' ? raw.deliverableLineHashes : {}
      return {
        consumedDeliverables: Array.isArray(raw.consumedDeliverables) ? raw.consumedDeliverables : [],
        deliverableLineHashes,
        deliverableLineCursors: raw.deliverableLineCursors && typeof raw.deliverableLineCursors === 'object'
          ? raw.deliverableLineCursors
          : Object.fromEntries(Object.entries(deliverableLineHashes).map(([file, hashes]) => [file, Array.isArray(hashes) ? hashes.length : 0])),
        timelineLineHashes: Array.isArray(raw.timelineLineHashes) ? raw.timelineLineHashes : [],
        timelineLineCursor: Number.isFinite(raw.timelineLineCursor) ? raw.timelineLineCursor : (Array.isArray(raw.timelineLineHashes) ? raw.timelineLineHashes.length : 0),
        timelineLastConsumedHash: raw.timelineLastConsumedHash || '',
        skillsIncrementLog: Array.isArray(raw.skillsIncrementLog) ? raw.skillsIncrementLog : [],
        lastRun: raw.lastRun || null,
      }
    }
  } catch {
    // fall through to default
  }
  return emptyState()
}

export function saveState(state: ConsumerState): void {
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true })
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8')
}

export function lineHash(line: string): string {
  let h = 5381
  for (let i = 0; i < line.length; i++) h = ((h << 5) + h + line.charCodeAt(i)) | 0
  return (h >>> 0).toString(16).padStart(8, '0')
}

export function simpleHash(content: string): string {
  let h = 0
  for (let i = 0; i < content.length; i++) { h = ((h << 5) - h) + content.charCodeAt(i); h |= 0 }
  return h.toString(16)
}

export function listDeliverables(): string[] {
  if (!fs.existsSync(DELIVERABLES_DIR)) return []
  return fs.readdirSync(DELIVERABLES_DIR).filter((f) => f.endsWith('.md')).sort()
}

export function readDeliverable(name: string): string {
  return fs.readFileSync(path.join(DELIVERABLES_DIR, name), 'utf-8')
}

export function splitMeaningfulLines(text: string): { line: string; hash: string }[] {
  return text.split('\n').map((l) => l.trim()).filter((l) => l.length > 0).map((l) => ({ line: l, hash: lineHash(l) }))
}

export function extractSkillIdsFromLine(line: string): string[] {
  const found: string[] = []
  const lower = line.toLowerCase()
  for (const alias of ALIAS_KEYS_SORTED) {
    const needle = alias.toLowerCase()
    let from = 0
    while (true) {
      const idx = lower.indexOf(needle, from)
      if (idx === -1) break
      const before = idx === 0 ? ' ' : lower[idx - 1]
      const after = idx + needle.length >= lower.length ? ' ' : lower[idx + needle.length]
      const isWordChar = (c: string) => /[a-z0-9]/.test(c)
      if (!isWordChar(before) && !isWordChar(after)) found.push(SKILL_ALIASES[alias])
      from = idx + needle.length
    }
  }
  return found
}

export function aggregateOccurrences(mentions: { skillId: string; source: string }[]): SkillOccurrence[] {
  const counts: Record<string, number> = {}
  for (const m of mentions) counts[m.skillId] = (counts[m.skillId] || 0) + 1
  return Object.entries(counts).map(([skillId, count]) => ({
    skill: Object.entries(SKILL_ALIASES).find(([, id]) => id === skillId)?.[0] || skillId,
    skillId,
    count,
    source: 'aggregated',
  }))
}

interface SkillsJsonShape {
  version: number
  maxLevel: number
  categories: Array<{ id: string; title: string; icon: string; skills: Array<{ id: string; name: string; level: number; url?: string }> }>
  tools: string[]
}

function loadSkillsData(): SkillsJsonShape {
  if (!fs.existsSync(SKILLS_FILE)) throw new Error(`skills.json not found at ${SKILLS_FILE}`)
  return JSON.parse(fs.readFileSync(SKILLS_FILE, 'utf-8'))
}

function saveSkillsData(data: SkillsJsonShape): void { fs.writeFileSync(SKILLS_FILE, JSON.stringify(data, null, 2), 'utf-8') }
function clampLevel(level: number, max: number): number { return Math.max(0, Math.min(max, Math.round(Number.isNaN(level) ? 0 : level))) }

function findSkillEntry(data: SkillsJsonShape, skillId: string) {
  for (let ci = 0; ci < data.categories.length; ci++) {
    const idx = data.categories[ci].skills.findIndex((s) => s.id === skillId)
    if (idx !== -1) return { categoryIndex: ci, skillIndex: idx, entry: data.categories[ci].skills[idx] }
  }
  return null
}

const BRAND_NAME_OVERRIDES: Record<string, string> = {
  minimax: 'MiniMax', ollama: 'Ollama', litellm: 'LiteLLM', opencode: 'OpenCode', openai: 'OpenAI', codex: 'Codex', hermes: 'Hermes', nginx: 'Nginx', python: 'Python', sqladmin: 'SQLAdmin', pydantic: 'Pydantic', sqlalchemy: 'SQLAlchemy', fastapi: 'FastAPI', qdrant: 'Qdrant', pgvector: 'pgvector', chromadb: 'ChromaDB', mihomo: 'mihomo',
}
function titleCaseSkillId(id: string): string {
  if (BRAND_NAME_OVERRIDES[id]) return BRAND_NAME_OVERRIDES[id]
  return id.split('-').map((part) => ['API','CSS','CI','CD','UI','LLM','RAG','MCP','JWT','VPN','VPS','SSH','SQL','AI','JS','TS','HTTP','JSON','YAML','CLI','DB','OS','IO','NPM'].includes(part.toUpperCase()) ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
}

export function applySkillIncrements(deltaBySkill: Record<string, number>, options: { persist?: boolean } = {}): SkillsIncrementEntry[] {
  if (Object.keys(deltaBySkill).length === 0) return []
  const data = loadSkillsData()
  const max = data.maxLevel || MAX_SKILL_LEVEL
  const written: SkillsIncrementEntry[] = []
  const now = new Date().toISOString()
  for (const [skillId, delta] of Object.entries(deltaBySkill)) {
    if (!delta) continue
    const existing = findSkillEntry(data, skillId)
    if (existing) {
      const entry = existing.entry
      const newLevel = clampLevel(entry.level + delta, max)
      const appliedDelta = newLevel - entry.level
      entry.level = newLevel
      if (appliedDelta > 0) written.push({ timestamp: now, source: 'sync', skillId, skillName: entry.name, delta: appliedDelta, newLevel })
    } else {
      let categoryIndex = data.categories.findIndex((c) => c.id === SKILL_CATEGORY_HINT[skillId])
      if (categoryIndex === -1) categoryIndex = 0
      const newLevel = clampLevel(Math.max(1, delta), max)
      const entry = { id: skillId, name: titleCaseSkillId(skillId), level: newLevel }
      data.categories[categoryIndex].skills.push(entry)
      written.push({ timestamp: now, source: 'sync:new', skillId, skillName: entry.name, delta: newLevel, newLevel })
    }
  }
  if (options.persist !== false && written.length > 0) saveSkillsData(data)
  return written
}

function parseDeliverableMeta(file: string, firstConsumed: string | null): DeliverableMeta {
  const path_ = path.join(DELIVERABLES_DIR, file)
  let title = file.replace(/\.md$/, '')
  let summary = ''
  let content = ''
  try {
    const text = fs.readFileSync(path_, 'utf-8')
    content = text.trim()
    const lines = text.split('\n')
    let sawTitle = false
    for (const raw of lines) {
      const line = raw.trim()
      if (!line) continue
      if (line.startsWith('# ')) { if (!sawTitle) { title = line.slice(2).trim(); sawTitle = true }; continue }
      if (line.startsWith('#') || line.startsWith('>') || /^整理时间|^记录时间|^时间[:：]/i.test(line) || /^---+$/.test(line)) continue
      if (sawTitle && line.length > 6) { summary = line.replace(/^[-*]\s*/, ''); break }
    }
  } catch {}
  return { file, title, summary, content, tags: [], firstConsumed }
}

function parseTimelinePhases(): TimelinePhaseMeta[] {
  if (!fs.existsSync(TIMELINE_FILE)) return []
  const text = fs.readFileSync(TIMELINE_FILE, 'utf-8')
  const phases: TimelinePhaseMeta[] = []
  for (const raw of text.split('\n')) {
    const line = raw.trim()
    if (!line.startsWith('|')) continue
    if (line.includes('------') || line.includes('阶段 | 时间')) continue
    const cells = line.split('|').slice(1, -1).map((c) => c.trim())
    if (cells.length >= 5 && /^\d+/.test(cells[0])) {
      phases.push({ phase: cells[0], time: cells[1], event: cells[2], repos: cells[3], tech: cells[4] })
    }
  }
  return phases
}

function writeMeta(state: ConsumerState, lastRun: { newDeliverables: string[]; newTimelineLines: number; increments: SkillsIncrementEntry[] }): void {
  const consumedDeliverables = state.consumedDeliverables.map((file) => parseDeliverableMeta(file, state.lastRun))
  const meta: VibeJournalMeta = {
    lastRun: state.lastRun,
    lastRunNewDeliverables: lastRun.newDeliverables,
    lastRunNewTimelineLines: lastRun.newTimelineLines,
    timelinePhases: parseTimelinePhases(),
    consumedDeliverables,
    recentIncrements: state.skillsIncrementLog.slice(-30).reverse(),
  }
  fs.mkdirSync(path.dirname(META_FILE), { recursive: true })
  fs.writeFileSync(META_FILE, JSON.stringify(meta, null, 2), 'utf-8')
}

export function runSync(options: { persist?: boolean; dryRun?: boolean } = {}): SyncResult {
  const persist = options.dryRun ? false : options.persist !== false
  const state = loadState()
  const allDeliverables = listDeliverables()
  const newDeliverables = allDeliverables.filter((d) => !state.consumedDeliverables.includes(d))
  const deliverableLineHashes: Record<string, string[]> = { ...state.deliverableLineHashes }
  const deliverableLineCursors: Record<string, number> = { ...state.deliverableLineCursors }
  const newSkillMentions: { skillId: string; source: string }[] = []

  for (const d of allDeliverables) {
    const text = readDeliverable(d)
    const lines = splitMeaningfulLines(text)
    const previousCursor = newDeliverables.includes(d) ? 0 : (state.deliverableLineCursors[d] ?? (state.deliverableLineHashes[d] || []).length)
    const deltaLines = lines.slice(previousCursor)
    for (const { line } of deltaLines) {
      for (const id of extractSkillIdsFromLine(line)) newSkillMentions.push({ skillId: id, source: `deliverable:${d}` })
    }
    deliverableLineHashes[d] = lines.map((l) => l.hash)
    deliverableLineCursors[d] = lines.length
  }

  let newTimelineLines = 0
  let newTimelineContent = ''
  let timelineLineHashes = [...state.timelineLineHashes]
  let timelineLineCursor = state.timelineLineCursor ?? state.timelineLineHashes.length
  if (fs.existsSync(TIMELINE_FILE)) {
    const content = fs.readFileSync(TIMELINE_FILE, 'utf-8')
    const lines = splitMeaningfulLines(content)
    const deltaLines = lines.slice(timelineLineCursor)
    for (const { line } of deltaLines) {
      for (const id of extractSkillIdsFromLine(line)) newSkillMentions.push({ skillId: id, source: 'timeline:new' })
    }
    newTimelineLines = deltaLines.length
    newTimelineContent = deltaLines.map((l) => l.line).join('\n')
    timelineLineHashes = lines.map((l) => l.hash)
    timelineLineCursor = lines.length
  }

  const deltaBySkill: Record<string, number> = {}
  for (const m of newSkillMentions) deltaBySkill[m.skillId] = (deltaBySkill[m.skillId] || 0) + 1
  const increments = applySkillIncrements(deltaBySkill, { persist })
  const hasChanges = newDeliverables.length > 0 || newTimelineLines > 0 || increments.length > 0

  if (hasChanges) {
    state.consumedDeliverables = Array.from(new Set([...state.consumedDeliverables, ...newDeliverables]))
    state.deliverableLineHashes = deliverableLineHashes
    state.deliverableLineCursors = deliverableLineCursors
    state.timelineLineHashes = timelineLineHashes
    state.timelineLineCursor = timelineLineCursor
    if (newTimelineContent) state.timelineLastConsumedHash = simpleHash(newTimelineContent)
    state.skillsIncrementLog = [...state.skillsIncrementLog, ...increments].slice(-500)
  }

  if (persist) {
    if (hasChanges) state.lastRun = new Date().toISOString()
    // Always save: this persists forward-compatible state migrations such as
    // line cursors even when the current upstream delta is empty.
    saveState(state)
    writeMeta(state, { newDeliverables, newTimelineLines, increments })
  }

  return { newDeliverables, newTimelineLines, skills: aggregateOccurrences(newSkillMentions), increments, state }
}
