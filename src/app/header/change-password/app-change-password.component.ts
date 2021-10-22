import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { StatusCode } from 'src/app/enums/status-code';
import { IApiErrorResponse } from 'src/app/models/api-error-response.model';
import { LoginService } from 'src/app/services/login.service';
import { AppTitleService } from 'src/app/services/title.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  templateUrl: './app-change-password.component.html'
})
export class AppChangePasswordComponent implements OnInit {
  public password: string;
  public confirmPassword: string;
  public oldPassword: string;
  public isWaiting: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastService: ToastService,
    private title: AppTitleService
  ) {}

  public ngOnInit(): void {
    this.title.setTitle('Change Password');
  }

  public changePassword(): void {
    this.isWaiting = true;
    this.loginService
      .changePassword({ password: this.password, confirmPassword: this.confirmPassword, oldPassword: this.oldPassword })
      .pipe(finalize(() => (this.isWaiting = false)))
      .subscribe(
        (res) => {
          if (res.code === StatusCode.Success) {
            this.router.navigateByUrl('');
          }
        },
        (err: HttpErrorResponse) => {
          if (err.status === 400) {
            this.toastService.open(err.error.message);
          } else {
            const error = err.error as IApiErrorResponse;
            this.toastService.open(error.errorMessages['password']);
          }
        }
      );
  }
}
