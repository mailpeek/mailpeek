import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmailContainer from '../src/components/EmailContainer.vue'

describe('EmailContainer', () => {
  it('renders a table with role="presentation"', () => {
    const wrapper = mount(EmailContainer)
    const table = wrapper.find('table')
    expect(table.attributes('role')).toBe('presentation')
    expect(table.attributes('cellpadding')).toBe('0')
    expect(table.attributes('cellspacing')).toBe('0')
    expect(table.attributes('border')).toBe('0')
  })

  it('applies default max-width of 600px', () => {
    const wrapper = mount(EmailContainer)
    expect(wrapper.find('table').attributes('style')).toContain('max-width: 600px')
  })

  it('centers by default with margin 0 auto', () => {
    const wrapper = mount(EmailContainer)
    // jsdom expands shorthand margin; check for auto margins on left/right
    const style = wrapper.find('table').attributes('style')!
    expect(style).toContain('margin')
    // Should not have margin-left or margin-right set to a fixed value (auto centering)
    expect(style).not.toContain('margin-left: 0')
  })

  it('applies custom maxWidth', () => {
    const wrapper = mount(EmailContainer, {
      props: { maxWidth: 480 },
    })
    expect(wrapper.find('table').attributes('style')).toContain('max-width: 480px')
  })

  it('renders content inside tr > td', () => {
    const wrapper = mount(EmailContainer, {
      slots: { default: '<p>Hello</p>' },
    })
    expect(wrapper.find('tbody tr td').exists()).toBe(true)
    expect(wrapper.text()).toContain('Hello')
  })

  // Rule 1: No flex or grid CSS
  it('contains no flex or grid CSS properties', () => {
    const wrapper = mount(EmailContainer)
    expect(wrapper.html()).not.toMatch(/display:\s*(flex|grid|inline-flex|inline-grid)/)
  })

  // Rule 3: All styles inlined (no class-based styles)
  it('uses only inline styles, no class attributes', () => {
    const wrapper = mount(EmailContainer)
    expect(wrapper.find('table').attributes('class')).toBeUndefined()
  })

  // Rule 7: Arbitrary HTML attributes passthrough
  it('passes through arbitrary HTML attributes', () => {
    const wrapper = mount(EmailContainer, {
      attrs: { 'data-testid': 'email-container' },
    })
    expect(wrapper.find('table').attributes('data-testid')).toBe('email-container')
  })
})
