import type { RouteRecordRaw } from 'vue-router'
import SalesOrder from '../views/SalesOrder.vue'
import SalesInvoice from '../views/SalesInvoice.vue'

// Hanya array route yang di-export (tanpa createRouter)
export const routes: RouteRecordRaw[] = [
  {
    path: '/modules-sales/sales-order',
    name: 'sales-order',
    component: SalesOrder
  },
  {
    path: '/modules-sales/sales-invoice',
    name: 'sales-invoice',
    component: SalesInvoice
  },
]
