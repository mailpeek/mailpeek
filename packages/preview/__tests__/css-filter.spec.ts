import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { filterHtml, filterInlineStyles, filterStyleBlocks } from '../src/utils/css-filter'
import { gmailConfig } from '../src/clients/gmail'
import { outlookConfig } from '../src/clients/outlook'

// ─── filterInlineStyles ──────────────────────────────────────────────────────

describe('filterInlineStyles', () => {
  it('strips position: fixed in Gmail mode', () => {
    const input = '<div style="position: fixed;">Test</div>'
    const { html } = filterInlineStyles(input, gmailConfig)
    expect(html).not.toContain('position')
  })

  it('preserves color: red when stripping position: fixed in Gmail', () => {
    const input = '<div style="color: red; position: fixed;">Test</div>'
    const { html } = filterInlineStyles(input, gmailConfig)
    expect(html).toContain('color: red')
    expect(html).not.toContain('position')
  })

  it('preserves display: flex in Gmail mode (Gmail supports flexbox display)', () => {
    const input = '<div style="display: flex;">Test</div>'
    const { html } = filterInlineStyles(input, gmailConfig)
    expect(html).toContain('display: flex')
  })

  it('strips display: grid in Gmail mode (unsupportedValues match)', () => {
    const input = '<div style="display: grid;">Test</div>'
    const { html } = filterInlineStyles(input, gmailConfig)
    expect(html).not.toContain('display: grid')
  })

  it('strips display: inline-grid in Gmail mode', () => {
    const input = '<div style="display: inline-grid;">Test</div>'
    const { html } = filterInlineStyles(input, gmailConfig)
    expect(html).not.toContain('display: inline-grid')
  })

  it('strips align-items in Gmail mode (flexbox sub-property)', () => {
    const input = '<div style="align-items: center;">Test</div>'
    const { html } = filterInlineStyles(input, gmailConfig)
    expect(html).not.toContain('align-items')
  })

  it('strips border-radius in Outlook mode (Word renderer)', () => {
    const input = '<td style="border-radius: 4px;">Content</td>'
    const { html } = filterInlineStyles(input, outlookConfig)
    expect(html).not.toContain('border-radius')
  })

  it('preserves border-radius in Gmail mode (Gmail supports it)', () => {
    const input = '<td style="border-radius: 4px;">Content</td>'
    const { html } = filterInlineStyles(input, gmailConfig)
    expect(html).toContain('border-radius: 4px')
  })

  it('handles single-quoted style attributes', () => {
    const input = "<div style='position: fixed; color: blue;'>Test</div>"
    const { html } = filterInlineStyles(input, gmailConfig)
    expect(html).not.toContain('position')
    expect(html).toContain('color: blue')
  })

  it('handles multiple elements with style attributes', () => {
    const input = `
      <div style="position: absolute; padding: 10px;">First</div>
      <span style="transform: rotate(45deg); font-size: 14px;">Second</span>
    `
    const { html } = filterInlineStyles(input, gmailConfig)
    expect(html).not.toContain('position')
    expect(html).not.toContain('transform')
    expect(html).toContain('padding: 10px')
    expect(html).toContain('font-size: 14px')
  })

  it('strips display: flex in Outlook mode (Word renderer strips flex)', () => {
    const input = '<div style="display: flex;">Test</div>'
    const { html } = filterInlineStyles(input, outlookConfig)
    expect(html).not.toContain('display: flex')
  })

  it('strips box-shadow in both Gmail and Outlook', () => {
    const input = '<div style="box-shadow: 0 1px 3px rgba(0,0,0,0.12);">Test</div>'
    const { html: gmailHtml } = filterInlineStyles(input, gmailConfig)
    const { html: outlookHtml } = filterInlineStyles(input, outlookConfig)
    expect(gmailHtml).not.toContain('box-shadow')
    expect(outlookHtml).not.toContain('box-shadow')
  })

  it('returns warnings array with descriptive messages for stripped properties', () => {
    const input = '<div style="position: fixed;">Test</div>'
    const { warnings } = filterInlineStyles(input, gmailConfig)
    expect(warnings.length).toBeGreaterThan(0)
    expect(warnings[0]).toContain('[mailpeek]')
    expect(warnings[0]).toContain('Gmail Web')
    expect(warnings[0]).toContain('position')
  })

  it('returns empty warnings when nothing is stripped', () => {
    const input = '<div style="color: red; margin: 10px;">Test</div>'
    const { warnings } = filterInlineStyles(input, gmailConfig)
    expect(warnings).toHaveLength(0)
  })
})

// ─── filterStyleBlocks ───────────────────────────────────────────────────────

