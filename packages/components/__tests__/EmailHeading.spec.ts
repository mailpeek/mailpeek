import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmailHeading from '../src/components/EmailHeading.vue'

describe('EmailHeading', () => {
  it('renders h2 by default', () => {
    const wrapper = mount(EmailHeading, {
      slots: { default: 'Title' },
    })
    expect(wrapper.find('h2').exists()).toBe(true)
    expect(wrapper.text()).toBe('Title')
  })

  it('renders custom heading level', () => {
    const wrapper = mount(EmailHeading, {
      props: { as: 'h1' },
      slots: { default: 'Big Title' },
    })
    expect(wrapper.find('h1').exists()).toBe(true)
    expect(wrapper.find('h2').exists()).toBe(false)
  })

  it('applies default styles', () => {
    const wrapper = mount(EmailHeading)
    const style = wrapper.find('h2').attributes('style')!
    expect(style).toContain('font-size: 24px')
    expect(style).toContain('line-height: 1.3')
    expect(style).toContain('color: rgb(51, 51, 51)')
  })

  it('applies custom fontSize and color', () => {
    const wrapper = mount(EmailHeading, {
      props: { fontSize: 32, color: '#000000', align: 'center' },
    })
    const style = wrapper.find('h2').attributes('style')!
    expect(style).toContain('font-size: 32px')
    expect(style).toContain('text-align: center')
  })

  // Rule 1: No flex or grid CSS
  it('contains no flex or grid CSS properties', () => {
    const wrapper = mount(EmailHeading, {
      slots: { default: 'Test' },
    })
    expect(wrapper.html()).not.toMatch(/display:\s*(flex|grid|inline-flex|inline-grid)/)
  })

  // Rule 3: All styles inlined (no class-based styles)
  it('uses only inline styles, no class attributes', () => {
    const wrapper = mount(EmailHeading)
    expect(wrapper.find('h2').attributes('class')).toBeUndefined()
  })

  // Rule 7: Arbitrary HTML attributes passthrough
  it('passes through arbitrary HTML attributes', () => {
    const wrapper = mount(EmailHeading, {
      attrs: { 'data-testid': 'email-heading' },
    })
    expect(wrapper.find('h2').attributes('data-testid')).toBe('email-heading')
  })
})
