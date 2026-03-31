<template>
  <v-card flat class="border mb-4" :loading="loading">
    <v-card-title class="d-flex align-center">
      <v-icon start>mdi-account-circle</v-icon>
      Usuários
      <v-spacer />
      <v-btn
        color="primary"
        variant="elevated"
        density="compact"
        rounded="pill"
        class="text-label-small mr-2"
        prepend-icon="mdi-plus"
        @click="openDialog"
        >Adicionar</v-btn
      >
    </v-card-title>
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
            <v-btn
              variant="text"
              density="compact"
              color="primary"
              prepend-icon="mdi-pencil"
              class="me-1"
            ></v-btn>
            <v-btn
              density="compact"
              variant="text"
              prepend-icon="mdi-delete"
              color="error"
              @click="handleDelete(item)"
            ></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Cadastrar Perfil</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-autocomplete
                v-model="selectedUsuario"
                :items="usuariosParaDistribuir"
                item-title="nome"
                item-value="id"
                label="Usuário"
                placeholder="Selecione o usuário"
                return-object
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-select
                v-model="selectedPerfis"
                :items="perfisDisponiveis"
                label="Perfis"
                multiple
                chips
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" variant="text" @click="closeDialog"
          >Cancelar</v-btn
        >
        <v-btn color="primary" variant="text" @click="savePerfil">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <ConfirmDialog />
</template>

<script setup lang="ts">
import type { IUsuario } from "@/interfaces/IUsuario";
import { onMounted, ref } from "vue";
import { UsuarioService } from "@/services/UsuarioService";
import { useMessagesStore } from "@/stores/app";
import ConfirmDialog from "@/components/common/ConfirmDialog.vue";
import { useConfirmDialog } from "@/composables/useConfirmDialog";
const { confirm } = useConfirmDialog();
const messages = useMessagesStore();
const usuarios = ref<IUsuario[]>([]);
const loading = ref(false);
const usuarioService = new UsuarioService();
const editingIndex = ref(-1);
const dialog = ref(false);
const selectedUsuario = ref<IUsuario | null>(null);
const selectedPerfis = ref<string[]>([]);
const usuariosParaDistribuir = ref<IUsuario[]>([]);
const perfisDisponiveis = ["ADMIN", "USUARIO", "OPERADOR", "PLANEJADOR"];

const fetchUsuariosParaDistribuir = async () => {
  try {
    loading.value = true;
    usuariosParaDistribuir.value = await usuarioService.findAllParaDistribuir();
  } catch (error) {
    messages.add({
      text: "Erro ao carregar usuários para distribuir",
      color: "error",
    });
  } finally {
    loading.value = false;
  }
};

const openDialog = async () => {
  await fetchUsuariosParaDistribuir();
  selectedUsuario.value = null;
  selectedPerfis.value = [];
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  selectedUsuario.value = null;
  selectedPerfis.value = [];
};

const savePerfil = async () => {
  if (!selectedUsuario.value || selectedPerfis.value.length === 0) {
    messages.add({
      text: "Selecione um usuário e ao menos um perfil.",
      color: "warning",
    });
    return;
  }

  const confirmed = await confirm({
    title: "Confirmar salvamento",
    message: `Deseja realmente salvar os perfis para o usuário "${selectedUsuario.value.nome}"?`,
    confirmText: "Salvar",
    confirmColor: "primary",
  });

  if (!confirmed) return;

  try {
    const usuarioParaSalvar: IUsuario = {
      ...selectedUsuario.value,
      perfis: selectedPerfis.value,
    };
    await usuarioService.addPerfil(usuarioParaSalvar);
    messages.add({
      text: "Perfis salvos com sucesso!",
      color: "success",
    });
    closeDialog();
    fetchUsuarios();
  } catch (err) {
    messages.add({
      text: "Erro ao tentar salvar o perfil: " + err,
      color: "error",
    });
  }
};

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

const handleDelete = async (usuario: IUsuario) => {
  editingIndex.value = usuarios.value.findIndex((c) => c.id === usuario.id);
  const confirmed = await confirm({
    title: "Confirmar exclusão",
    message: `Deseja realmente excluir o(s) perfil(s) do usuario "${usuario.nome}"? Esta ação não pode ser desfeita.`,
    confirmText: "Excluir",
    confirmColor: "error",
  });
  if (!confirmed) return;
  try {
    await usuarioService.removePerfil(usuario);
    usuarios.value.splice(editingIndex.value, 1);
    messages.add({
      text: "Perfil excluído com sucesso!",
      color: "success",
    });
  } catch (err) {
    messages.add({
      text: "Erro ao tentar excluir o registro : " + err,
      color: "error",
    });
  }
};

onMounted(() => {
  fetchUsuarios();
});
</script>
