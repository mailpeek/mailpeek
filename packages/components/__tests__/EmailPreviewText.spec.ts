import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmailPreviewText from '../src/components/EmailPreviewText.vue'

describe('EmailPreviewText', () => {
  // Rule 5: EmailPreviewText renders as hidden preheader text
  it('renders a hidden div with preview text', () => {
    const wrapper = mount(EmailPreviewText, {
      props: { text: 'Preview message here' },
    })
    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.text()).toContain('Preview message here')
  })

  it('hides content with display:none and overflow:hidden', () => {
    const wrapper = mount(EmailPreviewText, {
      props: { text: 'Hidden' },
    })
    const style = wrapper.find('div').attributes('style')!
    expect(style).toContain('display: none')
    expect(style).toContain('max-height: 0px')
    expect(style).toContain('max-width: 0px')
    expect(style).toContain('overflow: hidden')
    expect(style).toContain('opacity: 0')
  })

  it('includes padding characters to prevent body content leaking into preview', () => {
    const wrapper = mount(EmailPreviewText, {
      props: { text: 'Preview' },
    })
    const text = wrapper.find('div').text()
    // Should contain more than just the preview text (padding chars appended)
    expect(text.length).toBeGreaterThan('Preview'.length)
  })

  it('uses tiny font size and white color to be invisible', () => {
    const wrapper = mount(EmailPreviewText, {
      props: { text: 'Hidden' },
    })
    const style = wrapper.find('div').attributes('style')!
    expect(style).toContain('font-size: 1px')
    expect(style).toContain('line-height: 1px')
    expect(style).toContain('color: rgb(255, 255, 255)')
  })

  // Rule 1: No flex or grid CSS
  it('contains no flex or grid CSS properties', () => {
    const wrapper = mount(EmailPreviewText, {
      props: { text: 'Test' },
    })
    expect(wrapper.html()).not.toMatch(/display:\s*(flex|grid|inline-flex|inline-grid)/)
  })

  // Rule 3: All styles inlined (no class-based styles)
  it('uses only inline styles, no class attributes', () => {
    const wrapper = mount(EmailPreviewText, {
      props: { text: 'Test' },
    })
    expect(wrapper.find('div').attributes('class')).toBeUndefined()
  })

  // Rule 7: Arbitrary HTML attributes passthrough
  it('passes through arbitrary HTML attributes', () => {
    const wrapper = mount(EmailPreviewText, {
      props: { text: 'Test' },
      attrs: { 'data-testid': 'email-preview' },
    })
    expect(wrapper.find('div').attributes('data-testid')).toBe('email-preview')
  })
})
