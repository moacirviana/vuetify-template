import apiXibeFood from "./apiXibeFood";
import type { IApiResponse } from "@/interfaces/IApiResponse";
import type { PageResponse } from "@/interfaces/IPageResponse";
import type { IVendaDTO, IVWVendaDTO } from "@/interfaces/IVendaDTO";

export class VendaService {
  constructor() {}

  async findAll(): Promise<IVWVendaDTO[]> {
    try {
      const response =
        await apiXibeFood.get<IApiResponse<IVWVendaDTO[]>>("/vendas");
      return response.data.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async findAllPageable(
    page: number = 0,
    size: number = 5,
    sort: string = "descricao,asc",
  ): Promise<PageResponse<IVendaDTO>> {
    try {
      const response = await apiXibeFood.get<PageResponse<IVendaDTO>>(
        "/vendas",
        {
          params: { page, size, sort },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async insert(venda: IVendaDTO): Promise<IVendaDTO> {
    try {
      //console.log("Venda = " + venda.valorTotal);
      const response = await apiXibeFood.post<IApiResponse<IVendaDTO>>(
        "/vendas",
        venda,
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async update(venda: IVendaDTO): Promise<IVendaDTO> {
    try {
      //console.log("Venda = " + venda.valorTotal);
      const response = await apiXibeFood.put<IApiResponse<IVendaDTO>>(
        "/vendas",
        venda,
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await apiXibeFood.delete<IApiResponse<void>>(`/vendas/${id}`);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}
