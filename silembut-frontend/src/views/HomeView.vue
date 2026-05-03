<template>
  <div class="home">
    <!-- Navbar -->
    <nav class="navbar">
    <a href="/">
      <!-- Logo SVG -->
      <img src="/logo.svg" alt="Logo Silembut" class="login-logo" />
       </a>
      <button @click="router.push('/login')">Login</button>
    </nav>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-content">
        <h1>Sistem Informasi Peminjaman Buku Tanah</h1>
        <p>Kelola peminjaman buku tanah dengan mudah, cepat, dan terorganisir.</p>
        <button @click="router.push('/login')">Mulai Sekarang →</button>
      </div>
    </section>

    <!-- Fitur -->
    <section class="features">
      <div class="feature-card">
        <span>📋</span>
        <h3>Manajemen Buku Tanah</h3>
        <p>Kelola data buku tanah secara digital dan terstruktur.</p>
      </div>
      <div class="feature-card">
        <span>🔄</span>
        <h3>Peminjaman & Pengembalian</h3>
        <p>Pantau status peminjaman secara real-time.</p>
      </div>
      <div class="feature-card">
        <span>👥</span>
        <h3>Manajemen Pengguna</h3>
        <p>Atur hak akses admin dan staff dengan mudah.</p>
      </div>
    </section>

    <!-- Footer -->
    <footer>
      <p>© 2026 Silembut — BPN</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useTitle } from "../utils/useTitle.ts";
useTitle("Home");
const router = useRouter();


</script>

<style scoped>
.home {
  font-family: 'Segoe UI', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.login-logo {
  display: block;
  margin: 0 auto 1rem;
  width: 64px;   /* bisa diubah sesuai kebutuhan */
  height: 64px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
  background: white;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
}
.brand {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2563eb;
}
.navbar button {
  padding: 8px 20px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.hero {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  color: white;
  padding: 8rem 3rem;
  text-align: center;
  width: 100%;
}
.hero-content {
  max-width: 700px;
  margin: 0 auto;
}
.hero h1 {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.3;
}
.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}
.hero button {
  padding: 14px 36px;
  background: white;
  color: #2563eb;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
}

.features {
  display: flex;
  gap: 1.5rem;
  padding: 5rem 3rem;
  background: #f8fafc;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}
.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 280px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.feature-card span { font-size: 2.5rem; }
.feature-card h3 {
  margin: 1rem 0 0.5rem;
  font-size: 1rem;
  color: #1e293b;
}
.feature-card p {
  font-size: 0.875rem;
  color: #64748b;
}

footer {
  text-align: center;
  padding: 1.5rem;
  background: white;
  color: #94a3b8;
  font-size: 0.875rem;
  border-top: 1px solid #e2e8f0;
  width: 100%;
}
</style>