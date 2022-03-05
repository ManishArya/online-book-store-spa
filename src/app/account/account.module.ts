import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecaptchaModule, RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { AppSharedModule } from '../shared/app-shared.module';
import { AppAccountComponent } from './app-account.component';
import { AppForgetPasswordComponent } from './app-forget-password.component';
import { AppLoginComponent } from './app-login.component';
import { AppNewUserComponent } from './app-new-user.component';
import { AppProfileComponent } from './profile/app-profile.component';
import { AppSecurityComponent } from './security/app-security.component';
import { AppChangePasswordComponent } from './security/change-password/app-change-password.component';
import { AppDeleteAccountComponent } from './security/delete-account/app-delete-account.component';
import { AppUpdateEmailAddresComponent } from './security/update-email-address/app-update-email-addres.component';
import { AppSecurityMainContentComponent } from './security/app-security-main-content.component';
@NgModule({
  declarations: [
    AppLoginComponent,
    AppForgetPasswordComponent,
    AppNewUserComponent,
    AppSecurityComponent,
    AppAccountComponent,
    AppChangePasswordComponent,
    AppDeleteAccountComponent,
    AppUpdateEmailAddresComponent,
    AppProfileComponent,
    AppSecurityMainContentComponent
  ],
  imports: [CommonModule, RecaptchaV3Module, RecaptchaModule, AppSharedModule, RouterModule],
  providers: [{ provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LdlpoAdAAAAAL5mPm8W-oY44-wBt4YDBYHME9ou' }]
})
export class AccountModule {}
