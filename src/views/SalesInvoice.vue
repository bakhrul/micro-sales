<template>
  <div class="view-page">
    <BaseCard title="Daftar Sales Invoice" subtitle="Faktur Tagihan & Pembayaran (Remote Module 2)">
      <template #actions>
        <BaseButton variant="primary" icon="🧾" size="sm" @click="generateInvoice">
          Generate Faktur
        </BaseButton>
      </template>

      <div class="invoice-grid">
        <div v-for="inv in invoices" :key="inv.id" class="invoice-box">
          <div class="inv-header">
            <span class="inv-no">{{ inv.invNo }}</span>
            <BaseBadge :variant="inv.paid ? 'success' : 'danger'">
              {{ inv.paid ? 'Lunas' : 'Belum Lunas' }}
            </BaseBadge>
          </div>
          <div class="inv-amount">{{ formatRupiah(inv.amount) }}</div>
          <div class="inv-due">Jatuh Tempo: {{ formatDate(inv.dueDate) }}</div>
          <div class="inv-actions">
            <BaseButton v-if="!inv.paid" variant="outline" size="sm" @click="payInvoice(inv)">Bayar Sekarang</BaseButton>
            <BaseButton v-else variant="ghost" size="sm" icon="📥" @click="downloadInv(inv)">Download PDF</BaseButton>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from 'uiApp/Button'
import BaseCard from 'uiApp/Card'
import BaseBadge from 'uiApp/Badge'
import { formatRupiah, formatDate } from 'uiApp/utils'

interface InvoiceItem {
  id: number
  invNo: string
  amount: number
  dueDate: string
  paid: boolean
}

const invoices = ref<InvoiceItem[]>([
  { id: 1, invNo: 'INV-2026-8801', amount: 14500000, dueDate: '2026-07-30', paid: true },
  { id: 2, invNo: 'INV-2026-8802', amount: 8250000, dueDate: '2026-08-15', paid: false },
  { id: 3, invNo: 'INV-2026-8803', amount: 3100000, dueDate: '2026-08-01', paid: false }
])

function generateInvoice() {
  const nextId = invoices.value.length + 1
  invoices.value.push({
    id: nextId,
    invNo: `INV-2026-880${nextId}`,
    amount: 2500000,
    dueDate: '2026-07-28',
    paid: false
  })
}

function payInvoice(inv: InvoiceItem) {
  inv.paid = true
  alert(`Faktur ${inv.invNo} (${formatRupiah(inv.amount)}) berhasil dibayar!`)
}

function downloadInv(inv: InvoiceItem) {
  alert(`Mengunduh PDF faktur: ${inv.invNo}`)
}
</script>

<style scoped>
.view-page {
  display: flex;
  flex-direction: column;
}

.invoice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}

.invoice-box {
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.25rem;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.inv-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.inv-no {
  font-weight: 700;
  font-size: 0.95rem;
  color: #1e293b;
}

.inv-amount {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0.25rem 0;
}

.inv-due {
  font-size: 0.8rem;
  color: #64748b;
}

.inv-actions {
  margin-top: 0.75rem;
  display: flex;
  justify-content: flex-end;
}
</style>