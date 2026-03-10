import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmailDivider from '../src/components/EmailDivider.vue'

describe('EmailDivider', () => {
  it('renders a table-based divider', () => {
    const wrapper = mount(EmailDivider)
    expect(wrapper.find('table').exists()).toBe(true)
    expect(wrapper.find('td').exists()).toBe(true)
    expect(wrapper.find('hr').exists()).toBe(false)
  })

  it('applies default styles', () => {
    const wrapper = mount(EmailDivider)
    const td = wrapper.find('td')
    expect(td.attributes('height')).toBe('1')
    expect(td.attributes('bgcolor')).toBe('#e0e0e0')
    // jsdom normalizes longhand margin properties to shorthand
    const tableStyle = wrapper.find('table').attributes('style')!
    expect(tableStyle).toContain('margin')
  })

  it('applies custom color and height', () => {
    const wrapper = mount(EmailDivider, {
      props: { color: '#cccccc', height: 2 },
    })
    const td = wrapper.find('td')
    expect(td.attributes('height')).toBe('2')
    expect(td.attributes('bgcolor')).toBe('#cccccc')
  })

  it('applies custom margin', () => {
    const wrapper = mount(EmailDivider, {
      props: { margin: '24px 0' },
    })
    // jsdom normalizes longhand margin properties to shorthand
    const tableStyle = wrapper.find('table').attributes('style')!
    expect(tableStyle).toContain('24px')
  })

  // Rule 1: No flex or grid CSS
  it('contains no flex or grid CSS properties', () => {
    const wrapper = mount(EmailDivider)
    expect(wrapper.html()).not.toMatch(/display:\s*(flex|grid|inline-flex|inline-grid)/)
  })

  // Rule 3: All styles inlined (no class-based styles)
  it('uses only inline styles, no class attributes', () => {
    const wrapper = mount(EmailDivider)
    expect(wrapper.find('table').attributes('class')).toBeUndefined()
    expect(wrapper.find('td').attributes('class')).toBeUndefined()
  })

  // Rule 7: Table has role="presentation"
  it('table has role="presentation"', () => {
    const wrapper = mount(EmailDivider)
    expect(wrapper.find('table').attributes('role')).toBe('presentation')
  })
})
