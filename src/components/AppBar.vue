<template>
  <v-app-bar flat class="border-b" app>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="$emit('toggle-drawer')"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>XibeFood</v-app-bar-title>

    <template v-slot:append v-if="authStore.isAuthenticated">
      <v-btn icon @click="themeStore.toggleTheme">
        <v-icon>
          {{ themeStore.isDark ? "mdi-weather-sunny" : "mdi-weather-night" }}
        </v-icon>
      </v-btn>

      <v-btn icon class="mr-4">
        <v-badge location="top right" color="primary" content="99+">
          <v-icon icon="mdi-bell-outline"></v-icon>
        </v-badge>
      </v-btn>
      <v-menu>
        <template #activator="{ props }">
          <v-avatar
            v-bind="props"
            color="primary"
            image="https://avatars.githubusercontent.com/u/36387066?v=4"
          ></v-avatar>
        </template>
        <v-card>
          <v-list density="compact">
            <v-list-item link to="/profile" title="Profile"></v-list-item>
            <v-list-item
              v-if="authStore.isAdmin"
              link
              to="/usuarios"
              title="Usuários"
            ></v-list-item>
            <v-list-item
              link
              to="/configuracoes"
              title="Configurações"
            ></v-list-item>
            <v-divider></v-divider>
            <v-list-item link @click="handleAuth" title="Logout"></v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </template>
    <!-- Login/Logout -->
    <v-btn icon @click="handleAuth">
      <v-icon>{{
        authStore.isAuthenticated ? "mdi-logout" : "mdi-login"
      }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useThemeStore } from "@/stores/theme";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const themeStore = useThemeStore();
const authStore = useAuthStore();

const handleAuth = () => {
  if (authStore.isAuthenticated) {
    authStore.logout();
    router.push("/login");
  } else {
    router.push("/login");
  }
};

defineEmits(["toggle-drawer"]);
</script>
