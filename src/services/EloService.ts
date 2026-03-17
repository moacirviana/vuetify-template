import type { ILocalVotacao } from "@/interfaces/ILocalVotacao";
import apiElo from "./apiElo";
import type { IZonaEleitoral } from "@/interfaces/IZonaEleitoral";

export class EloService {
  constructor() {}

  async findAllZonaEleitoral(): Promise<IZonaEleitoral[]> {
    try {
      const response = await apiElo.get<IZonaEleitoral[]>("/elo/zonaeleitoral");
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async findAllLocalVotacao(
    zona: number,
    codmunic: number,
  ): Promise<ILocalVotacao[]> {
    try {
      const response = await apiElo.get<ILocalVotacao[]>(
        `/elo/localvotacao/ze/${zona}/munic/${codmunic}`,
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}
