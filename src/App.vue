<template>
  <v-app :theme="themeStore.isDarkTheme ? 'dark' : 'light'">
    <v-navigation-drawer v-model="isDrawerOpen">
      <v-list>
        <v-list-subheader>Menu</v-list-subheader>
        <v-list-item
          prepend-icon="mdi-home"
          to="/"
          link
          title="Home"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list-item
          prepend-icon="mdi-account-circle"
          to="/cards"
          link
          title="Usuários"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-folder"
          link
          to="/report"
          title="Relatórios"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-lock"
          to="/vues"
          link
          title="VuePlay"
        ></v-list-item>

        <v-list-group value="Configurações">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-cog-outline"
              title="Configurações"
            />
          </template>
          <v-list-item
            prepend-icon="mdi-map-outline"
            title="Perfil"
            to="/forms"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-file-chart"
            title="Segurança"
          ></v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar flat class="border-b">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          @click="isDrawerOpen = !isDrawerOpen"
        ></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>Template VUE3</v-app-bar-title>

      <template v-slot:append>
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
              <v-list-item link to="/forms" title="Profile"></v-list-item>
              <v-list-item link title="Settings"></v-list-item>
              <v-divider></v-divider>
              <v-list-item link title="Logout"></v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </template>
    </v-app-bar>

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

const themeStore = useThemeStore();
const isDrawerOpen = ref(false);
</script>
