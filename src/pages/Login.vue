<template>
  <v-row justify="center" class="fill-height">
    <v-col cols="12" sm="8" md="4">
      <v-card>
        <v-card-title class="text-h5">Login</v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="handleLogin">
            <v-text-field
              v-model="username"
              label="Usuário"
              prepend-inner-icon="mdi-account"
              required
            />
            <v-text-field
              v-model="password"
              label="Senha"
              type="password"
              prepend-inner-icon="mdi-lock"
              required
            />
            <v-btn type="submit" color="primary" block :loading="loading"
              >Entrar</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { useMessagesStore } from "@/stores/app";
const messages = useMessagesStore();

const authStore = useAuthStore();
const router = useRouter();
const username = ref("");
const password = ref("");
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  const success = await authStore.login(username.value, password.value);
  loading.value = false;
  if (success) {
    messages.add({ text: "Login realizado com sucesso!", color: "success" });
    router.push("/");
    //alert("Credenciais válidas");
  } else {
    messages.add({ text: "Usuário/Senha inválidos!!", color: "error" });
  }
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
