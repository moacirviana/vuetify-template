import { ref } from "vue";

interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
}

const isOpen = ref(false);
const options = ref<ConfirmOptions>({
  title: "",
  message: "",
  confirmText: "Confirmar",
  cancelText: "Cancelar",
  confirmColor: "error",
});

let resolvePromise: ((value: boolean) => void) | null = null;

export function useConfirmDialog() {

  const confirm = (confirmOptions: ConfirmOptions): Promise<boolean> => {
    options.value = { ...options.value, ...confirmOptions };
    isOpen.value = true;

    return new Promise((resolve) => {
      resolvePromise = resolve;
    });
  };

  const handleConfirm = () => {
    isOpen.value = false;
    resolvePromise?.(true);
  };

  const handleCancel = () => {
    isOpen.value = false;
    resolvePromise?.(false);
  };

  return {
    isOpen,
    options,
    confirm,
    handleConfirm,
    handleCancel,
  };
}
