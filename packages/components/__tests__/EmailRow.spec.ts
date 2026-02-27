import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmailRow from '../src/components/EmailRow.vue'

describe('EmailRow', () => {
  it('renders a 100% width presentation table', () => {
    const wrapper = mount(EmailRow)
    const table = wrapper.find('table')
    expect(table.exists()).toBe(true)
    expect(table.attributes('role')).toBe('presentation')
    expect(table.attributes('cellpadding')).toBe('0')
    expect(table.attributes('cellspacing')).toBe('0')
    expect(table.attributes('border')).toBe('0')
    expect(table.attributes('style')).toContain('width: 100%')
  })

  it('renders slot content inside tr', () => {
    const wrapper = mount(EmailRow, {
      slots: { default: '<td>Column</td>' },
    })
    expect(wrapper.find('tbody tr').exists()).toBe(true)
    expect(wrapper.text()).toContain('Column')
  })

  // Rule 1: No flex or grid CSS
  it('contains no flex or grid CSS properties', () => {
    const wrapper = mount(EmailRow)
    expect(wrapper.html()).not.toMatch(/display:\s*(flex|grid|inline-flex|inline-grid)/)
  })

  // Rule 3: All styles inlined (no class-based styles)
  it('uses only inline styles, no class attributes', () => {
    const wrapper = mount(EmailRow)
    expect(wrapper.find('table').attributes('class')).toBeUndefined()
  })

  // Rule 7: Arbitrary HTML attributes passthrough
  it('passes through arbitrary HTML attributes', () => {
    const wrapper = mount(EmailRow, {
      attrs: { 'data-testid': 'email-row' },
    })
    expect(wrapper.find('table').attributes('data-testid')).toBe('email-row')
  })
})
