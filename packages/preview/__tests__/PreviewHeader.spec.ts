import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PreviewHeader from '../src/components/PreviewHeader.vue'
import type { EmailMetadata } from '../src/utils/html-analysis'

function makeMetadata(overrides: Partial<EmailMetadata> = {}): EmailMetadata {
  return {
    subject: 'Test Email Subject',
    previewText: 'This is the preview text',
    fileSize: { bytes: 5120, formatted: '5.0 KB', isWarning: false },
    ...overrides,
  }
}

describe('PreviewHeader', () => {
  it('displays the subject line', () => {
    const wrapper = mount(PreviewHeader, {
      props: { metadata: makeMetadata({ subject: 'My Campaign Email' }) },
    })
    expect(wrapper.find('.preview-header__subject').text()).toBe('My Campaign Email')
  })

  it('displays the subject prop over metadata.subject', () => {
    const wrapper = mount(PreviewHeader, {
      props: { subject: 'My Campaign Email', metadata: makeMetadata({ subject: 'Email Subject from metadata' }) },
    })
    expect(wrapper.find('.preview-header__subject').text()).toBe('My Campaign Email')
  })

  it('displays "No subject" placeholder when subject is null', () => {
    const wrapper = mount(PreviewHeader, {
      props: { metadata: makeMetadata({ subject: null }) },
    })
    expect(wrapper.find('.preview-header__subject').text()).toBe('No subject')
  })

  it('displays the preview text over metadata.previewText', () => {
    const wrapper = mount(PreviewHeader, {
      props: { previewText: 'Custom preview text', metadata: makeMetadata({ previewText: 'Preview text from metadata' }) },
    })
    expect(wrapper.find('.preview-header__preview-text').text()).toBe('Custom preview text')
  })

  it('displays preview text when previewText is present', () => {
    const wrapper = mount(PreviewHeader, {
      props: { metadata: makeMetadata({ previewText: 'Great preview here' }) },
    })
    expect(wrapper.find('.preview-header__preview-text').exists()).toBe(true)
    expect(wrapper.find('.preview-header__preview-text').text()).toBe('Great preview here')
  })

  it('does not display `undefined` as a fallback', () => {
    const wrapper = mount(PreviewHeader, {
      props: { metadata: makeMetadata({ previewText: undefined }), previewText: undefined },
    })
    expect(wrapper.find('.preview-header__preview-text').exists()).toBe(false)
  })

  it('hides preview text element when previewText is null', () => {
    const wrapper = mount(PreviewHeader, {
      props: { metadata: makeMetadata({ previewText: null }) },
    })
    expect(wrapper.find('.preview-header__preview-text').exists()).toBe(false)
  })

  it('displays the formatted file size', () => {
    const wrapper = mount(PreviewHeader, {
      props: { metadata: makeMetadata({ fileSize: { bytes: 20480, formatted: '20.0 KB', isWarning: false } }) },
    })
    expect(wrapper.find('.preview-header__file-size').text()).toBe('20.0 KB')
  })

  it('applies warning class when fileSize.isWarning is true', () => {
    const wrapper = mount(PreviewHeader, {
      props: {
        metadata: makeMetadata({
          fileSize: { bytes: 150000, formatted: '146.5 KB', isWarning: true },
        }),
      },
    })
    const sizeEl = wrapper.find('.preview-header__file-size')
    expect(sizeEl.classes()).toContain('preview-header__file-size--warning')
  })

  it('does not apply warning class when fileSize.isWarning is false', () => {
    const wrapper = mount(PreviewHeader, {
      props: {
        metadata: makeMetadata({
          fileSize: { bytes: 5120, formatted: '5.0 KB', isWarning: false },
        }),
      },
    })
    const sizeEl = wrapper.find('.preview-header__file-size')
    expect(sizeEl.classes()).not.toContain('preview-header__file-size--warning')
  })

  it('renders the plaintext toggle button', () => {
    const wrapper = mount(PreviewHeader, {
      props: { metadata: makeMetadata() },
    })
    const btn = wrapper.find('.preview-header__plaintext')
    expect(btn.exists()).toBe(true)
    expect(btn.text()).toBe('Text')
  })

  it('shows "HTML" label when plaintext is active', () => {
    const wrapper = mount(PreviewHeader, {
      props: { metadata: makeMetadata(), showPlainText: true },
    })
    expect(wrapper.find('.preview-header__plaintext').text()).toBe('HTML')
  })

  it('emits toggle-plaintext when button is clicked', async () => {
    const wrapper = mount(PreviewHeader, {
      props: { metadata: makeMetadata(), showPlainText: false },
    })
    await wrapper.find('.preview-header__plaintext').trigger('click')
    expect(wrapper.emitted('toggle-plaintext')).toEqual([[true]])
  })

  it('applies active class when showPlainText is true', () => {
    const wrapper = mount(PreviewHeader, {
      props: { metadata: makeMetadata(), showPlainText: true },
    })
    expect(wrapper.find('.preview-header__plaintext').classes()).toContain('preview-header__plaintext--active')
  })
})
