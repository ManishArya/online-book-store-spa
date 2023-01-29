import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSectionName } from './account-section/account-section-name';
import { AddressComponent } from './address/address.component';
import { AppPreferenceComponent } from './preferences/app-preference.component';
import { AppSecurityComponent } from './security/app-security.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'security'
  },
  {
    path: 'security',
    component: AppSecurityComponent,
    data: {
      sectionName: AccountSectionName.security
    },
    title: 'security'
  },
  {
    path: 'preferences',
    component: AppPreferenceComponent,
    data: {
      sectionName: AccountSectionName.preferences
    },
    title: 'preferences'
  },
  {
    path: 'address',
    component: AddressComponent,
    data: {
      sectionName: AccountSectionName.address
    },
    title: 'address'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountRoutingModule {}
