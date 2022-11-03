import { defineConfig, optimizeDeps } from 'vite'
import vue from '@vitejs/plugin-vue'

import CustomAliases from "./.midst/aliases/CustomAliases.js"

export default defineConfig({
  
  /** Define Plug-ins */
  plugins: [
    vue()
  ],

  /** Dependency Pre-bundling */
  optimizeDeps: {
    include: [
      "@/app"
    ]
  },

  /** Custom Aliases */
  resolve: {
    alias: [
      ...(new CustomAliases()).resolvers()
    ]
  }
})
