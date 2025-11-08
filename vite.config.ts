import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Root is client/ so builds go to client/dist when outDir is 'dist'.
// base is set so final site works at https://clubedavida.online/wellness/

export default defineConfig({
  root: path.resolve(__dirname, 'client'),
  base: '/wellness/',
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'shared'),
      '@lib': path.resolve(__dirname, 'client/src/lib'),
      '@lib/shims': path.resolve(__dirname, 'client/src/lib/shims'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
