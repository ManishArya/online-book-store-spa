import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Subject } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { IApiResponse } from '../models/api-response.model';
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
  private isRecaptchaEnabled: boolean;
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
    let subscription = null;
    if (this.isRecaptchaEnabled) {
      subscription = this.recaptchaV3Service.execute('login').pipe(
        switchMap((token) =>
          this._loginService.getToken({
            usernameOrEmail: this.usernameOrEmail,
            password: this.password,
            recaptchaToken: token
          })
        )
      );
    } else {
      subscription = this._loginService.getToken({ usernameOrEmail: this.usernameOrEmail, password: this.password });
    }
    subscription.pipe(finalize(() => (this.isWaiting = false))).subscribe(
      (res) => {
        if (res.isSuccess) {
          this.toast.dismiss();
          this._loginService.login(res.content.token);
          return;
        }
      },
      (err: HttpErrorResponse) => {
        this.toast.open((err.error as IApiResponse<string>).content);
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
