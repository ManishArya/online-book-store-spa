import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { iif, Subject } from 'rxjs';
import { filter, finalize, switchMap } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/api-response.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  templateUrl: './app-login.component.html'
})
export class AppLoginComponent implements OnInit, OnDestroy {
  public usernameOrEmail: string;
  public password: string;
  public isWaiting: boolean;
  private isRecaptchaEnabled: boolean;
  private ngUnSubcribe: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private _authService: AuthService,
    private toast: ToastService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private renderer: Renderer2
  ) {}

  public ngOnInit(): void {
    this.renderer.addClass(document.body, 'recaptcha');
  }

  public ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'recaptcha');
    this.ngUnSubcribe.next();
    this.ngUnSubcribe.complete();
  }

  public signIn(): void {
    this.isWaiting = true;
    iif(
      () => this.isRecaptchaEnabled,
      this.recaptchaV3Service.execute('login').pipe(
        switchMap((token) =>
          this._authService.getToken({
            usernameOrEmail: this.usernameOrEmail,
            password: this.password,
            recaptchaToken: token
          })
        )
      ),
      this._authService.getToken({ usernameOrEmail: this.usernameOrEmail, password: this.password })
    )
      .pipe(
        finalize(() => (this.isWaiting = false)),
        filter((res) => res.isSuccess)
      )
      .subscribe(
        (res) => {
          this.toast.dismiss();
          this._authService.login(res.content.token);
          return;
        },
        (err: HttpErrorResponse) => {
          this.toast.open((err.error as ApiResponse<string>).content);
        }
      );
  }

  public redirectToForgotPasswordPage(): void {
    this.router.navigateByUrl('account/forgotPassword');
  }

  public redirectToNewUserPage(): void {
    this.router.navigateByUrl('account/newUser');
  }
}
