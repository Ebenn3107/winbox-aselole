import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Request ke /api diteruskan ke server Express, jadi web dan API tampak satu alamat.
    proxy: { '/api': 'http://localhost:3000' },
  },
});
