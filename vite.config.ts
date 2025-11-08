import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Root é client/ e o build vai para client/dist
// Base /wellness/ garante que os assets sejam servidos corretamente no HostGator

export default defineConfig({
  root: path.resolve(__dirname, 'client'),
  base: '/wellness/',
  plugins: [react()],
resolve: {
  alias: {
    '@': path.resolve(__dirname, 'client/src'),
    '@lib': path.resolve(__dirname, 'client/src/lib'),
    '@shims': path.resolve(__dirname, 'client/src/lib/shims'),
    '@shared': path.resolve(__dirname, 'shared'), // <-- ADICIONE ESTA LINHA
  },
},
  build: {
    outDir: path.resolve(__dirname, 'client/dist'),
    emptyOutDir: true,
  },
});
