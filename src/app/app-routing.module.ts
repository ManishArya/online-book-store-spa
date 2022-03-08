import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppAccountComponent } from './account/app-account.component';
import { AppForgetPasswordComponent } from './account/app-forget-password.component';
import { AppLoginComponent } from './account/app-login.component';
import { AppNewUserComponent } from './account/app-new-user.component';
import { AppPreferenceComponent } from './account/preferences/app-preference.component';
import { AppProfileComponent } from './account/profile/app-profile.component';
import { AppSecurityComponent } from './account/security/app-security.component';
import { AppHomeComponent } from './app-home.component';
import { MyListComponent } from './book/my-list/my-list.component';
import { LoginGuard } from './services/login.guard';
import { AppNotFoundComponent } from './shared/app-not-found/app-not-found.component';

const routes: Routes = [
  { path: 'login', component: AppLoginComponent },
  {
    path: 'forgetPassword',
    component: AppForgetPasswordComponent
  },
  {
    path: 'newUser',
    component: AppNewUserComponent
  },
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
        path: 'myList',
        component: MyListComponent
      },
      {
        path: 'account',
        component: AppAccountComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'security'
          },
          {
            path: 'security',
            component: AppSecurityComponent,
            data: {
              sectionName: 'security'
            }
          },
          {
            path: 'preferences',
            component: AppPreferenceComponent,
            data: {
              sectionName: 'preferences'
            }
          }
        ]
      },
      {
        path: 'profile',
        component: AppProfileComponent
      },
      {
        path: '**',
        component: AppNotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
