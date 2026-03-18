export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: any;
  errorCode: number;
  timestamp: number;
  path: string;
}
