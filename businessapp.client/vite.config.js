import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dns from 'node:dns';
dns.setDefaultResultOrder('verbatim');

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5154', 
                changeOrigin: true,
                secure: false
            }
        },
        port: 5173
    }
})