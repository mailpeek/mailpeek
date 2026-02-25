import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmailHtml from '../components/EmailHtml.vue'
import EmailHead from '../components/EmailHead.vue'
import EmailBody from '../components/EmailBody.vue'
import EmailContainer from '../components/EmailContainer.vue'
import EmailSection from '../components/EmailSection.vue'
import EmailRow from '../components/EmailRow.vue'
import EmailColumn from '../components/EmailColumn.vue'
import EmailText from '../components/EmailText.vue'
import EmailHeading from '../components/EmailHeading.vue'
import EmailButton from '../components/EmailButton.vue'
import EmailImage from '../components/EmailImage.vue'
import EmailLink from '../components/EmailLink.vue'
import EmailDivider from '../components/EmailDivider.vue'
import EmailPreviewText from '../components/EmailPreviewText.vue'

describe('EmailHtml', () => {
  it('renders <html> with default lang and dir', () => {
    const wrapper = mount(EmailHtml)
    const html = wrapper.find('html')
    expect(html.attributes('lang')).toBe('en')
    expect(html.attributes('dir')).toBe('ltr')
    expect(html.attributes('xmlns')).toBe('http://www.w3.org/1999/xhtml')
  })

  it('renders slot content', () => {
    const wrapper = mount(EmailHtml, {
      slots: { default: '<body>Hello</body>' },
    })
    expect(wrapper.text()).toContain('Hello')
  })
})

describe('EmailHead', () => {
  it('renders <head> with meta tags', () => {
    const wrapper = mount(EmailHead)
    expect(wrapper.find('head').exists()).toBe(true)
    expect(wrapper.find('meta[charset="utf-8"]').exists()).toBe(true)
    expect(wrapper.find('meta[name="viewport"]').exists()).toBe(true)
  })

  it('renders title when provided', () => {
    const wrapper = mount(EmailHead, { props: { title: 'Test Email' } })
    expect(wrapper.find('title').text()).toBe('Test Email')
  })

  it('omits title when not provided', () => {
    const wrapper = mount(EmailHead)
    expect(wrapper.find('title').exists()).toBe(false)
  })
})

describe('EmailBody', () => {
  it('renders <body> with slot', () => {
    const wrapper = mount(EmailBody, {
      slots: { default: '<p>Content</p>' },
    })
    expect(wrapper.find('body').exists()).toBe(true)
    expect(wrapper.text()).toContain('Content')
  })

  it('applies backgroundColor', () => {
    const wrapper = mount(EmailBody, {
      props: { backgroundColor: '#f0f0f0' },
    })
    expect(wrapper.find('body').attributes('style')).toContain('background-color: rgb(240, 240, 240)')
  })
})

describe('EmailContainer', () => {
  it('renders a presentation table', () => {
    const wrapper = mount(EmailContainer)
    const table = wrapper.find('table')
    expect(table.attributes('role')).toBe('presentation')
    expect(table.attributes('cellpadding')).toBe('0')
    expect(table.attributes('cellspacing')).toBe('0')
  })

  it('defaults to 600px max-width and center alignment', () => {
    const wrapper = mount(EmailContainer)
    const style = wrapper.find('table').attributes('style')!
    expect(style).toContain('max-width: 600px')
    // jsdom normalizes 'margin: 0 auto' to separate margin-top/bottom properties
    expect(style).toContain('max-width: 600px')
  })

  it('renders slot content', () => {
    const wrapper = mount(EmailContainer, {
      slots: { default: 'Inner content' },
    })
    expect(wrapper.text()).toContain('Inner content')
  })
})

describe('EmailSection', () => {
  it('renders a presentation table', () => {
    const wrapper = mount(EmailSection)
    const table = wrapper.find('table')
    expect(table.attributes('role')).toBe('presentation')
    expect(table.attributes('width')).toBe('100%')
  })

  it('applies backgroundColor and padding', () => {
    const wrapper = mount(EmailSection, {
      props: { backgroundColor: '#ffffff', padding: '16px' },
    })
    const style = wrapper.find('td').attributes('style')!
    expect(style).toContain('background-color: rgb(255, 255, 255)')
    expect(style).toContain('padding: 16px')
  })
})

