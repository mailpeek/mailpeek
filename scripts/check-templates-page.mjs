#!/usr/bin/env node
/**
 * Browser checks for the /templates page against the built docs site.
 *
 * - Pricing cards and buy buttons show the prices from theme/templates.ts
 * - Paid templates open an image-only modal and never request their HTML
 * - Paid HTML URLs return 404
 * - Free templates open a live EmailPreview
 * - No horizontal scroll at 375px with a modal open
 *
 * Usage (build first):
 *   pnpm docs:build && pnpm test:site:e2e
 *
 * First-time setup: npx playwright install chromium
 */

import { spawn } from 'child_process'
import assert from 'assert/strict'
import { chromium } from 'playwright'

const PORT = 4179
const BASE = `http://localhost:${PORT}`
const PAID = { slug: 'black-friday', path: '/html/marketing/black-friday.html' }
const FREE = { slug: 'welcome' }

const server = spawn('npx', ['vitepress', 'preview', 'docs', '--port', String(PORT)], {
  stdio: 'ignore',
  detached: true,
})

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(BASE)).ok) return
    } catch {}
    await new Promise(r => setTimeout(r, 500))
  }
  throw new Error(`Preview server did not start on ${BASE} — did you run pnpm docs:build?`)
}

let failed = 0
async function check(name, fn) {
  try {
    await fn()
    console.log(`  ✓  ${name}`)
  } catch (err) {
    failed++
    console.error(`  ✗  ${name}\n     ${err.message}`)
  }
}

let browser
try {
  await waitForServer()
  // CHROMIUM_PATH lets you use a system Chromium instead of Playwright's download
  browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH })

  await check('paid template HTML returns 404', async () => {
    const res = await fetch(BASE + PAID.path)
    assert.equal(res.status, 404)
  })

  for (const width of [1280, 375]) {
    console.log(`\n${width}px`)
    const page = await browser.newPage({ viewport: { width, height: 900 } })
    const htmlRequests = []
    page.on('request', req => {
      if (new URL(req.url()).pathname.startsWith('/html/')) htmlRequests.push(new URL(req.url()).pathname)
    })
    await page.goto(`${BASE}/templates`)

    await check('buy buttons show prices', async () => {
      const buttons = await page.locator('.pricing__cta').allTextContents()
      assert.match(buttons[0], /Get Essentials — \$\d+/)
      assert.match(buttons[1], /Get Complete — \$\d+/)
    })

    await check('paid template opens image modal without loading HTML', async () => {
      await page.click(`#${PAID.slug}`)
      await page.locator('.gallery__modal-image').waitFor()
      assert.equal(await page.locator('.gallery__modal iframe').count(), 0)
      assert.match(await page.locator('.gallery__modal-cta').textContent(), /In Complete — from \$\d+/)
      assert.deepEqual(htmlRequests, [])
    })

    await check('no horizontal scroll with paid modal open', async () => {
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      assert.ok(overflow <= 0, `page is ${overflow}px wider than the viewport`)
    })

    await page.click('.gallery__modal-close')

    await check('free template opens live preview', async () => {
      await page.click(`#${FREE.slug}`)
      await page.locator('.gallery__modal iframe').first().waitFor({ timeout: 5000 })
      assert.match(await page.locator('.gallery__modal-cta').textContent(), /In Essentials & Complete — from \$\d+/)
    })

    await check('no horizontal scroll with free modal open', async () => {
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      assert.ok(overflow <= 0, `page is ${overflow}px wider than the viewport`)
    })

    await page.close()
  }
} finally {
  await browser?.close()
  process.kill(-server.pid)
}

console.log(failed ? `\n${failed} check(s) failed` : '\nAll checks passed')
process.exit(failed ? 1 : 0)
