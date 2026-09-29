#!/usr/bin/env node
/**
 * Browser checks for /templates and the /playground template picker,
 * against the built docs site.
 *
 * /templates
 * - Pricing cards show the prices from theme/templates.ts
 * - Paid templates open an image-only modal and never request their HTML
 * - Paid HTML URLs return 404
 * - Free templates open a live EmailPreview
 * - No horizontal scroll at 375px with a modal open
 *
 * /playground
 * - Picker lists 3 free templates and 42 locked ones linking to /templates#<slug>
 * - Loading a free template fills the editor and preview and shows the upsell bar
 * - Only free template HTML is ever requested
 * - The empty-state link opens the picker
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

    await check('pricing cards show prices', async () => {
      const prices = await page.locator('.pricing__price').allTextContents()
      assert.equal(prices.length, 2)
      for (const p of prices) assert.match(p, /^\$\d+$/)
    })

    await check('paid template opens image modal without loading HTML', async () => {
      await page.click(`#${PAID.slug}`)
      await page.locator('.gallery__modal-image').waitFor()
      assert.equal(await page.locator('.gallery__modal iframe').count(), 0)
      assert.match(await page.locator('.gallery__modal-cta').textContent(), /^\s*Get Complete for \$\d+\s*$/)
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
      assert.match(await page.locator('.gallery__modal-cta').textContent(), /^\s*Get Essentials for \$\d+\s*$/)
    })

    await check('no horizontal scroll with free modal open', async () => {
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      assert.ok(overflow <= 0, `page is ${overflow}px wider than the viewport`)
    })

    await page.close()

    const pg = await browser.newPage({ viewport: { width, height: 900 } })
    const pgHtmlRequests = []
    pg.on('request', req => {
      const path = new URL(req.url()).pathname
      if (path.startsWith('/html/')) pgHtmlRequests.push(path)
    })
    await pg.goto(`${BASE}/playground`)

    await check('playground: empty-state link opens the picker', async () => {
      await pg.click('.preview-placeholder__link')
      await pg.locator('.picker').waitFor()
    })

    await check('playground: picker lists 3 free and 42 locked templates', async () => {
      assert.equal(await pg.locator('.picker button.picker__item').count(), 3)
      const hrefs = await pg.locator('.picker a.picker__item--locked').evaluateAll(els => els.map(e => e.getAttribute('href')))
      assert.equal(hrefs.length, 42)
      for (const h of hrefs) assert.match(h, /^\/templates#[a-z0-9-]+$/)
    })

    await check('playground: no horizontal scroll with picker open', async () => {
      const overflow = await pg.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      assert.ok(overflow <= 0, `page is ${overflow}px wider than the viewport`)
    })

    await check('playground: loading a free template fills editor, preview and bar', async () => {
      await pg.locator('.picker button.picker__item', { hasText: 'Welcome' }).click()
      await pg.locator('.template-bar').waitFor({ timeout: 5000 })
      assert.equal(await pg.locator('.picker').count(), 0)
      assert.ok((await pg.inputValue('.html-textarea')).includes('<html'))
      await pg.locator('.playground-preview iframe').first().waitFor()
      assert.match(await pg.locator('.template-bar').textContent(), /Welcome template.*42 more/s)
      assert.equal(await pg.locator('.template-bar a').getAttribute('href'), '/templates')
    })

    await check('playground: no horizontal scroll with a template loaded', async () => {
      const overflow = await pg.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      assert.ok(overflow <= 0, `page is ${overflow}px wider than the viewport`)
    })

    await check('playground: bar can be dismissed', async () => {
      await pg.click('.template-bar__close')
      assert.equal(await pg.locator('.template-bar').count(), 0)
    })

    await check('playground: only free template HTML was requested', async () => {
      assert.deepEqual(pgHtmlRequests, ['/html/transactional/welcome.html'])
    })

    await pg.close()
  }
} finally {
  await browser?.close()
  process.kill(-server.pid)
}

console.log(failed ? `\n${failed} check(s) failed` : '\nAll checks passed')
process.exit(failed ? 1 : 0)
