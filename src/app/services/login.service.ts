import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../models/api-response.model';
import { ILogin } from '../models/login';
import { IToken } from '../models/token';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  public getToken(login: ILogin): Observable<IApiResponse<IToken>> {
    return this.http.post<IApiResponse<IToken>>(`${environment.authApiEndPoint}/token`, login);
  }

  public checkUserNameExists(username: string): Observable<IApiResponse<string>> {
    return this.http.post<IApiResponse<string>>(`${environment.authApiEndPoint}/forgetPassword`, { username });
  }

  public changePassword(passwordModel: any): Observable<IApiResponse<string>> {
    return this.http.post<IApiResponse<string>>(`${environment.authApiEndPoint}/changePassword`, passwordModel);
  }

  public login(token: string): void {
    TokenService.Token = token;
    this.router.navigateByUrl('');
  }
}
