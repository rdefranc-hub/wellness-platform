import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { copyFileSync } from 'fs';

// Plugin para copiar .htaccess
function copyHtaccess() {
  return {
    name: 'copy-htaccess',
    closeBundle() {
      const htaccessSrc = path.resolve(__dirname, 'client', 'public', '.htaccess');
      const htaccessDest = path.resolve(__dirname, 'client', 'dist', '.htaccess');
      try {
        copyFileSync(htaccessSrc, htaccessDest);
        console.log('✅ .htaccess copiado para dist/');
      } catch (err) {
        console.warn('⚠️  Erro ao copiar .htaccess:', err);
      }
    }
  };
}

// Root é client/ e o build vai para client/dist
// Base / garante que os assets sejam servidos corretamente
export default defineConfig({
  root: path.resolve(__dirname, 'client'),
  base: '/',
  plugins: [react(), copyHtaccess()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client', 'src'),
      '@lib': path.resolve(__dirname, 'client', 'src', 'lib'),
      '@shims': path.resolve(__dirname, 'client', 'src', 'lib', 'shims'),
      '@shared': path.resolve(__dirname, 'shared'),

      // Shims que usamos só para o build estático no CI:
      '@tanstack/react-query': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'react-query.ts'),
      '@trpc/react-query':     path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),
      '@trpc/client':          path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),
      '@trpc/server':          path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),
      'wouter':                path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'wouter.ts'),
      'superjson':             path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'superjson.ts'),
      'i18next':               path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'i18n.ts'),
      'react-i18next':         path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'react-i18next.ts'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
