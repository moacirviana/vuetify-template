<template>
  <v-container fluid>
    <v-card class="mb-4">
      <v-card-title> Cadastro de Venda </v-card-title>

      <v-card-text>
        <v-form ref="formVenda" v-model="isVendaValid">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="venda.date"
                label="Data da Venda"
                type="date"
                :rules="[(v) => !!v || 'Data é obrigatória']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-autocomplete
                v-model="venda.usuario.id"
                :items="usuarios"
                item-title="nome"
                item-value="id"
                label="Cliente / Usuário"
                :rules="[(v) => !!v || 'Cliente/Usuário é obrigatório']"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card class="mb-4">
      <v-card-title>Itens da Venda</v-card-title>
      <v-card-text>
        <v-form ref="formItem" v-model="isItemValid">
          <v-row align="center">
            <v-col cols="12" md="3">
              <v-autocomplete
                v-model="novoItem.produto"
                :items="produtos"
                item-title="descricao"
                return-object
                label="Produto"
                @update:model-value="onProdutoChange"
                :rules="[(v) => !!v || 'Produto é obrigatório']"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field
                v-model.number="novoItem.quantidade"
                label="Qtd"
                type="number"
                min="1"
                :rules="[(v) => v > 0 || 'Qtd > 0']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field
                v-model.number="novoItem.valorunt"
                label="Val. Unit."
                type="number"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field
                v-model.number="novoItem.desconto"
                label="Desconto"
                type="number"
                min="0"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-btn
                color="primary"
                @click="adicionarItem"
                :disabled="!isItemValid || !novoItem.produto"
                block
              >
                Adicionar Item
              </v-btn>
            </v-col>
          </v-row>
        </v-form>

        <v-table class="mt-4 border" density="compact">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Qtd</th>
              <th>Val. Unit.</th>
              <th>Desconto</th>
              <th>Total Item</th>
              <th width="50">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in venda.itens" :key="index">
              <td>{{ item.produto?.descricao }}</td>
              <td>{{ item.quantidade }}</td>
              <td>{{ formatCurrency(item.valorunt) }}</td>
              <td>{{ formatCurrency(item.desconto) }}</td>
              <td>{{ formatCurrency(item.valor) }}</td>
              <td>
                <v-btn
                  icon="mdi-delete"
                  color="error"
                  variant="text"
                  density="compact"
                  @click="removerItem(index)"
                ></v-btn>
              </td>
            </tr>
            <tr v-if="venda.itens.length === 0">
              <td colspan="6" class="text-center text-grey">
                Nenhum item adicionado na venda atual.
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>

    <v-row>
      <v-col cols="12" class="d-flex justify-end align-center px-4">
        <h2 class="me-6">
          Total da Venda: {{ formatCurrency(valorTotalVenda) }}
        </h2>
        <v-btn color="error" variant="text" class="me-2" @click="limparForm"
          >Cancelar Form</v-btn
        >
        <v-btn
          color="success"
          @click="salvarVenda"
          :loading="salvando"
          :disabled="venda.itens.length === 0 || !isVendaValid"
        >
          Salvar Venda
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import type {
  IVendaDTO,
  IItemVendaDTO,
  IUsuarioDTO,
  IProdutoDTO,
} from "@/interfaces/IVendaDTO";
import type { IUsuario } from "@/interfaces/IUsuario";
import type { IProduto } from "@/interfaces/IProduto";

import { UsuarioService } from "@/services/UsuarioService";
import { ProdutoService } from "@/services/ProdutoService";
import { VendaService } from "@/services/VendaService";
import { useMessagesStore } from "@/stores/app";

const usuarioService = new UsuarioService();
const produtoService = new ProdutoService();
const vendaService = new VendaService();
const messages = useMessagesStore();

// State
const usuarios = ref<IUsuario[]>([]);
const produtos = ref<IProduto[]>([]);
const isVendaValid = ref(false);
const isItemValid = ref(false);
const salvando = ref(false);

const venda = ref<IVendaDTO>({
  id: 0,
  date: new Date().toISOString().substring(0, 10),
  usuario: {} as IUsuarioDTO,
  itens: [],
  valorTotal: 0,
});

const novoItem = ref<IItemVendaDTO>({
  quantidade: 1,
  desconto: 0,
  valor: 0,
  valorunt: 0,
  obs: "",
  produto: null as unknown as IProdutoDTO,
});

// Computed
const valorTotalVenda = computed(() => {
  return venda.value.itens.reduce((acc, item) => acc + item.valor, 0);
});

// Methods
function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);
}

function onProdutoChange(produto: any) {
  if (produto) {
    novoItem.value.valorunt = produto.valor;
  } else {
    novoItem.value.valorunt = 0;
  }
}

function adicionarItem() {
  if (!novoItem.value.produto) return;

  const valUnt = Number(novoItem.value.valorunt) || 0;
  const qtd = Number(novoItem.value.quantidade) || 1;
  const desconto = Number(novoItem.value.desconto) || 0;

  const totalItem = qtd * valUnt - desconto;

  venda.value.itens.push({
    ...novoItem.value,
    quantidade: qtd,
    valorunt: valUnt,
    desconto: desconto,
    valor: totalItem > 0 ? totalItem : 0,
  });

  // Limpar inputs de item (mantendo defaults)
  novoItem.value = {
    quantidade: 1,
    desconto: 0,
    valor: 0,
    valorunt: 0,
    obs: "",
    produto: null as unknown as IProdutoDTO,
  };
}

function removerItem(index: number) {
  venda.value.itens.splice(index, 1);
}

function limparForm() {
  venda.value = {
    id: 0,
    date: new Date().toISOString().substring(0, 10),
    usuario: {} as IUsuarioDTO,
    itens: [],
    valorTotal: 0,
  };
  novoItem.value = {
    quantidade: 1,
    desconto: 0,
    valor: 0,
    valorunt: 0,
    obs: "",
    produto: null as unknown as IProdutoDTO,
  };
}

async function carregarDados() {
  try {
    const [resUsu, resProd] = await Promise.all([
      usuarioService.findAll(),
      produtoService.findAll(),
    ]);
    usuarios.value = resUsu;
    produtos.value = resProd;
  } catch (error) {
    messages.add({
      text: "Erro ao carregar lista de usuários e produtos.",
      color: "error",
    });
  }
}

async function salvarVenda() {
  if (venda.value.itens.length === 0) {
    messages.add({
      text: "Adicione pelo menos um item à venda.",
      color: "warning",
    });
    return;
  }
  if (!venda.value.usuario || !venda.value.usuario.id) {
    messages.add({ text: "Selecione um cliente/usuário.", color: "warning" });
    return;
  }

  // Atualiza o total de todo o pacote e garante conversao de tipo pro TS
  venda.value.valorTotal = valorTotalVenda.value;

  try {
    salvando.value = true;
    venda.value.date = "";
    await vendaService.insert(venda.value);
    messages.add({ text: "Venda cadastrada com sucesso!", color: "success" });
    limparForm();
  } catch (error) {
    messages.add({ text: `Erro ao salvar venda: ${error}`, color: "error" });
  } finally {
    salvando.value = false;
  }
}

onMounted(() => {
  carregarDados();
});
</script>

<style scoped></style>
