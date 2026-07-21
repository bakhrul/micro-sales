import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { routes } from './router'

// Create standalone local router for modules-sales
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/modules-sales/sales-order'
    },
    ...routes
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
