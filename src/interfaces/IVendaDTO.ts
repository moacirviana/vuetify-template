export interface IVendaDTO {
  id: number;
  date: string;
  usuario: IUsuarioDTO;
  itens: IItemVendaDTO[];
  valorTotal: number;
}

export interface IItemVendaDTO {
  quantidade: number;
  desconto: number;
  valor: number;
  valorunt: number;
  obs: string;
  produto: IProdutoDTO;
}

export interface IProdutoDTO {
  id: number;
  descricao: string;
}

export interface IUsuarioDTO {
  id: number;
}

export interface IVWVendaDTO {
  id: number;
  date: string;
  nomeUsuario: string;
  total: number;
}
