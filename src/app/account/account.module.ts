import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RecaptchaModule, RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { AppSharedModule } from '../shared/app-shared.module';
import { AppForgetPasswordComponent } from './app-forget-password.component';
import { AppLoginComponent } from './app-login.component';
import { AppNewUserComponent } from './app-new-user.component';

@NgModule({
  declarations: [AppLoginComponent, AppForgetPasswordComponent, AppNewUserComponent],
  imports: [CommonModule, RecaptchaV3Module, RecaptchaModule, AppSharedModule],
  providers: [{ provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LdlpoAdAAAAAL5mPm8W-oY44-wBt4YDBYHME9ou' }]
})
export class AccountModule {}
