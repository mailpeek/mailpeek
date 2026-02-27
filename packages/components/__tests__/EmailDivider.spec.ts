import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmailDivider from '../src/components/EmailDivider.vue'

describe('EmailDivider', () => {
  it('renders an hr element', () => {
    const wrapper = mount(EmailDivider)
    expect(wrapper.find('hr').exists()).toBe(true)
  })

  it('applies default styles', () => {
    const wrapper = mount(EmailDivider)
    const style = wrapper.find('hr').attributes('style')!
    // jsdom normalizes 'border: none' on <hr> to 'border: medium' — check border is set
    expect(style).toContain('border')
    expect(style).toContain('height: 1px')
  })

  it('applies custom color and height', () => {
    const wrapper = mount(EmailDivider, {
      props: { color: '#cccccc', height: 2 },
    })
    const style = wrapper.find('hr').attributes('style')!
    expect(style).toContain('height: 2px')
    expect(style).toContain('background-color')
  })

  it('applies custom margin', () => {
    const wrapper = mount(EmailDivider, {
      props: { margin: '24px 0' },
    })
    expect(wrapper.find('hr').attributes('style')).toContain('margin')
  })

  // Rule 1: No flex or grid CSS
  it('contains no flex or grid CSS properties', () => {
    const wrapper = mount(EmailDivider)
    expect(wrapper.html()).not.toMatch(/display:\s*(flex|grid|inline-flex|inline-grid)/)
  })

  // Rule 3: All styles inlined (no class-based styles)
  it('uses only inline styles, no class attributes', () => {
    const wrapper = mount(EmailDivider)
    expect(wrapper.find('hr').attributes('class')).toBeUndefined()
  })

  // Rule 7: Arbitrary HTML attributes passthrough
  it('passes through arbitrary HTML attributes', () => {
    const wrapper = mount(EmailDivider, {
      attrs: { 'data-testid': 'email-divider' },
    })
    expect(wrapper.find('hr').attributes('data-testid')).toBe('email-divider')
  })
})
