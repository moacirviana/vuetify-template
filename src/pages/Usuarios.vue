<template>
  <v-card flat class="border mb-4" :loading="loading">
    <v-card-title>Zonas Eleitorais</v-card-title>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">TE</th>
          <th class="text-left">Nome</th>
          <th class="text-left">Email</th>
          <th class="text-left">Perfil</th>
          <th class="text-left">Menu</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in usuarios" :key="item.id">
          <td>{{ item.tituloEleitor }}</td>
          <td>{{ item.nome }}</td>
          <td>{{ item.email }}</td>
          <td>
            <v-chip
              v-for="perfil in item.perfis"
              :key="perfil"
              size="small"
              class="mr-1 mb-1"
              variant="flat"
              :color="perfil === 'ADMIN' ? 'primary' : 'secondary'"
            >
              {{ perfil }}
            </v-chip>
          </td>
          <td>
            <v-btn variant="flat" color="primary" density="compact" class="me-1"
              >Editar</v-btn
            >
            <v-btn color="red" density="compact">Excluir</v-btn>
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
