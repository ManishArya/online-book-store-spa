import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IApiResponse } from '../models/api-response.model';
import { LoginService } from './../services/login.service';
import { ToastService } from './../services/toast.service';

@Component({
  templateUrl: './app-forget-password.component.html'
})
export class AppForgetPasswordComponent {
  public userNameOrEmail: string;

  constructor(private _loginService: LoginService, private toast: ToastService, private router: Router) {}

  public checkUserNameOrEmail(): void {
    this._loginService.checkUserNameOrEmailExists(this.userNameOrEmail).subscribe(
      (res) => {
        this.toast.open(res.content);
      },
      (err: HttpErrorResponse) => {
        this.toast.open((err.error as IApiResponse<string>).content);
      }
    );
  }

  public cancel(): void {
    this.router.navigateByUrl('/login');
  }
}
