import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { filterHtml, gmailConfig, outlookConfig } from '@mailpeek/preview'
import type { Component } from 'vue'
import type { RenderOptions } from './types'

const EMAIL_DOCTYPE =
  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'

const clientConfigs = {
  gmail: gmailConfig,
  outlook: outlookConfig,
} as const

/**
 * Renders a Vue email component to an email-safe HTML string.
 *
 * Uses Vue SSR (`createSSRApp` + `renderToString`) to produce HTML,
 * then optionally prepends the email DOCTYPE and applies client-specific
 * CSS filtering.
 */
export async function render(
  component: Component,
  props?: Record<string, unknown>,
  options?: RenderOptions
): Promise<string> {
  const doc = options?.document !== false

  const app = createSSRApp({
    render: () => h(component, props),
  })

  let html = await renderToString(app)

  // Prepend email DOCTYPE
  if (doc) {
    html = `${EMAIL_DOCTYPE}\n${html}`
  }

  // Apply client-specific CSS filtering
  if (options?.client) {
    const config = clientConfigs[options.client]
    const result = filterHtml(html, config)
    html = result.html
  }

  return html
}
