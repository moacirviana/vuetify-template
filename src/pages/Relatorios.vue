<template>
  <v-card flat class="border mb-4">
    <div class="d-flex justify-space-between">
      <v-card-title>Relatórios - últimos usuários</v-card-title>
      <v-card-title>
        <v-btn variant="tonal" @click="dialog = true">Adicionar</v-btn>
      </v-card-title>
    </div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">Profile</th>
          <th class="text-left">Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in users" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>
            <v-chip
              :color="item.active ? 'success' : 'grey'"
              :prepend-icon="
                item.active ? 'mdi-check-circle' : 'mdi-minus-circle'
              "
            >
              {{ item.profile }}
            </v-chip>
          </td>
          <td>
            <v-btn
              variant="outlined"
              color="primary"
              @click="openEditUser(item)"
              >Editar</v-btn
            >
            <v-btn variant="outlined" color="error">Excluir</v-btn>
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
      <v-card
        prepend-icon="mdi-account"
        title="User Profile"
        v-if="selectedUser"
      >
        <v-card-text>
          <v-row density="comfortable">
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="First name*"
                required
                v-model="selectedUser.name"
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
                v-model="selectedUser.email"
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
import { ref, shallowRef } from "vue";

interface IUser {
  name: string;
  profile: "admin" | "user" | "moderator" | "guest";
  email?: string;
  active?: boolean;
}

const dialog = shallowRef(false);
const selectedUser = ref<IUser | null>(null);

const users = ref<IUser[]>([
  {
    name: "João Silva",
    profile: "admin",
    email: "joao.silva@email.com",
    active: true,
  },
  {
    name: "Maria Santos",
    profile: "moderator",
    email: "maria.santos@email.com",
    active: true,
  },
  {
    name: "Pedro Oliveira",
    profile: "user",
    email: "pedro.oliveira@email.com",
    active: true,
  },
  {
    name: "Ana Costa",
    profile: "user",
    email: "ana.costa@email.com",
    active: false,
  },
  {
    name: "Carlos Souza",
    profile: "user",
    email: "carlos.souza@email.com",
    active: true,
  },
  {
    name: "Fernanda Lima",
    profile: "moderator",
    email: "fernanda.lima@email.com",
    active: true,
  },
  {
    name: "Rafael Pereira",
    profile: "user",
    email: "rafael.pereira@email.com",
    active: false,
  },
  {
    name: "Juliana Martins",
    profile: "admin",
    email: "juliana.martins@email.com",
    active: true,
  },
  {
    name: "Lucas Rodrigues",
    profile: "user",
    email: "lucas.rodrigues@email.com",
    active: true,
  },
  {
    name: "Beatriz Alves",
    profile: "guest",
    email: "beatriz.alves@email.com",
    active: false,
  },
]);

// Função para abrir o modal com os dados do usuário
function openEditUser(user: IUser) {
  selectedUser.value = user;
  //console.log(selectedUser.value.name);
  dialog.value = true;
}

function closeDialog() {
  dialog.value = false;
  //selectedUser.value = null;
}
</script>
