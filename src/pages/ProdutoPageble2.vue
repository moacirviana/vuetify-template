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
const totalPages = computed(() => {
  const tp = Math.ceil(totalElements.value / size.value);
  return tp > 0 ? tp : 1;
});

const totalCountText = computed(() => {
  if (totalElements.value === 0) return "0 produtos";
  const start = (page.value - 1) * size.value + 1;
  const end = Math.min(page.value * size.value, totalElements.value);
  return `${start} - ${end} de ${totalElements.value}`;
});

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

async function loadPage() {
  // Spring Pageable geralmente aceita:
  // - page=0
  // - size=5
  // - sort=descricao,asc
  // como no seu @PageableDefault (sort por descricao ASC).
  //
  // Se sua API usa esses nomes de query param, isso funciona.
  loading.value = true;
  const params = {
    page: page.value - 1,
    size: size.value,
    sort: "descricao,asc",
  };

  const resp = await produtoService.findAllPageable(
    params.page,
    params.size,
    params.sort,
  );

  //produtos.value = await produtoService.findAll();
  produtos.value = resp.content;
  page.value = resp.number + 1; // sincroniza caso o backend retorne diferente
  size.value = resp.size;
  totalElements.value = resp.totalElements;
  loading.value = false;
}

function onPageChange(newPage: number) {
  page.value = newPage;
  loadPage();
}

function onSizeChange() {
  // normalmente volta pra primeira página ao mudar size
  page.value = 1;
  loadPage();
}

onMounted(() => {
  loadPage();
});
</script>
