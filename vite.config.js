import { defineConfig, optimizeDeps } from 'vite'
import vue from '@vitejs/plugin-vue'

import CustomAliases from "./.midst/aliases/CustomAliases.js"

export default defineConfig({
  
  /** Define Plug-ins */
  plugins: [
    vue()
  ],

  /** Custom Aliases */
  resolve: {
    alias: [
      ...(new CustomAliases()).resolvers()
    ]
  },

  /** Dependency Pre-bundling */
  optimizeDeps: {
    include: [
      "@/app/index.js"
    ]
  },
})
