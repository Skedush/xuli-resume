/**
 * VibeJournal Downstream Sync Library
 *
 * Server-side only reusable downstream sync layer for consuming
 * /data/projects/repos/vibe-coding-journal into xuli-resume.
 *
 * Input priority per deliverable (see docs/downstream-contract.md v1):
 *   1. deliverables/<file>.meta.json  — authoritative, applied first when valid
 *   2. upstream SKILLS.md              — alias / category registry
 *   3. local SKILL_ALIASES            — fallback for legacy content
 *   4. markdown / TIMELINE prose scan — only when (1) is missing or invalid
 *
 * State boundary:
 *   - upstream owns: markdown bodies, .meta.json, SKILLS.md, SUMMARY_MANIFEST.md, TIMELINE.md
 *   - downstream owns: consumer-state.json, vibe-journal-meta.json, skills.json,
 *                      html snapshots, auto-register / pending-review audit
 *
 * The downstream never re-infers skills from prose when a valid metadata file
 * is present for the same deliverable; semantic decisions are made upstream
 * by the LLM summary job.
 */

import fs from 'fs'
import path from 'path'
import { marked } from 'marked'
import { createHash } from 'node:crypto'

export const UPSTREAM_VC_JOURNAL = '/data/projects/repos/vibe-coding-journal'
export const DELIVERABLES_DIR = path.join(UPSTREAM_VC_JOURNAL, 'deliverables')
export const TIMELINE_FILE = path.join(UPSTREAM_VC_JOURNAL, 'TIMELINE.md')
export const UPSTREAM_SKILLS_REGISTRY = path.join(UPSTREAM_VC_JOURNAL, 'SKILLS.md')

const PROJECT_ROOT = process.cwd()
const STATE_FILE = path.join(PROJECT_ROOT, 'src/data/vibe-journal-consumer-state.json')
const SKILLS_FILE = path.join(PROJECT_ROOT, 'src/data/skills.json')
export const META_FILE = path.join(PROJECT_ROOT, 'src/data/vibe-journal-meta.json')
/**
 * Pre-rendered HTML snapshot directory. Each consumed deliverable is rendered
 * to a sibling HTML file here during `runSync()` so the browser never has to
 * parse markdown at runtime — it only reads the synced HTML artifacts under
 * this folder via Vite's `import.meta.glob` at build time.
 */
export const HTML_SNAPSHOT_DIR = path.join(PROJECT_ROOT, 'src/data/vibe-journal-html')
export const MAX_SKILL_LEVEL = 95

/**
 * Default policy for unknown skills surfaced by metadata (id not present in
 * skills.json AND not registered in upstream SKILLS.md). `auto-register`
 * adds the skill at the suggested category, marks it for human review, and
 * records an audit entry. `pending-review` keeps skills.json untouched and
 * pushes the candidate to the pending queue.
 */
export const UNKNOWN_SKILL_POLICY: 'auto-register' | 'pending-review' = 'auto-register'

/** Cap for the autoRegisteredSkills audit log. */
const AUTO_REGISTERED_HISTORY_LIMIT = 200

export interface UpstreamSkillDeclaration {
  id?: string
  name: string
  category_hint?: string
  delta?: number
  evidence?: string[]
  is_new?: boolean
  aliases?: string[]
}

export interface UpstreamTimelineEvent {
  date?: string
  phase?: string
  event: string
  repos?: string[]
  tags?: string[]
}

export interface UpstreamDeliverableMetaV1 {
  schema_version: 1
  deliverable: string
  title?: string
  date?: string
  source_files?: string[]
  summary_kind?: string
  content_hash?: string
  skills_used?: UpstreamSkillDeclaration[]
  timeline_events?: UpstreamTimelineEvent[]
  downstream_hints?: {
    preferred_display?: string
    safe_to_auto_apply?: boolean
    review_notes?: string[]
  }
}

export interface UpstreamSkillRegistry {
  /** Map of display name (lowercased) -> canonical skill id. */
  aliases: Record<string, string>
  /** Map of canonical skill id -> category id (heading from SKILLS.md). */
  categoryHints: Record<string, string>
  /** Set of canonical ids registered in the registry. */
  ids: Set<string>
  /** True when the registry was successfully loaded (false → caller should fall back). */
  loaded: boolean
  /** Set of category headings present in the registry. */
  categories: Set<string>
}

export interface LoadedDeliverableMeta {
  meta: UpstreamDeliverableMetaV1 | null
  /** sha256:<64hex> of the meta JSON, when it could be read. */
  hash: string | null
  /** First error string when load/validation failed; null when meta is missing or valid. */
  error: string | null
}

export interface ResolvedDeclaredSkill {
  /** Canonical kebab-case id (kebab-cased from name when no alias matched). */
  id: string
  /** Display name as declared by the upstream LLM. */
  name: string
  /** Best-effort category hint: metadata hint > registry hint > local hint. */
  categoryHint: string | null
  /** Clamped delta (0 < delta <= 3, default 1). */
  delta: number
  /** Aliases the upstream LLM reported seeing in prose. */
  aliases: string[]
  /** True when id was found in upstream SKILLS.md registry. */
  registered: boolean
  /** True when id is already present in downstream skills.json. */
  known: boolean
  /** Evidence strings the upstream LLM provided. */
  evidence: string[]
  /** Whether upstream marked this as newly introduced in the deliverable. */
  isNew: boolean
}

