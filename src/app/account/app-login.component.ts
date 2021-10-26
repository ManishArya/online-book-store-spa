import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { StatusCode } from './../enums/status-code';
import { IApiErrorResponse } from './../models/api-error-response.model';
import { LoginService } from './../services/login.service';
import { ToastService } from './../services/toast.service';
import { TokenService } from './../services/token.service';

@Component({
  templateUrl: './app-login.component.html'
})
export class AppLoginComponent {
  public userName: string;
  public password: string;
  public isWaiting: boolean;

  constructor(private router: Router, private _loginService: LoginService, private toast: ToastService) {}

  public signIn(): void {
    this.isWaiting = true;
    this._loginService
      .getToken({ username: this.userName, password: this.password })
      .pipe(finalize(() => (this.isWaiting = false)))
      .subscribe(
        (res) => {
          if (res.code === StatusCode.Success) {
            TokenService.Token = res.data.token;
            this.toast.dismiss();
            this.router.navigateByUrl('');
            return;
          }
          this.toast.open(res.message);
        },
        (err: HttpErrorResponse) => {
          this.toast.open((err.error as IApiErrorResponse).errorMessages[0]);
        }
      );
  }

  public redirectToForgetPasswordPage(): void {
    this.router.navigateByUrl('forgetPassword');
  }

  public redirectToNewUserPage(): void {
    this.router.navigateByUrl('newUser');
  }
}