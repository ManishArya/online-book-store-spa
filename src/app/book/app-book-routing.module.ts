import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppBookListComponent } from './app-book-list.component';
import { AppBookComponent } from './_id/app-book.component';

const routes: Routes = [
  {
    path: '',
    component: AppBookListComponent
  },
  {
    path: 'book/:id',
    component: AppBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppBookRoutingModule {}
