<template>
  <AppLayout>
    <div class="dashboard-content">
      <h2>Selamat datang, {{ authStore.user?.name }}! 👋</h2>
      <p class="subtitle">Unit: {{ authStore.user?.unit }}</p>

      <div class="stats">
        <div class="stat-card">
          <span>📚</span>
          <h3>Buku Tanah</h3>
          <p>Total data buku tanah</p>
        </div>
        <div class="stat-card">
          <span>🔄</span>
          <h3>Peminjaman Aktif</h3>
          <p>Sedang dipinjam</p>
        </div>
        <div class="stat-card">
          <span>✅</span>
          <h3>Dikembalikan</h3>
          <p>Sudah dikembalikan</p>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "../components/AppLayout.vue";
import { useAuthStore } from "../stores/authStore";
import { useTitle } from "../utils/useTitle.ts";
useTitle("Dashboard");
const authStore = useAuthStore();
</script>

<style scoped>
.dashboard-content h2 {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 0.25rem;
}
.subtitle {
  color: #64748b;
  margin-bottom: 2rem;
}
.stats {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  width: 200px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.stat-card span { font-size: 2rem; }
.stat-card h3 {
  margin: 0.5rem 0 0.25rem;
  font-size: 1rem;
  color: #1e293b;
}
.stat-card p {
  font-size: 0.8rem;
  color: #94a3b8;
}
</style>