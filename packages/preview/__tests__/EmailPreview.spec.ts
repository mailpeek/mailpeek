import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import EmailPreview from '../src/components/EmailPreview.vue'
import GmailChrome from '../src/components/GmailChrome.vue'
import OutlookChrome from '../src/components/OutlookChrome.vue'
import ClientSwitcher from '../src/components/ClientSwitcher.vue'
import DeviceToggle from '../src/components/DeviceToggle.vue'
import PreviewHeader from '../src/components/PreviewHeader.vue'

describe('EmailPreview', () => {
  it('renders a PreviewFrame component', () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<p>Hello</p>' },
    })
    expect(wrapper.find('iframe').exists()).toBe(true)
  })

  it('passes html prop to the iframe srcdoc', async () => {
    const html = '<h1>Email subject</h1><p>Body</p>'
    const wrapper = mount(EmailPreview, {
      props: { html },
    })
    await nextTick()
    const srcdoc = wrapper.find('iframe').attributes('srcdoc') ?? ''
    expect(srcdoc).toContain(html)
  })

  it('updates the iframe when html prop changes reactively', async () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<p>Original</p>' },
    })
    await nextTick()
    expect(wrapper.find('iframe').attributes('srcdoc')).toContain('Original')

    await wrapper.setProps({ html: '<p>Updated</p>' })
    await nextTick()
    expect(wrapper.find('iframe').attributes('srcdoc')).toContain('Updated')
  })

  it('renders slot content to html in the iframe', async () => {
    const wrapper = mount(EmailPreview, {
      slots: {
        default: '<div class="email-body"><p>Slot email content</p></div>',
      },
    })
    // Wait for async renderToString
    await nextTick()
    await new Promise((r) => setTimeout(r, 50))

    const srcdoc = wrapper.find('iframe').attributes('srcdoc') ?? ''
    expect(srcdoc).toContain('email-body')
  })

  it('html prop takes precedence over slot content', async () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<p>Prop content</p>' },
      slots: {
        default: '<p>Slot content</p>',
      },
    })
    await nextTick()
    const srcdoc = wrapper.find('iframe').attributes('srcdoc') ?? ''
    expect(srcdoc).toContain('Prop content')
  })

  // === Phase 2 tests: client simulation ===

  it('default client is gmail — GmailChrome is rendered', () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<p>Test</p>' },
    })
    expect(wrapper.findComponent(GmailChrome).exists()).toBe(true)
    expect(wrapper.findComponent(OutlookChrome).exists()).toBe(false)
  })

  it('client="outlook" renders OutlookChrome', () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<p>Test</p>', client: 'outlook' },
    })
    expect(wrapper.findComponent(OutlookChrome).exists()).toBe(true)
    expect(wrapper.findComponent(GmailChrome).exists()).toBe(false)
  })

  it('client="raw" renders PreviewFrame directly without chrome', () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<p>Test</p>', client: 'raw' },
    })
    expect(wrapper.findComponent(GmailChrome).exists()).toBe(false)
    expect(wrapper.findComponent(OutlookChrome).exists()).toBe(false)
    expect(wrapper.find('iframe').exists()).toBe(true)
  })

  it('ClientSwitcher appears when client is gmail', () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<p>Test</p>', client: 'gmail' },
    })
    expect(wrapper.findComponent(ClientSwitcher).exists()).toBe(true)
  })

  it('ClientSwitcher appears when client is outlook', () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<p>Test</p>', client: 'outlook' },
    })
    expect(wrapper.findComponent(ClientSwitcher).exists()).toBe(true)
  })

  it('ClientSwitcher is visible when client is raw', () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<p>Test</p>', client: 'raw' },
    })
    expect(wrapper.findComponent(ClientSwitcher).exists()).toBe(true)
  })

  it('clicking ClientSwitcher emits client-change event', async () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<p>Test</p>', client: 'gmail' },
    })
    const switcher = wrapper.findComponent(ClientSwitcher)
    // Emit update:modelValue from ClientSwitcher to simulate user click
    await switcher.vm.$emit('update:modelValue', 'outlook')
    await nextTick()
    expect(wrapper.emitted('client-change')).toBeTruthy()
    expect(wrapper.emitted('client-change')![0]).toEqual(['outlook'])
  })

  it('switching client via ClientSwitcher updates to OutlookChrome', async () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<p>Test</p>', client: 'gmail' },
    })
    expect(wrapper.findComponent(GmailChrome).exists()).toBe(true)

    const switcher = wrapper.findComponent(ClientSwitcher)
    await switcher.vm.$emit('update:modelValue', 'outlook')
    await nextTick()

    expect(wrapper.findComponent(OutlookChrome).exists()).toBe(true)
    expect(wrapper.findComponent(GmailChrome).exists()).toBe(false)
  })

  it('mobile=true passes mobile prop to GmailChrome', () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<p>Test</p>', client: 'gmail', mobile: true },
    })
    const chrome = wrapper.findComponent(GmailChrome)
    expect(chrome.exists()).toBe(true)
    expect(chrome.props('mobile')).toBe(true)
  })

  it('mobile=true passes mobile prop to OutlookChrome', () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<p>Test</p>', client: 'outlook', mobile: true },
    })
    const chrome = wrapper.findComponent(OutlookChrome)
    expect(chrome.exists()).toBe(true)
    expect(chrome.props('mobile')).toBe(true)
  })

  it('mobile=true applies mobile CSS class to GmailChrome', () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<p>Test</p>', client: 'gmail', mobile: true },
    })
    expect(wrapper.find('.gmail-chrome--mobile').exists()).toBe(true)
  })

  it('mobile=true applies mobile CSS class to OutlookChrome', () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<p>Test</p>', client: 'outlook', mobile: true },
    })
    expect(wrapper.find('.outlook-chrome--mobile').exists()).toBe(true)
  })

  // === Phase 3 tests: device toggle ===

  it('DeviceToggle is rendered in the toolbar', () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<p>Test</p>' },
    })
    expect(wrapper.findComponent(DeviceToggle).exists()).toBe(true)
  })

  it('default deviceWidth is "desktop" — device container max-width is 600px', async () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<p>Test</p>', width: '600px' },
    })
    await nextTick()
    const container = wrapper.find('.mailpeek-device-container')
    const style = container.attributes('style') ?? ''
    expect(style).toContain('600px')
  })

  it('deviceWidth="mobile" sets device container max-width to 375px', async () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<p>Test</p>', deviceWidth: 'mobile' },
    })
    await nextTick()
    const container = wrapper.find('.mailpeek-device-container')
    const style = container.attributes('style') ?? ''
    expect(style).toContain('375px')
  })

  it('switching DeviceToggle to mobile updates device container max-width to 375px', async () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<p>Test</p>' },
    })
    const toggle = wrapper.findComponent(DeviceToggle)
    await toggle.vm.$emit('update:modelValue', 'mobile')
    await nextTick()
    const container = wrapper.find('.mailpeek-device-container')
    const style = container.attributes('style') ?? ''
    expect(style).toContain('375px')
  })

  it('EmailPreview emits device-change event when DeviceToggle selection changes', async () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<p>Test</p>' },
    })
    const toggle = wrapper.findComponent(DeviceToggle)
    await toggle.vm.$emit('update:modelValue', 'mobile')
    await nextTick()
    expect(wrapper.emitted('device-change')).toBeTruthy()
    expect(wrapper.emitted('device-change')![0]).toEqual(['mobile'])
  })

  // === Phase 3 tests: metadata header ===

  it('EmailPreview renders PreviewHeader component', async () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<html><head><title>Test Email</title></head><body><p>Hello</p></body></html>' },
    })
    await nextTick()
    expect(wrapper.findComponent(PreviewHeader).exists()).toBe(true)
  })

  it('PreviewHeader shows correct subject extracted from html prop', async () => {
    const html = '<html><head><title>Welcome Newsletter</title></head><body><p>Hello</p></body></html>'
    const wrapper = mount(EmailPreview, { props: { html } })
    await nextTick()
    expect(wrapper.find('.preview-header__subject').text()).toBe('Welcome Newsletter')
  })

  it('metadata updates when html prop changes', async () => {
    const wrapper = mount(EmailPreview, {
      props: { html: '<html><head><title>First Subject</title></head><body><p>First</p></body></html>' },
    })
    await nextTick()
    expect(wrapper.find('.preview-header__subject').text()).toBe('First Subject')

    await wrapper.setProps({
      html: '<html><head><title>Second Subject</title></head><body><p>Second</p></body></html>',
    })
    await nextTick()
    expect(wrapper.find('.preview-header__subject').text()).toBe('Second Subject')
  })

  it('file size warning class shown for large emails (>100KB)', async () => {
    // Build an html string over 100KB (102400 bytes)
    const largeBody = 'x'.repeat(103000)
    const html = `<html><head><title>Big Email</title></head><body><p>${largeBody}</p></body></html>`
    const wrapper = mount(EmailPreview, { props: { html } })
    await nextTick()
    const sizeEl = wrapper.find('.preview-header__file-size')
    expect(sizeEl.exists()).toBe(true)
    expect(sizeEl.classes()).toContain('preview-header__file-size--warning')
  })
})
