<template>
  <v-row justify="center" align="center" class="fill-height">
    <v-col cols="12" sm="8" md="4">
      <v-card>
        <v-card-title class="text-h5">Login</v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="handleLogin">
            <v-text-field
              v-model="username"
              label="Usuário"
              prepend-inner-icon="mdi-account"
              :rules="[(v) => !!v || 'Campo obrigatório']"
              required
            />
            <v-text-field
              v-model="password"
              label="Senha"
              type="password"
              prepend-inner-icon="mdi-lock"
              :rules="[(v) => !!v || 'Campo obrigatório']"
              required
            />
            <v-btn type="submit" color="primary" block :loading="loading"
              >Entrar</v-btn
            >
          </v-form>
          <v-alert v-if="error" type="error" variant="tonal" class="mt-4">
            {{ error }}
          </v-alert>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { wait } from "@/services/Utils";
import { ref } from "vue";
//import { useAuthStore } from '@/stores/auth'
//import { useRouter } from 'vue-router'
const error = ref("");
//const authStore = useAuthStore()
//const router = useRouter()
const username = ref("");
const password = ref("");
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  //const success = await authStore.login(username.value, password.value)
  await wait(2500);

  if (true) {
    //router.push('/clientes')
    error.value = "Usuário ou senha inválidos";
  } else {
    error.value = "Usuário ou senha inválidos";
  }
  loading.value = false;
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
