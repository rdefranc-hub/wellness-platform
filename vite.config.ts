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

      // shims - core dependencies (subpaths must come before parent modules)
      '@tanstack/react-query': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'react-query.ts'),
      '@trpc/react-query': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),
      '@trpc/client': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),
      '@trpc/server': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),
      'wouter': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'wouter.ts'),
      'superjson': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'superjson.ts'),
      
      // shims - additional dependencies (subpaths first)
      'zustand/middleware': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'zustand-middleware.ts'),
      'zustand': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'zustand.ts'),
      'date-fns/locale': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'date-fns-locale.ts'),
      'date-fns': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'date-fns.ts'),
      'i18next': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'i18next.ts'),
      'react-i18next': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'react-i18next.ts'),
      'sonner': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'sonner.ts'),
      'lucide-react': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'lucide-react.ts'),
      'clsx': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'clsx.ts'),
      'tailwind-merge': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'tailwind-merge.ts'),
      'class-variance-authority': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'class-variance-authority.ts'),
      'cmdk': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'cmdk.ts'),
      'react-day-picker': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'react-day-picker.ts'),
      'recharts': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'recharts.ts'),
      'next-themes': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'next-themes.ts'),
      'vaul': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'vaul.ts'),
      'input-otp': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'input-otp.ts'),
      'react-resizable-panels': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'react-resizable-panels.ts'),
      'streamdown': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'streamdown.ts'),
      
      // shims - radix-ui components
      '@radix-ui/react-accordion': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-accordion.ts'),
      '@radix-ui/react-alert-dialog': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-alert-dialog.ts'),
      '@radix-ui/react-aspect-ratio': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-aspect-ratio.ts'),
      '@radix-ui/react-avatar': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-avatar.ts'),
      '@radix-ui/react-checkbox': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-checkbox.ts'),
      '@radix-ui/react-collapsible': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-collapsible.ts'),
      '@radix-ui/react-context-menu': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-context-menu.ts'),
      '@radix-ui/react-dialog': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-dialog.ts'),
      '@radix-ui/react-dropdown-menu': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-dropdown-menu.ts'),
      '@radix-ui/react-hover-card': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-hover-card.ts'),
      '@radix-ui/react-label': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-label.ts'),
      '@radix-ui/react-menubar': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-menubar.ts'),
      '@radix-ui/react-navigation-menu': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-navigation-menu.ts'),
      '@radix-ui/react-popover': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-popover.ts'),
      '@radix-ui/react-progress': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-progress.ts'),
      '@radix-ui/react-radio-group': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-radio-group.ts'),
      '@radix-ui/react-scroll-area': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-scroll-area.ts'),
      '@radix-ui/react-select': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-select.ts'),
      '@radix-ui/react-separator': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-separator.ts'),
      '@radix-ui/react-slider': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-slider.ts'),
      '@radix-ui/react-slot': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-slot.ts'),
      '@radix-ui/react-switch': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-switch.ts'),
      '@radix-ui/react-tabs': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-tabs.ts'),
      '@radix-ui/react-toggle': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-toggle.ts'),
      '@radix-ui/react-toggle-group': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-toggle-group.ts'),
      '@radix-ui/react-tooltip': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'radix-tooltip.ts'),
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
