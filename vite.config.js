import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this project below the repository name.
export default defineConfig({
  base: '/-creator-hub-cloudbase/',
  plugins: [react()]
})
