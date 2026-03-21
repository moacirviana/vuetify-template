import apiXibeFood from "./apiXibeFood";
import type { IApiResponse } from "@/interfaces/IApiResponse";
import type { PageResponse } from "@/interfaces/IPageResponse";
import type { IProduto } from "@/interfaces/IProduto";

export class ProdutoService {
  constructor() {}

  async findAll(): Promise<IProduto[]> {
    try {
      const response =
        await apiXibeFood.get<IApiResponse<IProduto[]>>("/produtos");
      return response.data.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async findAllPageable(
    page: number = 0,
    size: number = 5,
    sort: string = "descricao,asc"
  ): Promise<PageResponse<IProduto>> {
    try {
      const response =
        await apiXibeFood.get<PageResponse<IProduto>>("/produtos/pages", {
          params: { page, size, sort }
        });
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async insert(produto: IProduto): Promise<IProduto> {
    try {
      console.log("Produto = " + produto.valor);
      const response = await apiXibeFood.post<IApiResponse<IProduto>>(
        "/produtos",
        produto,
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async update(produto: IProduto): Promise<IProduto> {
    try {
      console.log("Produto = " + produto.valor);
      const response = await apiXibeFood.put<IApiResponse<IProduto>>(
        "/produtos",
        produto,
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await apiXibeFood.delete<IApiResponse<void>>(`/produtos/${id}`);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}
