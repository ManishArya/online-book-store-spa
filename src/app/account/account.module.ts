import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecaptchaModule, RecaptchaV3Module, RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { AppSharedModule } from '../shared/app-shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { AppForgetPasswordComponent } from './forgot-password/app-forget-password.component';
import { AppLoginComponent } from './login/app-login.component';
import { AppNewUserComponent } from './new-user/app-new-user.component';

@NgModule({
  declarations: [AppLoginComponent, AppForgetPasswordComponent, AppNewUserComponent],
  imports: [CommonModule, RecaptchaV3Module, RecaptchaModule, AppSharedModule, RouterModule, AccountRoutingModule],
  providers: [
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LdlpoAdAAAAAL5mPm8W-oY44-wBt4YDBYHME9ou' },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { theme: 'dark' }
    }
  ]
})
export class AccountModule {}
