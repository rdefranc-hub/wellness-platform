import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Builda o app que está em client/, sai em client/dist,
// e serve sob /wellness/ no HostGator.
export default defineConfig({
  root: path.resolve(__dirname, 'client'),
  base: '/wellness/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client', 'src'),

      // SHIMS para compilar sem instalar libs faltantes:
      'wouter': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'wouter.ts'),
      '@tanstack/react-query': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'react-query.ts'),
      '@trpc/react-query': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),
      '@trpc/client': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),
      '@trpc/server': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),
      '@trpc/server/observable': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),
      'superjson': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'superjson.ts')
    }
  }
});
