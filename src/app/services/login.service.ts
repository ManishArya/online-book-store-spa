import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiDataResponse } from '../models/api-data-response.model';
import { IApiResponse } from '../models/api-response.model';
import { ILogin } from '../models/login';
import { IToken } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public getToken(login: ILogin): Observable<IApiDataResponse<IToken>> {
    return this.http.post<IApiDataResponse<IToken>>(`${environment.authApiEndPoint}/token`, login);
  }

  public checkUserNameExists(username: string): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(`${environment.authApiEndPoint}/forgetPassword`, { username });
  }

  public changePassword(passwordModel: any): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(`${environment.authApiEndPoint}/changePassword`, passwordModel);
  }
}
