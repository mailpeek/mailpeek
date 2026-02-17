import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DeviceToggle from '../src/components/DeviceToggle.vue'

describe('DeviceToggle', () => {
  it('renders two device buttons (mobile, desktop)', () => {
    const wrapper = mount(DeviceToggle, {
      props: { modelValue: 'desktop' },
    })
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)
  })

  it('emits update:modelValue with "mobile" when mobile button clicked', async () => {
    const wrapper = mount(DeviceToggle, {
      props: { modelValue: 'desktop' },
    })
    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['mobile'])
  })

  it('emits update:modelValue with "desktop" when desktop button clicked', async () => {
    const wrapper = mount(DeviceToggle, {
      props: { modelValue: 'mobile' },
    })
    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['desktop'])
  })

  it('applies active class to mobile button when modelValue is "mobile"', () => {
    const wrapper = mount(DeviceToggle, {
      props: { modelValue: 'mobile' },
    })
    const buttons = wrapper.findAll('button')
    expect(buttons[0].classes()).toContain('device-toggle-btn--active')
    expect(buttons[1].classes()).not.toContain('device-toggle-btn--active')
  })

  it('applies active class to desktop button when modelValue is "desktop"', () => {
    const wrapper = mount(DeviceToggle, {
      props: { modelValue: 'desktop' },
    })
    const buttons = wrapper.findAll('button')
    expect(buttons[0].classes()).not.toContain('device-toggle-btn--active')
    expect(buttons[1].classes()).toContain('device-toggle-btn--active')
  })
})
