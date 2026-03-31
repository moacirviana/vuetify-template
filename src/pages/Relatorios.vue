<template>
  <v-card flat class="border mb-4">
    <div class="d-flex justify-space-between">
      <v-card-title>Relatórios - Vendas</v-card-title>
      <v-card-title>
        <v-spacer />
        <v-btn
          color="primary"
          variant="elevated"
          density="compact"
          rounded="pill"
          class="text-label-small mr-2"
          prepend-icon="mdi-plus"
          @click="onClickNovaVenda()"
          >Nova</v-btn
        >
      </v-card-title>
    </div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Data</th>
          <th class="text-left">Usuário</th>
          <th class="text-left">Total</th>
          <th class="text-left">Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in vendas" :key="item.id">
          <td>{{ formatDate(item.date) }}</td>
          <td>{{ item.nomeUsuario }}</td>
          <td>{{ formatCurrency(item.total) }}</td>
          <td>
            <v-btn
              variant="text"
              color="primary"
              prepend-icon="mdi-pencil"
              class="me-1"
              >Editar</v-btn
            >
            <v-btn variant="text" prepend-icon="mdi-delete" color="error"
              >Excluir</v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { VendaService } from "@/services/VendaService";
import { useMessagesStore } from "@/stores/app";
import type { IVWVendaDTO } from "@/interfaces/IVendaDTO";
import router from "@/router";
import { formatDate, formatCurrency } from "@/services/Utils";
const messages = useMessagesStore();
const vendas = ref<IVWVendaDTO[]>([]);
const loading = ref(false);
const vendaService = new VendaService();

const fetchVendas = async () => {
  try {
    loading.value = true;
    vendas.value = await vendaService.findAll();
  } catch (error) {
    messages.add({
      text: "Erro ao carregar dados das vendas",
      color: "error",
    });
  } finally {
    loading.value = false;
  }
};

const onClickNovaVenda = () => {
  router.push("/formvenda");
};

onMounted(() => {
  fetchVendas();
});
</script>
