/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";
import Index from "@/pages/index.vue";
import VuePlayGround from "@/pages/VuePlayGround.vue";
import Cards from "@/pages/Cards.vue";
import PageNotFound from "@/pages/PageNotFound.vue";
import Relatorios from "@/pages/Relatorios.vue";
import Formularios from "@/pages/Formularios.vue";
import Login from "@/pages/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Index,
    },
    {
      path: "/cards",
      component: Cards,
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
    },
    {
      path: "/report",
      component: Relatorios,
    },
    {
      path: "/:pathMatch(.*)*",
      component: PageNotFound,
    },
  ],
});

export default router;
