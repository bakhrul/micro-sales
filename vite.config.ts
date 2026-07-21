import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'salesApp',
      filename: 'remoteEntry.js',
      exposes: {
        './routes': './src/router/index.ts',
      },
      remotes: {
        uiApp: 'http://localhost:5003/assets/remoteEntry.js'
      },
      shared: ['vue', 'vue-router']
    })
  ],
  server: {
    port: 5002
  },
  preview: {
    port: 5002
  },
  build: {
    target: 'esnext'
  }
})
