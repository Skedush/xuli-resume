#!/usr/bin/env node
/**
 * scripts/sync-vibe-journal.mjs
 *
 * Standalone downstream sync runner.
 *
 * Designed to be called by a future unified cron pipeline, e.g.
 *   node --experimental-strip-types scripts/sync-vibe-journal.mjs
 *
 * Behavior:
 *  - Loads the TS sync library
 *  - Runs runSync() (idempotent)
 *  - Prints a short summary
 *  - Exits non-zero on failure
 *
 * Flags:
 *  --dry-run                       Compute the diff without writing to disk
 *  --json                          Emit the full SyncResult as JSON to stdout
 *  --quiet                         Suppress per-run chatter (still prints the final line)
 *  --policy=auto-register|pending-review
 *                                  Override UNKNOWN_SKILL_POLICY for this run
 *                                  (default: auto-register)
 */

import { runSync } from '../src/lib/vibeJournalSync.ts'

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const jsonOut = args.includes('--json')
const quiet = args.includes('--quiet')
const policyArg = (() => {
  const flag = args.find((a) => a.startsWith('--policy='))
  if (!flag) return undefined
  const value = flag.slice('--policy='.length)
  if (value !== 'auto-register' && value !== 'pending-review') {
    throw new Error(`invalid --policy value: ${value} (expected auto-register|pending-review)`)
  }
  return value
})()

function log(...parts) {
  if (!quiet) console.log(...parts)
}

try {
  const result = runSync({ dryRun, unknownSkillPolicy: policyArg })

  if (jsonOut) {
    console.log(JSON.stringify(result, null, 2))
  } else {
    log(
      `[vibe-journal-sync] newDeliverables=${result.newDeliverables.length}` +
        ` newTimelineLines=${result.newTimelineLines}` +
        ` increments=${result.increments.length}` +
        ` metadata=${result.metadataFilesUsed.length}` +
        ` fallback=${result.fallbackDeliverables.length}` +
        ` autoRegistered=${result.autoRegisteredThisRun.length}` +
        ` pending=${result.pendingSkillCandidatesThisRun.length}` +
        ` policy=${result.unknownSkillPolicy}` +
        (dryRun ? ' (dry-run)' : '')
    )
    if (result.metadataFilesUsed.length > 0) {
      for (const f of result.metadataFilesUsed) log(`  + metadata: ${f}`)
    }
    if (result.fallbackDeliverables.length > 0) {
      for (const f of result.fallbackDeliverables) log(`  ~ fallback (no usable meta): ${f}`)
    }
    if (result.metadataParseErrors.length > 0) {
      for (const e of result.metadataParseErrors) log(`  ! meta parse error: ${e.file}: ${e.error}`)
    }
    if (result.autoRegisteredThisRun.length > 0) {
      for (const a of result.autoRegisteredThisRun) {
        log(`  + auto-registered: ${a.name} -> ${a.resolved} (${a.categoryHint || 'fallback-category'}) [${a.reason}]`)
      }
    }
    if (result.pendingSkillCandidatesThisRun.length > 0) {
      for (const p of result.pendingSkillCandidatesThisRun) {
        log(`  ? pending review: ${p.name} -> ${p.resolved} (${p.categoryHint || 'fallback-category'})`)
      }
    }
    if (result.newDeliverables.length > 0) {
      log(`  + deliverables: ${result.newDeliverables.join(', ')}`)
    }
    if (result.increments.length > 0) {
      const summary = result.increments
        .map((i) => `${i.skillId} +${i.delta} (->${i.newLevel})`)
        .join(', ')
      log(`  + skills: ${summary}`)
    }
    if (dryRun) log('  ! dry-run: no files were written')
  }
  process.exit(0)
} catch (err) {
  console.error('[vibe-journal-sync] FAILED:', err && err.stack ? err.stack : err)
  process.exit(1)
}
