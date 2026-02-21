import { describe, it, expect } from 'vitest'
import { defineComponent, h } from 'vue'
import { render } from '../src/render'
import EmailHtml from '../src/components/EmailHtml.vue'
import EmailBody from '../src/components/EmailBody.vue'
import EmailContainer from '../src/components/EmailContainer.vue'
import EmailText from '../src/components/EmailText.vue'
import EmailButton from '../src/components/EmailButton.vue'

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
})
