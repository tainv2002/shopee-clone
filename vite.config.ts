/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), visualizer()] as any,
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: path.resolve(__dirname, './vitest.setup.js')
  }
})
