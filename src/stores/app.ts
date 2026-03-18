import { ref } from "vue";
import { defineStore } from "pinia";

interface IMessage {
  text: string;
  color?: string; // cor opcional (ex: 'success', 'error', 'info')
}

export const useMessagesStore = defineStore("messages", () => {
  const queue = ref<IMessage[]>([]);

  function add(message: IMessage) {
    queue.value.push(message);
  }

  return { queue, add };
});
