<template>
  <div class="login-container">
    <div class="login-box">
          <!-- Logo SVG -->
      <img src="/logo.svg" alt="Logo Silembut" class="login-logo" />

      <h2>Login Silembut</h2>

      <form @submit.prevent="handleLogin">
        <div class="field">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="admin@silembut.com" required />
        </div>

        <div class="field">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="••••••••" required />
        </div>

        <p v-if="authStore.error" class="error">{{ authStore.error }}</p>

        <button type="submit" :disabled="authStore.loading">
          {{ authStore.loading ? "Loading..." : "Login" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { useTitle } from "../utils/useTitle.ts";
useTitle("Login");
const email = ref("");
const password = ref("");
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  await authStore.login(email.value, password.value);
  if (authStore.isLoggedIn) {
    router.push("/dashboard");
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
}
.login-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 360px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
.field {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
 

input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}
button {
  width: 100%;
  padding: 10px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
}
button:disabled { opacity: 0.6; }
.error { color: red; font-size: 13px; }
</style>