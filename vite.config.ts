import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base './' guarantees assets load properly at cite4d.com/citas/ as well as root/localhost
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    host: true
  }
});
