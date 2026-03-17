<template>
  <v-card flat class="border mb-4" :loading="loading">
    <v-card-title>Locais Votacao da Zona : {{ zona }}</v-card-title>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Número</th>
          <th class="text-left">Escola</th>
          <th class="text-left">Endereco</th>
          <th class="text-left">Bairro</th>
          <th class="text-left">Menu</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in locaisVotacao" :key="item.codObjeto">
          <td>{{ item.numLocal }}</td>
          <td>{{ item.nomLocal }}</td>
          <td>{{ item.endereco }}</td>
          <td>{{ item.bairro }}</td>
          <td>{{ item.bairro }}</td>
          <td></td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { EloService } from "@/services/EloService";
import type { ILocalVotacao } from "@/interfaces/ILocalVotacao";
import { useRoute } from "vue-router";

// Usando useRoute para obter os parâmetros da rota
const route = useRoute();
//const { zona, codmunic } = toRefs(route.params);

const zona = Number(route.params.zona);
const codmunic = Number(route.params.codmunic);

const locaisVotacao = ref<ILocalVotacao[]>([]);
const eloService = new EloService();
const loading = ref(false);

const fetchLocaisVotacao = async () => {
  try {
    loading.value = true;
    locaisVotacao.value = await eloService.findAllLocalVotacao(zona, codmunic);
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchLocaisVotacao();
});
</script>
