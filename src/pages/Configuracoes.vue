<template>
  <v-card flat class="border mb-2" :loading="loading">
    <v-card-title class="d-flex align-center">
      <v-icon start>mdi-cogs</v-icon>
      Configurações
      <v-spacer />
      <v-btn
        color="primary"
        variant="elevated"
        density="compact"
        rounded="pill"
        class="text-label-small mr-2"
        prepend-icon="mdi-plus"
        @click="openDialog()"
        >Novo</v-btn
      >
    </v-card-title>

    <v-table density="compact">
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Descricao</th>
          <th class="text-left">Ativo</th>
          <th class="text-left">Menu</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in configuracoes" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.descricao }}</td>
          <td>
            <v-chip
              v-if="item.ativo"
              color="success"
              prepend-icon="mdi-check-circle"
            >
              Ativo
            </v-chip>
            <v-chip
              v-else
              color="grey"
              prepend-icon="mdi-minus-circle"
              @click="handleAtivar(item)"
            >
              Inativo
            </v-chip>
          </td>
          <td>
            <v-btn
              variant="flat"
              color="primary"
              @click="openDialog(item)"
              density="compact"
              class="me-1"
              >Editar</v-btn
            >
            <v-btn color="red" density="compact" @click="handleDelete(item)"
              >Excluir</v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>

  <!-- Diálogo de Cadastro/Edição -->

  <ConfirmDialog />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useMessagesStore } from "@/stores/app";
import ConfirmDialog from "@/components/common/ConfirmDialog.vue";
import { useConfirmDialog } from "@/composables/useConfirmDialog";
import type { IConfig } from "@/interfaces/IConfig";
import { ConfigService } from "@/services/ConfigService";
const { confirm } = useConfirmDialog();
const dialog = ref(false);
const messages = useMessagesStore();
const configuracoes = ref<IConfig[]>([]);
const loading = ref(false);
const configService = new ConfigService();
const form = ref<IConfig>({} as IConfig);
const editingIndex = ref(-1);

const fetchConfiguracoes = async () => {
  try {
    loading.value = true;
    configuracoes.value = await configService.findAll();
  } catch (error) {
    messages.add({
      text: "Erro ao carregar dados de configuracoes",
      color: "error",
    });
  } finally {
    loading.value = false;
  }
};

const save = async () => {
  try {
    loading.value = true;
    if (form.value?.id === 0) {
      const novaConfig = await configService.insert(form.value);
      configuracoes.value.push(novaConfig);
      messages.add({
        text: "Configuração cadastrada com sucesso!",
        color: "success",
      });
    }
  } catch (error) {
    messages.add({
      text: "Erro ao tentar salvar o registro : " + error,
      color: "error",
    });
  } finally {
    loading.value = false;
    dialog.value = false;
  }
};

const handleDelete = async (config: IConfig) => {
  editingIndex.value = configuracoes.value.findIndex((c) => c.id === config.id);
  const confirmed = await confirm({
    title: "Confirmar exclusão",
    message: `Deseja realmente excluir a configuração( "${config.descricao}"?) Esta ação não pode ser desfeita.`,
    confirmText: "Excluir",
    confirmColor: "error",
  });
  if (!confirmed) return;
  try {
    await configService.delete(config);
    configuracoes.value.splice(editingIndex.value, 1);
    messages.add({
      text: "Configuração excluída com sucesso!",
      color: "success",
    });
  } catch (err) {
    messages.add({
      text: "Erro ao tentar excluir o registro : " + err,
      color: "error",
    });
  }
};

const handleAtivar = async (config: IConfig) => {
  const confirmed = await confirm({
    title: "Confirmar ativação",
    message: `Deseja realmente ativar a configuração "${config.descricao}"?`,
    confirmText: "Ativar",
    confirmColor: "success",
  });
  if (!confirmed) return;
  try {
    loading.value = true;
    await configService.ativar(config.id!);
    messages.add({
      text: "Configuração ativada com sucesso!",
      color: "success",
    });
    await fetchConfiguracoes();
  } catch (err) {
    messages.add({
      text: "Erro ao tentar ativar a configuração : " + err,
      color: "error",
    });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchConfiguracoes();
});

const openDialog = (config?: IConfig) => {
  if (config) {
    form.value = config;
    editingIndex.value = configuracoes.value.findIndex(
      (c) => c.id === config.id,
    );
  } else {
    form.value = { id: 0, descricao: "", ativo: 1 };
    editingIndex.value = -1;
  }
  dialog.value = true;
};
</script>