describe('filterStyleBlocks', () => {
  it('strips unsupported properties from style blocks', () => {
    const input = `
      <style>
        .container { position: fixed; color: red; }
      </style>
      <div class="container">Test</div>
    `
    const { html } = filterStyleBlocks(input, gmailConfig)
    expect(html).not.toContain('position: fixed')
    expect(html).toContain('color: red')
  })

  it('preserves selectors and supported properties', () => {
    const input = `
      <style>
        .header { background-color: #f0f0f0; font-size: 16px; }
      </style>
    `
    const { html } = filterStyleBlocks(input, gmailConfig)
    expect(html).toContain('.header')
    expect(html).toContain('background-color: #f0f0f0')
    expect(html).toContain('font-size: 16px')
  })

  it('handles multiple style blocks', () => {
    const input = `
      <style>
        .first { transform: rotate(45deg); width: 100%; }
      </style>
      <style>
        .second { animation: spin 1s; color: blue; }
      </style>
    `
    const { html } = filterStyleBlocks(input, gmailConfig)
    expect(html).not.toContain('transform: rotate')
    expect(html).not.toContain('animation: spin')
    expect(html).toContain('width: 100%')
    expect(html).toContain('color: blue')
  })

  it('strips border-radius in style blocks for Outlook', () => {
    const input = `
      <style>
        .button { border-radius: 4px; background-color: blue; }
      </style>
    `
    const { html } = filterStyleBlocks(input, outlookConfig)
    expect(html).not.toContain('border-radius')
    expect(html).toContain('background-color: blue')
  })

  it('returns warnings for properties removed from style blocks', () => {
    const input = `<style>.btn { position: absolute; }</style>`
    const { warnings } = filterStyleBlocks(input, gmailConfig)
    expect(warnings.length).toBeGreaterThan(0)
    expect(warnings[0]).toContain('position')
  })
})

// ─── filterHtml ──────────────────────────────────────────────────────────────

describe('filterHtml', () => {
  it('strips external stylesheets for Gmail (link rel=stylesheet)', () => {
    const input = `
      <html>
        <head>
          <link rel="stylesheet" href="https://example.com/styles.css">
        </head>
        <body><div style="color: red;">Test</div></body>
      </html>
    `
    const { html } = filterHtml(input, gmailConfig)
    expect(html).not.toContain('<link')
    expect(html).toContain('color: red')
  })

  it('strips @import rules for Gmail', () => {
    const input = `
      <style>
        @import url('https://fonts.googleapis.com/css?family=Roboto');
        body { color: black; }
      </style>
    `
    const { html } = filterHtml(input, gmailConfig)
    expect(html).not.toContain('@import')
    expect(html).toContain('body')
    expect(html).toContain('color: black')
  })

  it('combines inline and style block filtering in one pass', () => {
    const input = `
      <style>
        .wrapper { position: fixed; padding: 20px; }
      </style>
      <div class="wrapper" style="transform: scale(2); font-weight: bold;">Test</div>
    `
    const { html } = filterHtml(input, gmailConfig)
    expect(html).not.toContain('position: fixed')
    expect(html).not.toContain('transform')
    expect(html).toContain('padding: 20px')
    expect(html).toContain('font-weight: bold')
  })

  it('returns warnings array with descriptive messages', () => {
    const input = '<div style="position: fixed; transform: scale(2);">Test</div>'
    const { warnings } = filterHtml(input, gmailConfig)
    expect(warnings.length).toBeGreaterThanOrEqual(2)
    const warnText = warnings.join(' ')
    expect(warnText).toContain('[mailpeek]')
    expect(warnText).toContain('Gmail Web')
    expect(warnText).toContain('position')
    expect(warnText).toContain('transform')
  })

  it('returns empty warnings array when nothing is stripped', () => {
    const input = '<div style="color: black; padding: 10px; font-size: 14px;">Test</div>'
    const { warnings } = filterHtml(input, gmailConfig)
    expect(warnings).toHaveLength(0)
  })

  it('strips external stylesheets for Outlook', () => {
    const input = '<link rel="stylesheet" href="styles.css"><p style="color: blue;">Text</p>'
    const { html } = filterHtml(input, outlookConfig)
    expect(html).not.toContain('<link')
    expect(html).toContain('color: blue')
  })
})

// ─── @font-face stripping ────────────────────────────────────────────────────

describe('filterHtml — @font-face', () => {
  it('strips @font-face blocks for Gmail', () => {
    const input = `
      <style>
        @font-face { font-family: 'Custom'; src: url('custom.woff2'); }
        body { color: black; }
      </style>
    `
    const { html } = filterHtml(input, gmailConfig)
    expect(html).not.toContain('@font-face')
    expect(html).not.toContain('custom.woff2')
    expect(html).toContain('color: black')
  })

  it('strips @font-face blocks for Outlook', () => {
    const input = `
      <style>
        @font-face { font-family: 'MyFont'; src: url('myfont.woff'); }
        .header { font-size: 20px; }
      </style>
    `
    const { html } = filterHtml(input, outlookConfig)
    expect(html).not.toContain('@font-face')
    expect(html).toContain('font-size: 20px')
  })

  it('strips multiple @font-face blocks', () => {
    const input = `
      <style>
        @font-face { font-family: 'A'; src: url('a.woff'); }
        @font-face { font-family: 'B'; src: url('b.woff'); }
        body { margin: 0; }
      </style>
    `
    const { html, warnings } = filterHtml(input, gmailConfig)
    expect(html).not.toContain('@font-face')
    expect(html).toContain('margin: 0')
    const fontFaceWarnings = warnings.filter(w => w.includes('@font-face'))
    expect(fontFaceWarnings).toHaveLength(2)
  })
})

