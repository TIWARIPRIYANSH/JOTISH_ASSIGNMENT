import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/backend_dev': {
        target: 'https://backend.jotish.in',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
