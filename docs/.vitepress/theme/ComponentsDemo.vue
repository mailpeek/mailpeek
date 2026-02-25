<script setup lang="ts">
import { ref, onMounted, defineComponent, h } from 'vue'
import { EmailPreview } from '@mailpeek/preview'
import '@mailpeek/preview/style.css'
import {
  render,
  EmailHtml,
  EmailHead,
  EmailBody,
  EmailContainer,
  EmailSection,
  EmailRow,
  EmailColumn,
  EmailText,
  EmailHeading,
  EmailButton,
  EmailImage,
  EmailLink,
  EmailDivider,
  EmailPreviewText,
} from '@mailpeek/components'

const renderedHtml = ref('')

// Inline SVG data URIs for demo icons (avoids external image dependencies)
const boxIcon = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" rx="10" fill="rgba(255,255,255,0.2)"/><text x="24" y="33" font-size="24" text-anchor="middle">📦</text></svg>')}`
const wrenchIcon = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#f0fdfa"/><text x="20" y="28" font-size="18" text-anchor="middle">🔧</text></svg>')}`
const rocketIcon = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#f0fdfa"/><text x="20" y="28" font-size="18" text-anchor="middle">🚀</text></svg>')}`
const teamIcon = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#f0fdfa"/><text x="20" y="28" font-size="18" text-anchor="middle">👥</text></svg>')}`

