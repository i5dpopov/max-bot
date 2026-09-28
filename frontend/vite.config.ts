import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/app/',  // <-- добавь эту строку
  server: {
    proxy: {
      '/api': 'http://178.21.11.91',
      '/health': 'http://178.21.11.91',
      '/webhook': 'http://178.21.11.91',
    }
  }
});