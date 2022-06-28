import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppHomeComponent } from './app-home.component';
import { AppBookListComponent } from './book/app-book-list.component';
import { MyListComponent } from './book/my-list/my-list.component';
import { AppBookComponent } from './book/_id/app-book.component';
import { LoginGuard } from './services/login.guard';
import { AppNotFoundComponent } from './shared/app-not-found/app-not-found.component';
import { AppAccountComponent } from './user-account/app-account.component';
import { AppProfileComponent } from './user-account/profile/app-profile.component';

const routes: Routes = [
  {
    path: '',
    component: AppHomeComponent,
    children: [
      { path: '', component: AppBookListComponent },
      {
        path: 'book/:id',
        component: AppBookComponent
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () => import('./account/account.module').then((a) => a.AccountModule)
          }
        ]
      },
      {
        path: 'myList',
        component: MyListComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'user-account',
        component: AppAccountComponent,
        canActivate: [LoginGuard],
        children: [
          {
            path: '',
            canLoad: [LoginGuard],
            loadChildren: () => import('./user-account/user-account.module').then((u) => u.UserAccountModule)
          }
        ]
      },
      {
        path: 'profile',
        component: AppProfileComponent,
        canActivate: [LoginGuard]
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
