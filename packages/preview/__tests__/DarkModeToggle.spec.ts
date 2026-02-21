import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DarkModeToggle from '../src/components/DarkModeToggle.vue'

describe('DarkModeToggle', () => {
  it('renders two buttons (light and dark)', () => {
    const wrapper = mount(DarkModeToggle, {
      props: { modelValue: false },
    })
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)
  })

  it('marks light button as active when modelValue is false', () => {
    const wrapper = mount(DarkModeToggle, {
      props: { modelValue: false },
    })
    const buttons = wrapper.findAll('button')
    expect(buttons[0].classes()).toContain('darkmode-toggle-btn--active')
    expect(buttons[1].classes()).not.toContain('darkmode-toggle-btn--active')
  })

  it('marks dark button as active when modelValue is true', () => {
    const wrapper = mount(DarkModeToggle, {
      props: { modelValue: true },
    })
    const buttons = wrapper.findAll('button')
    expect(buttons[0].classes()).not.toContain('darkmode-toggle-btn--active')
    expect(buttons[1].classes()).toContain('darkmode-toggle-btn--active')
  })

  it('emits update:modelValue with true when dark button clicked', async () => {
    const wrapper = mount(DarkModeToggle, {
      props: { modelValue: false },
    })
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('emits update:modelValue with false when light button clicked', async () => {
    const wrapper = mount(DarkModeToggle, {
      props: { modelValue: true },
    })
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })
})
