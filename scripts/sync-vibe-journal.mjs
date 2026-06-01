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
 *  --dry-run   Compute the diff without writing to disk
 *  --json      Emit the full SyncResult as JSON to stdout
 *  --quiet     Suppress per-run chatter (still prints the final line)
 */

import { runSync } from '../src/lib/vibeJournalSync.ts'

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const jsonOut = args.includes('--json')
const quiet = args.includes('--quiet')

function log(...parts) {
  if (!quiet) console.log(...parts)
}

try {
  const result = runSync({ dryRun })

  if (jsonOut) {
    console.log(JSON.stringify(result, null, 2))
  } else {
    log(
      `[vibe-journal-sync] newDeliverables=${result.newDeliverables.length}` +
        ` newTimelineLines=${result.newTimelineLines}` +
        ` increments=${result.increments.length}` +
        (dryRun ? ' (dry-run)' : '')
    )
    if (result.newDeliverables.length > 0) {
      log(`  + deliverables: ${result.newDeliverables.join(', ')}`)
    }
    if (result.increments.length > 0) {
      const summary = result.increments
        .map((i) => `${i.skillId} +${i.delta} (->${i.newLevel})`)
        .join(', ')
      log(`  + skills: ${summary}`)
    }
  }
  process.exit(0)
} catch (err) {
  console.error('[vibe-journal-sync] FAILED:', err && err.stack ? err.stack : err)
  process.exit(1)
}
