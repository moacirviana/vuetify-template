<template>
  <v-card flat class="border mb-4" :loading="loading">
    <v-card-title>Zonas Eleitorais</v-card-title>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Nome</th>
          <th class="text-left">Email</th>
          <th class="text-left">TE</th>
          <th class="text-left">Menu</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in usuarios" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.nome }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.tituloEleitor }}</td>
          <td>
            <v-btn variant="outlined" color="primary">Locais</v-btn>
            <v-btn variant="outlined" color="primary">Modal</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup lang="ts">
import type { IUsuario } from "@/interfaces/IUsuario";
import { onMounted, ref } from "vue";
import { UsuarioService } from "@/services/UsuarioService";
import { useMessagesStore } from "@/stores/app";
const messages = useMessagesStore();
const usuarios = ref<IUsuario[]>([]);
const loading = ref(false);
const usuarioService = new UsuarioService();

function closeDialog() {
  //dialog.value = false;
  //selectedUser.value = null;
}

const fetchUsuarios = async () => {
  try {
    loading.value = true;
    usuarios.value = await usuarioService.findAll();
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
  fetchUsuarios();
});
</script>
