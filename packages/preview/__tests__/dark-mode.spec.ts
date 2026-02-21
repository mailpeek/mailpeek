import { describe, it, expect } from 'vitest'
import { getDarkModeConfig, getDarkModeCss } from '../src/utils/dark-mode'

describe('dark-mode', () => {
  describe('getDarkModeConfig', () => {
    it('returns full-inversion config for gmail', () => {
      const config = getDarkModeConfig('gmail')
      expect(config.strategy).toBe('full-inversion')
      expect(config.colorScheme).toBe(false)
      expect(config.css).toContain('invert(0.9)')
    })

    it('returns partial-inversion config for outlook', () => {
      const config = getDarkModeConfig('outlook')
      expect(config.strategy).toBe('partial-inversion')
      expect(config.css).toContain('invert(0.85)')
    })

    it('returns full-inversion config for raw', () => {
      const config = getDarkModeConfig('raw')
      expect(config.strategy).toBe('full-inversion')
      expect(config.css).toContain('invert(0.9)')
    })
  })

  describe('getDarkModeCss', () => {
    it('returns CSS string when enabled', () => {
      const css = getDarkModeCss('gmail', true)
      expect(css).toContain('filter')
      expect(css).toContain('hue-rotate')
      expect(css).toContain('background-color')
    })

    it('returns empty string when disabled', () => {
      const css = getDarkModeCss('gmail', false)
      expect(css).toBe('')
    })

    it('un-inverts images', () => {
      const css = getDarkModeCss('gmail', true)
      expect(css).toContain('img')
      expect(css).toContain('video')
      expect(css).toContain('picture')
    })

    it('uses different inversion intensities per client', () => {
      const gmail = getDarkModeCss('gmail', true)
      const outlook = getDarkModeCss('outlook', true)
      expect(gmail).toContain('0.9')
      expect(outlook).toContain('0.85')
    })
  })
})
