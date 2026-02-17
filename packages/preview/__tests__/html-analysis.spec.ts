import { describe, it, expect } from 'vitest'
import {
  extractSubject,
  extractPreviewText,
  calculateFileSize,
  analyzeEmail,
} from '../src/utils/html-analysis'

describe('extractSubject', () => {
  it('returns the title tag content', () => {
    const html = '<html><head><title>Hello World</title></head><body></body></html>'
    expect(extractSubject(html)).toBe('Hello World')
  })

  it('returns null when no title tag present', () => {
    const html = '<html><head></head><body><p>No title here</p></body></html>'
    expect(extractSubject(html)).toBeNull()
  })

  it('handles multiline title content', () => {
    const html = '<html><head><title>\n  Multi Line Title\n</title></head></html>'
    expect(extractSubject(html)).toBe('Multi Line Title')
  })

  it('is case-insensitive for the title tag', () => {
    const html = '<TITLE>Upper Case Tag</TITLE>'
    expect(extractSubject(html)).toBe('Upper Case Tag')
  })

  it('returns null for empty title tag', () => {
    const html = '<html><head><title></title></head></html>'
    expect(extractSubject(html)).toBeNull()
  })

  it('trims whitespace from title content', () => {
    const html = '<title>   Trimmed Subject   </title>'
    expect(extractSubject(html)).toBe('Trimmed Subject')
  })
})

describe('extractPreviewText', () => {
  it('finds preheader span by class name', () => {
    const html = `<html><body>
      <span class="preheader">This is the preheader text for email clients</span>
      <p>Body content</p>
    </body></html>`
    expect(extractPreviewText(html)).toBe('This is the preheader text for email clients')
  })

  it('finds preheader div by class name', () => {
    const html = `<html><body>
      <div class="preheader">Preview text from div element</div>
      <p>Main content</p>
    </body></html>`
    expect(extractPreviewText(html)).toBe('Preview text from div element')
  })

  it('finds hidden span with display:none style', () => {
    const html = `<html><body>
      <span style="display: none; max-height: 0; overflow: hidden;">Hidden preheader</span>
      <p>Visible body</p>
    </body></html>`
    expect(extractPreviewText(html)).toBe('Hidden preheader')
  })

  it('falls back to first body text when no preheader found', () => {
    const html = `<html><body>
      <p>This is the first paragraph of the email body content.</p>
    </body></html>`
    const result = extractPreviewText(html)
    expect(result).toContain('This is the first paragraph')
  })

  it('truncates extracted text at 100 characters', () => {
    const longText = 'A'.repeat(150)
    const html = `<html><body><span class="preheader">${longText}</span></body></html>`
    const result = extractPreviewText(html)
    expect(result).toHaveLength(100)
    expect(result).toBe('A'.repeat(100))
  })

  it('truncates body fallback text at 100 characters', () => {
    const longText = 'B'.repeat(200)
    const html = `<html><body><p>${longText}</p></body></html>`
    const result = extractPreviewText(html)
    expect(result).toHaveLength(100)
  })

  it('returns null for html with no text content', () => {
    const html = '<html><head></head><body></body></html>'
    expect(extractPreviewText(html)).toBeNull()
  })

  it('strips HTML tags from preheader span content', () => {
    const html = `<html><body>
      <span class="preheader"><b>Bold</b> preheader <em>text</em></span>
    </body></html>`
    expect(extractPreviewText(html)).toBe('Bold preheader text')
  })

  it('preheader class span takes priority over body fallback', () => {
    const html = `<html><body>
      <span class="preheader">Explicit preheader</span>
      <p>Much longer body content that should not be used as the preheader</p>
    </body></html>`
    expect(extractPreviewText(html)).toBe('Explicit preheader')
  })
})

describe('calculateFileSize', () => {
  it('returns bytes, formatted string, and isWarning for small html', () => {
    const html = '<p>Hello</p>'
    const result = calculateFileSize(html)
    expect(result.bytes).toBeGreaterThan(0)
    expect(result.formatted).toMatch(/^\d+\.\d KB$/)
    expect(result.isWarning).toBe(false)
  })

  it('formats size with one decimal place', () => {
    const html = '<p>Test</p>'
    const result = calculateFileSize(html)
    // Should be like "0.0 KB" or "0.1 KB"
    expect(result.formatted).toMatch(/\d+\.\d KB/)
  })

  it('isWarning is false for html under 100KB', () => {
    const html = '<p>' + 'a'.repeat(1000) + '</p>'
    const result = calculateFileSize(html)
    expect(result.isWarning).toBe(false)
  })

  it('isWarning is true for html over 100KB', () => {
    // 102401 bytes of content will exceed 100KB threshold
    const largeContent = 'x'.repeat(102401)
    const result = calculateFileSize(largeContent)
    expect(result.isWarning).toBe(true)
    expect(result.bytes).toBeGreaterThan(102400)
  })

  it('handles empty string correctly', () => {
    const result = calculateFileSize('')
    expect(result.bytes).toBe(0)
    expect(result.formatted).toBe('0.0 KB')
    expect(result.isWarning).toBe(false)
  })

  it('byte count matches Blob size for UTF-8 content', () => {
    const html = '<p>Hello</p>'
    const result = calculateFileSize(html)
    expect(result.bytes).toBe(new Blob([html]).size)
  })
})

describe('analyzeEmail', () => {
  it('returns complete EmailMetadata object with all fields', () => {
    const html = `<html>
      <head><title>Test Email</title></head>
      <body>
        <span class="preheader">Preview snippet</span>
        <p>Body content</p>
      </body>
    </html>`
    const result = analyzeEmail(html)
    expect(result.subject).toBe('Test Email')
    expect(result.previewText).toBe('Preview snippet')
    expect(result.fileSize).toBeDefined()
    expect(result.fileSize.bytes).toBeGreaterThan(0)
    expect(result.fileSize.formatted).toMatch(/\d+\.\d KB/)
  })

  it('returns null subject and null previewText when html has no relevant content', () => {
    const html = '<html><head></head><body></body></html>'
    const result = analyzeEmail(html)
    expect(result.subject).toBeNull()
    expect(result.previewText).toBeNull()
    expect(result.fileSize.bytes).toBeGreaterThan(0)
  })
})
