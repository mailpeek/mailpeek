import { describe, it, expect } from 'vitest'
import { htmlToPlainText } from '../src/utils/plaintext'

describe('htmlToPlainText', () => {
  it('returns empty string for empty input', () => {
    expect(htmlToPlainText('')).toBe('')
  })

  it('strips HTML tags', () => {
    expect(htmlToPlainText('<p>Hello <strong>world</strong></p>')).toBe('Hello world')
  })

  it('converts <br> to newlines', () => {
    expect(htmlToPlainText('Line 1<br>Line 2<br/>Line 3')).toBe('Line 1\nLine 2\nLine 3')
  })

  it('converts block-level closing tags to newlines', () => {
    const html = '<p>First paragraph</p><p>Second paragraph</p>'
    const result = htmlToPlainText(html)
    expect(result).toContain('First paragraph')
    expect(result).toContain('Second paragraph')
    expect(result.indexOf('First paragraph')).toBeLessThan(result.indexOf('Second paragraph'))
  })

  it('converts links to text (url) format', () => {
    expect(htmlToPlainText('<a href="https://example.com">Click here</a>'))
      .toBe('Click here (https://example.com)')
  })

  it('uses just the URL when link text matches URL', () => {
    expect(htmlToPlainText('<a href="https://example.com">https://example.com</a>'))
      .toBe('https://example.com')
  })

  it('decodes HTML entities', () => {
    expect(htmlToPlainText('&amp; &lt; &gt; &quot; &#39; &nbsp;'))
      .toBe('& < > " \'')
  })

  it('decodes numeric HTML entities', () => {
    expect(htmlToPlainText('&#169;')).toBe('©')
  })

  it('collapses multiple blank lines to max 2', () => {
    const html = '<p>A</p><p></p><p></p><p></p><p>B</p>'
    const result = htmlToPlainText(html)
    expect(result).not.toMatch(/\n{3,}/)
  })

  it('removes hidden preheader content', () => {
    const html = '<div style="display:none;max-height:0;">Preheader text</div><p>Visible text</p>'
    const result = htmlToPlainText(html)
    expect(result).not.toContain('Preheader text')
    expect(result).toContain('Visible text')
  })

  it('removes head block content', () => {
    const html = '<head><title>Test</title><style>body { color: red; }</style></head><body><p>Content</p></body>'
    const result = htmlToPlainText(html)
    expect(result).not.toContain('body { color: red; }')
    expect(result).toContain('Content')
  })

  it('converts <hr> to separator', () => {
    expect(htmlToPlainText('Above<hr>Below')).toContain('---')
  })

  it('removes invisible Unicode padding characters', () => {
    const html = 'Hello\u034F\u200B\u200Cworld'
    expect(htmlToPlainText(html)).toBe('Helloworld')
  })

  it('trims leading and trailing whitespace', () => {
    expect(htmlToPlainText('  <p> Hello </p>  ')).toBe('Hello')
  })
})
