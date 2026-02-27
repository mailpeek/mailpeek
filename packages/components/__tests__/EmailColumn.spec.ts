import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmailColumn from '../src/components/EmailColumn.vue'

describe('EmailColumn', () => {
  it('renders a td element', () => {
    const wrapper = mount(EmailColumn, {
      slots: { default: 'Column content' },
    })
    expect(wrapper.find('td').exists()).toBe(true)
    expect(wrapper.text()).toBe('Column content')
  })

  it('defaults to valign top', () => {
    const wrapper = mount(EmailColumn)
    expect(wrapper.find('td').attributes('style')).toContain('vertical-align: top')
  })

  it('applies width, align, and valign', () => {
    const wrapper = mount(EmailColumn, {
      props: { width: '50%', align: 'center', valign: 'middle' },
    })
    const style = wrapper.find('td').attributes('style')!
    expect(style).toContain('width: 50%')
    expect(style).toContain('text-align: center')
    expect(style).toContain('vertical-align: middle')
  })

  it('applies backgroundColor and padding', () => {
    const wrapper = mount(EmailColumn, {
      props: { backgroundColor: '#eee', padding: '8px 16px' },
    })
    const style = wrapper.find('td').attributes('style')!
    expect(style).toContain('background-color')
    expect(style).toContain('padding')
  })

  // Rule 1: No flex or grid CSS
  it('contains no flex or grid CSS properties', () => {
    const wrapper = mount(EmailColumn, {
      props: { width: '100%', align: 'center' },
    })
    expect(wrapper.html()).not.toMatch(/display:\s*(flex|grid|inline-flex|inline-grid)/)
  })

  // Rule 3: All styles inlined (no class-based styles)
  it('uses only inline styles, no class attributes', () => {
    const wrapper = mount(EmailColumn)
    expect(wrapper.find('td').attributes('class')).toBeUndefined()
  })

  // Rule 7: Arbitrary HTML attributes passthrough
  it('passes through arbitrary HTML attributes', () => {
    const wrapper = mount(EmailColumn, {
      attrs: { 'data-testid': 'email-column' },
    })
    expect(wrapper.find('td').attributes('data-testid')).toBe('email-column')
  })
})
