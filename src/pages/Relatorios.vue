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
          <th class="text-left">#</th>
          <th class="text-left">Data</th>
          <th class="text-left">Usuário</th>
          <th class="text-left">Total</th>
          <th class="text-left">Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in vendas" :key="item.id">
          <td>#{{ item.id }}</td>
          <td>{{ formatDate(item.date) }}</td>
          <td>{{ item.nomeUsuario }}</td>
          <td>{{ formatCurrency(item.total) }}</td>
          <td>
            <v-btn
              variant="text"
              color="primary"
              prepend-icon="mdi-magnify"
              class="me-1"
              @click="openDetails(item.id)"
              >Detalhes</v-btn
            >
            <v-btn variant="text" prepend-icon="mdi-delete" color="error"
              >Excluir</v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
  <v-dialog v-model="dialogDetails" max-width="700px">
    <v-card v-if="vendaDTO">
      <v-card-title class="text-h5 pb-2"
        >Detalhes da Venda #{{ vendaDTO.id }}</v-card-title
      >
      <v-card-text>
        <v-row density="compact">
          <v-col cols="12" sm="6">
            <strong>Data: </strong> {{ vendaDTO.date }}
          </v-col>
          <v-col cols="12" sm="6">
            <strong>Total: </strong> {{ formatCurrency(vendaDTO.valorTotal) }}
          </v-col>
        </v-row>
        <v-divider class="my-4"></v-divider>
        <h3 class="text-subtitle-1 mb-2 font-weight-bold">Itens da Venda:</h3>
        <v-table density="compact" class="border">
          <thead>
            <tr>
              <th class="text-left font-weight-bold">Produto</th>
              <th class="text-right font-weight-bold">Qtd</th>
              <th class="text-right font-weight-bold">Unidade</th>
              <th class="text-right font-weight-bold">Desconto</th>
              <th class="text-right font-weight-bold">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in vendaDTO.itens" :key="index">
              <td>{{ item.produto.descricao }}</td>
              <td class="text-right">{{ item.quantidade }}</td>
              <td class="text-right">{{ formatCurrency(item.valorunt) }}</td>
              <td class="text-right">{{ formatCurrency(item.desconto) }}</td>
              <td class="text-right">{{ formatCurrency(item.valor) }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="text" @click="closeDetails"
          >Fechar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { VendaService } from "@/services/VendaService";
import { useMessagesStore } from "@/stores/app";
import type { IVendaDTO, IVWVendaDTO } from "@/interfaces/IVendaDTO";
import router from "@/router";
import { formatDate, formatCurrency } from "@/services/Utils";
const messages = useMessagesStore();
const vendas = ref<IVWVendaDTO[]>([]);
const vendaDTO = ref<IVendaDTO>();
const loading = ref(false);
const vendaService = new VendaService();
const dialogDetails = ref(false);

const openDetails = async (id: number) => {
  try {
    loading.value = true;
    vendaDTO.value = await vendaService.findById(id);
    console.log(vendaDTO.value);
    dialogDetails.value = true;
  } catch (error) {
    messages.add({
      text: "Erro ao carregar detalhes da venda",
      color: "error",
    });
  } finally {
    loading.value = false;
  }
};

const closeDetails = () => {
  dialogDetails.value = false;
  vendaDTO.value = undefined;
};

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
