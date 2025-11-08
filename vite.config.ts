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
      '@': path.resolve(__dirname, 'client', 'src'),
      '@components': path.resolve(__dirname, 'client', 'src', 'components'),
      '@pages': path.resolve(__dirname, 'client', 'src', 'pages'),
      '@lib': path.resolve(__dirname, 'client', 'src', 'lib'),
      '@assets': path.resolve(__dirname, 'client', 'src', 'assets'),
      '@shared': path.resolve(__dirname, 'shared'),

      // shims
      '@tanstack/react-query': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'react-query.ts'),
      '@trpc/react-query': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),
      '@trpc/client': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),
      '@trpc/server': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),
      'wouter': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'wouter.ts'),
      'superjson': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'superjson.ts'),
    },
  },
  build: {
    // outDir is relative to root (client), so this produces client/dist
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'client', 'index.html'),
    },
  },
  server: {
    port: 5173,
  },
});
