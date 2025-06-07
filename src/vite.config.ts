import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: '../static/js',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'main.tsx'),
      name: 'chat',
      fileName: 'chat',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        entryFileNames: 'chat.js',
        assetFileNames: 'chat.[ext]'
      }
    }
  },
}); 