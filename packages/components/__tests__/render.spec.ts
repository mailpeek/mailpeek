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

describe('render', () => {
  it('renders a simple component to HTML string', async () => {
    const Simple = defineComponent({
      setup() {
        return () => h('p', 'Hello')
      },
    })
    const html = await render(Simple)
    expect(html).toContain('<p>Hello</p>')
  })

  it('prepends DOCTYPE by default', async () => {
    const Simple = defineComponent({
      setup() {
        return () => h('p', 'Hello')
      },
    })
    const html = await render(Simple)
    expect(html).toContain('<!DOCTYPE html')
    expect(html).toContain('XHTML 1.0 Transitional')
  })

  it('omits DOCTYPE when document option is false', async () => {
    const Simple = defineComponent({
      setup() {
        return () => h('p', 'Hello')
      },
    })
    const html = await render(Simple, undefined, { document: false })
    expect(html).not.toContain('<!DOCTYPE')
  })

  it('passes props to component', async () => {
    const Greeting = defineComponent({
      props: { name: String },
      setup(props) {
        return () => h('p', `Hello ${props.name}`)
      },
    })
    const html = await render(Greeting, { name: 'Aoife' })
    expect(html).toContain('Hello Aoife')
  })

  it('renders a full email composition', async () => {
    const Email = defineComponent({
      setup() {
        return () =>
          h(EmailHtml, null, {
            default: () =>
              h(EmailBody, null, {
                default: () =>
                  h(EmailContainer, null, {
                    default: () => [
                      h(EmailText, null, { default: () => 'Welcome!' }),
                      h(EmailButton, { href: 'https://example.com' }, { default: () => 'Click' }),
                    ],
                  }),
              }),
          })
      },
    })

    const html = await render(Email)

    // DOCTYPE
    expect(html).toContain('<!DOCTYPE html')
    // Structure
    expect(html).toContain('<html')
    expect(html).toContain('<body')
    expect(html).toContain('<table')
    expect(html).toContain('role="presentation"')
    // Content
    expect(html).toContain('Welcome!')
    expect(html).toContain('https://example.com')
    expect(html).toContain('Click')
    // Inline styles (no <style> blocks)
    expect(html).not.toMatch(/<style[\s>]/)
  })

  it('applies gmail client filtering', async () => {
    const WithBoxShadow = defineComponent({
      setup() {
        return () => h('div', { style: { boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } }, 'Test')
      },
    })
    const html = await render(WithBoxShadow, undefined, { client: 'gmail' })
    expect(html).not.toContain('box-shadow')
  })

  // Rule 6: render() returns valid HTML string (not undefined, not Vue vnode)
  it('returns a string, not undefined or vnode', async () => {
    const Simple = defineComponent({
      setup() {
        return () => h('p', 'Test')
      },
    })
    const html = await render(Simple)
    expect(typeof html).toBe('string')
    expect(html.length).toBeGreaterThan(0)
    expect(html).toContain('<p>')
  })

  // Rule 5: EmailPreviewText renders correctly through render pipeline
  it('renders EmailPreviewText as hidden preheader through SSR', async () => {
    const Email = defineComponent({
      setup() {
        return () =>
          h(EmailHtml, null, {
            default: () =>
              h(EmailBody, null, {
                default: () => [
                  h(EmailPreviewText, { text: 'Check out our latest news' }),
                  h(EmailContainer, null, {
                    default: () => h(EmailText, null, { default: () => 'Body content' }),
                  }),
                ],
              }),
          })
      },
    })

    const html = await render(Email)
    expect(html).toContain('Check out our latest news')
    expect(html).toContain('display:none')
    expect(html).toContain('max-height:0px')
    expect(html).toContain('overflow:hidden')
  })

  // Rule 8: SSR - full composition with ALL components renders without error
  it('renders a composition with every component via SSR', async () => {
    const FullEmail = defineComponent({
      setup() {
        return () =>
          h(EmailHtml, null, {
            default: () => [
              h(EmailHead, { title: 'Test Email' }),
              h(EmailBody, null, {
                default: () => [
                  h(EmailPreviewText, { text: 'Preview text here' }),
                  h(EmailContainer, null, {
                    default: () =>
                      h(EmailSection, { padding: '16px' }, {
                        default: () => [
                          h(EmailHeading, { as: 'h1' }, { default: () => 'Welcome' }),
                          h(EmailText, null, { default: () => 'Hello world' }),
                          h(EmailImage, { src: 'https://example.com/img.png', alt: 'Logo', width: 200, height: 50 }),
                          h(EmailRow, null, {
                            default: () => [
                              h(EmailColumn, { width: '50%' }, { default: () => 'Left' }),
                              h(EmailColumn, { width: '50%' }, { default: () => 'Right' }),
                            ],
                          }),
                          h(EmailDivider),
                          h(EmailButton, { href: 'https://example.com' }, { default: () => 'Click me' }),
                          h(EmailLink, { href: 'https://example.com' }, { default: () => 'Learn more' }),
                        ],
                      }),
                  }),
                ],
              }),
            ],
          })
      },
    })

    const html = await render(FullEmail)

    // Verify it's a valid HTML string
    expect(typeof html).toBe('string')
    expect(html).toContain('<!DOCTYPE html')
    expect(html).toContain('<html')
    expect(html).toContain('</html>')

    // Verify all components rendered
    expect(html).toContain('Test Email')
    expect(html).toContain('Preview text here')
    expect(html).toContain('Welcome')
    expect(html).toContain('Hello world')
    expect(html).toContain('img.png')
    expect(html).toContain('Left')
    expect(html).toContain('Right')
    expect(html).toContain('Click me')
    expect(html).toContain('Learn more')

    // No <style> blocks — everything inline
    expect(html).not.toMatch(/<style[\s>]/)
  })
})
