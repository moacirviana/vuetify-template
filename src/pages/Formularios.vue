<template>
  <v-card prepend-icon="mdi-account" title="User Profile">
    <v-card-text>
      <v-row density="comfortable">
        <v-col cols="12" md="4" sm="6">
          <v-text-field
            label="First name*"
            required
            v-model="vName"
            :rules="rulesName"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-text-field
            hint="example of helper text only on focus"
            label="Middle name"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-text-field
            hint="example of persistent helper text"
            label="Last name*"
            persistent-hint
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-text-field
            label="Email*"
            required
            :rules="rulesEmail"
            v-model="vEmail"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-text-field
            label="Password*"
            type="password"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-text-field
            label="Confirm Password*"
            type="password"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" sm="6">
          <v-text-field
            label="RG*"
            type="text"
            :rules="rulesOnlyNumbers"
            v-model="vRG"
            hint="Informe o número da sua RG"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" sm="6">
          <v-text-field
            label="CPF*"
            :rules="rulesOnlyNumbers"
            type="text"
            hint="Informe o número do seu CPF"
            v-model="vCPF"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-select
            :items="['0-17', '18-29', '30-54', '54+']"
            label="Age*"
            required
          ></v-select>
        </v-col>

        <v-col cols="12" sm="6">
          <v-autocomplete
            :items="[
              'Skiing',
              'Ice hockey',
              'Soccer',
              'Basketball',
              'Hockey',
              'Reading',
              'Writing',
              'Coding',
              'Basejump',
            ]"
            label="Interests"
            auto-select-first
            multiple
          ></v-autocomplete>
        </v-col>
      </v-row>

      <small class="text-body-small text-medium-emphasis"
        >*indicates required field</small
      >
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn text="Close" variant="plain"></v-btn>

      <v-btn color="primary" text="Save" variant="tonal"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
// criando validação para email
import { ref } from "vue";

const vEmail = ref("");
const vName = ref("");
const vRG = ref("");
const vCPF = ref("");

const rulesEmail = [
  (value: string) => {
    if (value) return true;
    return "Email é obrigatório.";
  },
  (value: string) => {
    if (value.includes("@")) return true;
    return "Email inválido.";
  },
];

const rulesName = [
  (value: string) => {
    if (value?.length > 0) return true;
    return "Nome é obrigatório.";
  },
  (value: string) => {
    if (value?.length > 5) return true;
    return "Nome precisa ser maior que 5 caracteres";
  },
];

const rulesOnlyNumbers = [
  (value: string) => {
    if (/[^0-9]/.test(value)) return "Deve conter somente números.";
    return true;
  },
];
</script>