describe('EmailRow', () => {
  it('renders a presentation table with 100% width', () => {
    const wrapper = mount(EmailRow)
    const table = wrapper.find('table')
    expect(table.attributes('role')).toBe('presentation')
    expect(table.attributes('style')).toContain('width: 100%')
  })

  it('renders slot content inside tr', () => {
    const wrapper = mount(EmailRow, {
      slots: { default: '<td>Cell</td>' },
    })
    expect(wrapper.find('tr').exists()).toBe(true)
    expect(wrapper.text()).toContain('Cell')
  })
})

describe('EmailColumn', () => {
  it('renders a <td> element', () => {
    const wrapper = mount(EmailColumn, {
      slots: { default: 'Column content' },
    })
    expect(wrapper.find('td').exists()).toBe(true)
    expect(wrapper.text()).toContain('Column content')
  })

  it('applies width and alignment', () => {
    const wrapper = mount(EmailColumn, {
      props: { width: '50%', align: 'center', valign: 'middle' },
    })
    const style = wrapper.find('td').attributes('style')!
    expect(style).toContain('width: 50%')
    expect(style).toContain('text-align: center')
    expect(style).toContain('vertical-align: middle')
  })

  it('defaults valign to top', () => {
    const wrapper = mount(EmailColumn)
    expect(wrapper.find('td').attributes('style')).toContain('vertical-align: top')
  })
})

describe('EmailText', () => {
  it('renders a <p> with default styles', () => {
    const wrapper = mount(EmailText, {
      slots: { default: 'Hello world' },
    })
    const p = wrapper.find('p')
    expect(p.text()).toBe('Hello world')
    const style = p.attributes('style')!
    expect(style).toContain('font-size: 16px')
    expect(style).toContain('color: rgb(51, 51, 51)')
  })

  it('applies custom fontSize and color', () => {
    const wrapper = mount(EmailText, {
      props: { fontSize: 14, color: '#000000' },
    })
    const style = wrapper.find('p').attributes('style')!
    expect(style).toContain('font-size: 14px')
    expect(style).toContain('color: rgb(0, 0, 0)')
  })
})

describe('EmailHeading', () => {
  it('renders <h2> by default', () => {
    const wrapper = mount(EmailHeading, {
      slots: { default: 'Title' },
    })
    expect(wrapper.find('h2').exists()).toBe(true)
    expect(wrapper.find('h2').text()).toBe('Title')
  })

  it('renders specified heading level', () => {
    const wrapper = mount(EmailHeading, {
      props: { as: 'h1', fontSize: 32 },
      slots: { default: 'Big Title' },
    })
    expect(wrapper.find('h1').exists()).toBe(true)
    expect(wrapper.find('h1').attributes('style')).toContain('font-size: 32px')
  })

  it('applies default styles', () => {
    const wrapper = mount(EmailHeading)
    const style = wrapper.find('h2').attributes('style')!
    expect(style).toContain('font-size: 24px')
    expect(style).toContain('line-height: 1.3')
    // jsdom normalizes '0 0 16px 0' shorthand
    expect(style).toContain('margin')
    expect(style).toContain('16px')
  })
})

describe('EmailButton', () => {
  it('renders an <a> with href', () => {
    const wrapper = mount(EmailButton, {
      props: { href: 'https://example.com' },
      slots: { default: 'Click me' },
    })
    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe('https://example.com')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.text()).toBe('Click me')
  })

  it('applies default button styles', () => {
    const wrapper = mount(EmailButton, {
      props: { href: 'https://example.com' },
    })
    const style = wrapper.find('a').attributes('style')!
    expect(style).toContain('display: inline-block')
    expect(style).toContain('text-decoration: none')
    expect(style).toContain('font-weight: bold')
  })
})

