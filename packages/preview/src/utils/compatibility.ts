// Compatibility scoring utility for @mailpeek/preview
//
// Pure functions — no DOM, no Vue imports — fully SSR-safe.
// Analyzes email HTML against a client's CSS restriction database
// and returns a structured compatibility report with score, grade,
// and individual issues.
//
// Reuses the same regex patterns and restriction-checking logic as
// css-filter.ts, but counts issues instead of removing them.

import type { ClientConfig, CssRestriction } from '../clients/types'

export interface CompatibilityIssue {
  /** CSS property that's unsupported */
  property: string
  /** Example value found */
  value: string
  /** Why it's unsupported */
  reason: string
  /** Where found: inline style or <style> block */
  location: 'inline' | 'style-block'
  /** How many times this property appears */
  occurrences: number
}

export interface CompatibilityReport {
  /** 0-100 score, higher is better */
  score: number
  /** Letter grade */
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  /** Total unique issues found */
  totalIssues: number
  /** Individual issues with details */
  issues: CompatibilityIssue[]
  /** Whether external stylesheets were found (and would be stripped) */
  hasExternalStylesheets: boolean
  /** Whether @import rules were found (and would be stripped) */
  hasAtImport: boolean
}

// ─── Scoring constants ───────────────────────────────────────────────────────

const PENALTY_EXTERNAL_STYLESHEET = 10
const PENALTY_AT_IMPORT = 8
const PENALTY_PER_ISSUE = 3

// ─── Internal helpers ────────────────────────────────────────────────────────

/**
 * Determines if a CSS declaration is restricted by a given rule.
 * Same logic as isRestricted() in css-filter.ts.
 */
function isRestricted(property: string, value: string, restriction: CssRestriction): boolean {
  if (restriction.property !== property) return false
  if (!restriction.unsupportedValues) return true
  const normalizedValue = value.trim().toLowerCase()
  return restriction.unsupportedValues.some(v => normalizedValue.startsWith(v))
}

function calculateGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 90) return 'A'
  if (score >= 75) return 'B'
  if (score >= 50) return 'C'
  if (score >= 25) return 'D'
  return 'F'
}

/**
 * Tracks issues by property name, deduplicating and counting occurrences.
 */
class IssueTracker {
  private map = new Map<string, CompatibilityIssue>()

  add(property: string, value: string, reason: string, location: 'inline' | 'style-block') {
    const key = `${property}:${location}`
    const existing = this.map.get(key)
    if (existing) {
      existing.occurrences++
    } else {
      this.map.set(key, { property, value, reason, location, occurrences: 1 })
    }
  }

  toArray(): CompatibilityIssue[] {
    return Array.from(this.map.values())
  }

  get size(): number {
    return this.map.size
  }
}

// ─── Main function ───────────────────────────────────────────────────────────

/**
 * Analyzes email HTML against a client's CSS restrictions and returns
 * a compatibility report with score, grade, and individual issues.
 *
 * Does NOT modify the HTML — read-only analysis.
 */
export function analyzeCompatibility(html: string, config: ClientConfig): CompatibilityReport {
  const tracker = new IssueTracker()

  // Check for external stylesheets
  const hasExternalStylesheets = config.stripExternalStylesheets === true &&
    /<link[^>]+rel\s*=\s*["']stylesheet["'][^>]*\/?>/gi.test(html)

  // Check for @import rules in <style> blocks
  let hasAtImport = false
  if (config.stripAtImport) {
    const styleBlockRegex = /<style([^>]*)>([\s\S]*?)<\/style>/gi
    let match
    while ((match = styleBlockRegex.exec(html)) !== null) {
      if (/@import\s+[^;]+;/gi.test(match[2])) {
        hasAtImport = true
        break
      }
    }
  }

  // Scan <style> block declarations
  html.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (_match, _attrs: string, blockContent: string) => {
    blockContent.replace(/([a-z-]+)\s*:\s*([^;}\n]+)/gi, (_, property: string, value: string) => {
      const prop = property.trim().toLowerCase()
      const val = value.trim()
      const restriction = config.cssRestrictions.find(r => isRestricted(prop, val, r))
      if (restriction) {
        tracker.add(prop, val, restriction.reason, 'style-block')
      }
      return ''
    })
    return ''
  })

  // Scan inline style attributes (double-quoted)
  html.replace(/style\s*=\s*"([^"]*)"/gi, (_match, styleStr: string) => {
    scanDeclarations(styleStr, config, tracker, 'inline')
    return ''
  })

  // Scan inline style attributes (single-quoted)
  html.replace(/style\s*=\s*'([^']*)'/gi, (_match, styleStr: string) => {
    scanDeclarations(styleStr, config, tracker, 'inline')
    return ''
  })

  // Calculate score
  let score = 100
  if (hasExternalStylesheets) score -= PENALTY_EXTERNAL_STYLESHEET
  if (hasAtImport) score -= PENALTY_AT_IMPORT
  score -= tracker.size * PENALTY_PER_ISSUE
  score = Math.max(0, score)

  const issues = tracker.toArray()

  return {
    score,
    grade: calculateGrade(score),
    totalIssues: issues.length + (hasExternalStylesheets ? 1 : 0) + (hasAtImport ? 1 : 0),
    issues,
    hasExternalStylesheets,
    hasAtImport,
  }
}

/**
 * Scans a CSS style attribute value for restricted declarations.
 */
function scanDeclarations(
  styleStr: string,
  config: ClientConfig,
  tracker: IssueTracker,
  location: 'inline' | 'style-block'
) {
  const declarations = styleStr.split(';').map(d => d.trim()).filter(Boolean)
  for (const decl of declarations) {
    const colonIdx = decl.indexOf(':')
    if (colonIdx === -1) continue
    const property = decl.slice(0, colonIdx).trim().toLowerCase()
    const value = decl.slice(colonIdx + 1).trim()
    const restriction = config.cssRestrictions.find(r => isRestricted(property, value, r))
    if (restriction) {
      tracker.add(property, value, restriction.reason, location)
    }
  }
}
