export interface IUsuario {
  id: number;
  nome: string;
  email: string;
  tituloEleitor: string;
  perfis: string[]; // array de strings ("ADMIN", etc.)
  firstName: string;
}
