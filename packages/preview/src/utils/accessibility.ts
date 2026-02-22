// Accessibility scoring utility for @mailpeek/preview
//
// Pure functions — no DOM, no Vue imports — fully SSR-safe.
// Analyzes email HTML for WCAG-relevant accessibility issues
// and returns a structured report with score, grade, and issues.
//
// Client-independent: accessibility is the same regardless of
// Gmail, Outlook, or any other email client.

export type AccessibilitySeverity = 'critical' | 'major' | 'minor'

export interface AccessibilityIssue {
  /** Unique identifier for this check */
  id: string
  /** Human-readable description */
  message: string
  /** Severity level */
  severity: AccessibilitySeverity
  /** Points deducted from score */
  penalty: number
  /** Number of occurrences found */
  occurrences: number
}

export interface AccessibilityReport {
  /** 0-100 score, higher is better */
  score: number
  /** Letter grade */
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  /** Total unique issues found */
  totalIssues: number
  /** Individual issues with details */
  issues: AccessibilityIssue[]
}

// ─── Scoring constants ───────────────────────────────────────────────────────

const PENALTY_CRITICAL = 10
const PENALTY_MAJOR = 5
const PENALTY_MINOR = 3

// ─── Internal helpers ────────────────────────────────────────────────────────

function calculateGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 90) return 'A'
  if (score >= 75) return 'B'
  if (score >= 50) return 'C'
  if (score >= 25) return 'D'
  return 'F'
}

/**
 * Tracks accessibility issues, deduplicating by ID and counting occurrences.
 */
class AccessibilityIssueTracker {
  private map = new Map<string, AccessibilityIssue>()

  add(id: string, message: string, severity: AccessibilitySeverity) {
    const existing = this.map.get(id)
    if (existing) {
      existing.occurrences++
    } else {
      const penalty = severity === 'critical' ? PENALTY_CRITICAL
        : severity === 'major' ? PENALTY_MAJOR
        : PENALTY_MINOR
      this.map.set(id, { id, message, severity, penalty, occurrences: 1 })
    }
  }

  toArray(): AccessibilityIssue[] {
    return Array.from(this.map.values())
  }

  get size(): number {
    return this.map.size
  }
}

// ─── Individual checks ──────────────────────────────────────────────────────

/** CRITICAL: Images missing alt attribute entirely */
function checkMissingAlt(html: string, tracker: AccessibilityIssueTracker) {
  const imgRegex = /<img\b([^>]*)>/gi
  let match
  while ((match = imgRegex.exec(html)) !== null) {
    const attrs = match[1]
    if (!/\balt\s*=/i.test(attrs)) {
      tracker.add('missing-alt', 'Image is missing alt attribute', 'critical')
    }
  }
}

/** CRITICAL: Email body contains only images with no meaningful text */
function checkAllImageEmail(html: string, tracker: AccessibilityIssueTracker) {
  const bodyMatch = /<body[^>]*>([\s\S]*?)<\/body>/i.exec(html)
  const body = bodyMatch ? bodyMatch[1] : html
  const textContent = body.replace(/<[^>]+>/g, '').replace(/&nbsp;/gi, ' ').trim()
  const hasImages = /<img\b/i.test(body)
  if (hasImages && textContent.length < 10) {
    tracker.add('all-image-email', 'Email body contains only images with no meaningful text', 'critical')
  }
}

