<script lang="ts">
import { defineComponent, computed, h } from 'vue'
import type { CSSProperties, PropType } from 'vue'

/**
 * Escapes HTML special characters to prevent injection in raw HTML output.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export default defineComponent({
  name: 'EmailButton',
  props: {
    href: { type: String, required: true },
    backgroundColor: { type: String, default: '#007bff' },
    color: { type: String, default: '#ffffff' },
    borderRadius: { type: Number, default: 4 },
    fontSize: { type: Number, default: 16 },
    paddingX: { type: Number, default: 24 },
    paddingY: { type: Number, default: 12 },
    align: { type: String as PropType<'left' | 'center' | 'right'>, default: 'center' },
    style: { type: Object as PropType<CSSProperties>, default: undefined },
  },
  setup(props, { slots }) {
    const wrapperStyle = computed<CSSProperties>(() => ({
      textAlign: props.align,
      margin: '0 0 16px 0',
    }))

    const buttonHeight = computed(() => props.paddingY * 2 + props.fontSize + 4)

    const arcsize = computed(() => {
      const pct = Math.round((props.borderRadius / buttonHeight.value) * 100)
      return `${pct}%`
    })

    const linkStyleStr = computed(() => {
      const entries: [string, string][] = [
        ['display', 'inline-block'],
        ['background-color', props.backgroundColor],
        ['color', props.color],
        ['font-size', `${props.fontSize}px`],
        ['font-family', 'Arial, sans-serif'],
        ['font-weight', 'bold'],
        ['text-decoration', 'none'],
        ['text-align', 'center'],
        ['border-radius', `${props.borderRadius}px`],
        ['padding', `${props.paddingY}px ${props.paddingX}px`],
      ]

      if (props.style) {
        for (const [key, value] of Object.entries(props.style)) {
          const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
          entries.push([cssKey, String(value)])
        }
      }

      return entries.map(([k, v]) => `${k}: ${v}`).join('; ')
    })

    return () => {
      const slotContent = slots.default?.()
      let textContent = ''
      if (slotContent) {
        for (const vnode of slotContent) {
          if (typeof vnode.children === 'string') {
            textContent += vnode.children
          }
        }
      }

      const safeHref = escapeHtml(props.href)
      const safeText = escapeHtml(textContent)

      const innerHTML = [
        `<!--[if mso]>`,
        `<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${safeHref}" style="height:${buttonHeight.value}px;v-text-anchor:middle;" arcsize="${arcsize.value}" stroke="false" fillcolor="${props.backgroundColor}">`,
        `<w:anchorlock/>`,
        `<center style="color:${props.color};font-family:Arial,sans-serif;font-size:${props.fontSize}px;font-weight:bold;">`,
        safeText,
        `</center>`,
        `</v:roundrect>`,
        `<![endif]-->`,
        `<!--[if !mso]><!-->`,
        `<a href="${safeHref}" style="${linkStyleStr.value}" target="_blank">${safeText}</a>`,
        `<!--<![endif]-->`,
      ].join('\n')

      return h('div', { style: wrapperStyle.value, innerHTML })
    }
  },
})
</script>
