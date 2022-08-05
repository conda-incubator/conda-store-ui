export interface IApiResponse<T = unknown> {
  data: T;
  message: string | null;
  page: number;
  size: number;
  count: number;
  status: string;
}
