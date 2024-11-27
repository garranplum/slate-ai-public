// vite.config.ts

import {defineConfig} from "vite"
import path from 'path'

export default defineConfig({
  build: {
    outDir: "build",
  },
  resolve: {
    alias: {
      'framework': path.resolve(__dirname, 'framework'),
      'app': path.resolve(__dirname, 'app'),
    }
  },
  server: {
    hmr: {
      overlay: true
    },
    host: "localhost",
    port: 3000,
    strictPort: true,
  },
})
