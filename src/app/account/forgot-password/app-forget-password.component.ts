import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from '../../models/api-response.model';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  templateUrl: './app-forget-password.component.html'
})
export class AppForgetPasswordComponent {
  public email: string;

  constructor(private _authService: AuthService, private toast: ToastService, private router: Router) {}

  public sendPasswordResetLink(): void {
    this._authService.sendPasswordResetLink(this.email).subscribe(
      (res) => {
        this.toast.open(res.content);
      },
      (err: HttpErrorResponse) => {
        this.toast.open((err.error as ApiResponse<string>).content);
      }
    );
  }

  public cancel(): void {
    this.router.navigateByUrl('/account/login');
  }
}
