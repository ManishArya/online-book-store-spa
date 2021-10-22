import { IApiResponse } from './api-response.model';

export interface IApiDataResponse<T> extends IApiResponse {
  data: T;
}
