import type { IUsuario } from "@/interfaces/IUsuario";
import apiXibeFood from "./apiXibeFood";
import type { IApiResponse } from "@/interfaces/IApiResponse";
import type { IUserSS } from "@/interfaces/IUserSS";

export class UsuarioService {
  constructor() {}

  async findAll(): Promise<IUsuario[]> {
    try {
      const response =
        await apiXibeFood.get<IApiResponse<IUsuario[]>>("/usuarios");
      return response.data.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async getProfile(): Promise<IUserSS> {
    try {
      const response =
        await apiXibeFood.get<IApiResponse<IUserSS>>("/usuarios/profile");
      return response.data.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async findAllParaDistribuir(): Promise<IUsuario[]> {
    try {
      const response = await apiXibeFood.get<IApiResponse<IUsuario[]>>(
        "/usuarios/lstParaDistribuir",
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async addPerfil(usuario: IUsuario): Promise<IUsuario> {
    try {
      const response = await apiXibeFood.put<IApiResponse<IUsuario>>(
        "/usuarios",
        usuario,
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async removePerfil(usuario: IUsuario): Promise<void> {
    try {
      const response = await apiXibeFood.delete<void>(
        `/usuarios/remove/perfis/${usuario.id}`,
      );
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}
