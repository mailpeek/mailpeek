import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmailBody from '../src/components/EmailBody.vue'

describe('EmailBody', () => {
  it('renders body element with default styles', () => {
    const wrapper = mount(EmailBody)
    const body = wrapper.find('body')
    expect(body.exists()).toBe(true)
    expect(body.attributes('style')).toContain('margin: 0')
    expect(body.attributes('style')).toContain('padding: 0')
    expect(body.attributes('style')).toContain('width: 100%')
  })

  it('applies custom background color', () => {
    const wrapper = mount(EmailBody, {
      props: { backgroundColor: '#f0f0f0' },
    })
    expect(wrapper.find('body').attributes('style')).toContain('background-color')
  })

  it('renders slot content', () => {
    const wrapper = mount(EmailBody, {
      slots: { default: '<p>Content</p>' },
    })
    expect(wrapper.text()).toContain('Content')
  })

  // Rule 1: No flex or grid CSS
  it('contains no flex or grid CSS properties', () => {
    const wrapper = mount(EmailBody, {
      props: { backgroundColor: '#ffffff' },
    })
    expect(wrapper.html()).not.toMatch(/display:\s*(flex|grid|inline-flex|inline-grid)/)
  })

  // Rule 3: All styles inlined (no class-based styles)
  it('uses only inline styles, no class attributes', () => {
    const wrapper = mount(EmailBody)
    expect(wrapper.find('body').attributes('class')).toBeUndefined()
  })

  // Rule 7: Arbitrary HTML attributes passthrough
  it('passes through arbitrary HTML attributes', () => {
    const wrapper = mount(EmailBody, {
      attrs: { 'data-testid': 'email-body' },
    })
    expect(wrapper.find('body').attributes('data-testid')).toBe('email-body')
  })
})
