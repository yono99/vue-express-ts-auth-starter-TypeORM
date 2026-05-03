<template>
  <div class="register-container">
    <div class="register-box">
      <h2>Tambah User Baru</h2>

      <form @submit.prevent="handleRegister">
        <div class="field">
          <label>Nama</label>
          <input v-model="form.name" type="text" placeholder="Nama lengkap" required />
        </div>

        <div class="field">
          <label>Email</label>
          <input v-model="form.email" type="email" placeholder="email@silembut.com" required />
        </div>

        <div class="field">
          <label>Password</label>
          <input v-model="form.password" type="password" placeholder="••••••••" required />
        </div>

        <div class="field">
          <label>Role</label>
          <select v-model="form.role">
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        <div class="field">
          <label>Unit</label>
          <input v-model="form.unit" type="text" placeholder="Nama unit/divisi" required />
        </div>

        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
        <p v-if="successMsg" class="success">{{ successMsg }}</p>

        <button type="submit" :disabled="loading">
          {{ loading ? "Menyimpan..." : "Tambah User" }}
        </button>
        <button type="button" class="back" @click="router.push('/dashboard')">
          Kembali
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "../api/auth";
import { useTitle } from "../utils/useTitle.ts";
useTitle("Register");
const router = useRouter();
const loading = ref(false);
const errorMsg = ref("");
const successMsg = ref("");

const form = ref({
  name: "",
  email: "",
  password: "",
  role: "staff",
  unit: "",
});

const handleRegister = async () => {
  loading.value = true;
  errorMsg.value = "";
  successMsg.value = "";
  try {
    const res = await register(form.value);
    successMsg.value = res.data.message || "User berhasil dibuat!";
    form.value = { name: "", email: "", password: "", role: "staff", unit: "" };
  } catch (err: any) {
    errorMsg.value = err.response?.data?.message || "Gagal membuat user";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
}
.register-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
.field {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
input, select {
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
  margin-top: 8px;
}
button.back { background: #6b7280; }
button:disabled { opacity: 0.6; }
.error { color: red; font-size: 13px; }
.success { color: green; font-size: 13px; }
</style>