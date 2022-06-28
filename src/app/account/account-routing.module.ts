import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppForgetPasswordComponent } from './forgot-password/app-forget-password.component';
import { AppLoginComponent } from './login/app-login.component';
import { AppNewUserComponent } from './new-user/app-new-user.component';

const routes: Routes = [
  { path: 'login', component: AppLoginComponent },
  {
    path: 'forgotPassword',
    component: AppForgetPasswordComponent
  },
  {
    path: 'newUser',
    component: AppNewUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
