import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // scripts/generate-route-pages.mjs reads the manifest to put hashed image URLs in static share metadata.
  build: { manifest: true },
})
