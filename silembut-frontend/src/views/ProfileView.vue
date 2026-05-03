<template>
  <AppLayout>
    <div class="profile-page">
      <h2>Profile Saya</h2>

      <!-- Edit Profile -->
      <div class="card">
        <h3>Informasi Akun</h3>
        <form @submit.prevent="handleUpdateProfile">
          <div class="field">
            <label>Nama</label>
            <input v-model="profileForm.name" type="text" required />
          </div>
          <div class="field">
            <label>Email</label>
            <input v-model="profileForm.email" type="email" required />
          </div>
          <div class="field">
            <label>Unit</label>
            <input v-model="profileForm.unit" type="text" required />
          </div>
          <div class="field">
            <label>Role</label>
            <input :value="profileForm.role" disabled />
          </div>

          <p v-if="profileMsg.text" :class="profileMsg.type">{{ profileMsg.text }}</p>
          <button type="submit" :disabled="profileLoading">
            {{ profileLoading ? "Menyimpan..." : "Simpan Perubahan" }}
          </button>
        </form>
      </div>

      <!-- Ganti Password -->
      <div class="card">
        <h3>Ganti Password</h3>
        <form @submit.prevent="handleChangePassword">
          <div class="field">
            <label>Password Lama</label>
            <input v-model="passForm.oldPassword" type="password" required />
          </div>
          <div class="field">
            <label>Password Baru</label>
            <input v-model="passForm.newPassword" type="password" required />
          </div>
          <div class="field">
            <label>Konfirmasi Password Baru</label>
            <input v-model="passForm.confirmPassword" type="password" required />
          </div>

          <p v-if="passMsg.text" :class="passMsg.type">{{ passMsg.text }}</p>
          <button type="submit" :disabled="passLoading">
            {{ passLoading ? "Menyimpan..." : "Ganti Password" }}
          </button>
        </form>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import AppLayout from "../components/AppLayout.vue";
import { getProfile, updateProfile, changePassword } from "../api/user";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();

const profileForm = ref({ name: "", email: "", unit: "", role: "" });
const profileLoading = ref(false);
const profileMsg = ref({ text: "", type: "" });

const passForm = ref({ oldPassword: "", newPassword: "", confirmPassword: "" });
const passLoading = ref(false);
const passMsg = ref({ text: "", type: "" });

// Load profile saat halaman dibuka
onMounted(async () => {
  const res = await getProfile();
  profileForm.value = res.data;
});

const handleUpdateProfile = async () => {
  profileLoading.value = true;
  profileMsg.value = { text: "", type: "" };
  try {
    const res = await updateProfile({
      name: profileForm.value.name,
      email: profileForm.value.email,
      unit: profileForm.value.unit,
    });
    profileMsg.value = { text: res.data.message, type: "success" };
    // update store juga
    await authStore.fetchMe();
  } catch (err: any) {
    profileMsg.value = { text: err.response?.data?.message || "Gagal update", type: "error" };
  } finally {
    profileLoading.value = false;
  }
};

const handleChangePassword = async () => {
  passMsg.value = { text: "", type: "" };

  if (passForm.value.newPassword !== passForm.value.confirmPassword) {
    passMsg.value = { text: "Konfirmasi password tidak cocok", type: "error" };
    return;
  }

  passLoading.value = true;
  try {
    const res = await changePassword({
      oldPassword: passForm.value.oldPassword,
      newPassword: passForm.value.newPassword,
    });
    passMsg.value = { text: res.data.message, type: "success" };
    passForm.value = { oldPassword: "", newPassword: "", confirmPassword: "" };
  } catch (err: any) {
    passMsg.value = { text: err.response?.data?.message || "Gagal ganti password", type: "error" };
  } finally {
    passLoading.value = false;
  }
};
</script>

<style scoped>
.profile-page {
  max-width: 600px;
}
.profile-page h2 {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 1.5rem;
}
.card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  margin-bottom: 1.5rem;
}
.card h3 {
  font-size: 1rem;
  color: #1e293b;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
}
.field {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
label { font-size: 13px; color: #64748b; }
input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}
input:disabled {
  background: #f1f5f9;
  color: #94a3b8;
}
button {
  padding: 10px 20px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 8px;
}
button:disabled { opacity: 0.6; }
.success { color: green; font-size: 13px; }
.error { color: red; font-size: 13px; }
</style>