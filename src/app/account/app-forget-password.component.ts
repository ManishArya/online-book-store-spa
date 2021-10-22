import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { IApiErrorResponse } from './../models/api-error-response.model';
import { LoginService } from './../services/login.service';
import { ToastService } from './../services/toast.service';

@Component({
  templateUrl: './app-forget-password.component.html'
})
export class AppForgetPasswordComponent {
  public userName: string;

  constructor(private _loginService: LoginService, private toast: ToastService) {}

  public checkUserName(): void {
    this._loginService.checkUserNameExists(this.userName).subscribe(
      (res) => {
        this.toast.open(res.message);
      },
      (err: HttpErrorResponse) => {
        this.toast.open((err.error as IApiErrorResponse).errorMessages['error']);
      }
    );
  }
}
