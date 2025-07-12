import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    optimizeDeps: {
        exclude: ['lucide-react'],
    },
    server: {
        host: true, // Listen on all addresses
        port: 5173, // Default Vite port
    },
});
