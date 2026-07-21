<template>
  <div class="standalone-sales">
    <header class="sales-standalone-nav">
      <div class="nav-title">💰 Remote 2: Sales Module (Standalone Dev)</div>
      <nav class="nav-links">
        <router-link to="/modules-sales/sales-order">Sales Order</router-link>
        <router-link to="/modules-sales/sales-invoice">Sales Invoice</router-link>
      </nav>
    </header>
    <main class="sales-content">
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.fullPath" />
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
:root {
  font-family: Inter, system-ui, sans-serif;
  color-scheme: light;
  background-color: #f8fafc;
  color: #0f172a;
}

body {
  margin: 0;
  padding: 0;
}

.standalone-sales {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.sales-standalone-nav {
  background: #0f172a;
  color: #ffffff;
  padding: 0.875rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-title {
  font-weight: 700;
  font-size: 0.95rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.nav-links a.router-link-active,
.nav-links a:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.15);
}

.sales-content {
  flex: 1;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
  box-sizing: border-box;
}
</style>
