// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  // app vive dentro de client/
  root: path.resolve(__dirname, 'client'),
  base: '/wellness/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
  },
  resolve: {
    alias: {
      // aliases internos do client
      '@': path.resolve(__dirname, 'client', 'src'),
      '@components': path.resolve(__dirname, 'client', 'src', 'components'),
      '@pages': path.resolve(__dirname, 'client', 'src', 'pages'),
      '@lib': path.resolve(__dirname, 'client', 'src', 'lib'),
      '@assets': path.resolve(__dirname, 'client', 'src', 'assets'),

      // ALIAS QUE FALTAVA (pasta compartilhada na raiz)
      '@shared': path.resolve(__dirname, 'shared'),

      // shims que já criamos para não quebrar o bundle
      'wouter': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'wouter.ts'),
      '@tanstack/react-query': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'react-query.ts'),
      '@trpc/react-query': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),
      '@trpc/client': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),
      '@trpc/server': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),
      'superjson': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'superjson.ts'),
    },
  },
});
