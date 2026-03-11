import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'transactional/index': resolve(__dirname, 'src/transactional/index.ts'),
        'marketing/index': resolve(__dirname, 'src/marketing/index.ts'),
        'patterns/index': resolve(__dirname, 'src/patterns/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', '@mailpeek/components'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
})
