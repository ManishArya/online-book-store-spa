import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { StatusCode } from './../enums/status-code';
import { IApiErrorResponse } from './../models/api-error-response.model';
import { LoginService } from './../services/login.service';
import { ToastService } from './../services/toast.service';
import { TokenService } from './../services/token.service';

@Component({
  templateUrl: './app-login.component.html'
})
export class AppLoginComponent implements OnInit, OnDestroy {
  public usernameOrEmail: string;
  public password: string;
  public isWaiting: boolean;
  private ngUnSubcribe: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private _loginService: LoginService,
    private toast: ToastService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private renderer: Renderer2
  ) {}

  public ngOnInit(): void {
    this.renderer.addClass(document.body, 'recaptcha');
    if (TokenService.Token) {
      this.router.navigateByUrl('');
    }
  }

  public ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'recaptcha');
    this.ngUnSubcribe.next();
    this.ngUnSubcribe.complete();
  }

  public signIn(): void {
    this.isWaiting = true;
    this.recaptchaV3Service.execute('login').subscribe((token) => console.log(token));
    this._loginService
      .getToken({ usernameOrEmail: this.usernameOrEmail, password: this.password })
      .pipe(finalize(() => (this.isWaiting = false)))
      .subscribe(
        (res) => {
          if (res.code === StatusCode.Success) {
            this.toast.dismiss();
            this._loginService.login(res.data.token);
            return;
          }
          this.toast.open(res.message);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          this.toast.open((err.error as IApiErrorResponse).errorMessages?.[0] ?? err.error.message);
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