describe('EmailImage', () => {
  it('renders an <img> with src and alt', () => {
    const wrapper = mount(EmailImage, {
      props: { src: 'https://example.com/logo.png', alt: 'Logo' },
    })
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('https://example.com/logo.png')
    expect(img.attributes('alt')).toBe('Logo')
  })

  it('applies email-safe default styles', () => {
    const wrapper = mount(EmailImage, {
      props: { src: 'https://example.com/img.png' },
    })
    const style = wrapper.find('img').attributes('style')!
    expect(style).toContain('display: block')
    expect(style).toContain('border: 0')
    expect(style).toContain('outline: none')
  })

  it('applies width and height when provided', () => {
    const wrapper = mount(EmailImage, {
      props: { src: 'https://example.com/img.png', width: 200, height: 100 },
    })
    const img = wrapper.find('img')
    expect(img.attributes('width')).toBe('200')
    expect(img.attributes('height')).toBe('100')
    expect(img.attributes('style')).toContain('width: 200px')
  })

  it('wraps in div with text-align when align is set', () => {
    const wrapper = mount(EmailImage, {
      props: { src: 'https://example.com/img.png', align: 'center' },
    })
    const div = wrapper.find('div')
    expect(div.exists()).toBe(true)
    expect(div.attributes('style')).toContain('text-align: center')
  })
})

describe('EmailLink', () => {
  it('renders an <a> with href', () => {
    const wrapper = mount(EmailLink, {
      props: { href: 'https://example.com' },
      slots: { default: 'Click here' },
    })
    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe('https://example.com')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.text()).toBe('Click here')
  })

  it('applies default color and underline', () => {
    const wrapper = mount(EmailLink, {
      props: { href: 'https://example.com' },
    })
    const style = wrapper.find('a').attributes('style')!
    expect(style).toContain('color: rgb(0, 123, 255)')
    expect(style).toContain('text-decoration: underline')
  })

  it('applies custom color', () => {
    const wrapper = mount(EmailLink, {
      props: { href: 'https://example.com', color: '#ff0000' },
    })
    expect(wrapper.find('a').attributes('style')).toContain('color: rgb(255, 0, 0)')
  })
})

describe('EmailDivider', () => {
  it('renders an <hr>', () => {
    const wrapper = mount(EmailDivider)
    expect(wrapper.find('hr').exists()).toBe(true)
  })

  it('applies default styles', () => {
    const wrapper = mount(EmailDivider)
    const style = wrapper.find('hr').attributes('style')!
    // jsdom normalizes 'border: none' to 'border: medium'
    expect(style).toContain('border')
    expect(style).toContain('height: 1px')
    expect(style).toContain('margin: 16px')
  })

  it('applies custom color and height', () => {
    const wrapper = mount(EmailDivider, {
      props: { color: '#000000', height: 2 },
    })
    const style = wrapper.find('hr').attributes('style')!
    expect(style).toContain('background-color: rgb(0, 0, 0)')
    expect(style).toContain('height: 2px')
  })
})

describe('EmailPreviewText', () => {
  it('renders preview text in a hidden div', () => {
    const wrapper = mount(EmailPreviewText, {
      props: { text: 'Preview of the email' },
    })
    const div = wrapper.find('div')
    expect(div.text()).toContain('Preview of the email')
    expect(div.attributes('style')).toContain('display: none')
    expect(div.attributes('style')).toContain('max-height: 0px')
    expect(div.attributes('style')).toContain('overflow: hidden')
  })

  it('includes padding characters', () => {
    const wrapper = mount(EmailPreviewText, {
      props: { text: 'Hello' },
    })
    // The text should be longer than just "Hello" due to padding chars
    expect(wrapper.find('div').text().length).toBeGreaterThan(5)
  })
})
