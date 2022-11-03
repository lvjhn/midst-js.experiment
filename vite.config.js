import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa"
import pwaConfig from './pwa.config'
import viteCompression from 'vite-plugin-compression';

import CustomAliases from "./.midst/aliases/CustomAliases.js"

export default defineConfig({
  
  /** Define Plug-ins */
  plugins: [
    vue(),
    VitePWA(pwaConfig),
    viteCompression(),
    splitVendorChunkPlugin(),
  ],

  /** Environment File Prefix */
  envPrefix: "APP_",

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
