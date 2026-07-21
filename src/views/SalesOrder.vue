<template>
  <div class="view-page">
    <BaseCard title="Transaksi Sales Order" subtitle="Daftar pesanan penjualan (Remote Module 2)">
      <template #actions>
        <BaseButton
          variant="success"
          icon="🛒"
          size="sm"
          :disabled="!authStore.isLoggedIn"
          @click="createOrder"
        >
          Buat Pesanan Baru
        </BaseButton>
      </template>

      <!-- Auth Banner Notification inside Remote Module -->
      <div v-if="authStore.isLoggedIn" class="auth-banner active">
        <span>🍍 Pinia Auth: <strong>{{ authStore.user?.name }}</strong> ({{ authStore.user?.role }})</span>
        <BaseBadge variant="success" dot size="sm">Pinia Sync Active</BaseBadge>
      </div>
      <div v-else class="auth-banner inactive">
        <span>🔒 Anda belum login. Silakan login di HOST Shell untuk mengaktifkan tombol pesanan.</span>
        <BaseBadge variant="warning" size="sm">Read Only Mode</BaseBadge>
      </div>

      <div class="search-bar">
        <BaseInput
          v-model="search"
          placeholder="Cari No. Order / Pelanggan..."
          icon="🔎"
        />
      </div>

      <div class="orders-list">
        <div v-for="order in filteredOrders" :key="order.id" class="order-card">
          <div class="order-main">
            <div class="order-number">{{ order.orderNo }}</div>
            <div class="order-customer">Pelanggan: {{ order.customer }} • Dibuat oleh: <strong>{{ order.createdBy }}</strong></div>
            <div class="order-date">{{ formatDate(order.date) }}</div>
          </div>
          <div class="order-right">
            <div class="order-total">{{ formatRupiah(order.amount) }}</div>
            <BaseBadge :variant="getStatusVariant(order.status)" dot>
              {{ order.status }}
            </BaseBadge>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseButton from 'uiApp/Button'
import BaseCard from 'uiApp/Card'
import BaseBadge from 'uiApp/Badge'
import BaseInput from 'uiApp/Input'
import { formatRupiah, formatDate } from 'uiApp/utils'
import { useAuthStore } from 'hostApp/auth'

const authStore = useAuthStore()

interface OrderItem {
  id: number
  orderNo: string
  customer: string
  createdBy: string
  date: string
  amount: number
  status: 'Diproses' | 'Dikirim' | 'Selesai' | 'Dibatalkan'
}

const search = ref('')
const orders = ref<OrderItem[]>([
  { id: 1, orderNo: 'SO-2026-001', customer: 'PT Digital Indonesia', createdBy: 'Bahrul Developer', date: '2026-07-21', amount: 14500000, status: 'Selesai' },
  { id: 2, orderNo: 'SO-2026-002', customer: 'CV Maju Mundur', createdBy: 'Sales Staff', date: '2026-07-20', amount: 8250000, status: 'Dikirim' },
  { id: 3, orderNo: 'SO-2026-003', customer: 'Toko Teknologi', createdBy: 'Sales Staff', date: '2026-07-20', amount: 3100000, status: 'Diproses' }
])

const filteredOrders = computed(() => {
  if (!search.value) return orders.value
  return orders.value.filter(o =>
    o.orderNo.toLowerCase().includes(search.value.toLowerCase()) ||
    o.customer.toLowerCase().includes(search.value.toLowerCase())
  )
})

function getStatusVariant(status: OrderItem['status']) {
  switch (status) {
    case 'Selesai': return 'success'
    case 'Dikirim': return 'info'
    case 'Diproses': return 'warning'
    case 'Dibatalkan': return 'danger'
    default: return 'neutral'
  }
}

function createOrder() {
  if (!authStore.isLoggedIn) return
  
  const nextId = orders.value.length + 1
  const creator = authStore.user?.name || 'User'
  
  orders.value.unshift({
    id: nextId,
    orderNo: `SO-2026-00${nextId}`,
    customer: 'Klien Express Baru',
    createdBy: creator,
    date: '2026-07-21',
    amount: 5000000,
    status: 'Diproses'
  })
}
</script>

<style scoped>
.view-page {
  display: flex;
  flex-direction: column;
}

.auth-banner {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
}

.auth-banner.active {
  background: #e0e7ff;
  border: 1px solid #c7d2fe;
  color: #3730a3;
}

.auth-banner.inactive {
  background: #fef3c7;
  border: 1px solid #fde68a;
  color: #92400e;
}

.search-bar {
  margin-bottom: 1.25rem;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.order-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
}

.order-number {
  font-weight: 700;
  color: #0f172a;
  font-size: 1rem;
}

.order-customer {
  font-size: 0.875rem;
  color: #475569;
}

.order-date {
  font-size: 0.75rem;
  color: #94a3b8;
}

.order-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.35rem;
}

.order-total {
  font-weight: 800;
  color: #10b981;
  font-size: 1.05rem;
}
</style>