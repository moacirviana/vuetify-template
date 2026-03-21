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
        prepend-icon="mdi-account-circle"
        to="/usuarios"
        link
        title="Usuários"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-circle"
        to="/produtos"
        link
        title="Produtos"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-circle"
        to="/produtospageable"
        link
        title="Produtos Pageable"
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

      <v-list-item
        prepend-icon="mdi-lock"
        to="/login"
        link
        title="Login"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
const isDrawerOpen = defineModel<boolean>("modelValue", { required: true });
</script>
