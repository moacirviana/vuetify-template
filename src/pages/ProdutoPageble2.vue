<template>
  <v-card>
    <v-card-title>Produtos Pageable DataTable-Server</v-card-title>

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
        density="compact"
      >
        <template #item.valor="{ item }">
          {{ formatCurrency((item as any).valor) }}
        </template>
      </v-data-table-server>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { ProdutoService } from "@/services/ProdutoService";
import type { IProduto } from "@/interfaces/IProduto";
const produtoService = new ProdutoService();

const produtos = ref<IProduto[]>([]);
const loading = ref(true);
// page params
const page = ref(1);
const size = ref(10);

// pagination info
const totalElements = ref(0);

const headers = [
  { title: "ID", key: "id" },
  { title: "Descrição", key: "descricao" },
  { title: "Valor", key: "valor" },
];

// Ajuste para o formato que você usa (pt-BR por exemplo)
function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

async function loadPage(options?: any) {
  loading.value = true;

  // Define ordenação padrão
  let sortParam = "descricao,asc";

  // Pega as opções de ordenação disparadas pelo v-data-table-server
  if (options && options.sortBy && options.sortBy.length > 0) {
    const { key, order } = options.sortBy[0];
    sortParam = `${key},${order}`; // Ex: "valor,desc"
  }

  const params = {
    page: page.value - 1,
    size: size.value,
    sort: sortParam,
  };

  const resp = await produtoService.findAllPageable(
    params.page,
    params.size,
    params.sort,
  );

  produtos.value = resp.content;
  page.value = resp.number + 1; // sincroniza caso o backend retorne diferente
  size.value = resp.size;
  totalElements.value = resp.totalElements;
  loading.value = false;
}
</script>
