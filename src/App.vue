<template>
  <v-app :theme="themeStore.isDarkTheme ? 'dark' : 'light'">
    <AppBar @toggle-drawer="isDrawerOpen = !isDrawerOpen" />

    <SideMenu v-model="isDrawerOpen" />

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useThemeStore } from "./stores/theme";
import AppBar from "./components/AppBar.vue";
import SideMenu from "./components/SideMenu.vue";

const themeStore = useThemeStore();
const isDrawerOpen = ref(false);
</script>
