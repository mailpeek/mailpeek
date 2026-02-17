// HTML analysis utilities for email metadata extraction

export interface EmailMetadata {
  subject: string | null
  previewText: string | null
  fileSize: { bytes: number; formatted: string; isWarning: boolean }
}

/**
 * Extract the email subject from the HTML <title> tag.
 * Returns trimmed content or null if not found.
 */
export function extractSubject(html: string): string | null {
  // Case-insensitive match for <title>...</title>, supports multiline content
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  if (!match) return null
  const trimmed = match[1].trim()
  return trimmed.length > 0 ? trimmed : null
}

/**
 * Extract the preview text (preheader) from the email HTML.
 *
 * Strategy (in priority order):
 * 1. <span class="preheader">...</span>
 * 2. <div class="preheader">...</div>
 * 3. First <span style="...display: none...">...</span> in the body
 * 4. Fall back to first ~100 visible characters of body text
 *
 * Returns null if no text content found.
 */
export function extractPreviewText(html: string): string | null {
  // 1. Check for explicit preheader class on span
  const spanPreheaderMatch = html.match(/<span[^>]*class="[^"]*preheader[^"]*"[^>]*>([\s\S]*?)<\/span>/i)
  if (spanPreheaderMatch) {
    const text = stripTags(spanPreheaderMatch[1]).trim()
    if (text.length > 0) return truncate(text, 100)
  }

  // 2. Check for explicit preheader class on div
  const divPreheaderMatch = html.match(/<div[^>]*class="[^"]*preheader[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
  if (divPreheaderMatch) {
    const text = stripTags(divPreheaderMatch[1]).trim()
    if (text.length > 0) return truncate(text, 100)
  }

  // 3. Check for first hidden span (display:none style) in the body
  const hiddenSpanMatch = html.match(/<span[^>]*style="[^"]*display\s*:\s*none[^"]*"[^>]*>([\s\S]*?)<\/span>/i)
  if (hiddenSpanMatch) {
    const text = stripTags(hiddenSpanMatch[1]).trim()
    if (text.length > 0) return truncate(text, 100)
  }

  // 4. Fall back: extract first visible body text content
  // Extract body content (between <body> tags if present, otherwise use whole html)
  let bodyContent = html
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  if (bodyMatch) {
    bodyContent = bodyMatch[1]
  }

  // Strip all tags and collapse whitespace
  const visibleText = stripTags(bodyContent).replace(/\s+/g, ' ').trim()
  if (visibleText.length > 0) return truncate(visibleText, 100)

  return null
}

/**
 * Calculate the file size of the HTML string.
 * Uses Blob to correctly measure UTF-8 byte length.
 * Warning threshold: 100KB (102400 bytes).
 */
export function calculateFileSize(html: string): { bytes: number; formatted: string; isWarning: boolean } {
  const bytes = new Blob([html]).size
  const kb = bytes / 1024
  const formatted = kb.toFixed(1) + ' KB'
  const isWarning = bytes > 102400
  return { bytes, formatted, isWarning }
}

/**
 * Convenience function: analyze email HTML and return complete metadata.
 */
export function analyzeEmail(html: string): EmailMetadata {
  return {
    subject: extractSubject(html),
    previewText: extractPreviewText(html),
    fileSize: calculateFileSize(html),
  }
}

// --- Helpers ---

/** Strip all HTML tags from a string */
function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, '')
}

/** Truncate string to maxLen characters, no ellipsis */
function truncate(text: string, maxLen: number): string {
  return text.length > maxLen ? text.slice(0, maxLen) : text
}
