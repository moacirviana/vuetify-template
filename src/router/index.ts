/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";
import Index from "@/pages/index.vue";
import VuePlayGround from "@/pages/VuePlayGround.vue";
import PageNotFound from "@/pages/PageNotFound.vue";
import Relatorios from "@/pages/Relatorios.vue";
import Formularios from "@/pages/Formularios.vue";
import Login from "@/pages/Login.vue";
import { useAuthStore } from "@/stores/auth";
import Usuarios from "@/pages/Usuarios.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Index,
      meta: { requiresAuth: true },
    },
    {
      path: "/usuarios",
      component: Usuarios,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/vues",
      component: VuePlayGround,
    },
    {
      path: "/forms",
      component: Formularios,
      meta: { requiresAuth: true },
    },
    {
      path: "/report",
      component: Relatorios,
      meta: { requiresAuth: true },
    },
    {
      path: "/:pathMatch(.*)*",
      component: PageNotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
