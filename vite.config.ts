import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname para ESM/TS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root é client/ e o build vai para client/dist
// Base /wellness/ garante que os assets sejam servidos corretamente no HostGator
export default defineConfig({
  root: path.resolve(__dirname, 'client'),
  base: '/wellness/',
  plugins: [react()],
  resolve: {
    alias: {
      'i18next': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'i18n.ts'),

      '@': path.resolve(__dirname, 'client', 'src'),
      '@lib': path.resolve(__dirname, 'client', 'src', 'lib'),
      '@shims': path.resolve(__dirname, 'client', 'src', 'lib', 'shims'),
      '@shared': path.resolve(__dirname, 'shared'),

      '@tanstack/react-query': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'react-query.ts'),
      '@trpc/react-query':     path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),
      '@trpc/client':          path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),
      '@trpc/server':          path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),

      'wouter':    path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'wouter.ts'),
      'superjson': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'superjson.ts'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'client', 'dist'),
    emptyOutDir: true,
  },
});

