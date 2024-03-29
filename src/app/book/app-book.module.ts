import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from '../shared/app-shared.module';
import { AppAddBookModalComponent } from './app-add-book-modal.component';
import { AppBookListComponent } from './app-book-list.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AppBookComponent } from './_id/app-book.component';

@NgModule({
  declarations: [AppAddBookModalComponent, AppBookComponent, AppBookListComponent, CartComponent, CheckoutComponent],
  imports: [AppSharedModule, CommonModule, RouterModule]
})
export class AppBookModule {}
