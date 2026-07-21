import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      federation({
        name: 'salesApp',
        filename: 'remoteEntry.js',
        exposes: {
          './routes': './src/router/index.ts',
        },
        remotes: {
          hostApp: env.VITE_HOST_APP_URL || 'https://learning-micro-container.netlify.app/assets/remoteEntry.js',
          uiApp: env.VITE_UI_APP_URL || 'https://leraning-micro-ui.netlify.app/assets/remoteEntry.js'
        },
        shared: ['vue', 'vue-router', 'pinia']
      })
    ],
    server: {
      port: 5002,
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
      }
    },
    preview: {
      port: 5002,
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
      }
    },
    build: {
      target: 'esnext'
    }
  }
})
