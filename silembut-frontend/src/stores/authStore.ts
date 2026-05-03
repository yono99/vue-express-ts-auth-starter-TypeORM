import { defineStore } from "pinia";
import { login as loginApi, logout as logoutApi, getMe } from "../api/auth";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  unit: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === "admin",
  },

  actions: {
    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        const res = await loginApi(email, password);
        this.user = res.data.user;
      } catch (err: any) {
        this.error = err.response?.data?.message || "Login gagal";
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      await logoutApi();
      this.user = null;
    },

    async fetchMe() {
      try {
        const res = await getMe();
        this.user = res.data;
      } catch {
        this.user = null;
      }
    },
  },
});