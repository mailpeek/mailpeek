import { existsSync, readdirSync } from 'fs'
import { join, resolve } from 'path'
import { describe, expect, it } from 'vitest'
import { FREE_SLUGS, TIERS, templates, isFree, tierOf } from './templates'

const DOCS = resolve(__dirname, '../..')
const PUBLIC_HTML = join(DOCS, 'public/html')
const DIST_HTML = join(DOCS, '.vitepress/dist/html')

function listHtml(dir: string) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { recursive: true, encoding: 'utf8' })
    .filter(f => f.endsWith('.html'))
    .map(f => f.replace(/\\/g, '/'))
    .sort()
}

const freePaths = templates
  .filter(isFree)
  .map(t => `${t.category}/${t.slug}.html`)
  .sort()

describe('template metadata', () => {
  it('has 45 templates, 15 per category, with unique slugs', () => {
    expect(templates).toHaveLength(45)
    expect(new Set(templates.map(t => t.slug)).size).toBe(45)
    for (const cat of ['transactional', 'marketing', 'patterns']) {
      expect(templates.filter(t => t.category === cat)).toHaveLength(15)
    }
  })

  it('every free slug is a real template', () => {
    for (const slug of FREE_SLUGS) {
      expect(templates.some(t => t.slug === slug), slug).toBe(true)
    }
  })

  it('maps transactional to Essentials and everything else to Complete', () => {
    for (const t of templates) {
      expect(tierOf(t)).toBe(t.category === 'transactional' ? 'essentials' : 'complete')
    }
  })

  it('has a thumbnail for every template', () => {
    for (const t of templates) {
      expect(existsSync(join(DOCS, 'public/thumbnails', t.category, `${t.slug}.png`)), t.slug).toBe(true)
    }
  })

  it('shows a price for both tiers', () => {
    expect(TIERS.essentials.price).toMatch(/^\$\d+$/)
    expect(TIERS.complete.price).toMatch(/^\$\d+$/)
  })
})

describe('published template HTML', () => {
  it('docs/public/html contains only the free templates', () => {
    expect(listHtml(PUBLIC_HTML)).toEqual(freePaths)
  })

  it.skipIf(!existsSync(DIST_HTML))('the built site contains only the free templates', () => {
    expect(listHtml(DIST_HTML)).toEqual(freePaths)
  })
})
