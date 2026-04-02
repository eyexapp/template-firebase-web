import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
      'cross-origin-opener-policy': 'same-origin-allow-popups',
    },
    proxy: {
      '/v1beta/projects': {
        target: 'http://127.0.0.1:9399',
        changeOrigin: true,
      },
    },
  },
});
