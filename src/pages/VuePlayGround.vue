<script lang="ts" setup>
import { ref } from "vue";

interface IItem {
  id: number;
  label: string;
  purchased: boolean;
  highPrority: boolean;
}

const header = ref("Shopping List App");

const newItem = ref("");

const vcheckbox = ref(false);

const editing = ref(false);

const iceCreamFlavors = ref([]);

const items = ref<IItem[]>([]);

const saveItem = () => {
  if (newItem.value.trim()) {
    // INSERE UM ELEMENTOS NO INICIO DO ARRAY
    items.value.unshift({
      id: items.value.length + 1,
      label: newItem.value,
      purchased: false,
      highPrority: vcheckbox.value,
    });
    /*
    items.value.push({
      id: items.value.length + 1,
      label: newItem.value,
      purchased: false,
      highPrority: vcheckbox.value,
    }); */
    newItem.value = "";
  }
};

const doEdit = (e) => {
  editing.value = e;
  newItem.value = "";
};

const togglePurshased = (item: IItem) => {
  item.purchased = !item.purchased;
};
</script>

<template>
  <h1>{{ header }}</h1>
  <div class="header">
    <button v-if="editing" @click="doEdit(false)">Cancel</button>
    <button v-else @click="doEdit(true)">Add Item</button>
  </div>
  <form class="add-item-form" @submit.prevent="saveItem" v-if="editing">
    <input
      type="text"
      placeholder="v-model.trim remove espacos"
      v-model.trim="newItem"
    />
    <label> <input type="checkbox" v-model="vcheckbox" /> High Priority </label>
    <br />
    <button class="primary" :disabled="newItem.length === 0">Save Item</button>
  </form>
  <p class="counter">{{ newItem.length }} /200</p>
  <br />
  <label>
    <input type="checkbox" value="vanilla" v-model="iceCreamFlavors" />
    Vanilla
  </label>
  <label>
    <input type="checkbox" value="chocolate" v-model="iceCreamFlavors" />
    Chocolate
  </label>
  <label>
    <input type="checkbox" value="strawberry" v-model="iceCreamFlavors" />
    Strawberry
  </label>
  {{ iceCreamFlavors }}

  <br />
  <ul v-if="items">
    <li
      v-for="(item, index) in items"
      @click="togglePurshased(item)"
      :key="item.id"
      class="static-class"
      :class="{
        strikeout: item.purchased,
        priority: item.highPrority,
      }"
    >
      {{ index + 1 }} - {{ item.label }}
    </li>
  </ul>
</template>

<style lang="css" scoped>
ul {
  list-style: none;
  padding: 0;
}

a {
  color: #6cb2eb;
  font-size: 1.25rem;
  transition: all 0.1s ease-in;
  margin-top: 0.5rem;
  display: block;
}

a:hover {
  color: #3490dc;
}

li,
p {
  display: flex;
  align-items: center;
  line-height: 1.75;
  letter-spacing: 0.5px;
  color: #3d4852;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.1s ease-in;
}

li:hover {
  color: #22292f;
}

li input {
  margin: 0 0.5rem 0;
}

#shopping-list > input,
#shopping-list > select {
  width: 100%;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f8;
  color: #606f7b;
  padding: 0.5rem 0.75rem;
  box-sizing: border-box;
  font-size: 1rem;
  letter-spacing: 0.5px;
  margin: 0.5rem 0;
}

.add-item-form,
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.add-item-form input {
  width: 70%;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f8;
  color: #606f7b;
  padding: 0.5rem 0.75rem;
  box-sizing: border-box;
  font-size: 1rem;
  letter-spacing: 0.5px;
  margin: 0.5rem 0;
}

.btn {
  border: none;
  border-radius: 3px;
  margin: auto 0;
  padding: 0.5rem 0.75rem;
  flex-shrink: 0;
  cursor: pointer;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  transition: all 0.1s ease-in;
}

.btn[disabled] {
  background: #8795a1;
}

.btn[disabled]:hover {
  background: #606f7b;
}

.btn-primary {
  background: #6cb2eb;
  color: #fff;
}

.btn-primary:hover {
  background: #3490dc;
}

.btn-cancel {
  background: #ef5753;
  color: #fff;
}

.btn-cancel:hover {
  background: #e3342f;
  color: #fff;
}

.strikeout {
  text-decoration: line-through;
  color: #b8c2cc;
}

.strikeout:hover {
  color: #8795a1;
}

.priority {
  color: #de751f;
}
input[type="checkbox"] {
  display: inline !important;
  box-shadow: none;
  width: auto;
}
</style>
