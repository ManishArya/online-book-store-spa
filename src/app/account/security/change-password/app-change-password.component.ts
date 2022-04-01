import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './app-change-password.component.html'
})
export class AppChangePasswordComponent {
  public password: string;
  public confirmPassword: string;
  public oldPassword: string;
  public isWaiting: boolean;
  public errorMessage: string;

  constructor(private loginService: LoginService, private router: Router) {}

  public changePassword(): void {
    this.isWaiting = true;
    this.loginService
      .changePassword({ password: this.password, confirmPassword: this.confirmPassword, oldPassword: this.oldPassword })
      .pipe(finalize(() => (this.isWaiting = false)))
      .subscribe(
        (res) => {
          if (res.isSuccess) {
            this.router.navigateByUrl('');
          }
        },
        (err: HttpErrorResponse) => {
          if (err.status === 422) {
            this.errorMessage = err.error.content.password;
          } else {
            this.errorMessage = err.error.content;
          }
        }
      );
  }
}
