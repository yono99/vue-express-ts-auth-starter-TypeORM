<template>
  <div class="layout">
    <header class="topbar">
      <div class="topbar-left">
        <img src="/logo.svg" alt="Logo Silembut" class="topbar-logo" />
      </div>
      <nav class="topbar-nav">
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/register" v-if="authStore.isAdmin">Tambah User</router-link>
      </nav>
      <div class="topbar-right">
        <!-- Dropdown -->
        <div class="dropdown" @click="toggleDropdown" ref="dropdownRef">
          <div class="dropdown-trigger">
            <div class="avatar">{{ authStore.user?.name?.charAt(0).toUpperCase() }}</div>
            <span class="user-name">{{ authStore.user?.name }}</span>
            <span class="chevron" :class="{ open: isOpen }">▾</span>
          </div>

          <div class="dropdown-menu" v-if="isOpen">
            <div class="dropdown-header">
              <p class="dd-name">{{ authStore.user?.name }}</p>
              <p class="dd-role">{{ authStore.user?.role }} · {{ authStore.user?.unit }}</p>
            </div>
            <hr />
            <router-link to="/profile" class="dropdown-item" @click="isOpen = false">
              👤 Profile
            </router-link>
            <button class="dropdown-item logout" @click="handleLogout">
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();
const authStore = useAuthStore();
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Tutup dropdown kalau klik di luar
const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));

const handleLogout = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 60px;
  background: white;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}
.brand {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2563eb;
}
.topbar-nav {
  display: flex;
  gap: 1.5rem;
}
.topbar-nav a {
  text-decoration: none;
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
  padding: 4px 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}
.topbar-nav a.router-link-active {
  color: #2563eb;
  border-bottom-color: #2563eb;
}

/* Dropdown */
.dropdown {
  position: relative;
  cursor: pointer;
  user-select: none;
}
.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 8px;
  transition: background 0.2s;
}
.dropdown-trigger:hover {
  background: #f1f5f9;
}
.avatar {
  width: 32px;
  height: 32px;
  background: #2563eb;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}
.user-name {
  font-size: 14px;
  color: #1e293b;
  font-weight: 500;
}
.chevron {
  font-size: 12px;
  color: #94a3b8;
  transition: transform 0.2s;
}
.chevron.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.12);
  min-width: 200px;
  overflow: hidden;
  z-index: 200;
}
.dropdown-header {
  padding: 12px 16px;
  background: #f8fafc;
}
.dd-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}
.dd-role {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 2px;
}
hr {
  border: none;
  border-top: 1px solid #e2e8f0;
}
.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 14px;
  color: #374151;
  text-decoration: none;
  transition: background 0.15s;
  width: 100%;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
}
.dropdown-item:hover {
  background: #f1f5f9;
}
.dropdown-item.logout {
  color: #ef4444;
}

.content {
  padding: 2rem;
  flex: 1;
}
</style>