export interface AutoRegisteredSkillEntry {
  /** Declared display name (e.g. "Webwright"). */
  name: string
  /** Canonical id used (e.g. "webwright"). */
  resolved: string
  /** Source string identifying where the declaration came from. */
  source: string
  categoryHint?: string
  reason: 'metadata-new-skill' | 'missing-alias' | 'unknown-category'
  timestamp: string
  evidence?: string[]
}

export interface PendingSkillCandidate {
  name: string
  resolved: string
  source: string
  categoryHint?: string
  evidence?: string[]
  firstSeen: string
  lastSeen: string
  count: number
  status: 'pending'
}

export interface MetadataParseError {
  file: string
  error: string
  timestamp: string
}

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
  /**
   * Per-deliverable sha256 of the last applied .meta.json content.
   * Absent means metadata was never applied for that file. When the upstream
   * cron publishes a corrected meta, the hash will differ and the file is
   * re-applied exactly once more.
   */
  metadataHashes: Record<string, string>
  /** Recent (last 200) auto-registered skill entries. */
  autoRegisteredSkills: AutoRegisteredSkillEntry[]
  /** Currently-pending unknown-skill candidates. Cleared when skill is later known. */
  pendingSkillCandidates: PendingSkillCandidate[]
  /** Recent metadata parse / validation errors. */
  metadataParseErrors: MetadataParseError[]
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
  /** Sibling .meta.json files that were successfully applied this run. */
  metadataFilesUsed: string[]
  /** Per-file errors that forced a fallback to prose alias scan. */
  metadataParseErrors: Array<{ file: string; error: string }>
  /** Deliverables that were processed via the prose alias scan fallback. */
  fallbackDeliverables: string[]
  /** Skills auto-registered into skills.json during this run. */
  autoRegisteredThisRun: AutoRegisteredSkillEntry[]
  /** Skills pushed to the pending review queue during this run. */
  pendingSkillCandidatesThisRun: PendingSkillCandidate[]
  /** Effective unknown-skill policy used for this run. */
  unknownSkillPolicy: 'auto-register' | 'pending-review'
}

