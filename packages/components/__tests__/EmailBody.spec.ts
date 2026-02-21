import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmailBody from '../src/components/EmailBody.vue'

describe('EmailBody', () => {
  it('renders body element with default styles', () => {
    const wrapper = mount(EmailBody)
    const body = wrapper.find('body')
    expect(body.exists()).toBe(true)
    expect(body.attributes('style')).toContain('margin: 0')
    expect(body.attributes('style')).toContain('padding: 0')
    expect(body.attributes('style')).toContain('width: 100%')
  })

  it('applies custom background color', () => {
    const wrapper = mount(EmailBody, {
      props: { backgroundColor: '#f0f0f0' },
    })
    expect(wrapper.find('body').attributes('style')).toContain('background-color')
  })

  it('renders slot content', () => {
    const wrapper = mount(EmailBody, {
      slots: { default: '<p>Content</p>' },
    })
    expect(wrapper.text()).toContain('Content')
  })
})
