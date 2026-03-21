export interface PageResponse<T> {
  content: T[];
  number: number; // page atual
  size: number; // tamanho da página
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
}
