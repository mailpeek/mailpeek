#!/usr/bin/env node
/**
 * Send any @mailpeek/template to a real email address via Resend.
 *
 * Usage:
 *   node scripts/send-test.mjs <TemplateName> <to@email.com>
 *
 * Examples:
 *   node scripts/send-test.mjs WelcomeEmail you@gmail.com
 *   node scripts/send-test.mjs InvoiceEmail you@gmail.com
 *   node scripts/send-test.mjs BlackFriday you@gmail.com
 *
 * Requires RESEND_API_KEY in .env
 */

import 'dotenv/config'
import { Resend } from 'resend'
import { render } from '../packages/components/dist/index.js'
import * as all from '../packages/templates/dist/index.js'

const [, , templateName, to] = process.argv

if (!templateName || !to) {
  console.error('Usage: node scripts/send-test.mjs <TemplateName> <to@email.com>')
  console.error('\nAvailable templates:')
  const names = Object.keys(all).filter(k => typeof all[k] === 'object' && all[k]?.__name)
  names.forEach(n => console.error(`  ${n}`))
  process.exit(1)
}

const component = all[templateName]
if (!component) {
  console.error(`Template "${templateName}" not found.`)
  console.error('Run without arguments to see available templates.')
  process.exit(1)
}

if (!process.env.RESEND_API_KEY) {
  console.error('Missing RESEND_API_KEY in .env')
  process.exit(1)
}

const resend = new Resend(process.env.RESEND_API_KEY)

console.log(`Rendering ${templateName}...`)
const html = await render(component)

console.log(`Sending to ${to}...`)
const { data, error } = await resend.emails.send({
  from: 'Mailpeek Test <test@mailpeek.dev>',
  to,
  subject: `[Mailpeek Test] ${templateName}`,
  html,
})

if (error) {
  console.error('Send failed:', error)
  process.exit(1)
}

console.log(`✅ Sent! ID: ${data.id}`)
