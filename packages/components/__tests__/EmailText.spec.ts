import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmailText from '../src/components/EmailText.vue'

describe('EmailText', () => {
  it('renders a p element', () => {
    const wrapper = mount(EmailText, {
      slots: { default: 'Hello world' },
    })
    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper.text()).toBe('Hello world')
  })

  it('applies default styles', () => {
    const wrapper = mount(EmailText)
    const style = wrapper.find('p').attributes('style')!
    expect(style).toContain('font-size: 16px')
    expect(style).toContain('line-height: 1.5')
    expect(style).toContain('color: rgb(51, 51, 51)')
  })

  it('applies custom props', () => {
    const wrapper = mount(EmailText, {
      props: { fontSize: 20, color: '#000000', align: 'center' },
    })
    const style = wrapper.find('p').attributes('style')!
    expect(style).toContain('font-size: 20px')
    expect(style).toContain('text-align: center')
  })

  // Rule 1: No flex or grid CSS
  it('contains no flex or grid CSS properties', () => {
    const wrapper = mount(EmailText, {
      slots: { default: 'Test' },
    })
    expect(wrapper.html()).not.toMatch(/display:\s*(flex|grid|inline-flex|inline-grid)/)
  })

  // Rule 3: All styles inlined (no class-based styles)
  it('uses only inline styles, no class attributes', () => {
    const wrapper = mount(EmailText)
    expect(wrapper.find('p').attributes('class')).toBeUndefined()
  })

  // Rule 7: Arbitrary HTML attributes passthrough
  it('passes through arbitrary HTML attributes', () => {
    const wrapper = mount(EmailText, {
      attrs: { 'data-testid': 'email-text' },
    })
    expect(wrapper.find('p').attributes('data-testid')).toBe('email-text')
  })
})
