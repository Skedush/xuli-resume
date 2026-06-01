/**
 * Shared skills data model — consumed by the Skills page in the browser
 * and by the vibe-coding-journal downstream sync script on the server.
 *
 * The shape is intentionally small and stable so the sync script can
 * load + merge JSON without TypeScript gymnastics on the Node side.
 */

export interface SkillEntry {
  id: string
  name: string
  level: number
  url?: string
}

export interface SkillCategory {
  id: string
  title: string
  icon: string
  skills: SkillEntry[]
}

export interface SkillsData {
  version: number
  maxLevel: number
  categories: SkillCategory[]
  tools: string[]
}

export const MAX_SKILL_LEVEL = 95

/**
 * Find an existing skill by id, or by case-insensitive name match,
 * within a category. Returns null if not present.
 */
export function findSkill(
  data: SkillsData,
  categoryId: string,
  skillIdOrName: string
): { category: SkillCategory; skill: SkillEntry } | null {
  const category = data.categories.find((c) => c.id === categoryId)
  if (!category) return null
  const lower = skillIdOrName.toLowerCase()
  const skill =
    category.skills.find((s) => s.id === skillIdOrName) ||
    category.skills.find((s) => s.name.toLowerCase() === lower)
  if (!skill) return null
  return { category, skill }
}

/**
 * Clamp a level to the maximum allowed by the data.
 */
export function clampLevel(level: number, max = MAX_SKILL_LEVEL): number {
  if (Number.isNaN(level)) return 0
  if (level < 0) return 0
  if (level > max) return max
  return Math.round(level)
}
