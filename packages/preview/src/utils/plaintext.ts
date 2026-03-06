/**
 * Converts HTML email content to a plain text representation.
 * Handles common email HTML patterns: links, line breaks, block elements, entities.
 */
export function htmlToPlainText(html: string): string {
  if (!html) return ''

  let text = html

  // Remove <head> block entirely (style, meta, title etc.)
  text = text.replace(/<head[\s\S]*?<\/head>/gi, '')

  // Remove hidden preheader divs/spans (display:none)
  text = text.replace(/<(div|span)[^>]*style="[^"]*display\s*:\s*none[^"]*"[^>]*>[\s\S]*?<\/\1>/gi, '')

  // Convert links: <a href="url">text</a> → text (url)
  text = text.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, url, linkText) => {
    const clean = linkText.replace(/<[^>]+>/g, '').trim()
    if (!clean || clean === url) return url
    return `${clean} (${url})`
  })

  // Convert <br> and <br/> to newlines
  text = text.replace(/<br\s*\/?>/gi, '\n')

  // Convert block-level closing tags to newlines
  text = text.replace(/<\/(p|div|tr|h[1-6]|li|td|th|blockquote)>/gi, '\n')

  // Convert <hr> to a separator line
  text = text.replace(/<hr[^>]*>/gi, '\n---\n')

  // Strip all remaining HTML tags
  text = text.replace(/<[^>]+>/g, '')

  // Decode common HTML entities
  text = text.replace(/&amp;/g, '&')
  text = text.replace(/&lt;/g, '<')
  text = text.replace(/&gt;/g, '>')
  text = text.replace(/&quot;/g, '"')
  text = text.replace(/&#39;/g, "'")
  text = text.replace(/&apos;/g, "'")
  text = text.replace(/&nbsp;/g, ' ')
  text = text.replace(/&middot;/g, '·')
  text = text.replace(/&copy;/g, '©')
  text = text.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))

  // Remove invisible Unicode characters used for preheader padding
  text = text.replace(/[\u034F\u200B\u200C\u200D\uFEFF]/g, '')

  // Collapse multiple spaces/tabs on the same line to a single space
  text = text.replace(/[^\S\n]+/g, ' ')

  // Trim each line
  text = text.split('\n').map(line => line.trim()).join('\n')

  // Collapse 3+ consecutive newlines to 2
  text = text.replace(/\n{3,}/g, '\n\n')

  // Trim leading/trailing whitespace
  text = text.trim()

  return text
}
