<template>
  <v-card flat class="border mb-4" :loading="loading">
    <v-card-title>Zonas Eleitorais</v-card-title>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Zona</th>
          <th class="text-left">CodMunic</th>
          <th class="text-left">Municipio</th>
          <th class="text-left">fone</th>
          <th class="text-left">Menu</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in zonas" :key="item.zeCodmunicf">
          <td>{{ item.zona }}</td>
          <td>{{ item.codmunic }}</td>
          <td>{{ item.municipio }}</td>
          <td>{{ item.fone }}</td>

          <td>
            <v-btn
              variant="outlined"
              color="primary"
              @click="gotoLocaisVotacao(item)"
              >Locais</v-btn
            >
            <v-btn
              variant="outlined"
              color="primary"
              @click="gotoLocaisVotacao(item)"
              >Modal</v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>

  <!-- MODAL -->
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
      transition="dialog-top-transition"
    >
      <v-card prepend-icon="mdi-account" title="User Profile">
        <v-card-text>
          <v-row density="comfortable">
            <v-col cols="12" md="4" sm="6">
              <p>Listando os locais de votacao</p>
            </v-col>
          </v-row>

          <small class="text-body-small text-medium-emphasis"
            >*indicates required field</small
          >
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="closeDialog"></v-btn>
          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="closeDialog"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <!-- FIM MODAL -->
</template>

<script setup lang="ts">
import type { IZonaEleitoral } from "@/interfaces/IZonaEleitoral";
import { onMounted, ref, shallowRef } from "vue";
import { EloService } from "@/services/EloService";
import { useRouter } from "vue-router";
const dialog = shallowRef(false);
const zonas = ref<IZonaEleitoral[]>([]);
const eloService = new EloService();
const loading = ref(false);

const router = useRouter();

function gotoLocaisVotacao(zona: IZonaEleitoral) {
  router.push({
    path: `/locaisvotacao/${zona.zona}/${zona.codmunic}`,
  });
}

function closeDialog() {
  //dialog.value = false;
  //selectedUser.value = null;
}

const fetchZonas = async () => {
  try {
    loading.value = true;
    //store.fetchZonasEleitorais();
    zonas.value = await eloService.findAllZonaEleitoral();
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchZonas();
});
</script>
