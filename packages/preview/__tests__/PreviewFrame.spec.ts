import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PreviewFrame from '../src/components/PreviewFrame.vue'

describe('PreviewFrame', () => {
  it('renders an iframe element', () => {
    const wrapper = mount(PreviewFrame, {
      props: { html: '<p>Hello email</p>' },
    })
    expect(wrapper.find('iframe').exists()).toBe(true)
  })

  it('injects html prop into srcdoc (not src)', () => {
    const html = '<p>Test email content</p>'
    const wrapper = mount(PreviewFrame, {
      props: { html },
    })
    const iframe = wrapper.find('iframe')
    const srcdoc = iframe.attributes('srcdoc') ?? ''
    expect(srcdoc).toContain(html)
    expect(iframe.attributes('src')).toBeUndefined()
  })

  it('applies sandbox="allow-same-origin" for style isolation', () => {
    const wrapper = mount(PreviewFrame, {
      props: { html: '<p>Test</p>' },
    })
    expect(wrapper.find('iframe').attributes('sandbox')).toBe('allow-same-origin')
  })

  it('applies the width prop to the container', () => {
    const wrapper = mount(PreviewFrame, {
      props: { html: '<p>Test</p>', width: '400px' },
    })
    expect(wrapper.find('.mailpeek-preview-frame').attributes('style')).toContain('400px')
  })

  it('wraps html in a full HTML document with DOCTYPE', () => {
    const wrapper = mount(PreviewFrame, {
      props: { html: '<p>Test</p>' },
    })
    const srcdoc = wrapper.find('iframe').attributes('srcdoc') ?? ''
    expect(srcdoc).toContain('<!DOCTYPE html>')
    expect(srcdoc).toContain('<body>')
  })
})
