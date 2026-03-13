#!/usr/bin/env node
/**
 * Generate Product Hunt gallery image: a 1270×760 grid of all 45 template thumbnails.
 * Output: docs/public/ph-assets/template-grid.png
 *
 * Usage:
 *   node scripts/generate-ph-assets.mjs
 */

import { chromium } from 'playwright'
import { mkdirSync, writeFileSync, unlinkSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const THUMB_DIR = resolve(ROOT, 'docs/public/thumbnails')
const OUT_DIR = resolve(ROOT, 'docs/public/ph-assets')

const TEMPLATES = [
  // Transactional
  'transactional/welcome',
  'transactional/password-reset',
  'transactional/email-verification',
  'transactional/magic-link-login',
  'transactional/two-factor-auth',
  'transactional/invitation',
  'transactional/invoice',
  'transactional/order-confirmation',
  'transactional/shipping-notification',
  'transactional/subscription-confirmation',
  'transactional/payment-failed',
  'transactional/trial-ending',
  'transactional/feedback-request',
  'transactional/account-deactivation',
  'transactional/contact-form-reply',
  // Marketing
  'marketing/newsletter-single',
  'marketing/newsletter-multi-story',
  'marketing/product-launch',
  'marketing/product-update',
  'marketing/promotional-sale',
  'marketing/promotional-coupon',
  'marketing/black-friday',
  'marketing/event-invitation',
  'marketing/event-reminder',
  'marketing/re-engagement',
  'marketing/referral',
  'marketing/survey',
  'marketing/seasonal',
  'marketing/milestone',
  'marketing/case-study',
  // Patterns
  'patterns/hero-full-width',
  'patterns/hero-image-left',
  'patterns/cta-banner',
  'patterns/feature-grid2-col',
  'patterns/feature-grid3-col',
  'patterns/feature-list',
  'patterns/pricing-table2-col',
  'patterns/pricing-table3-col',
  'patterns/testimonial-single',
  'patterns/testimonial-carousel',
  'patterns/social-proof-bar',
  'patterns/stats-row',
  'patterns/header-logo-nav',
  'patterns/footer-full',
  'patterns/footer-minimal',
]

const COLS = 9
const ROWS = 5
const W = 1270
const H = 760
const PAD_X = 24
const PAD_TOP = 24
const PAD_BOT = 20
const HEADER_H = 56
const GAP = 7

const gridW = W - PAD_X * 2
const gridH = H - PAD_TOP - HEADER_H - 12 - PAD_BOT
const thumbW = Math.floor((gridW - GAP * (COLS - 1)) / COLS)
const thumbH = Math.floor((gridH - GAP * (ROWS - 1)) / ROWS)

const thumbPaths = TEMPLATES.map(t => `file://${THUMB_DIR}/${t}.png`)

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${W}px;
    height: ${H}px;
    background: #0d1520;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  .header {
    padding: ${PAD_TOP}px ${PAD_X}px 12px;
    height: ${PAD_TOP + HEADER_H}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
  }
  .eyebrow {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #00b2ad;
  }
  .title {
    font-size: 22px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.03em;
    line-height: 1;
  }
  .title span {
    color: #00b2ad;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(${COLS}, ${thumbW}px);
    grid-template-rows: repeat(${ROWS}, ${thumbH}px);
    gap: ${GAP}px;
    padding: 0 ${PAD_X}px;
  }
  .thumb {
    width: ${thumbW}px;
    height: ${thumbH}px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.06);
  }
  .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    display: block;
  }
</style>
</head>
<body>
  <div class="header">
    <div class="eyebrow">Mailpeek Templates</div>
    <div class="title">45 production-ready email templates for <span>Vue</span></div>
  </div>
  <div class="grid">
    ${thumbPaths.map(src => `<div class="thumb"><img src="${src}" /></div>`).join('\n    ')}
  </div>
</body>
</html>`

async function main() {
  mkdirSync(OUT_DIR, { recursive: true })

  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.setViewportSize({ width: W, height: H })

  const tmpHtml = resolve(OUT_DIR, '_tmp_grid.html')
  writeFileSync(tmpHtml, html)
  await page.goto(`file://${tmpHtml}`, { waitUntil: 'networkidle' })

  // Wait for all images to load
  await page.waitForFunction(() => {
    const imgs = document.querySelectorAll('img')
    return [...imgs].every(img => img.complete && img.naturalWidth > 0)
  }, { timeout: 15000 })

  const outPath = resolve(OUT_DIR, 'template-grid.png')
  await page.screenshot({
    path: outPath,
    clip: { x: 0, y: 0, width: W, height: H },
    scale: 'css',
  })

  await browser.close()
  unlinkSync(tmpHtml)
  console.log(`✓ ${outPath}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
