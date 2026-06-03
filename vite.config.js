import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    },
    minify: 'esbuild',
    target: 'es2015',
    cssCodeSplit: false,
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 4173,
    open: true,
  }
});
