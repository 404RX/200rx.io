import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: '../themes/toha/static/js',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'main.tsx'),
      name: 'chat',
      fileName: 'chat',
      formats: ['iife']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        entryFileNames: 'chat.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'chat.css';
          return '[name][extname]';
        },
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        format: 'iife',
        intro: 'const global = window;'
      }
    },
    cssCodeSplit: true,
    minify: 'terser',
    sourcemap: true
  },
}); 