// Build a polished "Welcome" email that exercises every component
const SampleEmail = defineComponent({
  render() {
    return h(EmailHtml, null, {
      default: () => [
        h(EmailHead, { title: 'Welcome to Launchpad — your account is ready' }),
        h(EmailBody, { backgroundColor: '#f0f4f8' }, {
          default: () => [
            // ── PreviewText ──
            h(EmailPreviewText, {
              text: 'Your account is ready. Here\'s everything you need to get started with Launchpad.',
            }),

            // ── Outer spacing ──
            h(EmailSection, { padding: '48px 20px' }, {
              default: () => [
                h(EmailContainer, { maxWidth: 600 }, {
                  default: () => [

                    // ── Teal header banner ──
                    h(EmailSection, {
                      padding: '36px 48px 32px',
                      backgroundColor: '#0d9488',
                      style: { borderRadius: '12px 12px 0 0', textAlign: 'center' },
                    }, {
                      default: () => [
                        h(EmailImage, {
                          src: boxIcon,
                          alt: '',
                          width: 48,
                          height: 48,
                          align: 'center',
                          style: {
                            borderRadius: '10px',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            marginBottom: '16px',
                          },
                        }),
                        h(EmailHeading, {
                          as: 'h1',
                          fontSize: 28,
                          align: 'center',
                          color: '#ffffff',
                          fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Helvetica, Arial, sans-serif',
                          style: { letterSpacing: '-0.5px', margin: '0' },
                        }, {
                          default: () => 'Launchpad',
                        }),
                      ],
                    }),

                    // ── Hero section ──
                    h(EmailSection, {
                      padding: '48px 48px 32px',
                      backgroundColor: '#ffffff',
                    }, {
                      default: () => [
                        h(EmailHeading, {
                          as: 'h2',
                          fontSize: 24,
                          color: '#0f172a',
                          lineHeight: 1.3,
                          fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Helvetica, Arial, sans-serif',
                          style: { margin: '0 0 16px 0' },
                        }, {
                          default: () => 'Welcome aboard, Sarah! 👋',
                        }),
                        h(EmailText, {
                          fontSize: 16,
                          lineHeight: 1.7,
                          color: '#475569',
                          fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Helvetica, Arial, sans-serif',
                          style: { margin: '0 0 24px 0' },
                        }, {
                          default: () => 'Your Launchpad account is ready. You\'re joining thousands of developers who ship faster with better tooling. Here\'s how to make the most of your first week.',
                        }),
                        h(EmailButton, {
                          href: 'https://example.com/get-started',
                          backgroundColor: '#0d9488',
                          color: '#ffffff',
                          borderRadius: 6,
                          fontSize: 16,
                          paddingX: 32,
                          paddingY: 14,
                          align: 'left',
                          style: { fontWeight: '600' },
                        }, {
                          default: () => 'Get started →',
                        }),
                      ],
                    }),

                    // ── Divider ──
                    h(EmailSection, { padding: '0 48px', backgroundColor: '#ffffff' }, {
                      default: () => [
                        h(EmailDivider, { color: '#e2e8f0', style: { margin: '0' } }),
                      ],
                    }),

                    // ── Features section — 3 rows with icon + text ──
                    h(EmailSection, {
                      padding: '32px 48px 24px',
                      backgroundColor: '#ffffff',
                    }, {
                      default: () => [
                        h(EmailHeading, {
                          as: 'h3',
                          fontSize: 18,
                          color: '#0f172a',
                          fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Helvetica, Arial, sans-serif',
                          style: { margin: '0 0 28px 0' },
                        }, {
                          default: () => 'Three things to do first',
                        }),

                        // Feature 1
                        h(EmailRow, { style: { marginBottom: '24px' } }, {
                          default: () => [
                            h(EmailColumn, { width: '48px', valign: 'top' }, {
                              default: () => [
                                h(EmailImage, {
                                  src: wrenchIcon,
                                  alt: '',
                                  width: 40,
                                  height: 40,
                                  style: { borderRadius: '50%' },
                                }),
                              ],
                            }),
                            h(EmailColumn, { valign: 'top', padding: '0 0 0 16px' }, {
                              default: () => [
                                h(EmailText, {
                                  fontSize: 15,
                                  color: '#0f172a',
                                  fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Helvetica, Arial, sans-serif',
                                  style: { fontWeight: '600', margin: '0 0 4px 0' },
                                }, {
                                  default: () => 'Install the CLI',
                                }),
                                h(EmailText, {
                                  fontSize: 14,
                                  lineHeight: 1.6,
                                  color: '#64748b',
                                  fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Helvetica, Arial, sans-serif',
                                  style: { margin: '0' },
                                }, {
                                  default: () => 'Run npm install -g launchpad-cli to connect your local environment.',
                                }),
                              ],
                            }),
                          ],
                        }),

                        // Feature 2
                        h(EmailRow, { style: { marginBottom: '24px' } }, {
                          default: () => [
                            h(EmailColumn, { width: '48px', valign: 'top' }, {
                              default: () => [
                                h(EmailImage, {
                                  src: rocketIcon,
                                  alt: '',
                                  width: 40,
                                  height: 40,
                                  style: { borderRadius: '50%' },
                                }),
                              ],
                            }),
                            h(EmailColumn, { valign: 'top', padding: '0 0 0 16px' }, {
                              default: () => [
                                h(EmailText, {
                                  fontSize: 15,
                                  color: '#0f172a',
                                  fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Helvetica, Arial, sans-serif',
                                  style: { fontWeight: '600', margin: '0 0 4px 0' },
                                }, {
                                  default: () => 'Deploy your first project',
                                }),
                                h(EmailText, {
                                  fontSize: 14,
                                  lineHeight: 1.6,
                                  color: '#64748b',
                                  fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Helvetica, Arial, sans-serif',
                                  style: { margin: '0' },
                                }, {
                                  default: () => 'Connect your GitHub repo and deploy in under 60 seconds. No config files needed.',
                                }),
                              ],
                            }),
                          ],
                        }),

                        // Feature 3
                        h(EmailRow, { style: { marginBottom: '8px' } }, {
                          default: () => [
                            h(EmailColumn, { width: '48px', valign: 'top' }, {
                              default: () => [
                                h(EmailImage, {
                                  src: teamIcon,
                                  alt: '',
                                  width: 40,
                                  height: 40,
                                  style: { borderRadius: '50%' },
                                }),
                              ],
                            }),
                            h(EmailColumn, { valign: 'top', padding: '0 0 0 16px' }, {
                              default: () => [
                                h(EmailText, {
                                  fontSize: 15,
                                  color: '#0f172a',
                                  fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Helvetica, Arial, sans-serif',
                                  style: { fontWeight: '600', margin: '0 0 4px 0' },
                                }, {
                                  default: () => 'Invite your team',
                                }),
                                h(EmailText, {
                                  fontSize: 14,
                                  lineHeight: 1.6,
                                  color: '#64748b',
                                  fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Helvetica, Arial, sans-serif',
                                  style: { margin: '0' },
                                }, {
                                  default: () => 'Add teammates to your workspace. Your plan includes unlimited collaborators.',
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),

                    // ── Divider ──
                    h(EmailSection, { padding: '0 48px', backgroundColor: '#ffffff' }, {
                      default: () => [
                        h(EmailDivider, { color: '#e2e8f0', style: { margin: '0' } }),
                      ],
                    }),

                    // ── Testimonial section ──
                    h(EmailSection, {
                      padding: '32px 48px',
                      backgroundColor: '#f8fafc',
                    }, {
                      default: () => [
                        h(EmailText, {
                          fontSize: 13,
                          color: '#64748b',
                          fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Helvetica, Arial, sans-serif',
                          style: { fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px 0' },
                        }, {
                          default: () => 'What developers are saying',
                        }),
                        h(EmailText, {
                          fontSize: 15,
                          lineHeight: 1.7,
                          color: '#334155',
                          fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Helvetica, Arial, sans-serif',
                          style: { fontStyle: 'italic', margin: '0 0 12px 0' },
                        }, {
                          default: () => '"Launchpad cut our deployment time from 20 minutes to under 2. It\'s the tool we didn\'t know we were missing."',
                        }),
                        h(EmailText, {
                          fontSize: 13,
                          color: '#64748b',
                          fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Helvetica, Arial, sans-serif',
                          style: { margin: '0' },
                        }, {
                          default: () => '— Marcus Chen, Lead Engineer at Vercel',
                        }),
                      ],
                    }),

                    // ── Footer ──
                    h(EmailSection, {
                      padding: '32px 48px',
                      backgroundColor: '#f8fafc',
                      style: { borderRadius: '0 0 12px 12px' },
                    }, {
                      default: () => [
                        h(EmailText, {
                          fontSize: 13,
                          lineHeight: 1.6,
                          color: '#94a3b8',
                          align: 'center',
                          fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Helvetica, Arial, sans-serif',
                          style: { margin: '0 0 8px 0' },
                        }, {
                          default: () => 'Launchpad · 123 Market St, San Francisco, CA 94105',
                        }),
                        h(EmailText, {
                          fontSize: 13,
                          color: '#94a3b8',
                          align: 'center',
                          fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Helvetica, Arial, sans-serif',
                          style: { margin: '0' },
                        }, {
                          default: () => [
                            h(EmailLink, { href: '#', color: '#64748b' }, { default: () => 'Unsubscribe' }),
                            ' · ',
                            h(EmailLink, { href: '#', color: '#64748b' }, { default: () => 'Privacy Policy' }),
                            ' · ',
                            h(EmailLink, { href: '#', color: '#64748b' }, { default: () => 'View in browser' }),
                          ],
                        }),
                      ],
                    }),

                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    })
  },
})

onMounted(async () => {
  try {
    renderedHtml.value = await render(SampleEmail)
  } catch (e) {
    console.error('Failed to render components email:', e)
  }
})
</script>

<template>
  <div class="components-demo">
    <div v-if="renderedHtml">
      <EmailPreview :html="renderedHtml" />
    </div>
    <p v-else class="components-demo__loading">Rendering email...</p>
  </div>
</template>

<style scoped>
.components-demo {
  margin: 24px 0;
}

.components-demo__loading {
  color: var(--vp-c-text-3);
  font-style: italic;
}
</style>
