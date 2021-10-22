import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppSharedModule } from '../shared/app-shared.module';
import { AppAddBookModalComponent } from './app-add-book-modal.component';
import { AppBookListComponent } from './app-book-list.component';
import { AppBookRoutingModule } from './app-book-routing.module';
import { MyListComponent } from './my-list/my-list.component';
import { AppBookComponent } from './_id/app-book.component';

@NgModule({
  declarations: [AppAddBookModalComponent, AppBookComponent, AppBookListComponent, MyListComponent],
  imports: [AppBookRoutingModule, AppSharedModule, CommonModule]
})
export class AppBookModule {}
