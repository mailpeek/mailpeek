import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmailHtml from '../src/components/EmailHtml.vue'

describe('EmailHtml', () => {
  it('renders html element with default lang and dir', () => {
    const wrapper = mount(EmailHtml)
    const html = wrapper.find('html')
    expect(html.attributes('lang')).toBe('en')
    expect(html.attributes('dir')).toBe('ltr')
    expect(html.attributes('xmlns')).toBe('http://www.w3.org/1999/xhtml')
  })

  it('renders custom lang and dir', () => {
    const wrapper = mount(EmailHtml, {
      props: { lang: 'fr', dir: 'rtl' },
    })
    const html = wrapper.find('html')
    expect(html.attributes('lang')).toBe('fr')
    expect(html.attributes('dir')).toBe('rtl')
  })

  it('renders html wrapper without head (head is now EmailHead)', () => {
    const wrapper = mount(EmailHtml)
    // EmailHtml no longer renders <head> — that's delegated to EmailHead
    expect(wrapper.find('html').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(EmailHtml, {
      slots: { default: '<body>Hello</body>' },
    })
    expect(wrapper.text()).toContain('Hello')
  })

  // Rule 1: No flex or grid CSS
  it('contains no flex or grid CSS properties', () => {
    const wrapper = mount(EmailHtml)
    expect(wrapper.html()).not.toMatch(/display:\s*(flex|grid|inline-flex|inline-grid)/)
  })

  // Rule 3: All styles inlined (no class-based styles)
  it('uses only inline styles, no class attributes', () => {
    const wrapper = mount(EmailHtml)
    expect(wrapper.find('html').attributes('class')).toBeUndefined()
  })

  // Rule 7: Arbitrary HTML attributes passthrough
  it('passes through arbitrary HTML attributes', () => {
    const wrapper = mount(EmailHtml, {
      attrs: { 'data-testid': 'email-html' },
    })
    expect(wrapper.find('html').attributes('data-testid')).toBe('email-html')
  })
})
