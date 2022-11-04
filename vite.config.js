import { defineConfig, splitVendorChunkPlugin, transformWithEsbuild } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa"
import pwaConfig from './pwa.config.js'
import viteCompression from 'vite-plugin-compression';

import CustomAliases from "./.midst/aliases/CustomAliases.js"

import reprebundlingPlugin from './.midst/utils/reprebundling/reprebundling.js';

export default defineConfig({
  
  /** Define Plug-ins */
  plugins: [
    vue(),
    VitePWA(pwaConfig),
    viteCompression(),
    splitVendorChunkPlugin(),
    reprebundlingPlugin()
  ],

  /** Environment File Prefix */
  envPrefix: "APP_",

  /** Custom Aliases */
  resolve: {
    alias: [
      ...(new CustomAliases()).resolvers(),
    ]
  },

  /** Dependency Pre-bundling */
  optimizeDeps: {
    include: [
      "@/app/index.js"
    ]
  },
})
