import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/

export default defineConfig({
  plugins: [
    react(),
    /*VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false // Permet de tester la PWA même en mode développement (npm run dev)
      },
      manifest: {
        name: 'Festivo - Plateforme de Billetterie',
        short_name: 'Festivo',
        description: 'La billetterie événementielle intelligente',
        theme_color: '#0d0f17',
        background_color: '#0d0f17',
        display: 'standalone',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })*/
  ],
  
})