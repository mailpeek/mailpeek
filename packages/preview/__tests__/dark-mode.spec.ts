import { describe, it, expect } from 'vitest'
import { getDarkModeConfig, getDarkModeCss } from '../src/utils/dark-mode'

describe('dark-mode', () => {
  describe('getDarkModeConfig', () => {
    it('returns none strategy for gmail (web does not invert content)', () => {
      const config = getDarkModeConfig('gmail')
      expect(config.strategy).toBe('none')
      expect(config.colorScheme).toBe(false)
      expect(config.css).toContain('background-color')
      expect(config.css).not.toContain('invert')
      expect(config.css).not.toContain('filter')
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
      expect(css).toContain('background-color')
    })

    it('returns empty string when disabled', () => {
      const css = getDarkModeCss('gmail', false)
      expect(css).toBe('')
    })

    it('gmail dark mode only sets background, does not invert', () => {
      const css = getDarkModeCss('gmail', true)
      expect(css).toContain('background-color: #1a1a1a')
      expect(css).not.toContain('filter')
      expect(css).not.toContain('invert')
    })

    it('outlook un-inverts images', () => {
      const css = getDarkModeCss('outlook', true)
      expect(css).toContain('img')
      expect(css).toContain('video')
      expect(css).toContain('picture')
    })

    it('raw mode uses full inversion for generic preview', () => {
      const css = getDarkModeCss('raw', true)
      expect(css).toContain('invert(0.9)')
      expect(css).toContain('hue-rotate')
    })

    it('uses different inversion intensities per client', () => {
      const outlook = getDarkModeCss('outlook', true)
      const raw = getDarkModeCss('raw', true)
      expect(outlook).toContain('0.85')
      expect(raw).toContain('0.9')
    })
  })
})
