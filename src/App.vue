<template>
  <v-app :theme="themeStore.isDarkTheme ? 'dark' : 'light'">
    <AppBar @toggle-drawer="isDrawerOpen = !isDrawerOpen" />

    <SideMenu v-model="isDrawerOpen" :is-authenticated="authStore.isAuthenticated" />

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <v-snackbar-queue
      v-model="messages.queue"
      closable
      color=""
      location="top end"
    ></v-snackbar-queue>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useThemeStore } from "./stores/theme";
import AppBar from "./components/AppBar.vue";
import SideMenu from "./components/SideMenu.vue";
import { useMessagesStore } from "./stores/app";
import { useAuthStore } from "@/stores/auth";

const themeStore = useThemeStore();
const isDrawerOpen = ref(false);
const messages = useMessagesStore();
const authStore = useAuthStore();
</script>
