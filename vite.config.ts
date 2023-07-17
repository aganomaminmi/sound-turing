import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true
  },
  resolve: {
    alias: [
      { find: '@/', replacement: '/src/' }
    ]
  },
  build: {
    outDir: 'docs',
  },
  plugins: [react()],
})