export interface DeliverableMeta {
  file: string
  title: string
  summary: string
  content: string
  tags: string[]
  firstConsumed: string | null
  /**
   * Repo-relative path to the pre-rendered HTML snapshot, e.g.
   * `src/data/vibe-journal-html/daily-summary-0525-0529.md.html`.
   * Browser code consumes the file via Vite's `import.meta.glob` at build time.
   * Empty string if rendering was skipped.
   */
  htmlPath: string
  /** date from the .meta.json, when available (YYYY-MM-DD). */
  date?: string
  /** summary_kind from the .meta.json, when available. */
  summaryKind?: string
  /** True when this deliverable was applied via metadata (not prose fallback). */
  metadataApplied?: boolean
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
  /**
   * Sibling .meta.json files applied in the most recent sync.
   * Optional for forward-compat with older meta JSON files written before
   * the metadata-first sync landed.
   */
  lastRunMetadataFiles?: string[]
  /** Metadata parse / validation errors from the most recent sync. */
  lastRunMetadataParseErrors?: Array<{ file: string; error: string }>
  /** Deliverables that fell back to prose alias scan in the most recent sync. */
  lastRunFallbackDeliverables?: string[]
  /** Skills auto-registered in the most recent sync. */
  lastRunAutoRegisteredSkills?: AutoRegisteredSkillEntry[]
  /** Skills currently in the pending review queue. */
  pendingSkillCandidates?: PendingSkillCandidate[]
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
  // AI 辅助编程：Agent 工作流 + Trae/Cursor + Claude Code + Codex + OpenCode + Hermes Agent
  'claude-code': 'ai-coding', 'openai-codex': 'ai-coding', opencode: 'ai-coding', 'hermes-agent': 'ai-coding',
  'agent-workflow': 'ai-coding', 'trae-cursor': 'ai-coding',
  // 后端框架：语言 + 框架 + 鉴权 + 通用后端工具（不含运维）
  nodejs: 'backend', python: 'backend', django: 'backend', fastapi: 'backend',
  pydantic: 'backend', sqlalchemy: 'backend', jwt: 'backend', sqladmin: 'backend', playwright: 'backend',
  // AI 基础设施：LLM / MCP / 本地推理栈 / 向量库 / 模型网关
  'llm-rag': 'ai-infra', mcp: 'ai-infra', ollama: 'ai-infra', litellm: 'ai-infra',
  'open-webui': 'ai-infra', qdrant: 'ai-infra', pgvector: 'ai-infra', chromadb: 'ai-infra', minimax: 'ai-infra',
  // DevOps / 运维：容器 / CI / 反代 / 网络 / 主机
  docker: 'devops', 'github-actions': 'devops', nginx: 'devops', ssh: 'devops',
  tailscale: 'devops', mihomo: 'devops', vpn: 'devops', vps: 'devops',
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
    metadataHashes: {},
    autoRegisteredSkills: [],
    pendingSkillCandidates: [],
    metadataParseErrors: [],
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
        // Forward-compatible: missing arrays/objects fall back to empty defaults.
        metadataHashes: raw.metadataHashes && typeof raw.metadataHashes === 'object' && !Array.isArray(raw.metadataHashes) ? raw.metadataHashes : {},
        autoRegisteredSkills: Array.isArray(raw.autoRegisteredSkills) ? raw.autoRegisteredSkills : [],
        pendingSkillCandidates: Array.isArray(raw.pendingSkillCandidates) ? raw.pendingSkillCandidates : [],
        metadataParseErrors: Array.isArray(raw.metadataParseErrors) ? raw.metadataParseErrors : [],
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

function sha256OfBuffer(buf: Buffer | string): string {
  return 'sha256:' + createHash('sha256').update(buf).digest('hex')
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

/* ------------------------------------------------------------------ */
/*  Upstream SKILLS.md registry                                       */
/* ------------------------------------------------------------------ */

const EMPTY_REGISTRY: UpstreamSkillRegistry = {
  aliases: {},
  categoryHints: {},
  ids: new Set(),
  loaded: false,
  categories: new Set(),
}

/**
 * Parse the upstream `SKILLS.md` registry.
 *
 * Format (one heading per category, one bullet per alias):
 *
 *     ## ai-coding
 *     - Hermes Agent → hermes-agent
 *     - Hermes → hermes-agent
 *
 * Failures (missing file, malformed) degrade to an empty registry; the
 * caller decides whether to keep going with the local SKILL_ALIASES map.
 */
export function loadUpstreamSkillRegistry(upstreamRoot: string = UPSTREAM_VC_JOURNAL): UpstreamSkillRegistry {
  const file = path.join(upstreamRoot, 'SKILLS.md')
  if (!fs.existsSync(file)) return { ...EMPTY_REGISTRY, ids: new Set(), categories: new Set() }
  let text: string
  try {
    text = fs.readFileSync(file, 'utf-8')
  } catch {
    return { ...EMPTY_REGISTRY, ids: new Set(), categories: new Set() }
  }
  const aliases: Record<string, string> = {}
  const categoryHints: Record<string, string> = {}
  const ids = new Set<string>()
  const categories = new Set<string>()
  let currentCategory: string | null = null
  for (const raw of text.split('\n')) {
    const line = raw.trim()
    if (line.startsWith('## ')) {
      currentCategory = line.slice(3).trim()
      if (currentCategory) categories.add(currentCategory)
      continue
    }
    if (!currentCategory) continue
    if (!line.startsWith('- ')) continue
    const arrow = line.indexOf('→')
    if (arrow < 0) continue
    const left = line.slice(2, arrow).trim()
    const right = line.slice(arrow + 1).trim().replace(/`/g, '')
    if (!/^[a-z0-9][a-z0-9-]*$/.test(right)) continue
    ids.add(right)
    categoryHints[right] = currentCategory
    if (left) {
      aliases[left.toLowerCase()] = right
      // Also index the canonical id itself as an alias (so resolveDeclaredSkill
      // can find it without a separate code path).
      aliases[right.toLowerCase()] = right
    }
  }
  return { aliases, categoryHints, ids, loaded: true, categories }
}

/* ------------------------------------------------------------------ */
/*  Per-deliverable metadata loader                                   */
/* ------------------------------------------------------------------ */

const ID_RE = /^[a-z0-9][a-z0-9-]*$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const HASH_RE = /^sha256:[a-f0-9]{64}$/

function deliverableMetaPath(file: string): string {
  return path.join(DELIVERABLES_DIR, file.replace(/\.md$/, '.meta.json'))
}

/**
 * Load and validate a sibling .meta.json file for a deliverable.
 *
 * Outcomes:
 *   - missing  -> { meta: null, hash: null, error: null }        (legitimate fallback)
 *   - present + valid  -> { meta, hash, error: null }
 *   - present + invalid -> { meta: null, hash, error: <reason> }  (record + fall back)
 */
export function loadDeliverableMeta(file: string): LoadedDeliverableMeta {
  const metaPath = deliverableMetaPath(file)
  if (!fs.existsSync(metaPath)) return { meta: null, hash: null, error: null }
  let raw: string
  let buf: Buffer
  try {
    buf = fs.readFileSync(metaPath)
    raw = buf.toString('utf-8')
  } catch (err) {
    return { meta: null, hash: null, error: `cannot read meta file: ${(err as Error).message}` }
  }
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch (err) {
    return { meta: null, hash: sha256OfBuffer(buf), error: `invalid JSON: ${(err as Error).message}` }
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { meta: null, hash: sha256OfBuffer(buf), error: 'meta must be a JSON object' }
  }
  const m = parsed as Record<string, unknown>
  if (m.schema_version !== 1) {
    return { meta: null, hash: sha256OfBuffer(buf), error: `unsupported schema_version ${JSON.stringify(m.schema_version)}` }
  }
  if (typeof m.deliverable !== 'string' || m.deliverable !== file) {
    return { meta: null, hash: sha256OfBuffer(buf), error: `deliverable field ${JSON.stringify(m.deliverable)} does not match filename ${file}` }
  }
  if (typeof m.content_hash === 'string' && HASH_RE.test(m.content_hash)) {
    try {
      const mdBuf = fs.readFileSync(path.join(DELIVERABLES_DIR, file))
      const actual = sha256OfBuffer(mdBuf)
      if (m.content_hash !== actual) {
        return { meta: null, hash: sha256OfBuffer(buf), error: `content_hash mismatch (expected ${actual}, got ${m.content_hash})` }
      }
    } catch {
      // ignore — we already have the meta body, hash drift on a missing file
      // will be re-raised the next time the deliverable is present
    }
  }
  // Build the typed object after field-level validation.
  if (!Array.isArray(m.skills_used)) {
    return { meta: null, hash: sha256OfBuffer(buf), error: 'skills_used must be an array' }
  }
  for (let i = 0; i < m.skills_used.length; i++) {
    const s = m.skills_used[i] as Record<string, unknown>
    if (!s || typeof s !== 'object' || Array.isArray(s)) {
      return { meta: null, hash: sha256OfBuffer(buf), error: `skills_used[${i}] must be an object` }
    }
    if (typeof s.id !== 'string' || !ID_RE.test(s.id)) {
      return { meta: null, hash: sha256OfBuffer(buf), error: `skills_used[${i}].id must match [a-z0-9][a-z0-9-]*` }
    }
    if (typeof s.name !== 'string' || !s.name.trim()) {
      return { meta: null, hash: sha256OfBuffer(buf), error: `skills_used[${i}].name must be a non-empty string` }
    }
  }
  if (m.date != null && (typeof m.date !== 'string' || !DATE_RE.test(m.date))) {
    return { meta: null, hash: sha256OfBuffer(buf), error: `date must match YYYY-MM-DD, got ${JSON.stringify(m.date)}` }
  }
  return { meta: parsed as UpstreamDeliverableMetaV1, hash: sha256OfBuffer(buf), error: null }
}

function clampMetadataDelta(delta: unknown): number {
  const n = typeof delta === 'number' && Number.isFinite(delta) ? delta : 1
  if (n <= 0) return 1
  if (n > 3) return 3
  return n
}

/**
 * Resolve a metadata `skills_used[]` declaration into a canonical id and
 * downstream hints. Pure function (no I/O). The registry should be the
 * merged view (upstream SKILLS.md + local SKILL_ALIASES) so the same id
 * lookup works whether the alias came from upstream or the local map.
 */
export function resolveDeclaredSkill(
  decl: UpstreamSkillDeclaration,
  registry: UpstreamSkillRegistry,
  mergedAliases: Record<string, string>,
): ResolvedDeclaredSkill {
  const declaredName = decl.name
  const declaredId = typeof decl.id === 'string' && ID_RE.test(decl.id) ? decl.id : null
  // 1. If the declared id is well-formed, prefer it.
  let resolvedId: string | null = declaredId
  // 2. Otherwise, try the merged alias map against the display name.
  if (!resolvedId) {
    const byName = mergedAliases[declaredName.toLowerCase()]
    if (byName) resolvedId = byName
  }
  // 3. Fall back to a provisional kebab-case id from the display name.
  if (!resolvedId) {
    resolvedId = declaredName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-{2,}/g, '-') || 'unknown-skill'
  }
  const registered = registry.ids.has(resolvedId) || (resolvedId in SKILL_ALIASES)
  const categoryHint =
    (typeof decl.category_hint === 'string' && decl.category_hint) ||
    registry.categoryHints[resolvedId] ||
    SKILL_CATEGORY_HINT[resolvedId] ||
    null
  return {
    id: resolvedId,
    name: declaredName,
    categoryHint,
    delta: clampMetadataDelta(decl.delta),
    aliases: Array.isArray(decl.aliases) ? decl.aliases.filter((a) => typeof a === 'string') : [],
    registered,
    known: false, // filled in by the caller after looking at skills.json
    evidence: Array.isArray(decl.evidence) ? decl.evidence.filter((e) => typeof e === 'string') : [],
    isNew: decl.is_new === true,
  }
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
function clampLevel(level: number, max: number): number { return Math.max(0, Math.min(max, level)) }
const SKILL_INCREMENT_AMOUNT = 0.5
const SKILL_BASE_LEVEL = 30

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

function loadSkillsDataReadOnly(): SkillsJsonShape | null {
  if (!fs.existsSync(SKILLS_FILE)) return null
  try { return JSON.parse(fs.readFileSync(SKILLS_FILE, 'utf-8')) } catch { return null }
}

/**
 * Apply a batch of skill increments. Existing skills follow the legacy
 * half-step increment; new skills land at SKILL_BASE_LEVEL in either the
 * declared category hint or the first category as a fallback.
 *
 * `autoRegistered` is filled with audit entries for new skills whose id was
 * not present in skills.json at the start of this call. This stays local to
 * the call so re-runs without changes do not double-register.
 */
export function applySkillIncrements(
  deltaBySkill: Record<string, number>,
  options: {
    persist?: boolean
    categoryHints?: Record<string, string>
    evidenceBySkill?: Record<string, string[]>
    unknownSkillPolicy?: 'auto-register' | 'pending-review'
    autoRegisteredOut?: AutoRegisteredSkillEntry[]
    pendingOut?: PendingSkillCandidate[]
    sourceTag?: string
  } = {},
): SkillsIncrementEntry[] {
  if (Object.keys(deltaBySkill).length === 0) return []
  const persist = options.persist !== false
  const policy = options.unknownSkillPolicy || UNKNOWN_SKILL_POLICY
  const data = loadSkillsData()
  const max = data.maxLevel || MAX_SKILL_LEVEL
  const written: SkillsIncrementEntry[] = []
  const now = new Date().toISOString()
  for (const [skillId, _count] of Object.entries(deltaBySkill)) {
    const existing = findSkillEntry(data, skillId)
    if (existing) {
      const entry = existing.entry
      const increment = (deltaBySkill[skillId] || 1) * SKILL_INCREMENT_AMOUNT
      const newLevel = clampLevel(entry.level + increment, max)
      const appliedDelta = newLevel - entry.level
      entry.level = newLevel
      if (appliedDelta > 0) written.push({ timestamp: now, source: options.sourceTag || 'sync', skillId, skillName: entry.name, delta: appliedDelta, newLevel })
    } else {
      const declaredHint = options.categoryHints?.[skillId]
      let categoryIndex = -1
      if (declaredHint) categoryIndex = data.categories.findIndex((c) => c.id === declaredHint)
      const reason: AutoRegisteredSkillEntry['reason'] = categoryIndex === -1 ? 'unknown-category' : 'metadata-new-skill'
      if (categoryIndex === -1) categoryIndex = 0
      if (policy === 'auto-register') {
        const newLevel = clampLevel(Math.max(SKILL_BASE_LEVEL, SKILL_INCREMENT_AMOUNT), max)
        const entry = { id: skillId, name: titleCaseSkillId(skillId), level: newLevel }
        data.categories[categoryIndex].skills.push(entry)
        written.push({ timestamp: now, source: options.sourceTag || 'sync:new', skillId, skillName: entry.name, delta: newLevel, newLevel })
        options.autoRegisteredOut?.push({
          name: titleCaseSkillId(skillId),
          resolved: skillId,
          source: options.sourceTag || 'sync:new',
          categoryHint: data.categories[categoryIndex].id,
          reason,
          timestamp: now,
          evidence: options.evidenceBySkill?.[skillId]?.slice(),
        })
      } else {
        // pending-review: don't touch skills.json. The metadata path in
        // runSync() owns the pending queue push (so the source string
        // and evidence are accurate). This branch just makes sure we
        // do NOT register the skill and do NOT double-push to pending.
      }
    }
  }
  if (persist && written.length > 0) saveSkillsData(data)
  return written
}

function parseDeliverableMeta(file: string, firstConsumed: string | null, htmlPath: string, extra?: { date?: string; summaryKind?: string; metadataApplied?: boolean }): DeliverableMeta {
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
  return {
    file,
    title,
    summary,
    content,
    tags: [],
    firstConsumed,
    htmlPath,
    date: extra?.date,
    summaryKind: extra?.summaryKind,
    metadataApplied: extra?.metadataApplied,
  }
}

/**
 * Build the repo-relative path used by the Vite-bundled HTML snapshot.
 * Example: `daily-summary-0525-0529.md` -> `src/data/vibe-journal-html/daily-summary-0525-0529.md.html`.
 */
export function htmlSnapshotRelPath(file: string): string {
  return path.posix.join('src/data/vibe-journal-html', `${file}.html`)
}

/**
 * Render markdown to a self-contained HTML fragment using `marked`.
 * Inline HTML in the source is escaped by `marked` by default — defensive
 * behavior, since the input is trusted upstream but we still don't want raw
 * script/style tags from typos in the .md file to leak into the page.
 *
 * `gfm: true` keeps tables, task lists, autolinks; `breaks: false` matches the
 * way the upstream deliverables are written.
 */
export function renderMarkdownToHtml(markdown: string): string {
  // marked.parse is sync when no async extensions are registered. The return
  // type is string in sync mode (per marked v14 types).
  return marked.parse(markdown, {
    gfm: true,
    breaks: false,
    async: false,
  }) as string
}

/**
 * Render every consumed deliverable to its HTML snapshot under
 * `HTML_SNAPSHOT_DIR` and return the map of deliverable file -> repo-relative
 * htmlPath. The renderer is intentionally cheap (sub-100ms for the current
 * upstream corpus) and runs unconditionally on every persist so that any
 * future markdown edit in an already-consumed deliverable is reflected on the
 * next `npm run sync:vibe-journal` without needing cursor bookkeeping.
 */
function renderAllDeliverableSnapshots(consumed: string[]): Record<string, string> {
  const map: Record<string, string> = {}
  fs.mkdirSync(HTML_SNAPSHOT_DIR, { recursive: true })
  for (const file of consumed) {
    const htmlPath = htmlSnapshotRelPath(file)
    map[file] = htmlPath
    const srcPath = path.join(DELIVERABLES_DIR, file)
    const dstPath = path.join(HTML_SNAPSHOT_DIR, `${file}.html`)
    try {
      const md = fs.readFileSync(srcPath, 'utf-8')
      const body = renderMarkdownToHtml(md)
      // Wrap in a minimal container so the page can target the root with a
      // single class. The full document chrome (head, body) is added by the
      // React reader, not here — the snapshot is a fragment, not a page.
      const fragment = `<article class="vj-doc">\n${body}\n</article>\n`
      fs.writeFileSync(dstPath, fragment, 'utf-8')
    } catch (err) {
      // Don't fail the entire sync if one file can't be rendered — the page
      // will fall back to plain-text rendering for this deliverable.
      console.warn(`[vibe-journal-sync] failed to render ${file}:`, err instanceof Error ? err.message : err)
      map[file] = ''
    }
  }
  return map
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

function writeMeta(
  state: ConsumerState,
  lastRun: { newDeliverables: string[]; newTimelineLines: number; increments: SkillsIncrementEntry[] },
  htmlPathByFile: Record<string, string>,
  metadataFields: {
    lastRunMetadataFiles: string[]
    lastRunMetadataParseErrors: Array<{ file: string; error: string }>
    lastRunFallbackDeliverables: string[]
    lastRunAutoRegisteredSkills: AutoRegisteredSkillEntry[]
  },
): void {
  // Build the per-deliverable metadata view by inspecting both the state and
  // the current meta files (if any). This way the page can show "applied via
  // metadata" / "via fallback" for each item.
  const dataByFile = new Map<string, { date?: string; summaryKind?: string; metadataApplied?: boolean }>()
  for (const f of state.consumedDeliverables) dataByFile.set(f, {})
  for (const f of metadataFields.lastRunMetadataFiles) {
    const metaPath = deliverableMetaPath(f.replace(/\.meta\.json$/, ''))
    try {
      const m = JSON.parse(fs.readFileSync(metaPath, 'utf-8'))
      const slug = f.replace(/\.meta\.json$/, '')
      const cur = dataByFile.get(slug) || {}
      if (typeof m.date === 'string') cur.date = m.date
      if (typeof m.summary_kind === 'string') cur.summaryKind = m.summary_kind
      cur.metadataApplied = true
      dataByFile.set(slug, cur)
    } catch {
      // ignore — best effort
    }
  }
  for (const f of metadataFields.lastRunFallbackDeliverables) {
    const cur = dataByFile.get(f) || {}
    cur.metadataApplied = false
    dataByFile.set(f, cur)
  }
  const consumedDeliverables = state.consumedDeliverables.map((file) => parseDeliverableMeta(file, state.lastRun, htmlPathByFile[file] || '', dataByFile.get(file)))
  const meta: VibeJournalMeta = {
    lastRun: state.lastRun,
    lastRunNewDeliverables: lastRun.newDeliverables,
    lastRunNewTimelineLines: lastRun.newTimelineLines,
    timelinePhases: parseTimelinePhases(),
    consumedDeliverables,
    recentIncrements: state.skillsIncrementLog.slice(-30).reverse(),
    lastRunMetadataFiles: metadataFields.lastRunMetadataFiles,
    lastRunMetadataParseErrors: metadataFields.lastRunMetadataParseErrors,
    lastRunFallbackDeliverables: metadataFields.lastRunFallbackDeliverables,
    lastRunAutoRegisteredSkills: metadataFields.lastRunAutoRegisteredSkills,
    pendingSkillCandidates: state.pendingSkillCandidates,
  }
  fs.mkdirSync(path.dirname(META_FILE), { recursive: true })
  fs.writeFileSync(META_FILE, JSON.stringify(meta, null, 2), 'utf-8')
}

function mergeAutoRegistered(history: AutoRegisteredSkillEntry[], additions: AutoRegisteredSkillEntry[]): AutoRegisteredSkillEntry[] {
  if (additions.length === 0) return history
  // Dedup key is (name, resolved) per the PR spec: a skill that was
  // surfaced via metadata this run should not produce a second audit row
  // if applySkillIncrements also re-emits it.
  const keyOf = (e: AutoRegisteredSkillEntry) => `${e.name}::${e.resolved}`
  const seen = new Set(history.map(keyOf))
  const merged: AutoRegisteredSkillEntry[] = [...history]
  for (const a of additions) {
    const k = keyOf(a)
    if (seen.has(k)) continue
    seen.add(k)
    merged.push(a)
  }
  return merged.slice(-AUTO_REGISTERED_HISTORY_LIMIT)
}

function mergePendingCandidates(history: PendingSkillCandidate[], additions: PendingSkillCandidate[]): PendingSkillCandidate[] {
  if (additions.length === 0) return history
  const keyOf = (c: PendingSkillCandidate) => `${c.resolved}::${c.source}`
  const map = new Map<string, PendingSkillCandidate>()
  for (const c of history) map.set(keyOf(c), c)
  for (const a of additions) {
    const k = keyOf(a)
    const existing = map.get(k)
    if (existing) {
      map.set(k, {
        ...existing,
        lastSeen: a.lastSeen,
        count: existing.count + 1,
        evidence: Array.from(new Set([...(existing.evidence || []), ...(a.evidence || [])])).slice(0, 5),
      })
    } else {
      map.set(k, a)
    }
  }
  return Array.from(map.values())
}

function pruneResolvedPending(candidates: PendingSkillCandidate[], known: Set<string>): PendingSkillCandidate[] {
  return candidates.filter((c) => !known.has(c.resolved))
}

/**
 * Dedup a single run's auto-registered list to one entry per
 * (name, resolved). Returns the original list when no dupes exist.
 */
function dedupRunAutoRegistered(entries: AutoRegisteredSkillEntry[]): AutoRegisteredSkillEntry[] {
  if (entries.length <= 1) return entries
  const keyOf = (e: AutoRegisteredSkillEntry) => `${e.name}::${e.resolved}`
  const seen = new Set<string>()
  const out: AutoRegisteredSkillEntry[] = []
  for (const e of entries) {
    const k = keyOf(e)
    if (seen.has(k)) continue
    seen.add(k)
    out.push(e)
  }
  return out
}

/**
 * Dedup a single run's pending list to one entry per (resolved, source).
 * Re-runs with no upstream changes produce zero new pending entries;
 * duplicate metadata declarations of the same skill in one run collapse
 * to a single audit row.
 */
function dedupRunPending(entries: PendingSkillCandidate[]): PendingSkillCandidate[] {
  if (entries.length <= 1) return entries
  const keyOf = (c: PendingSkillCandidate) => `${c.resolved}::${c.source}`
  const seen = new Set<string>()
  const out: PendingSkillCandidate[] = []
  for (const e of entries) {
    const k = keyOf(e)
    if (seen.has(k)) continue
    seen.add(k)
    out.push(e)
  }
  return out
}

export function runSync(options: {
  persist?: boolean
  dryRun?: boolean
  unknownSkillPolicy?: 'auto-register' | 'pending-review'
} = {}): SyncResult {
  const persist = options.dryRun ? false : options.persist !== false
  const policy = options.unknownSkillPolicy || UNKNOWN_SKILL_POLICY
  const state = loadState()
  const registry = loadUpstreamSkillRegistry()
  // Upstream aliases win over local ones for the same key (per the PR design).
  const mergedAliases: Record<string, string> = { ...SKILL_ALIASES, ...registry.aliases }
  const skillsReadonly = loadSkillsDataReadOnly()
  const knownSkillIds = new Set<string>(
    skillsReadonly ? skillsReadonly.categories.flatMap((c) => c.skills.map((s) => s.id)) : []
  )
  // Drop any pending candidates that are now known.
  state.pendingSkillCandidates = pruneResolvedPending(state.pendingSkillCandidates, knownSkillIds)

  const allDeliverables = listDeliverables()
  const newDeliverables = allDeliverables.filter((d) => !state.consumedDeliverables.includes(d))
  const deliverableLineHashes: Record<string, string[]> = { ...state.deliverableLineHashes }
  const deliverableLineCursors: Record<string, number> = { ...state.deliverableLineCursors }
  const newSkillMentions: { skillId: string; source: string }[] = []

  const metadataFilesUsed: string[] = []
  const metadataParseErrors: Array<{ file: string; error: string }> = []
  const fallbackDeliverables: string[] = []
  const runAutoRegistered: AutoRegisteredSkillEntry[] = []
  const runPending: PendingSkillCandidate[] = []
  // Per-deliverable hints keyed by canonical id. Populated when metadata is
  // applied so the applySkillIncrements pass can place newly registered
  // skills into the metadata-declared category (rather than always falling
  // back to the first category).
  const pendingMetaCategoryHints: Record<string, Record<string, string>> = {}
  const pendingMetaEvidence: Record<string, string[]> = {}

  for (const d of allDeliverables) {
    const text = readDeliverable(d)
    const lines = splitMeaningfulLines(text)
    const previousCursor = newDeliverables.includes(d) ? 0 : (state.deliverableLineCursors[d] ?? (state.deliverableLineHashes[d] || []).length)
    const deltaLines = lines.slice(previousCursor)

    const loaded = loadDeliverableMeta(d)
    const appliedHash = state.metadataHashes[d]
    const metaChangedOrNew = loaded.hash !== null && loaded.hash !== appliedHash
    const canApplyMetadata = loaded.meta != null && metaChangedOrNew

    if (canApplyMetadata) {
      const seenInFile = new Set<string>()
      metadataFilesUsed.push(d.replace(/\.md$/, '.meta.json'))
      const safeToAutoApply = loaded.meta!.downstream_hints?.safe_to_auto_apply !== false
      // Track per-resolved-id category hints declared in metadata so
      // applySkillIncrements can place newly registered skills correctly
      // (otherwise an unknown id would fall back to the first category).
      const declaredCategoryHints: Record<string, string> = {}
      for (const decl of loaded.meta!.skills_used ?? []) {
        const resolved = resolveDeclaredSkill(decl, registry, mergedAliases)
        if (knownSkillIds.has(resolved.id)) resolved.known = true
        if (resolved.categoryHint) declaredCategoryHints[resolved.id] = resolved.categoryHint
        if (resolved.evidence.length > 0) {
          const existing = pendingMetaEvidence[resolved.id] || []
          for (const e of resolved.evidence) if (!existing.includes(e)) existing.push(e)
          pendingMetaEvidence[resolved.id] = existing
        }
        if (seenInFile.has(resolved.id)) continue
        seenInFile.add(resolved.id)
        // Override the source tag so logs and audit are honest about provenance.
        const sourceTag = `deliverable:${d}:metadata`
        newSkillMentions.push({ skillId: resolved.id, source: sourceTag })
        if (!resolved.known) {
          // We don't push directly to runAutoRegistered here; let
          // applySkillIncrements own the audit entry so we have a single
          // source of truth and avoid double audit rows for the same event.
          if (policy === 'pending-review' || !safeToAutoApply) {
            runPending.push({
              name: resolved.name,
              resolved: resolved.id,
              source: sourceTag,
              categoryHint: resolved.categoryHint || undefined,
              evidence: resolved.evidence,
              firstSeen: new Date().toISOString(),
              lastSeen: new Date().toISOString(),
              count: 1,
              status: 'pending',
            })
          }
        }
      }
      // Stash the per-deliverable declared hints so the apply pass below
      // can prefer them over registry/local hints for new skills.
      pendingMetaCategoryHints[d] = declaredCategoryHints
      // Record the hash in the live state bag (only persisted at the end).
      state.metadataHashes[d] = loaded.hash!
      // When metadata is applied we do NOT also run the prose alias scan
      // on the same file's body — that would double-count. The cursor is
      // still advanced so future prose-only updates are picked up normally.
    } else {
      if (loaded.error) {
        metadataParseErrors.push({ file: d, error: loaded.error })
        const now = new Date().toISOString()
        state.metadataParseErrors = [...state.metadataParseErrors, { file: d, error: loaded.error, timestamp: now }].slice(-50)
      }
      if (loaded.hash !== null) {
        // Meta existed but was not re-applied (idempotency); make sure the
        // recorded hash matches what's on disk so re-runs stay stable.
        state.metadataHashes[d] = loaded.hash
      }
      if (loaded.meta == null) {
        fallbackDeliverables.push(d)
      }
      for (const { line } of deltaLines) {
        for (const id of extractSkillIdsFromLine(line)) newSkillMentions.push({ skillId: id, source: `deliverable:${d}:alias` })
      }
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

  // Coalesce mention counts into the delta map.
  const deltaBySkill: Record<string, number> = {}
  for (const m of newSkillMentions) deltaBySkill[m.skillId] = (deltaBySkill[m.skillId] || 0) + 1

  // Build category hints for every id we're about to apply so newly
  // registered skills land in the right category. Layered in priority
  // order (later overrides earlier):
  //   1. local SKILL_CATEGORY_HINT (downstream's source of truth)
  //   2. upstream SKILLS.md registry
  //   3. metadata-declared hints from the run (highest priority — they
  //      reflect the upstream LLM's specific call for this deliverable)
  const categoryHints: Record<string, string> = {}
  for (const [id, hint] of Object.entries(SKILL_CATEGORY_HINT)) categoryHints[id] = hint
  for (const [id, hint] of Object.entries(registry.categoryHints)) categoryHints[id] = hint
  const flatMetaHints: Record<string, string> = {}
  for (const hintsByFile of Object.values(pendingMetaCategoryHints)) {
    for (const [id, hint] of Object.entries(hintsByFile)) flatMetaHints[id] = hint
  }
  for (const [id, hint] of Object.entries(flatMetaHints)) categoryHints[id] = hint

  const increments = applySkillIncrements(deltaBySkill, {
    persist,
    categoryHints,
    evidenceBySkill: pendingMetaEvidence,
    unknownSkillPolicy: policy,
    autoRegisteredOut: runAutoRegistered,
    pendingOut: runPending,
    sourceTag: 'sync',
  })

  const hasChanges = newDeliverables.length > 0 || newTimelineLines > 0 || increments.length > 0 || metadataFilesUsed.length > 0 || metadataParseErrors.length > 0 || runAutoRegistered.length > 0 || runPending.length > 0

  if (hasChanges) {
    state.consumedDeliverables = Array.from(new Set([...state.consumedDeliverables, ...newDeliverables]))
    state.deliverableLineHashes = deliverableLineHashes
    state.deliverableLineCursors = deliverableLineCursors
    state.timelineLineHashes = timelineLineHashes
    state.timelineLineCursor = timelineLineCursor
    if (newTimelineContent) state.timelineLastConsumedHash = simpleHash(newTimelineContent)
    state.skillsIncrementLog = [...state.skillsIncrementLog, ...increments].slice(-500)
    state.autoRegisteredSkills = mergeAutoRegistered(state.autoRegisteredSkills, runAutoRegistered)
    state.pendingSkillCandidates = mergePendingCandidates(state.pendingSkillCandidates, runPending)
  }

  // Maintain the "known" set so subsequent runs can prune pending correctly.
  const skillsAfter = persist ? loadSkillsDataReadOnly() : skillsReadonly
  const knownAfter = new Set<string>(
    skillsAfter ? skillsAfter.categories.flatMap((c) => c.skills.map((s) => s.id)) : []
  )
  state.pendingSkillCandidates = pruneResolvedPending(state.pendingSkillCandidates, knownAfter)

  if (persist) {
    if (hasChanges) state.lastRun = new Date().toISOString()
    // Always save: this persists forward-compatible state migrations such as
    // line cursors even when the current upstream delta is empty.
    saveState(state)
    // Re-render every consumed deliverable to its HTML snapshot. This is
    // cheap (sync-time, sub-100ms for the current upstream corpus) and
    // unconditional so that any future edit to an already-consumed file
    // shows up on the next run without cursor bookkeeping.
    const htmlPathByFile = renderAllDeliverableSnapshots(state.consumedDeliverables)
    writeMeta(state, { newDeliverables, newTimelineLines, increments }, htmlPathByFile, {
      lastRunMetadataFiles: metadataFilesUsed,
      lastRunMetadataParseErrors: metadataParseErrors,
      lastRunFallbackDeliverables: fallbackDeliverables,
      lastRunAutoRegisteredSkills: runAutoRegistered,
    })
  }

  return {
    newDeliverables,
    newTimelineLines,
    skills: aggregateOccurrences(newSkillMentions),
    increments,
    state,
    metadataFilesUsed,
    metadataParseErrors,
    fallbackDeliverables,
    autoRegisteredThisRun: dedupRunAutoRegistered(runAutoRegistered),
    pendingSkillCandidatesThisRun: dedupRunPending(runPending),
    unknownSkillPolicy: policy,
  }
}
