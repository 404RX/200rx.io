import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../static/js', // or wherever you host Hugo static files
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'main.tsx'),
      name: 'chat',
      fileName: 'chat',
      formats: ['iife'] // must be IIFE to use global React from CDN
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Tell Rollup not to bundle them
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        entryFileNames: 'chat.js',
        assetFileNames: 'chat.css',
        format: 'iife',
        intro: 'const global = window;' // required by some tools/libs
      }
    },
    cssCodeSplit: true,
    minify: 'terser',
    sourcemap: true
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("development") // Update accordingly
  }
});
