import { defineStore } from "pinia";
import apiXibeFood from "@/services/apiXibeFood";
import type { IAuthState } from "@/interfaces/IAuthState";
import type { ILoginResponse } from "@/interfaces/ILoginResponse";
import type { IApiResponse } from "@/interfaces/IApiResponse";

export const useAuthStore = defineStore("auth", {
  state: (): IAuthState => ({
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(username: string, password: string) {
      try {
        // Ajuste o endpoint conforme sua API
        const resp = await apiXibeFood.post<IApiResponse<ILoginResponse>>(
          "/login",
          {
            username,
            password,
          },
        );

        console.log("Stores(auht.ts) token: " + resp.data.data.token);
        // response já é response.data.data graças ao interceptor
        //this.token = response.token;
        //this.username = response.username;
        //localStorage.setItem("token", response.token);
        //localStorage.setItem("username", response.username);
        return true;
      } catch (error) {
        console.error("Login failed:", error);
        return false;
      }
    },
    logout() {
      this.token = null;
      this.username = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
  },
});
