<template>
  <v-app theme="dark">
    <v-navigation-drawer temporary v-model="isDrawerOpen">
      <v-list>
        <v-list-subheader>Menu</v-list-subheader>
        
        <v-list-item prepend-icon="mdi-home" link title="Home"></v-list-item>
        <v-divider></v-divider>
        <v-list-item prepend-icon="mdi-account-circle" link title="Usuários"></v-list-item>
        <v-list-item prepend-icon="mdi-folder" link title="Relatórios"></v-list-item>

        <v-list-group value="Configurações">
          <template #activator="{ props }">
            <v-list-item 
                   v-bind="props"
                   prepend-icon="mdi-cog-outline" title="Configurações"  />
          </template>
          <v-list-item prepend-icon="mdi-map-outline" title="Perfil"></v-list-item>
          <v-list-item prepend-icon="mdi-file-chart" title="Segurança"></v-list-item>
        </v-list-group>
       </v-list>
    </v-navigation-drawer>

    <v-app-bar flat class="border-b">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>Application Bar</v-app-bar-title>
      
      <template v-slot:append>
        <v-btn icon class="mr-4">
          <v-badge location="top right" color="primary" content="99+">
            <v-icon icon="mdi-bell-outline"></v-icon>
          </v-badge>
        </v-btn>
        <v-menu>
          <template #activator="{ props }">
              <v-avatar v-bind="props"
                color="primary"
                image="https://avatars.githubusercontent.com/u/36387066?v=4"
              ></v-avatar>
          </template>
          <v-card>
            <v-list density="compact">
              <v-list-item link title="Profile"></v-list-item>
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
       <h1>Dashboard</h1>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3">
            <v-card flat class="border">
              <v-img
                class="align-end text-white"
                src="https://images.pexels.com/photos/13435510/pexels-photo-13435510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              >
                <v-card-title>Top 10 Praias na Bahia</v-card-title>
              </v-img>

              <v-card-subtitle class="pt-3">Salvador</v-card-subtitle>

              <v-card-text>
                <div>Rio vermelho</div>

                <div>Lorem ipsum dolor sit amet</div>
              </v-card-text>

              <v-card-actions>
                <v-btn variant="outlined" color="primary">Ver mais</v-btn>
                <v-btn prepend-icon="mdi-cart" variant="tonal" color="blue">Comprar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="4" lg="3">
            <v-card flat class="border">
              <v-img
                class="align-end text-white"
                src="https://images.pexels.com/photos/13435510/pexels-photo-13435510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              >
                <v-card-title>Top 10 Praias na Bahia</v-card-title>
              </v-img>

              <v-card-subtitle class="pt-3">Salvador</v-card-subtitle>

              <v-card-text>
                <div>Rio vermelho</div>

                <div>Lorem ipsum dolor sit amet</div>
              </v-card-text>

              <v-card-actions>
                <v-card-actions>
                  <v-btn variant="outlined" color="primary">Ver mais</v-btn>
                  <v-btn prepend-icon="mdi-cart" variant="tonal" color="blue">Comprar</v-btn>
                </v-card-actions>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="4" lg="3">
            <v-card flat class="border">
              <v-img
                class="align-end text-white"
                src="https://images.pexels.com/photos/13435510/pexels-photo-13435510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              >
                <v-card-title>Top 10 Praias na Bahia</v-card-title>
              </v-img>

              <v-card-subtitle class="pt-3">Salvador</v-card-subtitle>

              <v-card-text>
                <div>Rio vermelho</div>

                <div>Lorem ipsum dolor sit amet</div>
              </v-card-text>

              <v-card-actions>
                <v-card-actions>
                  <v-btn variant="outlined" color="primary">Ver mais</v-btn>
                  <v-btn prepend-icon="mdi-cart" variant="tonal" color="blue">Comprar</v-btn>
                </v-card-actions>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="4" lg="3">
            <v-card flat class="border">
              <v-img
                class="align-end text-white"
                src="https://images.pexels.com/photos/13435510/pexels-photo-13435510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              >
                <v-card-title>Top 10 Praias na Bahia</v-card-title>
              </v-img>

              <v-card-subtitle class="pt-3">Salvador</v-card-subtitle>

              <v-card-text>
                <div>Rio vermelho</div>

                <div>Lorem ipsum dolor sit amet</div>
              </v-card-text>

              <v-card-actions>
                <v-card-actions>
                  <v-btn variant="outlined" color="primary">Ver mais</v-btn>
                  <v-btn prepend-icon="mdi-cart" variant="tonal" color="blue">Comprar</v-btn>
                </v-card-actions>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isDrawerOpen = ref(false);
  //
</script>