/** MAJOR: Empty alt on images that appear meaningful (inside links or wide) */
function checkEmptyAltOnMeaningful(html: string, tracker: AccessibilityIssueTracker) {
  const imgRegex = /<img\b([^>]*)>/gi
  let match
  while ((match = imgRegex.exec(html)) !== null) {
    const attrs = match[1]
    // Check for alt="" or alt='' (empty or whitespace-only)
    if (!/\balt\s*=\s*["']\s*["']/i.test(attrs)) continue

    // Check if inside a link
    const before = html.slice(0, match.index)
    const lastAOpen = before.lastIndexOf('<a ')
    const lastAClose = before.lastIndexOf('</a')
    const insideLink = lastAOpen > -1 && lastAOpen > lastAClose

    // Check width > 100
    const widthMatch = /\bwidth\s*=\s*["']?(\d+)/i.exec(attrs)
    const isWide = widthMatch && parseInt(widthMatch[1], 10) > 100

    if (insideLink || isWide) {
      tracker.add('empty-alt-meaningful', 'Image with empty alt="" appears to be meaningful (inside link or large)', 'major')
    }
  }
}

/** MAJOR: Links with non-descriptive text like "click here" */
function checkLinkText(html: string, tracker: AccessibilityIssueTracker) {
  const linkRegex = /<a\b[^>]*>([\s\S]*?)<\/a>/gi
  const badPhrases = /^(click here|click|read more|learn more|here|more|link|details|info)$/i
  let match
  while ((match = linkRegex.exec(html)) !== null) {
    const content = match[1].replace(/<[^>]+>/g, '').trim()
    if (content.length > 0 && badPhrases.test(content)) {
      tracker.add('non-descriptive-link', 'Link uses non-descriptive text like "click here" or "read more"', 'major')
    }
  }
}

/** MAJOR: Missing lang attribute on <html> tag */
function checkMissingLang(html: string, tracker: AccessibilityIssueTracker) {
  const htmlTagMatch = /<html\b([^>]*)>/i.exec(html)
  if (htmlTagMatch) {
    if (!/\blang\s*=/i.test(htmlTagMatch[1])) {
      tracker.add('missing-lang', '<html> tag is missing lang attribute', 'major')
    }
  } else if (html.trim().length > 0) {
    tracker.add('missing-lang', 'Email is missing <html> tag with lang attribute', 'major')
  }
}

/** MAJOR: No heading elements in the email */
function checkMissingHeading(html: string, tracker: AccessibilityIssueTracker) {
  if (!/<h[1-6]\b/i.test(html)) {
    tracker.add('missing-heading', 'Email has no heading elements (h1-h6)', 'major')
  }
}

/** MINOR: Layout tables without role="presentation" */
function checkTableRole(html: string, tracker: AccessibilityIssueTracker) {
  const tableRegex = /<table\b([^>]*)>/gi
  let match
  while ((match = tableRegex.exec(html)) !== null) {
    const attrs = match[1]
    if (/\brole\s*=\s*["'](presentation|none)["']/i.test(attrs)) continue
    // Check if it's a data table (has <th>) — look within next 2000 chars
    const afterTable = html.slice(match.index, match.index + 2000)
    if (/<th\b/i.test(afterTable)) continue
    tracker.add('table-no-role', 'Layout table is missing role="presentation"', 'minor')
  }
}

/** MINOR: Font size below 12px */
function checkSmallFont(html: string, tracker: AccessibilityIssueTracker) {
  const fontSizeRegex = /font-size\s*:\s*(\d+(?:\.\d+)?)\s*px/gi
  let match
  while ((match = fontSizeRegex.exec(html)) !== null) {
    const size = parseFloat(match[1])
    if (size < 12) {
      tracker.add('small-font', 'Font size below 12px may be difficult to read', 'minor')
    }
  }
}

/** MINOR: Skipped heading levels (e.g. h1 → h3) */
function checkSkippedHeadings(html: string, tracker: AccessibilityIssueTracker) {
  const headingRegex = /<h([1-6])\b/gi
  const levels: number[] = []
  let match
  while ((match = headingRegex.exec(html)) !== null) {
    levels.push(parseInt(match[1], 10))
  }
  if (levels.length < 2) return
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      tracker.add('skipped-heading', `Heading levels are skipped (e.g. h${levels[i - 1]} to h${levels[i]})`, 'minor')
      break
    }
  }
}

/** MINOR: Links containing only an image with no title on the link */
function checkImageOnlyLinks(html: string, tracker: AccessibilityIssueTracker) {
  const linkRegex = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi
  let match
  while ((match = linkRegex.exec(html)) !== null) {
    const linkAttrs = match[1]
    const content = match[2].trim()
    // Strip img tags and whitespace — if nothing left, it's image-only
    const stripped = content.replace(/<img\b[^>]*>/gi, '').replace(/\s/g, '')
    if (stripped === '' && /<img\b/i.test(content)) {
      if (!/\btitle\s*=/i.test(linkAttrs)) {
        tracker.add('image-only-link', 'Link contains only an image with no title attribute on the link', 'minor')
      }
    }
  }
}

// ─── Main function ───────────────────────────────────────────────────────────

/**
 * Analyzes email HTML for accessibility issues and returns a report
 * with score, grade, and individual issues.
 *
 * Client-independent — the same checks apply regardless of email client.
 * Does NOT modify the HTML — read-only analysis.
 */
export function analyzeAccessibility(html: string): AccessibilityReport {
  const tracker = new AccessibilityIssueTracker()

  checkMissingAlt(html, tracker)
  checkAllImageEmail(html, tracker)
  checkEmptyAltOnMeaningful(html, tracker)
  checkLinkText(html, tracker)
  checkMissingLang(html, tracker)
  checkMissingHeading(html, tracker)
  checkTableRole(html, tracker)
  checkSmallFont(html, tracker)
  checkSkippedHeadings(html, tracker)
  checkImageOnlyLinks(html, tracker)

  const issues = tracker.toArray()
  let score = 100
  for (const issue of issues) {
    score -= issue.penalty
  }
  score = Math.max(0, score)

  return {
    score,
    grade: calculateGrade(score),
    totalIssues: issues.length,
    issues,
  }
}
