import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmailHead from '../src/components/EmailHead.vue'

describe('EmailHead', () => {
  it('renders head element with essential meta tags', () => {
    const wrapper = mount(EmailHead)
    expect(wrapper.find('head').exists()).toBe(true)
    expect(wrapper.find('meta[charset="utf-8"]').exists()).toBe(true)
    expect(wrapper.find('meta[name="viewport"]').exists()).toBe(true)
    expect(wrapper.find('meta[http-equiv="X-UA-Compatible"]').exists()).toBe(true)
  })

  it('renders format-detection meta to disable auto-linking', () => {
    const wrapper = mount(EmailHead)
    const meta = wrapper.find('meta[name="format-detection"]')
    expect(meta.exists()).toBe(true)
    expect(meta.attributes('content')).toContain('telephone=no')
  })

  it('renders Apple disable-reformatting meta', () => {
    const wrapper = mount(EmailHead)
    expect(wrapper.find('meta[name="x-apple-disable-message-reformatting"]').exists()).toBe(true)
  })

  it('renders title when provided', () => {
    const wrapper = mount(EmailHead, {
      props: { title: 'My Email' },
    })
    expect(wrapper.find('title').exists()).toBe(true)
    expect(wrapper.find('title').text()).toBe('My Email')
  })

  it('omits title when not provided', () => {
    const wrapper = mount(EmailHead)
    expect(wrapper.find('title').exists()).toBe(false)
  })

  it('renders slot content', () => {
    const wrapper = mount(EmailHead, {
      slots: { default: '<meta name="custom" content="test" />' },
    })
    expect(wrapper.find('meta[name="custom"]').exists()).toBe(true)
  })

  // Rule 1: No flex or grid CSS
  it('contains no flex or grid CSS properties', () => {
    const wrapper = mount(EmailHead)
    expect(wrapper.html()).not.toMatch(/display:\s*(flex|grid|inline-flex|inline-grid)/)
  })

  // Rule 3: All styles inlined (no class-based styles)
  it('uses only inline styles, no class attributes', () => {
    const wrapper = mount(EmailHead)
    expect(wrapper.find('head').attributes('class')).toBeUndefined()
  })

  // Rule 7: Arbitrary HTML attributes passthrough
  it('passes through arbitrary HTML attributes', () => {
    const wrapper = mount(EmailHead, {
      attrs: { 'data-testid': 'email-head' },
    })
    expect(wrapper.find('head').attributes('data-testid')).toBe('email-head')
  })
})
