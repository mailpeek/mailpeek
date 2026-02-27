import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmailImage from '../src/components/EmailImage.vue'

const defaultProps = { src: 'https://example.com/img.png', width: 200, height: 100 }

describe('EmailImage', () => {
  it('renders an img element with src and alt', () => {
    const wrapper = mount(EmailImage, {
      props: { ...defaultProps, alt: 'Logo' },
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/img.png')
    expect(img.attributes('alt')).toBe('Logo')
  })

  it('applies email-safe default styles', () => {
    const wrapper = mount(EmailImage, {
      props: defaultProps,
    })
    const style = wrapper.find('img').attributes('style')!
    expect(style).toContain('display: block')
    expect(style).toContain('border: 0')
    expect(style).toContain('outline: none')
    expect(style).toContain('text-decoration: none')
  })

  // Rule 2: Every <img> has explicit width and height attributes
  it('always renders width and height as HTML attributes', () => {
    const wrapper = mount(EmailImage, {
      props: defaultProps,
    })
    const img = wrapper.find('img')
    expect(img.attributes('width')).toBe('200')
    expect(img.attributes('height')).toBe('100')
  })

  it('always includes width and height in inline styles', () => {
    const wrapper = mount(EmailImage, {
      props: defaultProps,
    })
    const style = wrapper.find('img').attributes('style')!
    expect(style).toContain('width: 200px')
    expect(style).toContain('height: 100px')
  })

  it('wraps in div when align is provided', () => {
    const wrapper = mount(EmailImage, {
      props: { ...defaultProps, align: 'center' },
    })
    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.find('div').attributes('style')).toContain('text-align: center')
    expect(wrapper.find('div img').exists()).toBe(true)
  })

  it('renders without wrapper div when no align', () => {
    const wrapper = mount(EmailImage, {
      props: defaultProps,
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('img')
  })

  // Rule 1: No flex or grid CSS
  it('contains no flex or grid CSS properties', () => {
    const wrapper = mount(EmailImage, {
      props: { ...defaultProps, align: 'center' },
    })
    expect(wrapper.html()).not.toMatch(/display:\s*(flex|grid|inline-flex|inline-grid)/)
  })

  // Rule 3: All styles inlined (no class-based styles)
  it('uses only inline styles, no class attributes', () => {
    const wrapper = mount(EmailImage, {
      props: defaultProps,
    })
    expect(wrapper.find('img').attributes('class')).toBeUndefined()
  })

  // Rule 7: Arbitrary HTML attributes passthrough
  it('passes through arbitrary HTML attributes', () => {
    const wrapper = mount(EmailImage, {
      props: defaultProps,
      attrs: { 'data-testid': 'email-image' },
    })
    expect(wrapper.attributes('data-testid')).toBe('email-image')
  })
})
