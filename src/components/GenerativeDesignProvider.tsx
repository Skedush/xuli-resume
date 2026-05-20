import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type ThemeVariant = 'cyber-teal' | 'slate-cyan' | 'night-amber'
type LayoutVariant = 'focus' | 'magazine' | 'split'

interface DesignSelection {
  theme: ThemeVariant
  layout: LayoutVariant
  seed: string
  expiresAt: number
}

interface DesignContextValue extends DesignSelection {
  regenerate: () => void
}

interface PersistedPayload {
  selection: DesignSelection
}

const STORAGE_KEY = 'xuli-resume-generative-design-v1'
const TTL_MS = 1000 * 60 * 60 * 8

const themeVariants: ThemeVariant[] = ['cyber-teal', 'slate-cyan', 'night-amber']
const layoutVariants: LayoutVariant[] = ['focus', 'magazine', 'split']

const DesignContext = createContext<DesignContextValue | undefined>(undefined)

function hashString(value: string): number {
  let h = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed: number): () => number {
  let t = seed
  return () => {
    t += 0x6D2B79F5
    let r = Math.imul(t ^ (t >>> 15), t | 1)
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function createSelection(seed: string): DesignSelection {
  const random = mulberry32(hashString(seed))
  const theme = themeVariants[Math.floor(random() * themeVariants.length)]
  const layout = layoutVariants[Math.floor(random() * layoutVariants.length)]
  return {
    theme,
    layout,
    seed,
    expiresAt: Date.now() + TTL_MS,
  }
}

function readPersistedSelection(): DesignSelection | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as PersistedPayload
    if (!parsed?.selection) return null
    if (parsed.selection.expiresAt <= Date.now()) return null
    return parsed.selection
  } catch {
    return null
  }
}

function persistSelection(selection: DesignSelection): void {
  const payload: PersistedPayload = { selection }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

function freshSeed(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

function resolveInitialSelection(): DesignSelection {
  const persisted = readPersistedSelection()
  if (persisted) return persisted
  const selection = createSelection(freshSeed())
  persistSelection(selection)
  return selection
}

export function GenerativeDesignProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<DesignSelection>(() => resolveInitialSelection())

  const regenerate = useCallback(() => {
    const next = createSelection(freshSeed())
    persistSelection(next)
    setSelection(next)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.themeVariant = selection.theme
    root.dataset.layoutVariant = selection.layout
  }, [selection])

  const value = useMemo<DesignContextValue>(
    () => ({
      ...selection,
      regenerate,
    }),
    [selection, regenerate],
  )

  return <DesignContext.Provider value={value}>{children}</DesignContext.Provider>
}

export function useGenerativeDesign(): DesignContextValue {
  const context = useContext(DesignContext)
  if (!context) {
    throw new Error('useGenerativeDesign must be used within GenerativeDesignProvider')
  }
  return context
}
