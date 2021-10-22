import { IApiResponse } from './api-response.model';

export interface IApiErrorResponse extends IApiResponse {
  errorMessages: { [key: string]: string };
}
