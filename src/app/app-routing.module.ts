import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppForgetPasswordComponent } from './account/app-forget-password.component';
import { AppLoginComponent } from './account/app-login.component';
import { AppNewUserComponent } from './account/app-new-user.component';
import { AppHomeComponent } from './app-home.component';
import { AppChangePasswordComponent } from './header/change-password/app-change-password.component';
import { AppProfileComponent } from './header/profile/app-profile.component';
import { LoginGuard } from './services/login.guard';
import { AppNotFoundComponent } from './shared/app-not-found/app-not-found.component';

const routes: Routes = [
  { path: 'login', component: AppLoginComponent },
  {
    path: '',
    component: AppHomeComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        canLoad: [LoginGuard],
        loadChildren: () => import('./book/app-book.module').then((b) => b.AppBookModule)
      },
      {
        path: 'change-password',
        component: AppChangePasswordComponent
      },
      {
        path: 'profile',
        component: AppProfileComponent
      }
    ]
  },
  {
    path: 'forgetPassword',
    component: AppForgetPasswordComponent
  },
  {
    path: 'newUser',
    component: AppNewUserComponent
  },
  {
    path: '**',
    component: AppNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
