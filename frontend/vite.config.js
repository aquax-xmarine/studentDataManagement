import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),

    // VitePWA({
    //   registerType: 'autoUpdate',

    //   manifest: {
    //     name: 'Student Management System',
    //     short_name: 'SMS',
    //     description: 'Student Management Progressive Web App',

    //     theme_color: '#2563eb',
    //     background_color: '#ffffff',

    //     display: 'standalone',
    //     start_url: '/',

    //     icons: [
    //       {
    //         src: 'icon-192.png',
    //         sizes: '192x192',
    //         type: 'image/png'
    //       },
    //       {
    //         src: 'icon-512.png',
    //         sizes: '512x512',
    //         type: 'image/png'
    //       }
    //     ]
    //   }
    // })
  ],
  server: {
    host: true,
    watch: {
      usePolling: true,
      interval: 100
    },
    hmr: {
      overlay: true,
    },
  }
})