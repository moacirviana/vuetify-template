<template>
  <v-card :loading="loading">
    <v-card-title class="d-flex align-center">
      Produtos Pageable DataTable-Server
      <v-spacer />
      <v-btn
        color="primary"
        variant="elevated"
        density="compact"
        rounded="pill"
        prepend-icon="mdi-plus"
        class="text-label-small mr-2"
        @click="openDialog()"
        >Novo</v-btn
      >
    </v-card-title>

    <v-card-text>
      <v-data-table-server
        v-model:items-per-page="size"
        v-model:page="page"
        :headers="headers"
        :items="produtos"
        :items-length="totalElements"
        :loading="loading"
        item-value="id"
        @update:options="loadPage"
        sort-asc-icon="mdi-sort-ascending"
        sort-desc-icon="mdi-sort-descending"
        sort-icon="mdi-swap-vertical"
        density="comfortable"
      >
        <template #item.valor="{ item }">
          {{ formatCurrency((item as any).valor) }}
        </template>
        <template #item.acoes="{ item }">
          <v-btn
            icon="mdi-pencil"
            color="primary"
            variant="text"
            density="compact"
            class="mr-2"
            @click="editItem(item)"
          />
          <v-btn
            icon="mdi-delete"
            color="error"
            variant="text"
            density="compact"
            @click="deleteItem(item)"
          />
        </template>
      </v-data-table-server>
    </v-card-text>
  </v-card>

  <!-- Diálogo de Cadastro/Edição -->
  <v-dialog v-model="dialog" max-width="500" persistent>
    <FrmCadProduto v-model="form" @cancel="dialog = false" @save="save" />
  </v-dialog>
  <ConfirmDialog />
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { ProdutoService } from "@/services/ProdutoService";
import type { IProduto } from "@/interfaces/IProduto";
import FrmCadProduto from "@/components/FrmCadProduto.vue";
import ConfirmDialog from "@/components/common/ConfirmDialog.vue";
import { useConfirmDialog } from "@/composables/useConfirmDialog";
import { useMessagesStore } from "@/stores/app";

const produtoService = new ProdutoService();
const { confirm } = useConfirmDialog();
const messages = useMessagesStore();

const produtos = ref<IProduto[]>([]);
const loading = ref(true);
const dialog = ref(false);
const form = ref<IProduto>({} as IProduto);

// page params
const page = ref(1);
const size = ref(10);
const totalElements = ref(0);
let currentOptions: any = null;

const headers: any = [
  { title: "ID", key: "id" },
  { title: "Descrição", key: "descricao" },
  { title: "Valor", key: "valor" },
  { title: "Ações", key: "acoes", sortable: false },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

const openDialog = (produto?: IProduto) => {
  if (produto) {
    form.value = { ...produto };
  } else {
    form.value = { id: 0, descricao: "", valor: 0 };
  }
  dialog.value = true;
};

const editItem = (item: any) => {
  openDialog(item);
};

const deleteItem = async (item: any) => {
  const confirmed = await confirm({
    title: "Confirmar exclusão",
    message: `Deseja realmente excluir o produto "${item.descricao}"?`,
    confirmText: "Excluir",
    confirmColor: "error",
  });
  if (!confirmed) return;

  try {
    loading.value = true;
    await produtoService.delete(item.id);
    messages.add({ text: "Produto excluído com sucesso!", color: "success" });
    loadPage(currentOptions);
  } catch (err) {
    messages.add({
      text: "Erro ao tentar excluir o registro: " + err,
      color: "error",
    });
    loading.value = false;
  }
};

const save = async () => {
  try {
    loading.value = true;
    if (form.value.id === 0) {
      await produtoService.insert(form.value);
      messages.add({
        text: "Produto cadastrado com sucesso!",
        color: "success",
      });
    } else {
      await produtoService.update(form.value);
      messages.add({
        text: "Produto atualizado com sucesso!",
        color: "success",
      });
    }
    dialog.value = false;
    loadPage(currentOptions);
  } catch (err) {
    messages.add({
      text: "Erro ao tentar salvar o registro: " + err,
      color: "error",
    });
    loading.value = false;
  }
};

async function loadPage(options?: any) {
  if (options) {
    currentOptions = options;
  } else {
    options = currentOptions || { page: page.value, itemsPerPage: size.value };
  }
  loading.value = true;
  let sortParam = "descricao,asc";
  if (options && options.sortBy && options.sortBy.length > 0) {
    const { key, order } = options.sortBy[0];
    sortParam = `${key},${order}`;
  }
  const params = {
    page: page.value - 1,
    size: size.value,
    sort: sortParam,
  };

  try {
    const resp = await produtoService.findAllPageable(
      params.page,
      params.size,
      params.sort,
    );
    produtos.value = resp.content;
    page.value = resp.number + 1;
    size.value = resp.size;
    totalElements.value = resp.totalElements;
  } catch (err) {
    messages.add({ text: "Erro ao carregar os dados: " + err, color: "error" });
  } finally {
    loading.value = false;
  }
}
</script>
