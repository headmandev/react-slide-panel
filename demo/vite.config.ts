import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Use library source for live debugging (no build step)
    alias: {
      'react-slide-drawer': path.resolve(__dirname, '../src/index.ts'),
    },
  },
});
