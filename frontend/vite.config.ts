import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://178.21.11.91',
      '/health': 'http://178.21.11.91',
      '/webhook': 'http://178.21.11.91',
    },
  },
})
