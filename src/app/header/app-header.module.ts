import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppSharedModule } from '../shared/app-shared.module';
import { AppHeaderComponent } from './app-header.component';
import { AppChangePasswordComponent } from './change-password/app-change-password.component';
import { AppDeleteAccountModalComponent } from './delete-account/app-delete-account-modal.component';
import { AppDeleteAccountComponent } from './delete-account/app-delete-account.component';
import { AppLogOutComponent } from './log-out/app-log-out.component';
import { AppProfileComponent } from './profile/app-profile.component';

@NgModule({
  declarations: [
    AppHeaderComponent,
    AppChangePasswordComponent,
    AppDeleteAccountComponent,
    AppDeleteAccountModalComponent,
    AppHeaderComponent,
    AppLogOutComponent,
    AppProfileComponent
  ],
  imports: [AppSharedModule, CommonModule],
  exports: [AppHeaderComponent]
})
export class AppHeaderModule {}
