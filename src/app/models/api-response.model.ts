export interface IApiResponse<T> {
  isSuccess: boolean;
  errorDescription: string;
  content: T;
}