// ─── @media query stripping ─────────────────────────────────────────────────

describe('filterHtml — @media queries', () => {
  it('strips @media blocks for Gmail', () => {
    const input = `
      <style>
        body { color: black; }
        @media (max-width: 600px) { .container { width: 100%; } }
      </style>
    `
    const { html } = filterHtml(input, gmailConfig)
    expect(html).not.toContain('@media')
    expect(html).not.toContain('max-width: 600px')
    expect(html).toContain('color: black')
  })

  it('strips @media blocks for Outlook', () => {
    const input = `
      <style>
        @media screen and (min-width: 768px) { .wide { padding: 20px; } }
        .text { font-size: 14px; }
      </style>
    `
    const { html } = filterHtml(input, outlookConfig)
    expect(html).not.toContain('@media')
    expect(html).toContain('font-size: 14px')
  })

  it('returns warnings for stripped @media blocks', () => {
    const input = `
      <style>
        @media (max-width: 600px) { .mobile { display: block; } }
      </style>
    `
    const { warnings } = filterHtml(input, gmailConfig)
    const mediaWarnings = warnings.filter(w => w.includes('@media'))
    expect(mediaWarnings).toHaveLength(1)
    expect(mediaWarnings[0]).toContain('does not support media queries')
  })
})

// ─── Style block character limit ────────────────────────────────────────────

describe('filterHtml — style block character limit', () => {
  it('removes style blocks exceeding 8192 chars for Gmail', () => {
    const bigCss = '.a { color: red; }'.repeat(600) // ~10,800 chars
    const input = `<style>${bigCss}</style><div style="margin: 10px;">Test</div>`
    const { html, warnings } = filterHtml(input, gmailConfig)
    expect(html).not.toContain('<style>')
    expect(html).toContain('margin: 10px')
    const limitWarnings = warnings.filter(w => w.includes('char limit'))
    expect(limitWarnings).toHaveLength(1)
  })

  it('keeps style blocks under 8192 chars for Gmail', () => {
    const input = `<style>.a { color: red; }</style><div>Test</div>`
    const { html } = filterHtml(input, gmailConfig)
    expect(html).toContain('<style>')
    expect(html).toContain('color: red')
  })

  it('does not enforce limit for Outlook (no styleBlockCharLimit)', () => {
    const bigCss = '.a { color: red; }'.repeat(600)
    const input = `<style>${bigCss}</style><div>Test</div>`
    const { html } = filterHtml(input, outlookConfig)
    expect(html).toContain('<style>')
  })
})

// ─── Outlook float stripping ────────────────────────────────────────────────

describe('filterHtml — Outlook float', () => {
  it('strips float in Outlook mode', () => {
    const input = '<div style="float: left; color: blue;">Test</div>'
    const { html } = filterHtml(input, outlookConfig)
    expect(html).not.toContain('float')
    expect(html).toContain('color: blue')
  })

  it('preserves float in Gmail mode (Gmail supports float)', () => {
    const input = '<div style="float: left;">Test</div>'
    const { html } = filterHtml(input, gmailConfig)
    expect(html).toContain('float: left')
  })
})

// ─── Console warnings ────────────────────────────────────────────────────────

describe('console warnings', () => {
  let warnSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
  })

  afterEach(() => {
    warnSpy.mockRestore()
  })

  it('warning messages follow the expected format for Gmail', () => {
    const input = '<div style="position: fixed;">Test</div>'
    const { warnings } = filterInlineStyles(input, gmailConfig)
    expect(warnings[0]).toBe(
      '[mailpeek] Gmail Web: removed "position: fixed" — Gmail does not support CSS positioning'
    )
  })

  it('warning messages follow the expected format for Outlook border-radius', () => {
    const input = '<td style="border-radius: 4px;">Cell</td>'
    const { warnings } = filterInlineStyles(input, outlookConfig)
    expect(warnings[0]).toBe(
      '[mailpeek] Outlook: removed "border-radius: 4px" — Outlook Word renderer does not support border-radius'
    )
  })

  it('emitting warnings to console.warn works correctly', () => {
    const input = '<div style="z-index: 100;">Test</div>'
    const { warnings } = filterHtml(input, gmailConfig)
    warnings.forEach(w => console.warn(w))
    expect(warnSpy).toHaveBeenCalledTimes(1)
    expect(warnSpy).toHaveBeenCalledWith(
      '[mailpeek] Gmail Web: removed "z-index: 100" — Gmail does not support z-index'
    )
  })
})
