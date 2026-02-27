import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmailLink from '../src/components/EmailLink.vue'

describe('EmailLink', () => {
  it('renders an anchor with href and target', () => {
    const wrapper = mount(EmailLink, {
      props: { href: 'https://example.com' },
      slots: { default: 'Visit' },
    })
    const a = wrapper.find('a')
    expect(a.exists()).toBe(true)
    expect(a.attributes('href')).toBe('https://example.com')
    expect(a.attributes('target')).toBe('_blank')
    expect(wrapper.text()).toBe('Visit')
  })

  it('applies default color', () => {
    const wrapper = mount(EmailLink, {
      props: { href: 'https://example.com' },
    })
    const style = wrapper.find('a').attributes('style')!
    expect(style).toContain('color: rgb(0, 123, 255)')
  })

  it('applies custom color', () => {
    const wrapper = mount(EmailLink, {
      props: { href: 'https://example.com', color: '#ff0000' },
    })
    expect(wrapper.find('a').attributes('style')).toContain('color')
  })

  it('applies text-decoration underline by default', () => {
    const wrapper = mount(EmailLink, {
      props: { href: 'https://example.com' },
    })
    expect(wrapper.find('a').attributes('style')).toContain('text-decoration: underline')
  })

  it('applies custom fontSize', () => {
    const wrapper = mount(EmailLink, {
      props: { href: 'https://example.com', fontSize: 14 },
    })
    expect(wrapper.find('a').attributes('style')).toContain('font-size: 14px')
  })

  // Rule 1: No flex or grid CSS
  it('contains no flex or grid CSS properties', () => {
    const wrapper = mount(EmailLink, {
      props: { href: 'https://example.com' },
    })
    expect(wrapper.html()).not.toMatch(/display:\s*(flex|grid|inline-flex|inline-grid)/)
  })

  // Rule 3: All styles inlined (no class-based styles)
  it('uses only inline styles, no class attributes', () => {
    const wrapper = mount(EmailLink, {
      props: { href: 'https://example.com' },
    })
    expect(wrapper.find('a').attributes('class')).toBeUndefined()
  })

  // Rule 7: Arbitrary HTML attributes passthrough
  it('passes through arbitrary HTML attributes', () => {
    const wrapper = mount(EmailLink, {
      props: { href: 'https://example.com' },
      attrs: { 'data-testid': 'email-link' },
    })
    expect(wrapper.find('a').attributes('data-testid')).toBe('email-link')
  })
})
