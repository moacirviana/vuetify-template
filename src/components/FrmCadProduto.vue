<template>
  <v-card>
    <v-card-title>
      {{ item?.id === 0 ? "Novo Produto" : "Editar Produto" }}
    </v-card-title>

    <v-card-text>
      <v-form v-model="formValid">
        <v-text-field
          v-model="item.descricao"
          label="Descrição *"
          prepend-inner-icon="mdi-format-text"
        />
        <v-text-field
          v-model="item.valor"
          label="Valor *"
          prepend-inner-icon="mdi-currency-brl"
          type="number"
        />
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn color="error" variant="text" @click="$emit('cancel')">Cancelar</v-btn>
      <v-btn
        color="success"
        variant="text"
        @click="$emit('save')"
        :disabled="!formValid"
      >Salvar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { IProduto } from '@/interfaces/IProduto';

const props = defineProps<{
  modelValue: IProduto;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: IProduto): void;
  (e: 'cancel'): void;
  (e: 'save'): void;
}>();

const formValid = ref(false);
const item = ref<IProduto>({ ...props.modelValue });

watch(
  () => props.modelValue,
  (newVal) => {
    item.value = { ...newVal };
  },
  { deep: true, immediate: true }
);

watch(
  item,
  (newVal) => {
    emit('update:modelValue', newVal);
  },
  { deep: true }
);
</script>
