import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmailButton from '../src/components/EmailButton.vue'

describe('EmailButton', () => {
  it('renders an anchor inside a div', () => {
    const wrapper = mount(EmailButton, {
      props: { href: 'https://example.com' },
      slots: { default: 'Click me' },
    })
    expect(wrapper.find('div a').exists()).toBe(true)
    expect(wrapper.find('a').attributes('href')).toBe('https://example.com')
    expect(wrapper.find('a').attributes('target')).toBe('_blank')
    expect(wrapper.text()).toBe('Click me')
  })

  it('applies default button styles', () => {
    const wrapper = mount(EmailButton, {
      props: { href: 'https://example.com' },
    })
    const style = wrapper.find('a').attributes('style')!
    expect(style).toContain('display: inline-block')
    expect(style).toContain('text-decoration: none')
    expect(style).toContain('font-weight: bold')
  })

  it('applies custom props', () => {
    const wrapper = mount(EmailButton, {
      props: {
        href: 'https://example.com',
        backgroundColor: '#ff0000',
        borderRadius: 8,
        fontSize: 18,
      },
    })
    const style = wrapper.find('a').attributes('style')!
    expect(style).toContain('font-size: 18px')
    expect(style).toContain('border-radius: 8px')
  })

  it('aligns wrapper div', () => {
    const wrapper = mount(EmailButton, {
      props: { href: 'https://example.com', align: 'left' },
    })
    expect(wrapper.find('div').attributes('style')).toContain('text-align: left')
  })
})
