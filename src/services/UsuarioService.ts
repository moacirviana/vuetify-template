import type { IUsuario } from "@/interfaces/IUsuario";
import apiXibeFood from "./apiXibeFood";
import type { IApiResponse } from "@/interfaces/IApiResponse";

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
}
