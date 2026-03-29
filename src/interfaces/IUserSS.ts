export interface IUserSS {
  id: number;
  nome: string;
  username: string;
  authorities: string[]; // array de strings ("ADMIN", etc.)
}
