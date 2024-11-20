import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000, // Define a porta para 3000
    open: true, // (Opcional) Abre o navegador automaticamente
    // Você pode adicionar outras configurações aqui, se necessário
  },
});
