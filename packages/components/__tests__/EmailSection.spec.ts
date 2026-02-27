import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmailSection from '../src/components/EmailSection.vue'

describe('EmailSection', () => {
  it('renders a presentation table', () => {
    const wrapper = mount(EmailSection)
    const table = wrapper.find('table')
    expect(table.exists()).toBe(true)
    expect(table.attributes('role')).toBe('presentation')
    expect(table.attributes('width')).toBe('100%')
    expect(table.attributes('cellpadding')).toBe('0')
    expect(table.attributes('cellspacing')).toBe('0')
    expect(table.attributes('border')).toBe('0')
  })

  it('applies backgroundColor and padding to td', () => {
    const wrapper = mount(EmailSection, {
      props: { backgroundColor: '#f5f5f5', padding: '16px 24px' },
    })
    const style = wrapper.find('td').attributes('style')!
    expect(style).toContain('background-color')
    expect(style).toContain('padding')
  })

  it('renders slot content inside td', () => {
    const wrapper = mount(EmailSection, {
      slots: { default: '<p>Section content</p>' },
    })
    expect(wrapper.find('tbody tr td').exists()).toBe(true)
    expect(wrapper.text()).toContain('Section content')
  })

  // Rule 1: No flex or grid CSS
  it('contains no flex or grid CSS properties', () => {
    const wrapper = mount(EmailSection, {
      props: { backgroundColor: '#fff', padding: '16px' },
    })
    expect(wrapper.html()).not.toMatch(/display:\s*(flex|grid|inline-flex|inline-grid)/)
  })

  // Rule 3: All styles inlined (no class-based styles)
  it('uses only inline styles, no class attributes', () => {
    const wrapper = mount(EmailSection)
    expect(wrapper.find('table').attributes('class')).toBeUndefined()
    expect(wrapper.find('td').attributes('class')).toBeUndefined()
  })

  // Rule 7: Arbitrary HTML attributes passthrough
  it('passes through arbitrary HTML attributes', () => {
    const wrapper = mount(EmailSection, {
      attrs: { 'data-testid': 'email-section' },
    })
    expect(wrapper.find('table').attributes('data-testid')).toBe('email-section')
  })
})
