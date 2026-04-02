export interface ILoginResponse {
  token: string;
  tipo: string | null;
  username: string;
  admin: boolean;
}
