<template>
  <v-card flat class="border mb-2" :loading="loading">
    <v-card-title class="d-flex align-center">
      <v-icon start>mdi-cart</v-icon>
      Produtos
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
      <v-btn
        color="secondary"
        variant="elevated"
        density="compact"
        rounded="pill"
        class="text-label-small"
        prepend-icon="mdi-book-open-page-variant-outline"
        @click="openPageableDialog()"
        >Page</v-btn
      >
    </v-card-title>

    <v-table density="compact">
      <thead>
        <tr>
          <th class="text-left">Descricao</th>
          <th class="text-left">Valor</th>
          <th class="text-left">Menu</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in produtos" :key="index">
          <td>{{ item.descricao }}</td>
          <td>{{ item.valor }}</td>
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
  <v-dialog v-model="dialog" max-width="500" persistent>
    <FrmCadProduto v-model="form" @cancel="dialog = false" @save="save" />
  </v-dialog>
  <ConfirmDialog />
</template>

<script setup lang="ts">
import type { IProduto } from "@/interfaces/IProduto";
import { onMounted, ref } from "vue";
import { ProdutoService } from "@/services/ProdutoService";
import { useMessagesStore } from "@/stores/app";
import ConfirmDialog from "@/components/common/ConfirmDialog.vue";
import FrmCadProduto from "@/components/FrmCadProduto.vue";
import { useConfirmDialog } from "@/composables/useConfirmDialog";
import { useRouter } from "vue-router";
const router = useRouter();
const { confirm } = useConfirmDialog();
const dialog = ref(false);
const messages = useMessagesStore();
const produtos = ref<IProduto[]>([]);
const loading = ref(false);
const produtoService = new ProdutoService();
const form = ref<IProduto>({} as IProduto);
const editingIndex = ref(-1);

function openPageableDialog() {
  router.push("/produtospageable2");
}

const fetchProdutos = async () => {
  try {
    loading.value = true;
    produtos.value = await produtoService.findAll();
  } catch (error) {
    messages.add({
      text: "Erro ao carregar dados de usuarios",
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
      const novoProduto = await produtoService.insert(form.value);
      produtos.value.push(novoProduto);
      messages.add({
        text: "Produto cadastrado com sucesso!",
        color: "success",
      });
    } else {
      const updatedProduto = await produtoService.update(form.value);
      produtos.value[editingIndex.value] = updatedProduto;
      messages.add({
        text: "Produto editado com sucesso!",
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

const handleDelete = async (produto: IProduto) => {
  editingIndex.value = produtos.value.findIndex((c) => c.id === produto.id);
  const confirmed = await confirm({
    title: "Confirmar exclusão",
    message: `Deseja realmente excluir o produto "${produto.descricao}"? Esta ação não pode ser desfeita.`,
    confirmText: "Excluir",
    confirmColor: "error",
  });
  if (!confirmed) return;
  try {
    await produtoService.delete(produto?.id);
    produtos.value.splice(editingIndex.value, 1);
    messages.add({
      text: "Produto excluído com sucesso!",
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
  fetchProdutos();
});

const openDialog = (produto?: IProduto) => {
  if (produto) {
    form.value = produto;
    editingIndex.value = produtos.value.findIndex((c) => c.id === produto.id);
  } else {
    form.value = { id: 0, descricao: "", valor: 0 };
    editingIndex.value = -1;
  }
  dialog.value = true;
};
</script>
