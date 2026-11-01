// @ts-nocheck
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: []
    }
  },
  server: {
    port: 3000,
    open: false
  }
});
