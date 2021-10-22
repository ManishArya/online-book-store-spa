import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppBookListComponent } from './app-book-list.component';
import { MyListComponent } from './my-list/my-list.component';
import { AppBookComponent } from './_id/app-book.component';

const routes: Routes = [
  {
    path: '',
    component: AppBookListComponent
  },
  {
    path: 'myList',
    component: MyListComponent
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
