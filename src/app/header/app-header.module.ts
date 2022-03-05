import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppSharedModule } from '../shared/app-shared.module';
import { AppHeaderComponent } from './app-header.component';

@NgModule({
  declarations: [AppHeaderComponent, AppHeaderComponent],
  imports: [AppSharedModule, CommonModule],
  exports: [AppHeaderComponent]
})
export class AppHeaderModule {}
