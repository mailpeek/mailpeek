// CSS filtering utility for @mailpeek/preview
//
// Pure functions — no DOM, no Vue imports — fully SSR-safe (Nuxt 3 compatible).
// Processes email HTML strings using regex to strip CSS properties that are
// unsupported by the target email client.
//
// Approach: regex-based, zero external dependencies. Email HTML is structurally
// simple (no CSS nesting, no @layer, flat property:value declarations), making
// regex a reliable and performant approach for this domain.
//
// Known limitation: semicolons inside quoted CSS values (e.g. content: "a;b")
// will cause false splits. This is acceptable for email HTML which rarely uses
// the content property.

import type { ClientConfig, CssRestriction } from '../clients/types'

/**
 * The result of a CSS filtering operation.
 * Warnings are collected during filtering and should be emitted to console.warn
 * after the filter cycle completes (not inside the loop) to avoid duplicate
 * warnings on re-renders.
 */
export interface FilterResult {
  /** The processed HTML with unsupported CSS properties removed */
  html: string
  /** Human-readable messages describing what was removed and why */
  warnings: string[]
}

/**
 * Determines if a CSS declaration (property + value) is restricted by a given rule.
 * Returns true if the restriction matches the property AND:
 *   - unsupportedValues is undefined (all values of this property are restricted), OR
 *   - the trimmed lowercase value starts with one of the unsupportedValues strings
 */
function isRestricted(property: string, value: string, restriction: CssRestriction): boolean {
  if (restriction.property !== property) return false
  if (!restriction.unsupportedValues) return true
  const normalizedValue = value.trim().toLowerCase()
  return restriction.unsupportedValues.some(v => normalizedValue.startsWith(v))
}

/**
 * Filters inline style attributes (style="...") in an HTML string.
 * Handles both double-quoted and single-quoted style attributes.
 * Returns the processed HTML and a warnings array.
 */
export function filterInlineStyles(html: string, config: ClientConfig): FilterResult {
  const warnings: string[] = []

  // Process double-quoted style attributes: style="..."
  let result = html.replace(/style\s*=\s*"([^"]*)"/gi, (_match, styleStr: string) => {
    const { kept, newWarnings } = filterDeclarations(styleStr, config)
    warnings.push(...newWarnings)
    return `style="${kept.join('; ')}"`
  })

  // Process single-quoted style attributes: style='...'
  result = result.replace(/style\s*=\s*'([^']*)'/gi, (_match, styleStr: string) => {
    const { kept, newWarnings } = filterDeclarations(styleStr, config)
    warnings.push(...newWarnings)
    return `style='${kept.join('; ')}'`
  })

  return { html: result, warnings }
}

/**
 * Filters CSS declarations inside <style>...</style> blocks in an HTML string.
 * Processes property:value declarations within each block.
 * Returns the processed HTML and a warnings array.
 */
export function filterStyleBlocks(html: string, config: ClientConfig): FilterResult {
  const warnings: string[] = []

  const result = html.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (_match, attrs: string, blockContent: string) => {
    const filtered = blockContent.replace(/([a-z-]+)\s*:\s*([^;}\n]+)/gi, (declMatch, property: string, value: string) => {
      const prop = property.trim().toLowerCase()
      const val = value.trim()
      const restriction = config.cssRestrictions.find(r => isRestricted(prop, val, r))
      if (restriction) {
        warnings.push(
          `[mailpeek] ${config.name}: removed "${prop}: ${val}" — ${restriction.reason}`
        )
        // Replace the declaration with an empty string to remove it
        return ''
      }
      return declMatch
    })
    return `<style${attrs}>${filtered}</style>`
  })

  return { html: result, warnings }
}

/**
 * Strips <link rel="stylesheet"> tags if config.stripExternalStylesheets is true.
 * Internal helper used by filterHtml.
 */
function stripExternalStylesheets(html: string, config: ClientConfig): FilterResult {
  if (!config.stripExternalStylesheets) {
    return { html, warnings: [] }
  }

  const warnings: string[] = []
  const result = html.replace(/<link[^>]+rel\s*=\s*["']stylesheet["'][^>]*\/?>/gi, () => {
    warnings.push(
      `[mailpeek] ${config.name}: removed external stylesheet (<link rel="stylesheet">) — ${config.name} strips external stylesheets`
    )
    return ''
  })

  return { html: result, warnings }
}

/**
 * Strips @import rules from <style> blocks if config.stripAtImport is true.
 * Internal helper used by filterHtml.
 */
function stripAtImport(html: string, config: ClientConfig): FilterResult {
  if (!config.stripAtImport) {
    return { html, warnings: [] }
  }

  const warnings: string[] = []
  // Only strip @import inside <style> blocks
  const result = html.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (_match, attrs: string, blockContent: string) => {
    const filtered = blockContent.replace(/@import\s+[^;]+;/gi, () => {
      warnings.push(
        `[mailpeek] ${config.name}: removed @import rule — ${config.name} strips @import rules`
      )
      return ''
    })
    return `<style${attrs}>${filtered}</style>`
  })

  return { html: result, warnings }
}

/**
 * Main entry point. Processes an HTML string through all filtering passes:
 * 1. Strip external stylesheets (if config.stripExternalStylesheets)
 * 2. Strip @import rules (if config.stripAtImport)
 * 3. Filter <style> block declarations
 * 4. Filter inline style attributes
 *
 * Returns the filtered HTML and all collected warnings.
 * Warnings should be emitted via console.warn after this call (not inside),
 * to batch them and avoid console spam on reactive re-renders.
 */
export function filterHtml(html: string, config: ClientConfig): FilterResult {
  const allWarnings: string[] = []

  // Pass 1: Strip external stylesheets
  const pass1 = stripExternalStylesheets(html, config)
  allWarnings.push(...pass1.warnings)

  // Pass 2: Strip @import rules
  const pass2 = stripAtImport(pass1.html, config)
  allWarnings.push(...pass2.warnings)

  // Pass 3: Filter <style> block declarations
  const pass3 = filterStyleBlocks(pass2.html, config)
  allWarnings.push(...pass3.warnings)

  // Pass 4: Filter inline style attributes
  const pass4 = filterInlineStyles(pass3.html, config)
  allWarnings.push(...pass4.warnings)

  return { html: pass4.html, warnings: allWarnings }
}

// ─── Internal helpers ────────────────────────────────────────────────────────

/**
 * Parses a CSS style attribute value (the content between the quotes),
 * filters out restricted declarations, and returns kept declarations + warnings.
 */
function filterDeclarations(
  styleStr: string,
  config: ClientConfig
): { kept: string[]; newWarnings: string[] } {
  const declarations = styleStr.split(';').map(d => d.trim()).filter(Boolean)
  const kept: string[] = []
  const newWarnings: string[] = []

  for (const decl of declarations) {
    const colonIdx = decl.indexOf(':')
    if (colonIdx === -1) {
      kept.push(decl)
      continue
    }
    const property = decl.slice(0, colonIdx).trim().toLowerCase()
    const value = decl.slice(colonIdx + 1).trim()

    const restriction = config.cssRestrictions.find(r => isRestricted(property, value, r))
    if (restriction) {
      newWarnings.push(
        `[mailpeek] ${config.name}: removed "${property}: ${value}" — ${restriction.reason}`
      )
    } else {
      kept.push(decl)
    }
  }

  return { kept, newWarnings }
}
