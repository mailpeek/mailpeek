#!/usr/bin/env node
/**
 * Generate thumbnail screenshots for all 45 email templates.
 *
 * Reads pre-rendered HTML from docs/public/html/{category}/{slug}.html
 * Writes 1200x1600 PNG to docs/public/thumbnails/{category}/{slug}.png
 * (600px viewport @ 2x device pixel ratio — matches existing thumbnails)
 *
 * Usage:
 *   node scripts/generate-thumbnails.mjs
 *
 * First-time setup (run once after pnpm install):
 *   npx playwright install chromium
 */

import { chromium } from 'playwright'
import { fileURLToPath } from 'url'
import { dirname, resolve, join } from 'path'
import { readdirSync, mkdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const CATEGORIES = ['transactional', 'marketing', 'patterns']

async function main() {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.setViewportSize({ width: 600, height: 800 })
  await page.emulateMedia({ colorScheme: 'light' })

  let total = 0
  let success = 0

  for (const category of CATEGORIES) {
    const htmlDir = join(ROOT, 'docs/public/html', category)
    const thumbDir = join(ROOT, 'docs/public/thumbnails', category)
    mkdirSync(thumbDir, { recursive: true })

    const files = readdirSync(htmlDir).filter(f => f.endsWith('.html'))

    for (const file of files) {
      const slug = file.replace('.html', '')
      const htmlPath = join(htmlDir, file)
      const thumbPath = join(thumbDir, `${slug}.png`)
      total++

      try {
        await page.goto(`file://${htmlPath}`, { waitUntil: 'load' })
        await page.screenshot({
          path: thumbPath,
          clip: { x: 0, y: 0, width: 600, height: 800 },
          scale: 'device',
        })
        console.log(`  ✓  ${category}/${slug}`)
        success++
      } catch (err) {
        console.error(`  ✗  ${category}/${slug}: ${err.message}`)
      }
    }
  }

  await browser.close()
  console.log(`\n${success}/${total} thumbnails generated`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
