export interface ApiResponse<T> {
  isSuccess: boolean;
  errorDescription: string;
  content: T;
}
