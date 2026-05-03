import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import RegisterView from "../views/RegisterView.vue";
import ProfileView from "../views/ProfileView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeView }, // ← home dulu
    { path: "/login", component: LoginView },
    {
      path: "/dashboard",
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: "/register",
      component: RegisterView,
      meta: { requiresAuth: true },
    },
    {
      path: "/profile",
      component: ProfileView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth) {
    await authStore.fetchMe();
    if (!authStore.isLoggedIn) {
      return "/login";
    }
  }
});

export default router;
