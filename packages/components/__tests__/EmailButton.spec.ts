import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import EmailButton from '../src/components/EmailButton.vue'
import { render } from '../src/render'

describe('EmailButton', () => {
  it('renders an anchor inside a div', () => {
    const wrapper = mount(EmailButton, {
      props: { href: 'https://example.com' },
      slots: { default: 'Click me' },
    })
    expect(wrapper.find('div a').exists()).toBe(true)
    expect(wrapper.find('a').attributes('href')).toBe('https://example.com')
    expect(wrapper.find('a').attributes('target')).toBe('_blank')
    expect(wrapper.text()).toContain('Click me')
  })

  it('applies default button styles', () => {
    const wrapper = mount(EmailButton, {
      props: { href: 'https://example.com' },
      slots: { default: 'Click' },
    })
    const style = wrapper.find('a').attributes('style')!
    expect(style).toContain('display: inline-block')
    expect(style).toContain('text-decoration: none')
    expect(style).toContain('font-weight: bold')
  })

  it('applies custom props', () => {
    const wrapper = mount(EmailButton, {
      props: {
        href: 'https://example.com',
        backgroundColor: '#ff0000',
        borderRadius: 8,
        fontSize: 18,
      },
      slots: { default: 'Click' },
    })
    const style = wrapper.find('a').attributes('style')!
    expect(style).toContain('font-size: 18px')
    expect(style).toContain('border-radius: 8px')
  })

  it('aligns wrapper div', () => {
    const wrapper = mount(EmailButton, {
      props: { href: 'https://example.com', align: 'left' },
      slots: { default: 'Click' },
    })
    expect(wrapper.find('div').attributes('style')).toContain('text-align: left')
  })

  // Rule 4: Bulletproof button pattern (VML conditional + HTML fallback)
  it('includes VML conditional for Outlook in SSR output', async () => {
    const Email = defineComponent({
      setup() {
        return () => h(EmailButton, { href: 'https://example.com' }, { default: () => 'Click' })
      },
    })
    const html = await render(Email, undefined, { document: false })
    expect(html).toContain('<!--[if mso]>')
    expect(html).toContain('v:roundrect')
    expect(html).toContain('<![endif]-->')
    expect(html).toContain('<!--[if !mso]><!-->')
  })

  it('VML fillcolor matches backgroundColor prop', async () => {
    const Email = defineComponent({
      setup() {
        return () => h(EmailButton, { href: 'https://test.com', backgroundColor: '#ff5500' }, { default: () => 'Go' })
      },
    })
    const html = await render(Email, undefined, { document: false })
    expect(html).toContain('fillcolor="#ff5500"')
  })

  it('VML includes anchorlock and center element', async () => {
    const Email = defineComponent({
      setup() {
        return () => h(EmailButton, { href: 'https://test.com' }, { default: () => 'Go' })
      },
    })
    const html = await render(Email, undefined, { document: false })
    expect(html).toContain('<w:anchorlock/>')
    expect(html).toContain('<center')
  })

  // Rule 1: No flex or grid CSS
  it('contains no flex or grid CSS properties', () => {
    const wrapper = mount(EmailButton, {
      props: { href: 'https://example.com' },
      slots: { default: 'Click' },
    })
    const html = wrapper.html()
    expect(html).not.toMatch(/display:\s*(flex|grid|inline-flex|inline-grid)/)
  })

  // Rule 3: All styles inlined (no class-based styles)
  it('uses only inline styles, no class attributes', () => {
    const wrapper = mount(EmailButton, {
      props: { href: 'https://example.com' },
      slots: { default: 'Click' },
    })
    expect(wrapper.find('div').attributes('class')).toBeUndefined()
  })

  // Rule 7: Arbitrary HTML attributes passthrough
  it('passes through arbitrary HTML attributes on wrapper', () => {
    const wrapper = mount(EmailButton, {
      props: { href: 'https://example.com' },
      attrs: { 'data-testid': 'cta-button' },
      slots: { default: 'Click' },
    })
    expect(wrapper.find('div').attributes('data-testid')).toBe('cta-button')
  })
})
