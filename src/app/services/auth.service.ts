import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Login } from '../models/login';
import Token from '../models/token';
import { LocaleProvider } from './locale-provider';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserLogged = new BehaviorSubject<boolean>(false);
  public isUserLogged$ = this.isUserLogged.asObservable();
  public userLoggedStatus: boolean = false;

  constructor(private http: HttpClient, private router: Router, private localeProvider: LocaleProvider) {}

  public getToken(login: Login): Observable<ApiResponse<Token>> {
    return this.http.post<ApiResponse<Token>>(`${environment.authApiEndPoint}/token`, login);
  }

  public sendPasswordResetLink(email: string): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${environment.authApiEndPoint}/sendPasswordResetLink`, {
      email
    });
  }

  public changePassword(passwordModel: any): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${environment.authApiEndPoint}/changePassword`, passwordModel);
  }

  public signOut(): void {
    this.localeProvider.resetToBrowserSettingsLocale();
    TokenService.clearToken();
    this.setUserLoggedStatus(false);
    window.location.href = 'account/login';
  }

  public setUserLoggedStatus(isLogged: boolean): void {
    this.userLoggedStatus = isLogged;
    this.isUserLogged.next(isLogged);
  }

  public login(token: string): void {
    TokenService.Token = token;
    this.setUserLoggedStatus(true);
    this.router.navigateByUrl('');
  }
}
