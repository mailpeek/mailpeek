/**
 * Email Compatibility Gate Test
 *
 * This integration test renders a full email using every component and validates
 * the output against email client compatibility rules. If any component introduces
 * a pattern that breaks in email clients, this test catches it.
 */
import { describe, it, expect } from 'vitest'
import { defineComponent, h } from 'vue'
import { render } from '../src/render'
import EmailHtml from '../src/components/EmailHtml.vue'
import EmailHead from '../src/components/EmailHead.vue'
import EmailBody from '../src/components/EmailBody.vue'
import EmailContainer from '../src/components/EmailContainer.vue'
import EmailSection from '../src/components/EmailSection.vue'
import EmailRow from '../src/components/EmailRow.vue'
import EmailColumn from '../src/components/EmailColumn.vue'
import EmailText from '../src/components/EmailText.vue'
import EmailHeading from '../src/components/EmailHeading.vue'
import EmailButton from '../src/components/EmailButton.vue'
import EmailImage from '../src/components/EmailImage.vue'
import EmailLink from '../src/components/EmailLink.vue'
import EmailDivider from '../src/components/EmailDivider.vue'
import EmailPreviewText from '../src/components/EmailPreviewText.vue'

const FullEmail = defineComponent({
  setup() {
    return () =>
      h(EmailHtml, null, {
        default: () => [
          h(EmailHead, { title: 'Compatibility Test Email' }),
          h(EmailBody, { backgroundColor: '#f5f5f5' }, {
            default: () => [
              h(EmailPreviewText, { text: 'This is the preview text' }),
              h(EmailContainer, { maxWidth: 600 }, {
                default: () =>
                  h(EmailSection, { padding: '24px', backgroundColor: '#ffffff' }, {
                    default: () => [
                      h(EmailHeading, { as: 'h1', fontSize: 28 }, { default: () => 'Welcome' }),
                      h(EmailText, null, { default: () => 'Thanks for signing up.' }),
                      h(EmailImage, {
                        src: 'https://example.com/hero.png',
                        alt: 'Hero image',
                        width: 600,
                        height: 300,
                        align: 'center',
                      }),
                      h(EmailDivider),
                      h(EmailRow, null, {
                        default: () => [
                          h(EmailColumn, { width: '50%', valign: 'top' }, {
                            default: () => h(EmailText, null, { default: () => 'Left column' }),
                          }),
                          h(EmailColumn, { width: '50%', valign: 'top' }, {
                            default: () => h(EmailText, null, { default: () => 'Right column' }),
                          }),
                        ],
                      }),
                      h(EmailButton, { href: 'https://example.com/activate' }, { default: () => 'Get Started' }),
                      h(EmailText, null, {
                        default: () => [
                          'Questions? ',
                          h(EmailLink, { href: 'mailto:help@example.com' }, { default: () => 'Contact us' }),
                        ],
                      }),
                    ],
                  }),
              }),
            ],
          }),
        ],
      })
  },
})

describe('Email Compatibility Gate', () => {
  let html: string

  // Render once, validate many times
  it('renders the full email without errors', async () => {
    html = await render(FullEmail)
    expect(typeof html).toBe('string')
    expect(html.length).toBeGreaterThan(0)
  })

  it('has XHTML Transitional DOCTYPE', () => {
    expect(html).toContain('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"')
  })

  it('contains no <style> blocks — all CSS must be inline', () => {
    expect(html).not.toMatch(/<style[\s>]/i)
  })

  it('contains no class attributes — no class-based styling', () => {
    // Match class="..." but ignore xmlns class-like attributes
    const classMatches = html.match(/\sclass="/g)
    expect(classMatches).toBeNull()
  })

  it('contains no flex or grid CSS anywhere in output', () => {
    expect(html).not.toMatch(/display\s*:\s*(flex|grid|inline-flex|inline-grid)/i)
  })

  it('every <img> has explicit width and height attributes', () => {
    const imgTags = html.match(/<img\s[^>]*>/gi) || []
    expect(imgTags.length).toBeGreaterThan(0)
    for (const img of imgTags) {
      expect(img).toMatch(/width="/)
      expect(img).toMatch(/height="/)
    }
  })

  it('contains VML conditional comments for Outlook button support', () => {
    expect(html).toContain('<!--[if mso]>')
    expect(html).toContain('v:roundrect')
    expect(html).toContain('<!--[if !mso]><!-->')
  })

  it('contains no JavaScript', () => {
    expect(html).not.toMatch(/<script[\s>]/i)
    expect(html).not.toMatch(/javascript:/i)
  })

  it('uses presentation tables, not div-based layout', () => {
    expect(html).toContain('role="presentation"')
    // Tables should have cellpadding/cellspacing/border reset
    expect(html).toContain('cellpadding="0"')
    expect(html).toContain('cellspacing="0"')
  })

  it('contains all expected content', () => {
    expect(html).toContain('Welcome')
    expect(html).toContain('Thanks for signing up.')
    expect(html).toContain('Left column')
    expect(html).toContain('Right column')
    expect(html).toContain('Get Started')
    expect(html).toContain('Contact us')
    expect(html).toContain('This is the preview text')
  })
})
