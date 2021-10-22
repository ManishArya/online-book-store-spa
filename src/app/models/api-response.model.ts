import { StatusCode } from '../enums/status-code';

export interface IApiResponse {
  code: StatusCode;
  message: string;
}
