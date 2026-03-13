#!/usr/bin/env node
/**
 * Pack @mailpeek/templates into two tgz files for Polar distribution:
 *
 *   mailpeek-templates-essentials-x.x.x.tgz  (15 transactional templates)
 *   mailpeek-templates-complete-x.x.x.tgz     (all 45 templates)
 *
 * Both files land in the repo root, ready to upload to Polar.
 *
 * Usage:
 *   node scripts/pack-templates.mjs
 *   pnpm pack:templates
 */

import { readFileSync, writeFileSync, renameSync, cpSync, rmSync, existsSync, mkdirSync } from 'fs'
import { execSync } from 'child_process'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const pkgDir = resolve(root, 'packages/templates')
const pkgJsonPath = resolve(pkgDir, 'package.json')
const distIndexJs = resolve(pkgDir, 'dist/index.js')
const distIndexDts = resolve(pkgDir, 'dist/index.d.ts')
const htmlSrc = resolve(root, 'docs/public/html')
const htmlDest = resolve(pkgDir, 'html')
const polarDir = resolve(root, 'polar')

// ── Sync README version ────────────────────────────────────────────────────

const readmePath = resolve(pkgDir, 'README.md')
const readmeOriginal = readFileSync(readmePath, 'utf8')
const readmeUpdated = readmeOriginal.replace(
  /mailpeek-templates-(essentials|complete)-[\d.]+\.tgz/g,
  (_, tier) => `mailpeek-templates-${tier}-${JSON.parse(readFileSync(pkgJsonPath, 'utf8')).version}.tgz`
)
if (readmeUpdated !== readmeOriginal) {
  writeFileSync(readmePath, readmeUpdated)
  console.log('Updated README.md version snippets')
}

// ── Build ──────────────────────────────────────────────────────────────────

console.log('Building @mailpeek/templates...')
execSync('pnpm build', { cwd: pkgDir, stdio: 'inherit' })
console.log()

// Read originals after build (prepack may have changed them)
const originalPkgJson = readFileSync(pkgJsonPath, 'utf8')
const originalIndexJs = readFileSync(distIndexJs, 'utf8')
const originalIndexDts = readFileSync(distIndexDts, 'utf8')

const pkg = JSON.parse(originalPkgJson)
const { version } = pkg

// ── Helpers ────────────────────────────────────────────────────────────────

function writeModifiedPkg(overrides) {
  const modified = {
    ...pkg,
    dependencies: {
      ...pkg.dependencies,
      '@mailpeek/components': '^0.1.1', // replace workspace:* for buyers
    },
    ...overrides,
  }
  writeFileSync(pkgJsonPath, JSON.stringify(modified, null, 2) + '\n')
}

function restore() {
  writeFileSync(pkgJsonPath, originalPkgJson)
  writeFileSync(distIndexJs, originalIndexJs)
  writeFileSync(distIndexDts, originalIndexDts)
  if (existsSync(htmlDest)) rmSync(htmlDest, { recursive: true })
}

function copyHtml(categories) {
  for (const cat of categories) {
    cpSync(resolve(htmlSrc, cat), resolve(htmlDest, cat), { recursive: true })
  }
}

function runPack(outputName) {
  mkdirSync(polarDir, { recursive: true })
  const packed = execSync('npm pack --ignore-scripts', {
    cwd: pkgDir,
    encoding: 'utf8',
  }).trim()
  const dest = resolve(polarDir, outputName)
  renameSync(resolve(pkgDir, packed), dest)
  console.log(`  ✓ polar/${outputName}`)
}

// ── Transactional-only types for Essentials index.d.ts ────────────────────

const TRANSACTIONAL_TYPES = [
  'TemplateTheme',
  'WelcomeEmailProps',
  'PasswordResetEmailProps',
  'EmailVerificationEmailProps',
  'MagicLinkLoginEmailProps',
  'TwoFactorAuthEmailProps',
  'InvitationEmailProps',
  'InvoiceItem',
  'InvoiceEmailProps',
  'OrderConfirmationEmailProps',
  'ShippingNotificationEmailProps',
  'SubscriptionConfirmationEmailProps',
  'PaymentFailedEmailProps',
  'TrialEndingEmailProps',
  'FeedbackRequestEmailProps',
  'AccountDeactivationEmailProps',
  'ContactFormReplyEmailProps',
]

function buildEssentialsDts(fullDts) {
  return fullDts
    .split('\n')
    .filter(line => {
      // Keep transactional-only export type { ... } line — rebuilt below
      if (line.startsWith('export type {')) return false
      // Drop marketing/patterns component exports
      if (line.includes('./marketing/') || line.includes('./patterns/')) return false
      return true
    })
    .join('\n')
    .trimStart()
    // Prepend filtered type exports
    .replace(
      /^/,
      `export type { ${TRANSACTIONAL_TYPES.join(', ')} } from './types';\n`,
    )
}

// ── Pack Essentials ────────────────────────────────────────────────────────

try {
  console.log('Packing Essentials (transactional only)...')

  copyHtml(['transactional'])

  // Transactional-only index.js: re-export from the transactional subindex
  writeFileSync(distIndexJs, `export * from './transactional/index.js';\n`)
  writeFileSync(distIndexDts, buildEssentialsDts(originalIndexDts))

  writeModifiedPkg({
    files: [
      'dist/index.js',
      'dist/index.d.ts',
      'dist/types.d.ts',
      'dist/shared',
      'dist/transactional',
      'html',
      'README.md',
    ],
    exports: {
      '.': {
        types: './dist/index.d.ts',
        import: './dist/index.js',
      },
      './transactional': {
        types: './dist/transactional/index.d.ts',
        import: './dist/transactional/index.js',
      },
    },
  })

  runPack(`mailpeek-templates-essentials-${version}.tgz`)

  // ── Pack Complete ──────────────────────────────────────────────────────

  console.log('Packing Complete (all 45 templates)...')

  // Restore index files and swap in all HTML before packing Complete
  writeFileSync(distIndexJs, originalIndexJs)
  writeFileSync(distIndexDts, originalIndexDts)
  if (existsSync(htmlDest)) rmSync(htmlDest, { recursive: true })
  copyHtml(['transactional', 'marketing', 'patterns'])

  writeModifiedPkg({
    files: [...pkg.files, 'html', 'README.md'],
  })

  runPack(`mailpeek-templates-complete-${version}.tgz`)

  console.log(`\nDone. Both tgz files are in polar/`)
  console.log(`Upload to Polar:`)
  console.log(`  Essentials → polar/mailpeek-templates-essentials-${version}.tgz`)
  console.log(`  Complete   → polar/mailpeek-templates-complete-${version}.tgz`)
} finally {
  restore()
}
