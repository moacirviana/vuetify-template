import apiXibeFood from "./apiXibeFood";
import type { IApiResponse } from "@/interfaces/IApiResponse";
import type { PageResponse } from "@/interfaces/IPageResponse";
import type { IConfig } from "@/interfaces/IConfig";

export class ConfigService {
  constructor() {}

  async findAll(): Promise<IConfig[]> {
    try {
      const response =
        await apiXibeFood.get<IApiResponse<IConfig[]>>("/config");
      return response.data.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async delete(config: IConfig): Promise<void> {
    try {
      await apiXibeFood.delete<IApiResponse<void>>(`/config/${config.id}`);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async insert(config: IConfig): Promise<IConfig> {
    try {
      const response = await apiXibeFood.post<IApiResponse<IConfig>>(
        "/config",
        config,
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async getAtiva(): Promise<IConfig> {
    try {
      const response =
        await apiXibeFood.get<IApiResponse<IConfig>>("/config/ativa");
      return response.data.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async ativar(id: number): Promise<number> {
    try {
      const response = await apiXibeFood.post<IApiResponse<number>>(
        `/config/ativar/${id}`,
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}
