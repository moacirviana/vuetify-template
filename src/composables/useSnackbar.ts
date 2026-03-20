import { reactive } from "vue";

interface SnackbarState {
  show: boolean;
  message: string;
  color: "success" | "error" | "warning" | "info";
  timeout: number;
}

const state = reactive<SnackbarState>({
  show: false,
  message: "",
  color: "info",
  timeout: 3000,
});

export function useSnackbar() {
  const showSnackbar = (
    message: string,
    color: SnackbarState["color"] = "info",
    timeout = 3000,
  ) => {
    state.message = message;
    state.color = color;
    state.timeout = timeout;
    state.show = true;
  };

  const hideSnackbar = () => {
    state.show = false;
  };

  return {
    state,
    showSnackbar,
    hideSnackbar,
    success: (msg: string) => showSnackbar(msg, "success"),
    error: (msg: string) => showSnackbar(msg, "error"),
    warning: (msg: string) => showSnackbar(msg, "warning"),
    info: (msg: string) => showSnackbar(msg, "info"),
  };
}
