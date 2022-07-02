import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from '../shared/app-shared.module';
import { AppAccountSectionContentComponent } from './account-section/app-account-section-content.component';
import { AppAccountSectionComponent } from './account-section/app-account-section.component';
import { AppAccountComponent } from './app-account.component';
import { AppPreferenceComponent } from './preferences/app-preference.component';
import { AppProfileComponent } from './profile/app-profile.component';
import { AppSecurityComponent } from './security/app-security.component';
import { AppChangePasswordComponent } from './security/change-password/app-change-password.component';
import { AppDeleteAccountComponent } from './security/delete-account/app-delete-account.component';
import { AppUpdateEmailAddresComponent } from './security/update-email-address/app-update-email-addres.component';
import { UserAccountRoutingModule } from './user-account-routing.module';
import { AddressComponent } from './address/address.component';

@NgModule({
  declarations: [
    AppPreferenceComponent,
    AppProfileComponent,
    AppSecurityComponent,
    AppChangePasswordComponent,
    AppUpdateEmailAddresComponent,
    AppDeleteAccountComponent,
    AppAccountSectionComponent,
    AppAccountSectionContentComponent,
    AppAccountComponent,
    AddressComponent
  ],
  imports: [CommonModule, AppSharedModule, RouterModule, UserAccountRoutingModule]
})
export class UserAccountModule {}
