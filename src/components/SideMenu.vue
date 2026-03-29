<template>
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
        prepend-icon="mdi-gift-outline"
        to="/produtos"
        link
        title="Produtos"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-tag-plus-outline"
        to="/formvenda"
        link
        title="Vendas"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-finance"
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
          prepend-icon="mdi-account-tie"
          title="Perfil"
          to="/forms"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-file-chart"
          title="Zonas"
          to="/zonas"
        ></v-list-item>
      </v-list-group>
      <!--      <v-list-item
        :prepend-icon="isAuthenticated ? 'mdi-logout' : 'mdi-login'"
        to="/login"
        link
        :title="isAuthenticated ? 'Logout' : 'Login'"
      ></v-list-item> -->
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
const isDrawerOpen = defineModel<boolean>("modelValue", { required: true });
/*
defineProps<{
  isAuthenticated: boolean;
}>();
*/
</script>
