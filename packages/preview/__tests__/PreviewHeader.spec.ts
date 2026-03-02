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

  it('displays preview text when previewText is present', () => {
    const wrapper = mount(PreviewHeader, {
      props: { metadata: makeMetadata({ previewText: 'Great preview here' }) },
    })
    expect(wrapper.find('.preview-header__preview-text').exists()).toBe(true)
    expect(wrapper.find('.preview-header__preview-text').text()).toBe('Great preview here')
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
})
