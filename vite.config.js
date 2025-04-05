import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // السماح بالوصول من أي IP
    port: 3000,      // يمكنك تغيير المنفذ إذا لزم الأمر
    strictPort: true,
  }
})