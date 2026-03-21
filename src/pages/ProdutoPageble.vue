<template>
  <v-container fluid>
    <v-row class="mb-4" align="center">
      <v-col cols="12" md="6">
        <h1 class="text-h5">Produtos Pages</h1>
      </v-col>

      <!-- paginação -->
      <v-col cols="12" md="6" class="d-flex justify-end">
        <v-pagination
          v-model="page"
          :length="totalPages"
          :total-visible="7"
          @update:model-value="onPageChange"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="produtos"
          :items-per-page="size"
          class="elevation-1"
          hide-default-footer
          density="compact"
        >
          <template #item.valor="{ item }">
            {{ formatCurrency(item.valor) }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-row class="mt-2" align="center">
      <v-col cols="12" md="4">
        <div class="text-caption">Mostrando {{ totalCountText }}</div>
      </v-col>

      <v-col cols="12" md="8" class="d-flex justify-end">
        <v-select
          v-model="size"
          :items="[5, 10, 20]"
          label="Itens por página"
          density="compact"
          style="max-width: 200px"
          @update:model-value="onSizeChange"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { ProdutoService } from "@/services/ProdutoService";
import type { IProduto } from "@/interfaces/IProduto";
const produtoService = new ProdutoService();

const produtos = ref<IProduto[]>([]);

// page params
const page = ref(1);
const size = ref(5);

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
