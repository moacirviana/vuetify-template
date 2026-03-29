<template>
  <v-card prepend-icon="mdi-account" title="User Profile">
    <v-card-text>
      <v-row density="comfortable">
        <v-col cols="12" md="4" sm="6">
          <v-text-field
            label="Nome*"
            required
            v-model="profile.nome"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-text-field
            label="Username"
            required
            v-model="profile.username"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-autocomplete
            v-model="profile.authorities"
            :items="[
              'ROLE_ADMIN',
              'ROLE_USUARIO',
              'ROLE_OPERADOR',
              'ROLE_PLANEJADOR',
            ]"
            label="Perfis"
            auto-select-first
            multiple
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn text="Close" variant="plain"></v-btn>

      <v-btn color="primary" text="Update" variant="tonal"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { UsuarioService } from "@/services/UsuarioService";
import { useMessagesStore } from "@/stores/app";
import type { IUserSS } from "@/interfaces/IUserSS";
const messages = useMessagesStore();
const profile = ref<IUserSS>({} as IUserSS);
const loading = ref(false);
const usuarioService = new UsuarioService();

const fetchProfile = async () => {
  try {
    loading.value = true;
    const data = await usuarioService.getProfile();
    if (data.authorities?.length && typeof data.authorities[0] === "object") {
      data.authorities = (data.authorities as any[]).map((a) => a.authority);
    }
    profile.value = data;
  } catch (error) {
    messages.add({
      text: "Erro ao carregar dados de usuarios",
      color: "error",
    });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProfile();
});
</script>
