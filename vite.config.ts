import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const uiDefault = env.VITE_UI_APP_URL || 'http://localhost:5003/assets/remoteEntry.js'

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
          uiApp: {
            external: `new Promise((resolve, reject) => {
              const override = window.localStorage.getItem('override_uiApp');
              const url = override || '${uiDefault}';
              import(/* @vite-ignore */ url).then(resolve).catch(reject);
            })`,
            externalType: 'promise'
          }
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
  }
})
