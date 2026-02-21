import { describe, it, expect } from 'vitest'
import { analyzeCompatibility } from '../src/utils/compatibility'
import { gmailConfig } from '../src/clients/gmail'
import { outlookConfig } from '../src/clients/outlook'

describe('analyzeCompatibility', () => {
  describe('scoring', () => {
    it('scores 100 for HTML with no issues', () => {
      const html = '<div style="color: red; font-size: 16px;">Hello</div>'
      const report = analyzeCompatibility(html, gmailConfig)
      expect(report.score).toBe(100)
      expect(report.grade).toBe('A')
      expect(report.totalIssues).toBe(0)
      expect(report.issues).toHaveLength(0)
    })

    it('deducts points for inline style violations', () => {
      const html = '<div style="position: fixed;">Test</div>'
      const report = analyzeCompatibility(html, gmailConfig)
      expect(report.score).toBe(97) // 100 - 3
      expect(report.grade).toBe('A')
      expect(report.totalIssues).toBe(1)
    })

    it('deducts points for multiple different violations', () => {
      const html = '<div style="position: fixed; transform: rotate(45deg); animation: spin 1s;">Test</div>'
      const report = analyzeCompatibility(html, gmailConfig)
      expect(report.score).toBe(91) // 100 - 3*3
      expect(report.grade).toBe('A')
      expect(report.totalIssues).toBe(3)
    })

    it('deduplicates same property across multiple elements', () => {
      const html = `
        <div style="position: fixed;">A</div>
        <div style="position: absolute;">B</div>
      `
      const report = analyzeCompatibility(html, gmailConfig)
      // position appears twice but is one unique issue
      expect(report.issues).toHaveLength(1)
      expect(report.issues[0].occurrences).toBe(2)
      expect(report.score).toBe(97) // only -3 once
    })

    it('floors score at 0 and never goes negative', () => {
      // Many violations to push score well below 0
      // Also add external stylesheet and @import for extra penalties
      const html = `
        <link rel="stylesheet" href="styles.css">
        <style>
          @import url("fonts.css");
          .box {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 10;
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
            animation: spin 1s;
            -webkit-animation: spin 1s;
            transition: all 0.3s;
            box-shadow: 0 2px 4px black;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            flex-wrap: wrap;
            flex: 1;
            display: grid;
            grid: auto / 1fr;
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            grid-column: 1;
            grid-row: 1;
            clip-path: circle(50%);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            filter: blur(5px);
            aspect-ratio: 16/9;
            resize: both;
            user-select: none;
            pointer-events: none;
          }
        </style>
        <div style="position: fixed;">Test</div>
      `
      const report = analyzeCompatibility(html, gmailConfig)
      expect(report.score).toBe(0)
      expect(report.grade).toBe('F')
    })
  })

  describe('grades', () => {
    it('assigns grade A for score >= 90', () => {
      const html = '<div style="position: fixed;">Test</div>'
      const report = analyzeCompatibility(html, gmailConfig)
      expect(report.score).toBeGreaterThanOrEqual(90)
      expect(report.grade).toBe('A')
    })

    it('assigns grade B for score 75-89', () => {
      // 5 unique issues = -15, score 85
      const html = `<div style="
        position: fixed;
        transform: rotate(45deg);
        animation: spin 1s;
        transition: all 0.3s;
        box-shadow: 0 2px 4px black;
      ">Test</div>`
      const report = analyzeCompatibility(html, gmailConfig)
      expect(report.score).toBe(85)
      expect(report.grade).toBe('B')
    })
  })

  describe('external stylesheets', () => {
    it('detects external stylesheets', () => {
      const html = '<link rel="stylesheet" href="styles.css"><div>Test</div>'
      const report = analyzeCompatibility(html, gmailConfig)
      expect(report.hasExternalStylesheets).toBe(true)
      expect(report.score).toBe(90) // -10
    })

    it('ignores external stylesheets when config does not strip them', () => {
      const config = { ...gmailConfig, stripExternalStylesheets: false }
      const html = '<link rel="stylesheet" href="styles.css"><div>Test</div>'
      const report = analyzeCompatibility(html, config)
      expect(report.hasExternalStylesheets).toBe(false)
      expect(report.score).toBe(100)
    })
  })

  describe('@import rules', () => {
    it('detects @import rules in style blocks', () => {
      const html = '<style>@import url("fonts.css");</style><div>Test</div>'
      const report = analyzeCompatibility(html, gmailConfig)
      expect(report.hasAtImport).toBe(true)
      expect(report.score).toBe(92) // -8
    })

    it('ignores @import when config does not strip them', () => {
      const config = { ...gmailConfig, stripAtImport: false }
      const html = '<style>@import url("fonts.css");</style><div>Test</div>'
      const report = analyzeCompatibility(html, config)
      expect(report.hasAtImport).toBe(false)
    })
  })

  describe('style blocks', () => {
    it('detects violations in style blocks', () => {
      const html = '<style>.box { position: fixed; color: red; }</style>'
      const report = analyzeCompatibility(html, gmailConfig)
      expect(report.issues).toHaveLength(1)
      expect(report.issues[0].property).toBe('position')
      expect(report.issues[0].location).toBe('style-block')
    })
  })

  describe('value-specific restrictions', () => {
    it('flags display:grid but not display:flex for Gmail', () => {
      const html = `
        <div style="display: grid;">Grid</div>
        <div style="display: flex;">Flex</div>
      `
      const report = analyzeCompatibility(html, gmailConfig)
      const displayIssue = report.issues.find(i => i.property === 'display')
      expect(displayIssue).toBeDefined()
      expect(displayIssue!.value).toContain('grid')
    })

    it('flags display:flex for Outlook', () => {
      const html = '<div style="display: flex;">Flex</div>'
      const report = analyzeCompatibility(html, outlookConfig)
      const displayIssue = report.issues.find(i => i.property === 'display')
      expect(displayIssue).toBeDefined()
    })
  })

  describe('client differences', () => {
    it('Outlook catches more issues than Gmail for same HTML', () => {
      const html = '<div style="border-radius: 8px; max-width: 600px; display: flex;">Test</div>'
      const gmailReport = analyzeCompatibility(html, gmailConfig)
      const outlookReport = analyzeCompatibility(html, outlookConfig)
      expect(outlookReport.totalIssues).toBeGreaterThan(gmailReport.totalIssues)
      expect(outlookReport.score).toBeLessThan(gmailReport.score)
    })
  })

  describe('report structure', () => {
    it('includes all required fields', () => {
      const html = '<div style="position: fixed;">Test</div>'
      const report = analyzeCompatibility(html, gmailConfig)
      expect(report).toHaveProperty('score')
      expect(report).toHaveProperty('grade')
      expect(report).toHaveProperty('totalIssues')
      expect(report).toHaveProperty('issues')
      expect(report).toHaveProperty('hasExternalStylesheets')
      expect(report).toHaveProperty('hasAtImport')
    })

    it('includes issue details', () => {
      const html = '<div style="box-shadow: 0 2px 4px rgba(0,0,0,0.1);">Test</div>'
      const report = analyzeCompatibility(html, gmailConfig)
      expect(report.issues[0]).toHaveProperty('property', 'box-shadow')
      expect(report.issues[0]).toHaveProperty('reason')
      expect(report.issues[0]).toHaveProperty('location', 'inline')
      expect(report.issues[0]).toHaveProperty('occurrences', 1)
    })
  })
})
